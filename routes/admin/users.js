const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const School = require('../../models/School');

// Get all users with stats
router.get('/', async (req, res) => {
  try {
    const users = await School.find({}, {
      firstName: 1,
      lastName: 1,
      email: 1,
      phone: 1,
      role: 1,
      createdAt: 1,
      _id: 1
    });

    // 1. Users by Role (Pie Chart)
    const usersByRole = Object.entries(
      users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {})
    ).map(([role, count]) => ({ role, count }));
    const isValidDate = (date) => date instanceof Date && !isNaN(date);
    // 2. Users by Month (Line Chart)
    const usersByMonth = Object.entries(
      users.reduce((acc, user) => {
        const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {})
    ).map(([month, count]) => ({ month, count }));

    // 3. Users by Day of Week (Bar Chart)
    const usersByDayOfWeek = Object.entries(
      users.reduce((acc, user) => {
        const day = new Date(user.createdAt).toLocaleString('default', { weekday: 'short' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {})
    ).map(([day, count]) => ({ day, count }));

    // 4. Users by Hour of Registration (Area Chart)
    const usersByHour = Object.entries(
      users.reduce((acc, user) => {
        const hour = new Date(user.createdAt).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {})
    ).map(([hour, count]) => ({ hour: `${hour}:00`, count }));

    // 5. Users by Name Length (Scatter Chart)
    const usersByNameLength = users.map(user => ({
      nameLength: user.firstName.length + user.lastName.length,
      count: 1
    })).reduce((acc, curr) => {
      const existing = acc.find(item => item.nameLength === curr.nameLength);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []).sort((a, b) => a.nameLength - b.nameLength);

    // Format users data
    const formattedUsers = users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt
    }));

    res.json({
      users: formattedUsers,
      stats: {
        usersByRole,
        usersByMonth,
        usersByDayOfWeek,
        usersByHour,
        usersByNameLength
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await School.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await School.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role,
      status: 'active',
    });

    // Return user data without password
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt
    };

    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await School.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user
    await School.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 