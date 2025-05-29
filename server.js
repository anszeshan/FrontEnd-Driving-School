const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const schoolRoutes = require('./routes/schoolRoutes');
const cookieParser = require('cookie-parser');
const adminUsersRouter = require('./routes/admin/users');
const adminSchoolsRouter = require('./routes/admin/schools');
const adminDashboardRouter = require('./routes/admin/dashboard');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Add cookie-parser middleware
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'businessLicense', maxCount: 1 },
  { name: 'photos', maxCount: 5 },
]);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Apply multer middleware to routes that handle file uploads
app.use((req, res, next) => {
  if (req.path === '/api/school/register') {
    upload(req, res, next);
  } else {
    next();
  }
});

// MongoDB Connection
mongoose.connect('mongodb+srv://anszeshan786:ans123@anscluster.ls7ac19.mongodb.net/DSF', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/school', schoolRoutes);
app.use('/api/admin/users', adminUsersRouter);
app.use('/api/admin/schools', adminSchoolsRouter);
app.use('/api/admin/dashboard', adminDashboardRouter);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// const express = require("express")
// const dotenv = require("dotenv")
// const cors = require("cors")
// const morgan = require("morgan")
// const connectDB = require("./config/db")
// const { errorHandler } = require("./middleware/errorMiddleware")
// const path = require("path")

// // Load env vars
// dotenv.config()

// // Connect to database
// connectDB()

// // Initialize express
// const app = express()

// // Middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cors())

// // Dev logging middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"))
// }

// // Set static folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"))
// app.use("/api/users", require("./routes/userRoutes"))
// app.use("/api/schools", require("./routes/schoolRoutes"))
// app.use("/api/services", require("./routes/serviceRoutes"))
// app.use("/api/reviews", require("./routes/reviewRoutes"))
// app.use("/api/admin", require("./routes/adminRoutes"))

// // Error handler
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// })

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`)
//   // Close server & exit process
//   process.exit(1)
// })
