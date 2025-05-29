"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, MapPin, Phone, Mail, Star, Car, User, Clock, ArrowUpDown, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
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

// Add German states and cities data
const germanStates = {
  "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg"],
  "Bayern": ["München", "Nürnberg", "Augsburg", "Regensburg", "Würzburg"],
  "Berlin": ["Berlin"],
  "Brandenburg": ["Potsdam", "Cottbus", "Frankfurt (Oder)", "Brandenburg an der Havel"],
  "Bremen": ["Bremen", "Bremerhaven"],
  "Hamburg": ["Hamburg"],
  "Hessen": ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"],
  "Mecklenburg-Vorpommern": ["Rostock", "Schwerin", "Neubrandenburg", "Stralsund"],
  "Niedersachsen": ["Hannover", "Braunschweig", "Oldenburg", "Osnabrück", "Göttingen"],
  "Nordrhein-Westfalen": ["Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg"],
  "Rheinland-Pfalz": ["Mainz", "Ludwigshafen", "Koblenz", "Trier", "Kaiserslautern"],
  "Saarland": ["Saarbrücken", "Neunkirchen", "Homburg"],
  "Sachsen": ["Leipzig", "Dresden", "Chemnitz", "Halle", "Zwickau"],
  "Sachsen-Anhalt": ["Magdeburg", "Halle", "Dessau-Roßlau"],
  "Schleswig-Holstein": ["Kiel", "Lübeck", "Flensburg", "Neumünster"],
  "Thüringen": ["Erfurt", "Jena", "Gera", "Weimar", "Eisenach"]
};

type GermanState = keyof typeof germanStates;

export default function ComparisonPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState<GermanState | "all">("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price")
  const [searchQuery, setSearchQuery] = useState("")
  const [calculatorInputs, setCalculatorInputs] = useState({
    licenseType: "carLicense",
    theoryLessons: 10,
    practicalLessons: 20,
    nightDriving: 2,
    highwayDriving: 2,
    examAttempts: 1,
  })

  useEffect(() => {
    fetchAllSchools()
  }, [])

  const fetchAllSchools = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://backend-ds-blue.vercel.app/api/school/compare`)
      const data = await response.json()
      setSchools(data)
      setFilteredSchools(data)
    } catch (error) {
      console.error("Error fetching schools:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    let filtered = [...schools]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(school => 
        school.name.toLowerCase().includes(query) ||
        school.city.toLowerCase().includes(query) ||
        school.address.toLowerCase().includes(query)
      )
    }

    // Filter by state and city
    if (selectedState !== "all") {
      const stateCities = germanStates[selectedState]
      filtered = filtered.filter(school => stateCities.includes(school.city))
    }
    if (selectedCity !== "all") {
      filtered = filtered.filter(school => 
        school.city.toLowerCase() === selectedCity.toLowerCase()
      )
    }

    // Filter by price range
    filtered = filtered.filter(school => {
      const totalPrice = calculateTotalPrice(school)
      return totalPrice >= priceRange[0] && totalPrice <= priceRange[1]
    })

    // Filter by services
    if (selectedServices.length > 0) {
      filtered = filtered.filter(school => 
        selectedServices.every(service => {
          const serviceKey = service as keyof typeof school.services
          return school.services[serviceKey]
        })
      )
    }

    // Sort results
    if (sortBy === "price") {
      filtered.sort((a, b) => calculateTotalPrice(a) - calculateTotalPrice(b))
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredSchools(filtered)
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

    // Base costs
    let total = prices.registrationFee // Registration fee
    total += theoryLessons * prices.theoryLesson // Theory lessons
    total += practicalLessons * prices.drivingLesson // Practical lessons
    
    // Exam costs
    total += examAttempts * (prices.examFee + prices.theoryExam) // Both practical and theory exam fees
    
    // Additional driving hours
    total += nightDriving * prices.nightDriving // Night driving hours
    total += highwayDriving * prices.highwayDriving // Highway driving hours

    return Math.round(total)
  }

  const getServiceBadges = (school: School) => {
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

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Compare Driving Schools</h1>
            
            {/* Search Bar */}
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search schools by name, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-2xl mx-auto"
              />
            </div>

            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Location</h3>
                <div className="space-y-4">
                  <Select 
                    value={selectedState} 
                    onValueChange={(value: GermanState | "all") => setSelectedState(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {Object.keys(germanStates).map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select 
                    value={selectedCity} 
                    onValueChange={setSelectedCity}
                    disabled={selectedState === "all"}
                  >
                    <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                      {selectedState !== "all" && germanStates[selectedState].map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={5000}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>£{priceRange[0]}</span>
                    <span>£{priceRange[1]}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-4">Services</h3>
                <div className="space-y-2">
                  {["carLicense", "motorcycleLicense", "truckLicense", "busLicense", "onlineTheory", "automaticTransmission"].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <Label htmlFor={service} className="text-sm">
                        {service.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Calculator Section */}
            <Card className="p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4 text-center">Price Calculator</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <Label>Theory Lessons </Label>
                  <Input
                    type="number"
                    min="14"
                    value={calculatorInputs.theoryLessons}
                    onChange={(e) =>
                      setCalculatorInputs({
                        ...calculatorInputs,
                        theoryLessons: Math.max(14, parseInt(e.target.value) || 14),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Practical Lessons</Label>
                  <Input
                    type="number"
                    min="12"
                    value={calculatorInputs.practicalLessons}
                    onChange={(e) =>
                      setCalculatorInputs({
                        ...calculatorInputs,
                        practicalLessons: Math.max(12, parseInt(e.target.value) || 12),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Night Driving Hours</Label>
                  <Input
                    type="number"
                    min="3"
                    value={calculatorInputs.nightDriving}
                    onChange={(e) =>
                      setCalculatorInputs({
                        ...calculatorInputs,
                        nightDriving: Math.max(3, parseInt(e.target.value) || 3),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Highway Driving Hours </Label>
                  <Input
                    type="number"
                    min="4"
                    value={calculatorInputs.highwayDriving}
                    onChange={(e) =>
                      setCalculatorInputs({
                        ...calculatorInputs,
                        highwayDriving: Math.max(4, parseInt(e.target.value) || 4),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Exam Attempts</Label>
                  <Input
                    type="number"
                    min="1"
                    value={calculatorInputs.examAttempts}
                    onChange={(e) =>
                      setCalculatorInputs({
                        ...calculatorInputs,
                        examAttempts: Math.max(1, parseInt(e.target.value) || 1),
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={handleSearch} className="w-full max-w-xs">
                  <Search className="mr-2 h-4 w-4" />
                  Search Schools
                </Button>
              </div>
            </Card>

            {/* Sort Controls */}
            <div className="flex justify-end mb-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Schools Grid */}
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
            ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school) => (
              <motion.div
                    key={school._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="relative h-48">
                        <Image
                          src={school.logo || "/placeholder.svg"}
                          alt={school.name}
                          fill
                          className="object-cover"
                        />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold">{school.name}</h3>
                      <div className="flex items-center mt-1">
                            <div className="flex items-center text-white text-sm">
                              <User className="h-4 w-4 mr-1" />
                              {school.instructors} Instructors
                            </div>
                            <div className="flex items-center text-white text-sm ml-4">
                              <Car className="h-4 w-4 mr-1" />
                              {school.vehicles} Vehicles
                            </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="flex-1 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">Total Cost</div>
                            <div className="font-bold">£{calculateTotalPrice(school).toLocaleString()}</div>
                          </div>
                          <div className="text-sm font-medium mt-4 mb-2">Services</div>
                          <div className="flex flex-wrap gap-2">
                            {getServiceBadges(school).map((service, index) => (
                              <Badge key={index} variant="secondary">
                                {service}
                              </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          Contact Information
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{school.name} - Contact</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <span>
                              {school.address}, {school.city}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <span>{school.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <span>{school.email}</span>
                          </div>
                              <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(school.openingHours)
                                    .filter(([_, hours]) => !hours.closed)
                                    .map(([day, hours]) => (
                                      <Badge key={day} variant="outline">
                                        {day}: {hours.open}-{hours.close}
                                      </Badge>
                                    ))}
                              </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline">Send Message</Button>
                          <Button>Call Now</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                        <Link href={`/comparison/school/${school._id}`} className="flex-1">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
