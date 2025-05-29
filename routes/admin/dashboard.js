const express = require('express');
const router = express.Router();
const School = require('../../models/School');

// Get dashboard statistics
router.get('/', async (req, res) => {
  try {
    const schools = await School.find({});

    // Calculate total statistics
    const totalSchools = schools.length;
    const activeSchools = schools.filter(school => school.status === 'active').length;
    const pendingSchools = schools.filter(school => school.status === 'pending').length;
    const totalInstructors = schools.reduce((sum, school) => sum + (school.instructors || 0), 0);
    const totalVehicles = schools.reduce((sum, school) => sum + (school.vehicles || 0), 0);

    // Schools by City
    const schoolsByCity = Object.entries(
      schools.reduce((acc, school) => {
        acc[school.city] = (acc[school.city] || 0) + 1;
        return acc;
      }, {})
    ).map(([city, count]) => ({ city, count }));

    // Schools by Month
    const schoolsByMonth = Object.entries(
      schools.reduce((acc, school) => {
        const month = new Date(school.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {})
    ).map(([month, count]) => ({ month, count }));

    // Schools by Status
    const schoolsByStatus = Object.entries(
      schools.reduce((acc, school) => {
        acc[school.status] = (acc[school.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([status, count]) => ({ status, count }));

    // Schools by Year Founded
    const schoolsByYear = Object.entries(
      schools.reduce((acc, school) => {
        if (school.foundedYear) {
          acc[school.foundedYear] = (acc[school.foundedYear] || 0) + 1;
        }
        return acc;
      }, {})
    ).map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

    // Schools by Instructors and Vehicles
    const schoolsByInstructors = schools
      .filter(school => school.instructors && school.vehicles)
      .map(school => ({
        instructors: parseInt(school.instructors),
        vehicles: parseInt(school.vehicles)
      }));

    // Schools by Services
    const schoolsByServices = Object.entries(
      schools.reduce((acc, school) => {
        Object.entries(school.services).forEach(([service, value]) => {
          if (value) {
            acc[service] = (acc[service] || 0) + 1;
          }
        });
        return acc;
      }, {})
    ).map(([service, count]) => ({
      service: service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      count
    }));

    // Schools by Price Range
    const priceRanges = {
      '0-500': 0,
      '501-1000': 0,
      '1001-1500': 0,
      '1501-2000': 0,
      '2000+': 0
    };

    schools.forEach(school => {
      const totalPrice = school.prices.registrationFee + 
                        school.prices.theoryLesson + 
                        school.prices.drivingLesson;
      
      if (totalPrice <= 500) priceRanges['0-500']++;
      else if (totalPrice <= 1000) priceRanges['501-1000']++;
      else if (totalPrice <= 1500) priceRanges['1001-1500']++;
      else if (totalPrice <= 2000) priceRanges['1501-2000']++;
      else priceRanges['2000+']++;
    });

    const schoolsByPriceRange = Object.entries(priceRanges)
      .map(([range, count]) => ({ range, count }));

    // Schools by Opening Hours
    const schoolsByOpeningHours = Object.entries(
      schools.reduce((acc, school) => {
        Object.entries(school.openingHours).forEach(([day, hours]) => {
          if (!acc[day]) {
            acc[day] = { open: 0, closed: 0 };
          }
          if (hours.closed) {
            acc[day].closed++;
          } else {
            acc[day].open++;
          }
        });
        return acc;
      }, {})
    ).map(([day, counts]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      ...counts
    }));

    // Recent Schools
    const recentSchools = schools
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(school => ({
        id: school._id,
        name: school.name,
        city: school.city,
        status: school.status,
        createdAt: school.createdAt,
        instructors: school.instructors,
        vehicles: school.vehicles,
        services: Object.values(school.services).filter(Boolean).length
      }));

    // Top Schools
    const topSchools = schools
      .map(school => ({
        id: school._id,
        name: school.name,
        instructors: school.instructors || 0,
        vehicles: school.vehicles || 0,
        services: Object.values(school.services).filter(Boolean).length
      }))
      .sort((a, b) => (b.instructors + b.vehicles + b.services) - (a.instructors + a.vehicles + a.services))
      .slice(0, 5);

    res.json({
      totalSchools,
      activeSchools,
      pendingSchools,
      totalInstructors,
      totalVehicles,
      schoolsByCity,
      schoolsByMonth,
      schoolsByStatus,
      schoolsByYear,
      schoolsByInstructors,
      schoolsByServices,
      schoolsByPriceRange,
      schoolsByOpeningHours,
      recentSchools,
      topSchools
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 