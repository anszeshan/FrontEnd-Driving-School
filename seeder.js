const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Load env vars
dotenv.config()

// Load models
const User = require("./models/userModel")
const School = require("./models/schoolModel")
const Service = require("./models/serviceModel")
const Review = require("./models/reviewModel")

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"))

const schools = JSON.parse(fs.readFileSync(`${__dirname}/_data/schools.json`, "utf-8"))

const services = JSON.parse(fs.readFileSync(`${__dirname}/_data/services.json`, "utf-8"))

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8"))

// Import into DB
const importData = async () => {
  try {
    await User.create(users)
    await School.create(schools)
    await Service.create(services)
    await Review.create(reviews)
    console.log("Data Imported...")
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany()
    await School.deleteMany()
    await Service.deleteMany()
    await Review.deleteMany()
    console.log("Data Destroyed...")
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === "-i") {
  importData()
} else if (process.argv[2] === "-d") {
  deleteData()
}
