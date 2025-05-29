// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the School Schema
// const schoolSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   foundedYear: { type: String },
//   city: { type: String, required: true },
//   address: { type: String, required: true },
//   postalCode: { type: String, required: true },
//   state: { type: String, required: true },
//   website: { type: String },
//   description: { type: String, required: true },
//   services: {
//     carLicense: { type: Boolean, default: false },
//     motorcycleLicense: { type: Boolean, default: false },
//     truckLicense: { type: Boolean, default: false },
//     busLicense: { type: Boolean, default: false },
//     mopedLicense: { type: Boolean, default: false },
//     trailerLicense: { type: Boolean, default: false },
//     refresherCourses: { type: Boolean, default: false },
//     intensiveCourses: { type: Boolean, default: false },
//     foreignLanguageSupport: { type: Boolean, default: false },
//     anxietySupport: { type: Boolean, default: false },
//     automaticTransmission: { type: Boolean, default: false },
//     onlineTheory: { type: Boolean, default: false },
//   },
//   prices: {
//     registrationFee: { type: Number, required: true },
//     theoryLesson: { type: Number, required: true },
//     drivingLesson: { type: Number, required: true },
//     examFee: { type: Number, required: true },
//     theoryExam: { type: Number, required: true },
//     nightDriving: { type: Number, required: true },
//     highwayDriving: { type: Number, required: true },
//   },
//   instructors: { type: Number, required: true },
//   vehicles: { type: Number, required: true },
//   openingHours: {
//     monday: { open: String, close: String, closed: Boolean },
//     tuesday: { open: String, close: String, closed: Boolean },
//     wednesday: { open: String, close: String, closed: Boolean },
//     thursday: { open: String, close: String, closed: Boolean },
//     friday: { open: String, close: String, closed: Boolean },
//     saturday: { open: String, close: String, closed: Boolean },
//     sunday: { open: String, close: String, closed: Boolean },
//   },
//   logo: { type: String },
//   businessLicense: { type: String },
//   photos: [{ type: String }],
//   termsAgreed: { type: Boolean, required: true },
//   certify: { type: Boolean, required: true },
// });

// module.exports = mongoose.model('School', schoolSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the School Schema
const schoolSchema = new Schema({
  parentSchool: { type: Schema.Types.ObjectId, ref: "School", default: null }, // Reference to the parent school
  managedSchools: [{ type: Schema.Types.ObjectId, ref: "School" }], // List of schools managed by this school
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  foundedYear: { type: String },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  state: { type: String, required: true },
  website: { type: String },
  description: { type: String, required: true },
  services: {
    carLicense: { type: Boolean, default: false },
    motorcycleLicense: { type: Boolean, default: false },
    truckLicense: { type: Boolean, default: false },
    busLicense: { type: Boolean, default: false },
    mopedLicense: { type: Boolean, default: false },
    trailerLicense: { type: Boolean, default: false },
    refresherCourses: { type: Boolean, default: false },
    intensiveCourses: { type: Boolean, default: false },
    foreignLanguageSupport: { type: Boolean, default: false },
    anxietySupport: { type: Boolean, default: false },
    automaticTransmission: { type: Boolean, default: false },
    onlineTheory: { type: Boolean, default: false },
  },
  prices: {
    registrationFee: { type: Number, required: true },
    theoryLesson: { type: Number, required: true },
    drivingLesson: { type: Number, required: true },
    examFee: { type: Number, required: true },
    theoryExam: { type: Number, required: true },
    nightDriving: { type: Number, required: true },
    highwayDriving: { type: Number, required: true },
  },
  instructors: { type: Number, required: true },
  vehicles: { type: Number, required: true },
  openingHours: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean },
  },
  logo: { type: String },
  businessLicense: { type: String },
  photos: [{ type: String }],
  termsAgreed: { type: Boolean, required: true },
  certify: { type: Boolean, required: true },
});

module.exports = mongoose.model("School", schoolSchema);