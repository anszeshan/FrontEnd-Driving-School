"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, MapPin, Phone, Mail, Globe, Calendar, Users, Car, Building2, 
  FileText, Clock, CheckCircle2, XCircle, AlertCircle, DollarSign, Clock4,
  School, Link2, FileCheck, CheckCircle, AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"

interface School {
  id: string
  parentSchool?: { name: string; email: string }
  managedSchools?: { name: string; email: string }[]
  firstName: string
  lastName: string
  email: string
  phone: string
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
    [key: string]: {
      open: string
      close: string
      closed: boolean
    }
  }
  logo?: string
  businessLicense?: string
  photos?: string[]
  termsAgreed: boolean
  certify: boolean
  createdAt: string
  updatedAt: string
}

export default function SchoolDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [school, setSchool] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await fetch(`https://backend-ds-blue.vercel.app/api/admin/schools/${params.id}`)
        const data = await response.json()
        setSchool(data)
      } catch (error) {
        console.error('Error fetching school:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSchool()
  }, [params.id])

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (!school) {
    return (
      <AdminDashboardLayout>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
          <h2 className="text-2xl font-bold mb-4">School Not Found</h2>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </AdminDashboardLayout>
    )
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'carLicense':
        return <Car className="h-4 w-4" />
      case 'motorcycleLicense':
        return <Car className="h-4 w-4" />
      case 'truckLicense':
        return <Car className="h-4 w-4" />
      case 'busLicense':
        return <Car className="h-4 w-4" />
      case 'mopedLicense':
        return <Car className="h-4 w-4" />
      case 'trailerLicense':
        return <Car className="h-4 w-4" />
      case 'refresherCourses':
        return <Clock4 className="h-4 w-4" />
      case 'intensiveCourses':
        return <Clock4 className="h-4 w-4" />
      case 'foreignLanguageSupport':
        return <Globe className="h-4 w-4" />
      case 'anxietySupport':
        return <AlertTriangle className="h-4 w-4" />
      case 'automaticTransmission':
        return <Car className="h-4 w-4" />
      case 'onlineTheory':
        return <Globe className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schools
          </Button>
          <div className="flex items-center gap-4">
            {school.termsAgreed && (
              <Badge className="flex items-center gap-2 px-3 py-1 bg-green-500">
                <CheckCircle className="h-4 w-4" />
                Terms Agreed
              </Badge>
            )}
            {school.certify && (
              <Badge className="flex items-center gap-2 px-3 py-1 bg-blue-500">
                <FileCheck className="h-4 w-4" />
                Certified
              </Badge>
            )}
          </div>
        </div>

        {/* School Header */}
        <div className="relative h-64 rounded-lg overflow-hidden">
          {school.logo ? (
            <img src={school.logo} alt={school.name} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600" />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">{school.name}</h1>
              <p className="text-lg opacity-90">{school.city}, {school.state}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{school.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Founded in {school.foundedYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{school.instructors} Instructors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>{school.vehicles} Vehicles</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-muted-foreground">{school.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Services Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(school.services).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex items-center gap-2 p-3 border rounded-lg">
                        {getServiceIcon(key)}
                        <span className="font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(school.prices).map(([key, value]) => (
                    <div key={key} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </h4>
                      <p className="text-2xl font-bold text-rose-500">${value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock4 className="h-5 w-5" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(school.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium capitalize">{day}</span>
                      {hours.closed ? (
                        <span className="text-red-500">Closed</span>
                      ) : (
                        <span>{hours.open} - {hours.close}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${school.email}`} className="hover:text-rose-500">
                    {school.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${school.phone}`} className="hover:text-rose-500">
                    {school.phone}
                  </a>
                </div>
                {school.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={school.website} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500">
                      {school.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{school.postalCode}</span>
                </div>
              </CardContent>
            </Card>

            {/* School Network */}
            {(school.parentSchool || school.managedSchools?.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    School Network
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {school.parentSchool && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Parent School</h4>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">{school.parentSchool.name}</div>
                        <div className="text-sm text-muted-foreground">{school.parentSchool.email}</div>
                      </div>
                    </div>
                  )}
                  {school.managedSchools && school.managedSchools.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Managed Schools</h4>
                      <div className="space-y-2">
                        {school.managedSchools.map((managedSchool, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium">{managedSchool.name}</div>
                            <div className="text-sm text-muted-foreground">{managedSchool.email}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            {(school.logo || school.businessLicense || school.photos?.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents & Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {school.businessLicense && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Business License</h4>
                      <a 
                        href={school.businessLicense} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-rose-500 hover:underline"
                      >
                        <Link2 className="h-4 w-4" />
                        View License
                      </a>
                    </div>
                  )}
                  {school.photos && school.photos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Gallery</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {school.photos.map((photo, index) => (
                          <a 
                            key={index}
                            href={photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="aspect-square rounded-lg overflow-hidden"
                          >
                            <img 
                              src={photo} 
                              alt={`School photo ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Created: {new Date(school.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Clock className="h-4 w-4" />
                    <span>Last Updated: {new Date(school.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
} 