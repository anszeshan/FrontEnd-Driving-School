const express = require('express');
const router = express.Router();
const School = require('../../models/School');

// Get all schools with stats
router.get('/', async (req, res) => {
  try {
    const schools = await School.find({}, {
      name: 1,
      city: 1,
      email: 1,
      phone: 1,
      status: 1,
      createdAt: 1,
      foundedYear: 1,
      instructors: 1,
      vehicles: 1,
      _id: 1
    });

    // 1. Schools by City (Pie Chart)
    const schoolsByCity = Object.entries(
      schools.reduce((acc, school) => {
        acc[school.city] = (acc[school.city] || 0) + 1;
        return acc;
      }, {})
    ).map(([city, count]) => ({ city, count }));

    // 2. Schools by Month (Line Chart)
    const schoolsByMonth = Object.entries(
      schools.reduce((acc, school) => {
        const month = new Date(school.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {})
    ).map(([month, count]) => ({ month, count }));

    // 3. Schools by Status (Bar Chart)
    const schoolsByStatus = Object.entries(
      schools.reduce((acc, school) => {
        acc[school.status] = (acc[school.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([status, count]) => ({ status, count }));

    // 4. Schools by Year Founded (Area Chart)
    const schoolsByYear = Object.entries(
      schools.reduce((acc, school) => {
        if (school.foundedYear) {
          acc[school.foundedYear] = (acc[school.foundedYear] || 0) + 1;
        }
        return acc;
      }, {})
    ).map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

    // 5. Schools by Instructor Count (Scatter Chart)
    const schoolsByInstructors = schools
      .filter(school => school.instructors)
      .map(school => ({
        instructors: parseInt(school.instructors),
        vehicles: parseInt(school.vehicles) || 0
      }))
      .sort((a, b) => a.instructors - b.instructors);

    // Format schools data
    const formattedSchools = schools.map(school => ({
      id: school._id,
      name: school.name,
      city: school.city,
      email: school.email,
      phone: school.phone,
      status: school.status,
      foundedYear: school.foundedYear,
      instructors: school.instructors,
      vehicles: school.vehicles,
      createdAt: school.createdAt
    }));

    res.json({
      schools: formattedSchools,
      stats: {
        schoolsByCity,
        schoolsByMonth,
        schoolsByStatus,
        schoolsByYear,
        schoolsByInstructors
      }
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new school
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      website,
      foundedYear,
      status,
      address,
      city,
      postalCode,
      ownerName,
      ownerEmail,
      ownerPhone,
      description,
      instructors,
      vehicles,
      licenseTypes,
      languages,
      hasTheoryLessons,
      hasPracticalLessons,
      hasIntensiveCourses,
      hasOnlineBooking,
      hasEvening,
      hasWeekend,
      pricePerTheoryLesson,
      pricePerDrivingLesson,
      registrationFee
    } = req.body;

    // Check if school already exists
    const existingSchool = await School.findOne({ email });

    if (existingSchool) {
      return res.status(400).json({ error: 'School with this email already exists' });
    }

    // Create school
    const school = await School.create({
      name,
      email,
      phone,
      website,
      foundedYear,
      status: status || 'pending',
      address,
      city,
      postalCode,
      ownerName,
      ownerEmail,
      ownerPhone,
      description,
      instructors,
      vehicles,
      licenseTypes,
      languages,
      hasTheoryLessons,
      hasPracticalLessons,
      hasIntensiveCourses,
      hasOnlineBooking,
      hasEvening,
      hasWeekend,
      pricePerTheoryLesson,
      pricePerDrivingLesson,
      registrationFee
    });

    res.status(201).json(school);
  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete school
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if school exists
    const school = await School.findById(id);

    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    // Delete school
    await School.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update school status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const school = await School.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    res.json(school);
  } catch (error) {
    console.error('Error updating school status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get detailed information for a specific school
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id)
      .populate('parentSchool', 'name email')
      .populate('managedSchools', 'name email');

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Format the data to include all schema fields
    const formattedSchool = {
      id: school._id,
      parentSchool: school.parentSchool,
      managedSchools: school.managedSchools,
      firstName: school.firstName,
      lastName: school.lastName,
      email: school.email,
      phone: school.phone,
      name: school.name,
      foundedYear: school.foundedYear,
      city: school.city,
      address: school.address,
      postalCode: school.postalCode,
      state: school.state,
      website: school.website,
      description: school.description,
      services: {
        carLicense: school.services.carLicense,
        motorcycleLicense: school.services.motorcycleLicense,
        truckLicense: school.services.truckLicense,
        busLicense: school.services.busLicense,
        mopedLicense: school.services.mopedLicense,
        trailerLicense: school.services.trailerLicense,
        refresherCourses: school.services.refresherCourses,
        intensiveCourses: school.services.intensiveCourses,
        foreignLanguageSupport: school.services.foreignLanguageSupport,
        anxietySupport: school.services.anxietySupport,
        automaticTransmission: school.services.automaticTransmission,
        onlineTheory: school.services.onlineTheory,
      },
      prices: {
        registrationFee: school.prices.registrationFee,
        theoryLesson: school.prices.theoryLesson,
        drivingLesson: school.prices.drivingLesson,
        examFee: school.prices.examFee,
        theoryExam: school.prices.theoryExam,
        nightDriving: school.prices.nightDriving,
        highwayDriving: school.prices.highwayDriving,
      },
      instructors: school.instructors,
      vehicles: school.vehicles,
      openingHours: school.openingHours,
      logo: school.logo,
      businessLicense: school.businessLicense,
      photos: school.photos,
      termsAgreed: school.termsAgreed,
      certify: school.certify,
      createdAt: school.createdAt,
      updatedAt: school.updatedAt
    };

    res.json(formattedSchool);
  } catch (error) {
    console.error('Error fetching school details:', error);
    res.status(500).json({ message: 'Error fetching school details' });
  }
});

module.exports = router; 