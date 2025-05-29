import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import School, { ISchool } from "@/models/School"

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const services = searchParams.get("services")?.split(",")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const hasTheoryLessons = searchParams.get("hasTheoryLessons")
    const hasPracticalLessons = searchParams.get("hasPracticalLessons")
    const hasIntensiveCourses = searchParams.get("hasIntensiveCourses")
    const hasOnlineBooking = searchParams.get("hasOnlineBooking")
    const hasEvening = searchParams.get("hasEvening")
    const hasWeekend = searchParams.get("hasWeekend")

    let query: any = { status: "active" }

    if (city && city !== "all") {
      query.city = city
    }

    if (services && services.length > 0) {
      query.$or = services.map((service) => ({
        [`services.${service}License`]: true,
      }))
    }

    if (minPrice || maxPrice) {
      query["prices.drivingLesson"] = {
        ...(minPrice && { $gte: parseInt(minPrice) }),
        ...(maxPrice && { $lte: parseInt(maxPrice) }),
      }
    }

    if (hasTheoryLessons) {
      query.services = { ...query.services, onlineTheory: hasTheoryLessons === "true" }
    }

    if (hasPracticalLessons) {
      query.services = { ...query.services, automaticTransmission: hasPracticalLessons === "true" }
    }

    if (hasIntensiveCourses) {
      query.services = { ...query.services, intensiveCourses: hasIntensiveCourses === "true" }
    }

    if (hasOnlineBooking) {
      query.services = { ...query.services, onlineTheory: hasOnlineBooking === "true" }
    }

    const schools = await School.find(query).select({
      _id: 1,
      name: 1,
      city: 1,
      address: 1,
      description: 1,
      email: 1,
      phone: 1,
      website: 1,
      foundedYear: 1,
      services: 1,
      prices: 1,
      instructors: 1,
      vehicles: 1,
      openingHours: 1,
      logo: 1,
      photos: 1,
    })

    // Transform the data to match the frontend interface
    const transformedSchools = schools.map((school: ISchool) => ({
      id: school._id.toString(),
      name: school.name,
      city: school.city,
      address: school.address,
      description: school.description,
      email: school.email,
      phone: school.phone,
      website: school.website,
      foundedYear: school.foundedYear,
      services: {
        car: school.services.carLicense,
        motorcycle: school.services.motorcycleLicense,
        truck: school.services.truckLicense,
        bus: school.services.busLicense,
        theory: school.services.onlineTheory,
        practical: school.services.automaticTransmission,
        intensive: school.services.intensiveCourses,
        online: school.services.onlineTheory,
        evening: school.services.refresherCourses,
        weekend: school.services.refresherCourses,
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
      photos: school.photos,
      hasTheoryLessons: school.services.onlineTheory,
      hasPracticalLessons: school.services.automaticTransmission,
      hasIntensiveCourses: school.services.intensiveCourses,
      hasOnlineBooking: school.services.onlineTheory,
      hasEvening: school.services.refresherCourses,
      hasWeekend: school.services.refresherCourses,
    }))

    return NextResponse.json(transformedSchools)
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 