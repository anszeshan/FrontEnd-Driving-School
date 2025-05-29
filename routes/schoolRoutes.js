const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const pricingController = require('../controllers/schoolPricingController');
// const auth = require('../middleware/auth');


router.post('/register', schoolController.registerSchool);

router.post('/login', schoolController.loginSchool);

// New endpoint for dashboard data
router.get('/dashboard', schoolController.getDashboardData);


router.get('/profile', schoolController.authMiddleware, schoolController.getSchoolProfile);
router.put('/profile', schoolController.authMiddleware, schoolController.updateSchoolProfile);

// Public route to get schools for comparison
router.get('/compare', schoolController.getSchoolsForComparison);
router.get('/:id', schoolController.getSchoolDetails);


module.exports = router;