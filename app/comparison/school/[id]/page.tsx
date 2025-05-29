"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Star, Check, Calendar, Car, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface School {
  _id: string
  name: string
  city: string
  address: string
  description: string
  email: string
  phone: string
  website: string
  foundedYear: string
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
  logo: string
  photos: string[]
}

export default function SchoolDetailPage() {
  const params = useParams()
  const [school, setSchool] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://backend-ds-blue.vercel.app/api/school/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch school details')
        }
        const data = await response.json()
        setSchool(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchSchoolDetails()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center h-[50vh]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !school) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center h-[50vh]">
              <p className="text-red-500">{error || 'School not found'}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getServiceBadges = () => {
    const badges = []
    if (school.services.carLicense) badges.push("Car License")
    if (school.services.motorcycleLicense) badges.push("Motorcycle License")
    if (school.services.truckLicense) badges.push("Truck License")
    if (school.services.busLicense) badges.push("Bus License")
    if (school.services.mopedLicense) badges.push("Moped License")
    if (school.services.trailerLicense) badges.push("Trailer License")
    if (school.services.onlineTheory) badges.push("Online Theory")
    if (school.services.automaticTransmission) badges.push("Automatic")
    if (school.services.intensiveCourses) badges.push("Intensive Courses")
    if (school.services.foreignLanguageSupport) badges.push("Language Support")
    if (school.services.anxietySupport) badges.push("Anxiety Support")
    return badges
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link href="/comparison" className="text-rose-500 hover:underline mb-4 inline-block">
              &larr; Back to Comparison
            </Link>
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
              <Image 
                src={school.logo || "/placeholder.svg"} 
                alt={school.name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h1 className="text-3xl font-bold text-white mb-2">{school.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-white">
                    <Users className="h-5 w-5 mr-2" />
                    {school.instructors} Instructors
                  </div>
                  <div className="flex items-center text-white">
                    <Car className="h-5 w-5 mr-2" />
                    {school.vehicles} Vehicles
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {school.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{school.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Address</p>
                              <p className="text-muted-foreground">
                                {school.address}, {school.city}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Phone</p>
                              <p className="text-muted-foreground">{school.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-muted-foreground">{school.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Founded</p>
                              <p className="text-muted-foreground">{school.foundedYear}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Instructors</p>
                              <p className="text-muted-foreground">{school.instructors} qualified instructors</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="font-medium">Vehicles</p>
                              <p className="text-muted-foreground">{school.vehicles} modern training vehicles</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Opening Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(school.openingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between py-2 border-b last:border-0">
                            <div className="font-medium capitalize">{day}</div>
                            <div>
                              {hours.closed ? (
                                <span className="text-muted-foreground">Closed</span>
                              ) : (
                                <span>
                                  {hours.open} - {hours.close}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Information</CardTitle>
                      <CardDescription>Detailed breakdown of our pricing structure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Registration Fee</span>
                            <span className="font-medium">€{school.prices.registrationFee.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Theory Lesson</span>
                            <span className="font-medium">€{school.prices.theoryLesson.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Driving Lesson</span>
                            <span className="font-medium">€{school.prices.drivingLesson.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Night Driving</span>
                            <span className="font-medium">€{school.prices.nightDriving.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Highway Driving</span>
                            <span className="font-medium">€{school.prices.highwayDriving.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Theory Exam Fee</span>
                            <span className="font-medium">€{school.prices.theoryExam.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                            <span>Practical Exam Fee</span>
                            <span className="font-medium">€{school.prices.examFee.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="services" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Our Services</CardTitle>
                      <CardDescription>Comprehensive driving education services we offer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getServiceBadges().map((service, index) => (
                          <div key={index} className="flex items-start p-3 border rounded-md">
                            <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                            <div>
                              <h3 className="font-medium">{service}</h3>
                              <p className="text-sm text-muted-foreground">{getServiceDescription(service)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-rose-500" />
                      <span>
                        {school.address}, {school.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-rose-500" />
                      <span>{school.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-rose-500" />
                      <span>{school.email}</span>
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <Button className="w-full">Contact Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Founded</span>
                      <span>{school.foundedYear}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Instructors</span>
                      <span>{school.instructors}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Vehicles</span>
                      <span>{school.vehicles}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Helper function to get service descriptions
function getServiceDescription(service: string) {
  const descriptions: { [key: string]: string } = {
    "Car License": "Standard driving license for cars and light vehicles up to 3.5 tons.",
    "Motorcycle License": "License for motorcycles of all engine sizes.",
    "Truck License": "License for vehicles over 3.5 tons for commercial transport.",
    "Bus License": "License for passenger transport vehicles.",
    "Moped License": "License for mopeds and small motorcycles.",
    "Trailer License": "License for towing trailers and caravans.",
    "Online Theory": "Digital access to theory lessons and practice tests.",
    "Automatic": "Driving lessons specifically for automatic transmission vehicles.",
    "Intensive Courses": "Accelerated learning program to get your license in a shorter time frame.",
    "Language Support": "Instruction available in multiple languages for non-native speakers.",
    "Anxiety Support": "Special support and techniques for anxious or nervous learners.",
  }

  return descriptions[service] || "Comprehensive training and instruction for this service."
}
