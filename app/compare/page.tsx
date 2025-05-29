"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Loader2, Star, MapPin, Phone, Mail, Globe, Clock, Car, User, Calendar } from "lucide-react"

interface School {
  id: string
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

export default function ComparePage() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSchools, setSelectedSchools] = useState<School[]>([])
  const [filters, setFilters] = useState({
    city: "all",
    services: [] as string[],
    minPrice: 0,
    maxPrice: 1000,
    hasTheoryLessons: false,
    hasPracticalLessons: false,
    hasIntensiveCourses: false,
    hasOnlineBooking: false,
    hasEvening: false,
    hasWeekend: false,
  })
  const [calculatorInputs, setCalculatorInputs] = useState({
    licenseType: "carLicense",
    theoryLessons: 10,
    practicalLessons: 20,
    nightDriving: 2,
    highwayDriving: 2,
    examAttempts: 1,
  })

  useEffect(() => {
    fetchSchools()
  }, [filters])

  const fetchSchools = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      if (filters.city !== "all") queryParams.append("city", filters.city)
      if (filters.services.length > 0) queryParams.append("services", filters.services.join(","))
      if (filters.minPrice > 0) queryParams.append("minPrice", filters.minPrice.toString())
      if (filters.maxPrice < 1000) queryParams.append("maxPrice", filters.maxPrice.toString())
      if (filters.hasTheoryLessons) queryParams.append("hasTheoryLessons", "true")
      if (filters.hasPracticalLessons) queryParams.append("hasPracticalLessons", "true")
      if (filters.hasIntensiveCourses) queryParams.append("hasIntensiveCourses", "true")
      if (filters.hasOnlineBooking) queryParams.append("hasOnlineBooking", "true")
      if (filters.hasEvening) queryParams.append("hasEvening", "true")
      if (filters.hasWeekend) queryParams.append("hasWeekend", "true")

      const response = await fetch(`/api/schools?${queryParams.toString()}`)
      const data = await response.json()
      setSchools(data)
    } catch (error) {
      console.error("Error fetching schools:", error)
    }
    setLoading(false)
  }

  const calculateTotalPrice = (school: School) => {
    const { prices } = school
    const {
      licenseType,
      theoryLessons,
      practicalLessons,
      nightDriving,
      highwayDriving,
      examAttempts,
    } = calculatorInputs

    let total = prices.registrationFee
    total += theoryLessons * prices.theoryLesson
    total += practicalLessons * prices.drivingLesson
    total += examAttempts * prices.examFee
    total += nightDriving * prices.nightDriving
    total += highwayDriving * prices.highwayDriving

    return total
  }

  const toggleSchoolSelection = (school: School) => {
    if (selectedSchools.find((s) => s.id === school.id)) {
      setSelectedSchools(selectedSchools.filter((s) => s.id !== school.id))
    } else if (selectedSchools.length < 3) {
      setSelectedSchools([...selectedSchools, school])
    }
  }

  return (
    <div className="container px-4 md:px-6 mx-auto max-w-7xl py-12">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Filters Sidebar */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <Label>City</Label>
              <Select
                value={filters.city}
                onValueChange={(value) => setFilters({ ...filters, city: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="manchester">Manchester</SelectItem>
                  <SelectItem value="birmingham">Birmingham</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Services</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="carLicense"
                    checked={filters.services.includes("carLicense")}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        services: checked
                          ? [...filters.services, "carLicense"]
                          : filters.services.filter((s) => s !== "carLicense"),
                      })
                    }}
                  />
                  <Label htmlFor="carLicense">Car License</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="motorcycleLicense"
                    checked={filters.services.includes("motorcycleLicense")}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        services: checked
                          ? [...filters.services, "motorcycleLicense"]
                          : filters.services.filter((s) => s !== "motorcycleLicense"),
                      })
                    }}
                  />
                  <Label htmlFor="motorcycleLicense">Motorcycle License</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="truckLicense"
                    checked={filters.services.includes("truckLicense")}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        services: checked
                          ? [...filters.services, "truckLicense"]
                          : filters.services.filter((s) => s !== "truckLicense"),
                      })
                    }}
                  />
                  <Label htmlFor="truckLicense">Truck License</Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Price Range (per lesson)</Label>
              <div className="space-y-4 mt-2">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={([min, max]) =>
                    setFilters({ ...filters, minPrice: min, maxPrice: max })
                  }
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>£{filters.minPrice}</span>
                  <span>£{filters.maxPrice}</span>
                </div>
              </div>
            </div>

            <div>
              <Label>Additional Features</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="onlineTheory"
                    checked={filters.hasTheoryLessons}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, hasTheoryLessons: checked as boolean })
                    }
                  />
                  <Label htmlFor="onlineTheory">Online Theory</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="automaticTransmission"
                    checked={filters.hasPracticalLessons}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, hasPracticalLessons: checked as boolean })
                    }
                  />
                  <Label htmlFor="automaticTransmission">Automatic Transmission</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="intensiveCourses"
                    checked={filters.hasIntensiveCourses}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, hasIntensiveCourses: checked as boolean })
                    }
                  />
                  <Label htmlFor="intensiveCourses">Intensive Courses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="foreignLanguageSupport"
                    checked={filters.hasOnlineBooking}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, hasOnlineBooking: checked as boolean })
                    }
                  />
                  <Label htmlFor="foreignLanguageSupport">Foreign Language Support</Label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Price Calculator */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Price Calculator</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label>License Type</Label>
                <Select
                  value={calculatorInputs.licenseType}
                  onValueChange={(value) =>
                    setCalculatorInputs({ ...calculatorInputs, licenseType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carLicense">Car License</SelectItem>
                    <SelectItem value="motorcycleLicense">Motorcycle License</SelectItem>
                    <SelectItem value="truckLicense">Truck License</SelectItem>
                    <SelectItem value="busLicense">Bus License</SelectItem>
                    <SelectItem value="mopedLicense">Moped License</SelectItem>
                    <SelectItem value="trailerLicense">Trailer License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Theory Lessons</Label>
                <Input
                  type="number"
                  value={calculatorInputs.theoryLessons}
                  onChange={(e) =>
                    setCalculatorInputs({
                      ...calculatorInputs,
                      theoryLessons: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Practical Lessons</Label>
                <Input
                  type="number"
                  value={calculatorInputs.practicalLessons}
                  onChange={(e) =>
                    setCalculatorInputs({
                      ...calculatorInputs,
                      practicalLessons: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Night Driving Hours</Label>
                <Input
                  type="number"
                  value={calculatorInputs.nightDriving}
                  onChange={(e) =>
                    setCalculatorInputs({
                      ...calculatorInputs,
                      nightDriving: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Highway Driving Hours</Label>
                <Input
                  type="number"
                  value={calculatorInputs.highwayDriving}
                  onChange={(e) =>
                    setCalculatorInputs({
                      ...calculatorInputs,
                      highwayDriving: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Exam Attempts</Label>
                <Input
                  type="number"
                  value={calculatorInputs.examAttempts}
                  onChange={(e) =>
                    setCalculatorInputs({
                      ...calculatorInputs,
                      examAttempts: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* School List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Available Schools</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {schools.map((school) => (
                  <Card
                    key={school.id}
                    className={`p-6 cursor-pointer transition-colors ${
                      selectedSchools.find((s) => s.id === school.id)
                        ? "border-primary"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => toggleSchoolSelection(school)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{school.name}</h3>
                        <p className="text-sm text-muted-foreground">{school.city}</p>
                      </div>
                      <Badge variant="outline">
                        £{calculateTotalPrice(school).toLocaleString()}
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {school.address}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        {school.phone}
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        {school.email}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {school.services.carLicense && <Badge>Car</Badge>}
                      {school.services.motorcycleLicense && <Badge>Motorcycle</Badge>}
                      {school.services.truckLicense && <Badge>Truck</Badge>}
                      {school.services.busLicense && <Badge>Bus</Badge>}
                      {school.services.mopedLicense && <Badge>Moped</Badge>}
                      {school.services.trailerLicense && <Badge>Trailer</Badge>}
                      {school.services.onlineTheory && <Badge>Online Theory</Badge>}
                      {school.services.automaticTransmission && <Badge>Automatic</Badge>}
                      {school.services.intensiveCourses && <Badge>Intensive</Badge>}
                      {school.services.foreignLanguageSupport && <Badge>Language Support</Badge>}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Results */}
          {selectedSchools.length > 0 && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Comparison Results</h2>
              <ScrollArea className="h-[600px]">
                <div className="grid grid-cols-[200px_repeat(auto-fit,minmax(300px,1fr))] gap-4">
                  <div className="space-y-4">
                    <div className="h-12" /> {/* Spacer for header */}
                    <div className="font-medium">Location</div>
                    <div className="font-medium">Contact</div>
                    <div className="font-medium">Services</div>
                    <div className="font-medium">Prices</div>
                    <div className="font-medium">Features</div>
                    <div className="font-medium">Total Cost</div>
                  </div>

                  {selectedSchools.map((school) => (
                    <div key={school.id} className="space-y-4">
                      <div className="h-12">
                        <h3 className="font-semibold">{school.name}</h3>
                        <p className="text-sm text-muted-foreground">{school.city}</p>
                      </div>

                      <div>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {school.address}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2" />
                          {school.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2" />
                          {school.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Globe className="h-4 w-4 mr-2" />
                          {school.website}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {school.services.carLicense && <Badge>Car</Badge>}
                        {school.services.motorcycleLicense && <Badge>Motorcycle</Badge>}
                        {school.services.truckLicense && <Badge>Truck</Badge>}
                        {school.services.busLicense && <Badge>Bus</Badge>}
                        {school.services.mopedLicense && <Badge>Moped</Badge>}
                        {school.services.trailerLicense && <Badge>Trailer</Badge>}
                        {school.services.onlineTheory && <Badge>Online Theory</Badge>}
                        {school.services.automaticTransmission && <Badge>Automatic</Badge>}
                        {school.services.intensiveCourses && <Badge>Intensive</Badge>}
                        {school.services.foreignLanguageSupport && <Badge>Language Support</Badge>}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          Registration: £{school.prices.registrationFee}
                        </div>
                        <div className="text-sm">
                          Theory Lesson: £{school.prices.theoryLesson}
                        </div>
                        <div className="text-sm">
                          Driving Lesson: £{school.prices.drivingLesson}
                        </div>
                        <div className="text-sm">Exam Fee: £{school.prices.examFee}</div>
                        <div className="text-sm">
                          Theory Exam: £{school.prices.theoryExam}
                        </div>
                        <div className="text-sm">
                          Night Driving: £{school.prices.nightDriving}
                        </div>
                        <div className="text-sm">
                          Highway Driving: £{school.prices.highwayDriving}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-2" />
                          {school.instructors} Instructors
                        </div>
                        <div className="flex items-center text-sm">
                          <Car className="h-4 w-4 mr-2" />
                          {school.vehicles} Vehicles
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Founded {school.foundedYear}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          {Object.entries(school.openingHours)
                            .filter(([_, hours]) => !hours.closed)
                            .map(([day, hours]) => (
                              <span key={day} className="mr-2">
                                {day}: {hours.open}-{hours.close}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="font-semibold text-lg">
                        £{calculateTotalPrice(school).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 