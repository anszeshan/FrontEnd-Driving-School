const School = require('../models/School');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1873837987897328784789268926764782678642647826288';

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Register a new school
exports.registerSchool = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    let { email, password, confirmPassword, services, prices, openingHours, ...schoolData } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingSchool = await School.findOne({ email });
    if (existingSchool) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    console.log('Raw services:', services);
    if (typeof services === 'string') {
      services = JSON.parse(services);
      console.log('Parsed services:', services);
    }
    console.log('Raw prices:', prices);
    if (typeof prices === 'string') {
      prices = JSON.parse(prices);
      console.log('Parsed prices:', prices);
    }
    console.log('Raw openingHours:', openingHours);
    if (typeof openingHours === 'string') {
      openingHours = JSON.parse(openingHours);
      console.log('Parsed openingHours:', openingHours);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const logo = req.files?.logo ? `/uploads/${req.files.logo[0].filename}` : null;
    const businessLicense = req.files?.businessLicense ? `/uploads/${req.files.businessLicense[0].filename}` : null;
    const photos = req.files?.photos ? req.files.photos.map(file => `/uploads/${file.filename}`) : [];

    const newSchool = new School({
      ...schoolData,
      email,
      password: hashedPassword,
      services,
      prices,
      openingHours,
      logo,
      businessLicense,
      photos,
    });

    console.log('Attempting to save new school...');
    const savePromise = newSchool.save();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Save operation timed out after 10 seconds')), 10000);
    });

    await Promise.race([savePromise, timeoutPromise]);
    console.log('School saved successfully');

    return res.status(201).json({ 
      message: 'School registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update the login controller
exports.loginSchool = async (req, res) => {
  try {
    const { email, password } = req.body;

    const school = await School.findOne({ email });
    if (!school) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, school.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: school._id, email: school.email },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    return res.status(200).json({ 
      message: 'Login successful',
      token,
      school: {
        id: school._id,
        name: school.name,
        email: school.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create middleware to verify JWT token
exports.authMiddleware = (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Add school data to request
    req.school = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const schools = await School.find();

    const totalSchools = schools.length;

    const servicesCount = {
      carLicense: 0,
      motorcycleLicense: 0,
      truckLicense: 0,
      busLicense: 0,
      mopedLicense: 0,
      trailerLicense: 0,
      refresherCourses: 0,
      intensiveCourses: 0,
      foreignLanguageSupport: 0,
      anxietySupport: 0,
      automaticTransmission: 0,
      onlineTheory: 0,
    };
    schools.forEach(school => {
      Object.keys(servicesCount).forEach(service => {
        if (school.services[service]) servicesCount[service]++;
      });
    });

    const schoolsByCity = {};
    schools.forEach(school => {
      schoolsByCity[school.city] = (schoolsByCity[school.city] || 0) + 1;
    });

    const foundedYearTrend = {};
    schools.forEach(school => {
      if (school.foundedYear) {
        foundedYearTrend[school.foundedYear] = (foundedYearTrend[school.foundedYear] || 0) + 1;
      }
    });

    const priceFields = [
      'registrationFee', 'theoryLesson', 'drivingLesson', 'examFee',
      'theoryExam', 'nightDriving', 'highwayDriving'
    ];
    const avgPrices = {};
    const minPrices = {};
    const maxPrices = {};
    priceFields.forEach(field => {
      const values = schools.map(school => school.prices[field]).filter(val => val !== undefined);
      avgPrices[field] = values.length ? (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(2) : 0;
      minPrices[field] = values.length ? Math.min(...values) : 0;
      maxPrices[field] = values.length ? Math.max(...values) : 0;
    });

    const avgInstructors = schools.length ? (schools.reduce((sum, school) => sum + school.instructors, 0) / schools.length).toFixed(2) : 0;
    const avgVehicles = schools.length ? (schools.reduce((sum, school) => sum + school.vehicles, 0) / schools.length).toFixed(2) : 0;

    const weekendAvailability = {
      openSaturday: 0,
      openSunday: 0,
      closedWeekends: 0,
    };
    schools.forEach(school => {
      const isSaturdayOpen = school.openingHours?.saturday && !school.openingHours.saturday.closed;
      const isSundayOpen = school.openingHours?.sunday && !school.openingHours.sunday.closed;
      if (isSaturdayOpen && isSundayOpen) {
        weekendAvailability.openSaturday++;
        weekendAvailability.openSunday++;
      } else if (isSaturdayOpen) {
        weekendAvailability.openSaturday++;
      } else if (isSundayOpen) {
        weekendAvailability.openSunday++;
      } else {
        weekendAvailability.closedWeekends++;
      }
    });

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const avgOpeningHours = {};
    days.forEach(day => {
      const openTimes = [];
      const closeTimes = [];
      schools.forEach(school => {
        if (school.openingHours?.[day] && !school.openingHours[day].closed) {
          if (school.openingHours[day].open) openTimes.push(school.openingHours[day].open);
          if (school.openingHours[day].close) closeTimes.push(school.openingHours[day].close);
        }
      });

      const avgTime = (times) => {
        if (!times.length) return 'N/A';
        const minutes = times.map(time => {
          const [hours, mins] = time.split(':').map(Number);
          return hours * 60 + mins;
        });
        const avgMinutes = minutes.reduce((sum, val) => sum + val, 0) / minutes.length;
        const hours = Math.floor(avgMinutes / 60);
        const mins = Math.round(avgMinutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      };

      avgOpeningHours[day] = {
        open: avgTime(openTimes),
        close: avgTime(closeTimes),
      };
    });

    return res.status(200).json({
      totalSchools,
      servicesCount,
      schoolsByCity,
      foundedYearTrend,
      avgPrices,
      minPrices,
      maxPrices,
      avgInstructors,
      avgVehicles,
      weekendAvailability,
      avgOpeningHours,
      schools: schools.map(school => ({
        name: school.name,
        city: school.city,
        instructors: school.instructors,
        vehicles: school.vehicles,
      })),
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get school profile
exports.getSchoolProfile = async (req, res) => {
  try {
    // Email comes from the decoded token
    const { email } = req.school;

    // Find the school
    const school = await School.findOne({ email });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    return res.status(200).json({
      firstName: school.firstName,
      lastName: school.lastName,
      name: school.name,
      email: school.email,
      phone: school.phone,
      password: school.password, // Note: Typically, password should not be returned for security reasons; consider excluding it
      address: school.address,
      city: school.city,
      postalCode: school.postalCode,
      state: school.state,
      website: school.website,
      description: school.description,
      foundedYear: school.foundedYear,
      instructors: school.instructors,
      vehicles: school.vehicles,
      logo: school.logo,
      businessLicense: school.businessLicense,
      photos: school.photos,
      services: school.services,
      prices: school.prices,
      openingHours: school.openingHours,
      termsAgreed: school.termsAgreed,
      certify: school.certify,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSchoolProfile = async (req, res) => {
  try {
    // Log the raw request body and files for debugging
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Email comes from the decoded token
    const { email } = req.school;

    // Find the school
    const school = await School.findOne({ email });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    // Validate that the request contains data to update
    if (Object.keys(req.body).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    // Extract update data from body
    let {
      firstName,
      lastName,
      password,
      confirmPassword,
      name,
      foundedYear,
      city,
      address,
      postalCode,
      state,
      website,
      description,
      instructors,
      vehicles,
      services,
      prices,
      openingHours,
      termsAgreed,
      certify,
    } = req.body;

    // Log parsed fields for debugging
    console.log("Extracted fields:", {
      firstName,
      lastName,
      password,
      confirmPassword,
      name,
      foundedYear,
      city,
      address,
      postalCode,
      state,
      website,
      description,
      instructors,
      vehicles,
      services,
      prices,
      openingHours,
      termsAgreed,
      certify,
    });

    // Handle password update if provided
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      school.password = hashedPassword;
    } else if (password || confirmPassword) {
      return res.status(400).json({ message: "Both password and confirm password are required for update" });
    }

    // Parse nested JSON fields if they exist as strings
    if (services && typeof services === "string") {
      try {
        services = JSON.parse(services);
      } catch (error) {
        return res.status(400).json({ message: "Invalid services format", error: error.message });
      }
    }
    if (prices && typeof prices === "string") {
      try {
        prices = JSON.parse(prices);
      } catch (error) {
        return res.status(400).json({ message: "Invalid prices format", error: error.message });
      }
    }
    if (openingHours && typeof openingHours === "string") {
      try {
        openingHours = JSON.parse(openingHours);
      } catch (error) {
        return res.status(400).json({ message: "Invalid openingHours format", error: error.message });
      }
    }

    // Update scalar fields, converting strings to appropriate types
    school.firstName = firstName !== undefined ? firstName : school.firstName;
    school.lastName = lastName !== undefined ? lastName : school.lastName;
    school.name = name !== undefined ? name : school.name;
    school.foundedYear = foundedYear !== undefined ? foundedYear : school.foundedYear;
    school.city = city !== undefined ? city : school.city;
    school.address = address !== undefined ? address : school.address;
    school.postalCode = postalCode !== undefined ? postalCode : school.postalCode;
    school.state = state !== undefined ? state : school.state;
    school.website = website !== undefined ? website : school.website;
    school.description = description !== undefined ? description : school.description;
    school.instructors = instructors !== undefined ? Number(instructors) : school.instructors;
    school.vehicles = vehicles !== undefined ? Number(vehicles) : school.vehicles;
    school.termsAgreed = termsAgreed !== undefined ? termsAgreed === "true" : school.termsAgreed;
    school.certify = certify !== undefined ? certify === "true" : school.certify;

    // Update nested objects
    school.services = services || school.services;
    school.prices = prices || school.prices;
    school.openingHours = openingHours || school.openingHours;

    // Handle file uploads
    if (req.files?.logo) {
      if (school.logo && fs.existsSync(path.join(__dirname, "../public" + school.logo))) {
        fs.unlinkSync(path.join(__dirname, "../public" + school.logo));
      }
      school.logo = `/uploads/${req.files.logo[0].filename}`;
    }

    if (req.files?.businessLicense) {
      if (school.businessLicense && fs.existsSync(path.join(__dirname, "../public" + school.businessLicense))) {
        fs.unlinkSync(path.join(__dirname, "../public" + school.businessLicense));
      }
      school.businessLicense = `/uploads/${req.files.businessLicense[0].filename}`;
    }

    if (req.files?.photos) {
      const newPhotos = req.files.photos.map((file) => `/uploads/${file.filename}`);
      school.photos = [...(school.photos || []), ...newPhotos];
    }

    // Log the updated school document before saving
    console.log("Updated school document before saving:", school.toObject());

    // Save the updated document
    const updatedSchool = await school.save({ runValidators: true });

    return res.status(200).json({
      message: "Profile updated successfully",
      school: {
        firstName: updatedSchool.firstName,
        lastName: updatedSchool.lastName,
        name: updatedSchool.name,
        email: updatedSchool.email,
        phone: updatedSchool.phone,
        address: updatedSchool.address,
        city: updatedSchool.city,
        postalCode: updatedSchool.postalCode,
        state: updatedSchool.state,
        website: updatedSchool.website,
        description: updatedSchool.description,
        foundedYear: updatedSchool.foundedYear,
        instructors: updatedSchool.instructors,
        vehicles: updatedSchool.vehicles,
        logo: updatedSchool.logo,
        businessLicense: updatedSchool.businessLicense,
        photos: updatedSchool.photos,
        services: updatedSchool.services,
        prices: updatedSchool.prices,
        openingHours: updatedSchool.openingHours,
        termsAgreed: updatedSchool.termsAgreed,
        certify: updatedSchool.certify,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Add a new school
exports.addSchool = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { email } = req.school; // Email of the authenticated (parent) school
    const parentSchool = await School.findOne({ email });
    if (!parentSchool) {
      return res.status(404).json({ message: "Parent school not found" });
    }

    const {
      firstName,
      lastName,
      email: newEmail,
      phone,
      password,
      name,
      foundedYear,
      city,
      address,
      postalCode,
      state,
      website,
      description,
      instructors,
      vehicles,
      services,
      prices,
      openingHours,
      termsAgreed,
      certify,
    } = req.body;

    // Validate required fields
    if (!newEmail || !password || !name || !termsAgreed || !certify) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existingSchool = await School.findOne({ email: newEmail });
    if (existingSchool) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse nested JSON fields
    const parsedServices = services && typeof services === "string" ? JSON.parse(services) : services;
    const parsedPrices = prices && typeof prices === "string" ? JSON.parse(prices) : prices;
    const parsedOpeningHours = openingHours && typeof openingHours === "string" ? JSON.parse(openingHours) : openingHours;

    // Create new school
    const newSchool = new School({
      firstName,
      lastName,
      email: newEmail,
      phone,
      password: hashedPassword,
      name,
      foundedYear,
      city,
      address,
      postalCode,
      state,
      website,
      description,
      instructors: Number(instructors),
      vehicles: Number(vehicles),
      services: parsedServices || {},
      prices: parsedPrices || {},
      openingHours: parsedOpeningHours || {},
      termsAgreed: termsAgreed === "true",
      certify: certify === "true",
      parentSchool: parentSchool._id,
    });

    // Handle file uploads
    if (req.files?.logo) {
      newSchool.logo = `/uploads/${req.files.logo[0].filename}`;
    }
    if (req.files?.businessLicense) {
      newSchool.businessLicense = `/uploads/${req.files.businessLicense[0].filename}`;
    }
    if (req.files?.photos) {
      newSchool.photos = req.files.photos.map((file) => `/uploads/${file.filename}`);
    }

    const savedSchool = await newSchool.save({ runValidators: true });

    // Update parent school's managedSchools array
    parentSchool.managedSchools.push(savedSchool._id);
    await parentSchool.save();

    return res.status(201).json({
      message: "School added successfully",
      school: {
        _id: savedSchool._id,
        firstName: savedSchool.firstName,
        lastName: savedSchool.lastName,
        name: savedSchool.name,
        email: savedSchool.email,
        phone: savedSchool.phone,
      },
    });
  } catch (error) {
    console.error("Add school error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all managed schools
exports.getManagedSchools = async (req, res) => {
  try {
    const { email } = req.school;
    const school = await School.findOne({ email }).populate("managedSchools");
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    return res.status(200).json({
      managedSchools: school.managedSchools.map((school) => ({
        _id: school._id,
        firstName: school.firstName,
        lastName: school.lastName,
        name: school.name,
        email: school.email,
        phone: school.phone,
        city: school.city,
        address: school.address,
      })),
    });
  } catch (error) {
    console.error("Get managed schools error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit a managed school
exports.editSchool = async (req, res) => {
  try {
    const { email } = req.school;
    const { schoolId } = req.params;
    const parentSchool = await School.findOne({ email });
    if (!parentSchool) {
      return res.status(404).json({ message: "Parent school not found" });
    }

    const school = await School.findById(schoolId);
    if (!school || !parentSchool.managedSchools.includes(school._id)) {
      return res.status(404).json({ message: "School not found or not managed by this parent" });
    }

    const {
      firstName,
      lastName,
      phone,
      name,
      foundedYear,
      city,
      address,
      postalCode,
      state,
      website,
      description,
      instructors,
      vehicles,
      services,
      prices,
      openingHours,
      termsAgreed,
      certify,
    } = req.body;

    // Update scalar fields
    school.firstName = firstName !== undefined ? firstName : school.firstName;
    school.lastName = lastName !== undefined ? lastName : school.lastName;
    school.phone = phone !== undefined ? phone : school.phone;
    school.name = name !== undefined ? name : school.name;
    school.foundedYear = foundedYear !== undefined ? foundedYear : school.foundedYear;
    school.city = city !== undefined ? city : school.city;
    school.address = address !== undefined ? address : school.address;
    school.postalCode = postalCode !== undefined ? postalCode : school.postalCode;
    school.state = state !== undefined ? state : school.state;
    school.website = website !== undefined ? website : school.website;
    school.description = description !== undefined ? description : school.description;
    school.instructors = instructors !== undefined ? Number(instructors) : school.instructors;
    school.vehicles = vehicles !== undefined ? Number(vehicles) : school.vehicles;
    school.termsAgreed = termsAgreed !== undefined ? termsAgreed === "true" : school.termsAgreed;
    school.certify = certify !== undefined ? certify === "true" : school.certify;

    // Update nested objects
    if (services && typeof services === "string") {
      school.services = JSON.parse(services);
    }
    if (prices && typeof prices === "string") {
      school.prices = JSON.parse(prices);
    }
    if (openingHours && typeof openingHours === "string") {
      school.openingHours = JSON.parse(openingHours);
    }

    // Handle file uploads
    if (req.files?.logo) {
      if (school.logo && fs.existsSync(path.join(__dirname, "../public" + school.logo))) {
        fs.unlinkSync(path.join(__dirname, "../public" + school.logo));
      }
      school.logo = `/uploads/${req.files.logo[0].filename}`;
    }
    if (req.files?.businessLicense) {
      if (school.businessLicense && fs.existsSync(path.join(__dirname, "../public" + school.businessLicense))) {
        fs.unlinkSync(path.join(__dirname, "../public" + school.businessLicense));
      }
      school.businessLicense = `/uploads/${req.files.businessLicense[0].filename}`;
    }
    if (req.files?.photos) {
      const newPhotos = req.files.photos.map((file) => `/uploads/${file.filename}`);
      school.photos = [...(school.photos || []), ...newPhotos];
    }

    const updatedSchool = await school.save({ runValidators: true });

    return res.status(200).json({
      message: "School updated successfully",
      school: {
        _id: updatedSchool._id,
        firstName: updatedSchool.firstName,
        lastName: updatedSchool.lastName,
        name: updatedSchool.name,
        email: updatedSchool.email,
        phone: updatedSchool.phone,
        city: updatedSchool.city,
        address: updatedSchool.address,
      },
    });
  } catch (error) {
    console.error("Edit school error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a managed school
exports.deleteSchool = async (req, res) => {
  try {
    const { email } = req.school;
    const { schoolId } = req.params;
    const parentSchool = await School.findOne({ email });
    if (!parentSchool) {
      return res.status(404).json({ message: "Parent school not found" });
    }

    const school = await School.findById(schoolId);
    if (!school || !parentSchool.managedSchools.includes(school._id)) {
      return res.status(404).json({ message: "School not found or not managed by this parent" });
    }

    // Remove school files if they exist
    if (school.logo && fs.existsSync(path.join(__dirname, "../public" + school.logo))) {
      fs.unlinkSync(path.join(__dirname, "../public" + school.logo));
    }
    if (school.businessLicense && fs.existsSync(path.join(__dirname, "../public" + school.businessLicense))) {
      fs.unlinkSync(path.join(__dirname, "../public" + school.businessLicense));
    }
    school.photos.forEach((photo) => {
      if (fs.existsSync(path.join(__dirname, "../public" + photo))) {
        fs.unlinkSync(path.join(__dirname, "../public" + photo));
      }
    });

    // Remove from parent school's managedSchools array
    parentSchool.managedSchools = parentSchool.managedSchools.filter((id) => id.toString() !== schoolId);
    await parentSchool.save();

    // Delete the school
    await school.deleteOne();

    return res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Delete school error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getSchoolsForComparison = async (req, res) => {
  try {
    // Only fetch active schools with necessary fields
    const schools = await School.find({})
      .select('name city address description email phone website foundedYear services prices instructors vehicles openingHours logo photos')
      .lean();

    res.json(schools);
  } catch (error) {
    console.error('Error fetching schools for comparison:', error);
    res.status(500).json({ message: 'Error fetching schools for comparison' });
  }
};

exports.getSchoolDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id)
      .select('name city address description email phone website foundedYear services prices instructors vehicles openingHours logo photos')
      .lean();

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.json(school);
  } catch (error) {
    console.error('Error fetching school details:', error);
    res.status(500).json({ message: 'Error fetching school details' });
  }
};
