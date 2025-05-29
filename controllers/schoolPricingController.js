const School = require('../models/School');

// Get school pricing
exports.getSchoolPricing = async (req, res) => {
  try {
    const { email } = req.query;
    console.log('Get pricing for email:', email);
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const school = await School.findOne({ email });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    return res.status(200).json(school.pricing || {
      basic: {
        registrationFee: 100,
        theoryLesson: 20,
        drivingLesson: 50,
        nightDriving: 55,
        highwayDriving: 55,
        examFee: 150,
        theoryExam: 80,
      },
      packages: {
        basicPackage: { enabled: true, name: "Basic Package", description: "Standard driving course for beginners", price: 1299, lessons: 20, theoryLessons: 14 },
        intensivePackage: { enabled: true, name: "Intensive Package", description: "Fast-track course with more lessons per week", price: 1599, lessons: 25, theoryLessons: 14 },
        premiumPackage: { enabled: false, name: "Premium Package", description: "Comprehensive course with additional services", price: 1899, lessons: 30, theoryLessons: 14 },
      },
      discounts: {
        studentDiscount: { enabled: true, percentage: 5 },
        groupDiscount: { enabled: true, percentage: 10 },
        seasonalDiscount: { enabled: false, percentage: 7 },
      },
    });
  } catch (error) {
    console.error('Get pricing error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update school pricing
exports.updateSchoolPricing = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const updateData = req.body;
    delete updateData.email; // Remove email from update data to avoid overwriting

    const school = await School.findOneAndUpdate(
      { email },
      { $set: { pricing: updateData } },
      { new: true, runValidators: true }
    );

    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    return res.status(200).json({ message: 'Pricing updated successfully' });
  } catch (error) {
    console.error('Update pricing error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};