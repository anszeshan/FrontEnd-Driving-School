import mongoose, { Document, Schema } from "mongoose"

export interface ISchool extends Document {
  _id: mongoose.Types.ObjectId
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  name: string
  foundedYear: string
  city: string
  address: string
  postalCode: string
  state: string
  website?: string
  description: string
  services: {
    carLicense: boolean
    motorcycleLicense: boolean
    truckLicense: boolean
    busLicense: boolean
    mopedLicense: boolean
    trailerLicense: boolean
    refresherCourses: boolean
    intensiveCourses: boolean
    foreignLanguageSupport: boolean
    anxietySupport: boolean
    automaticTransmission: boolean
    onlineTheory: boolean
  }
  prices: {
    registrationFee: number
    theoryLesson: number
    drivingLesson: number
    examFee: number
    theoryExam: number
    nightDriving: number
    highwayDriving: number
  }
  instructors: number
  vehicles: number
  openingHours: {
    monday: { open: string; close: string; closed: boolean }
    tuesday: { open: string; close: string; closed: boolean }
    wednesday: { open: string; close: string; closed: boolean }
    thursday: { open: string; close: string; closed: boolean }
    friday: { open: string; close: string; closed: boolean }
    saturday: { open: string; close: string; closed: boolean }
    sunday: { open: string; close: string; closed: boolean }
  }
  logo?: string
  businessLicense?: string
  photos: string[]
  termsAgreed: boolean
  certify: boolean
  status: string
  parentSchool?: mongoose.Types.ObjectId
  managedSchools: mongoose.Types.ObjectId[]
}

const schoolSchema = new Schema<ISchool>({
  parentSchool: { type: Schema.Types.ObjectId, ref: "School", default: null },
  managedSchools: [{ type: Schema.Types.ObjectId, ref: "School" }],
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
  status: { type: String, default: "pending" },
})

export default mongoose.models.School || mongoose.model<ISchool>("School", schoolSchema) 