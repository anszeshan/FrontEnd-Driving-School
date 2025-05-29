const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Get token from header
    token = req.headers.authorization.split(" ")[1]
  }

  // Check if token exists
  if (!token) {
    res.status(401)
    throw new Error("Not authorized to access this route")
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from the token
    req.user = await User.findById(decoded.id).select("-password")

    next()
  } catch (error) {
    res.status(401)
    throw new Error("Not authorized to access this route")
  }
})

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as an admin")
  }
})

// School middleware
const school = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "school") {
    next()
  } else {
    res.status(401)
    throw new Error("Not authorized as a driving school")
  }
})

module.exports = { protect, admin, school }
