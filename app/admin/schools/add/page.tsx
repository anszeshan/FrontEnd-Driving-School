"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, ChevronDown, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const cities = [
  { value: "berlin", label: "Berlin" },
  { value: "munich", label: "Munich" },
  { value: "hamburg", label: "Hamburg" },
  { value: "cologne", label: "Cologne" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "stuttgart", label: "Stuttgart" },
  { value: "dusseldorf", label: "Düsseldorf" },
  { value: "leipzig", label: "Leipzig" },
  { value: "dortmund", label: "Dortmund" },
  { value: "essen", label: "Essen" },
]

const licenseTypes = [
  { id: "b", label: "Class B - Car" },
  { id: "a", label: "Class A - Motorcycle" },
  { id: "c", label: "Class C - Truck" },
  { id: "d", label: "Class D - Bus" },
  { id: "be", label: "Class BE - Car with trailer" },
  { id: "a1", label: "Class A1 - Light motorcycle" },
  { id: "a2", label: "Class A2 - Medium motorcycle" },
]

const languages = [
  { id: "german", label: "German" },
  { id: "english", label: "English" },
  { id: "turkish", label: "Turkish" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "italian", label: "Italian" },
]

const steps = [
  { id: "basic", label: "Basic Info" },
  { id: "location", label: "Location" },
  { id: "owner", label: "Owner" },
  { id: "details", label: "Details" },
  { id: "services", label: "Services" },
  { id: "media", label: "Media" },
  { id: "review", label: "Review" },
]

interface FormData {
  // Basic Information
  name: string
  email: string
  phone: string
  website: string
  foundedYear: string
  status: string

  // Location
  address: string
  city: string
  postalCode: string

  // Owner Information
  ownerName: string
  ownerEmail: string
  ownerPhone: string

  // School Details
  description: string
  instructors: string
  vehicles: string

  // Services and pricing
  hasTheoryLessons: boolean
  hasPracticalLessons: boolean
  hasIntensiveCourses: boolean
  hasOnlineBooking: boolean
  hasEvening: boolean
  hasWeekend: boolean
  pricePerTheoryLesson: string
  pricePerDrivingLesson: string
  registrationFee: string

  // Media
  logo: File | null
  coverPhoto: File | null
  gallery: File[]
}

export default function AddSchoolPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [cityOpen, setCityOpen] = useState(false)
  const [cityValue, setCityValue] = useState("")
  const [selectedLicenseTypes, setSelectedLicenseTypes] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null)
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    name: "",
    email: "",
    phone: "",
    website: "",
    foundedYear: "",
    status: "pending",

    // Location
    address: "",
    city: "",
    postalCode: "",

    // Owner Information
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",

    // School Details
    description: "",
    instructors: "",
    vehicles: "",

    // Services and pricing
    hasTheoryLessons: false,
    hasPracticalLessons: false,
    hasIntensiveCourses: false,
    hasOnlineBooking: false,
    hasEvening: false,
    hasWeekend: false,
    pricePerTheoryLesson: "",
    pricePerDrivingLesson: "",
    registrationFee: "",

    // Media
    logo: null,
    coverPhoto: null,
    gallery: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleLicenseTypeToggle = (id) => {
    setSelectedLicenseTypes((current) =>
      current.includes(id) ? current.filter((type) => type !== id) : [...current, id],
    )
  }

  const handleLanguageToggle = (id) => {
    setSelectedLanguages((current) => (current.includes(id) ? current.filter((lang) => lang !== id) : [...current, id]))
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (type === "logo") {
        setLogoPreview(reader.result)
        setFormData((prev) => ({ ...prev, logo: file }))
      } else if (type === "coverPhoto") {
        setCoverPhotoPreview(reader.result)
        setFormData((prev) => ({ ...prev, coverPhoto: file }))
      } else if (type === "gallery") {
        setGalleryPreviews((prev) => [...prev, reader.result])
        setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, file] }))
      }
    }
    reader.readAsDataURL(file)
  }

  const removeGalleryImage = (index) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  const validateStep = () => {
    const newErrors = {}

    if (currentStep === 0) {
      // Validate Basic Info
      if (!formData.name.trim()) newErrors.name = "School name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    } else if (currentStep === 1) {
      // Validate Location
      if (!formData.address.trim()) newErrors.address = "Address is required"
      if (!formData.city) newErrors.city = "City is required"
      if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    } else if (currentStep === 2) {
      // Validate Owner
      if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required"
      if (!formData.ownerEmail.trim()) newErrors.ownerEmail = "Owner email is required"
      if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) newErrors.ownerEmail = "Owner email is invalid"
    } else if (currentStep === 3) {
      // Validate Details
      if (!formData.description.trim()) newErrors.description = "Description is required"
      if (selectedLicenseTypes.length === 0) newErrors.licenseTypes = "At least one license type is required"
    } else if (currentStep === 4) {
      // Validate Services
      if (!formData.registrationFee) newErrors.registrationFee = "Registration fee is required"
      if (!formData.pricePerTheoryLesson && formData.hasTheoryLessons)
        newErrors.pricePerTheoryLesson = "Price per theory lesson is required"
      if (!formData.pricePerDrivingLesson && formData.hasPracticalLessons)
        newErrors.pricePerDrivingLesson = "Price per driving lesson is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const goToStep = (index) => {
    // Only allow going to steps that have been completed or are next
    if (index <= currentStep + 1) {
      setCurrentStep(index)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep()) return

    setIsSubmitting(true)

    try {
      // In a real app, you would call an API to create the school
      console.log("Creating school:", {
        ...formData,
        licenseTypes: selectedLicenseTypes,
        languages: selectedLanguages,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to schools list
      router.push("/admin/schools")
    } catch (error) {
      console.error("Error creating school:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => goToStep(index)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                        index < currentStep
                          ? "bg-rose-500 text-white border-rose-500"
                          : index === currentStep
                            ? "border-rose-500 text-rose-500"
                            : "border-gray-300 text-gray-400",
                      )}
                      disabled={index > currentStep + 1}
                    >
                      {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{step.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span
                className={cn("text-xs mt-2 hidden md:block", index <= currentStep ? "text-rose-500" : "text-gray-400")}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute top-0 h-1 bg-rose-500 transition-all"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    )
  }

  const renderBasicInfoStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the basic details of the driving school</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                School Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter school name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                name="foundedYear"
                type="number"
                value={formData.foundedYear}
                onChange={handleChange}
                placeholder="e.g. 2010"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Enter website URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderLocationStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>Enter the location details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter street address"
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <Label>
                City <span className="text-red-500">*</span>
              </Label>
              <Popover open={cityOpen} onOpenChange={setCityOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityOpen}
                    className={cn("w-full justify-between", errors.city && "border-red-500")}
                  >
                    {cityValue ? cities.find((city) => city.value === cityValue)?.label : "Select city..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search city..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((city) => (
                          <CommandItem
                            key={city.value}
                            value={city.value}
                            onSelect={(currentValue) => {
                              setCityValue(currentValue)
                              handleSelectChange("city", city.label)
                              setCityOpen(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", cityValue === city.value ? "opacity-100" : "opacity-0")}
                            />
                            {city.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">
                Postal Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Enter postal code"
              />
              {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderOwnerStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Owner Information</CardTitle>
          <CardDescription>Enter details about the school owner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">
                Owner Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner's name"
              />
              {errors.ownerName && <p className="text-sm text-red-500">{errors.ownerName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">
                Owner Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ownerEmail"
                name="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={handleChange}
                placeholder="Enter owner's email"
              />
              {errors.ownerEmail && <p className="text-sm text-red-500">{errors.ownerEmail}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Owner Phone</Label>
              <Input
                id="ownerPhone"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleChange}
                placeholder="Enter owner's phone"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderDetailsStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>School Details</CardTitle>
          <CardDescription>Enter additional details about the driving school</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructors">Number of Instructors</Label>
              <Input
                id="instructors"
                name="instructors"
                type="number"
                value={formData.instructors}
                onChange={handleChange}
                placeholder="e.g. 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicles">Number of Vehicles</Label>
              <Input
                id="vehicles"
                name="vehicles"
                type="number"
                value={formData.vehicles}
                onChange={handleChange}
                placeholder="e.g. 8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a description of the driving school"
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label>
              License Types Offered <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {licenseTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`license-${type.id}`}
                    checked={selectedLicenseTypes.includes(type.id)}
                    onCheckedChange={() => handleLicenseTypeToggle(type.id)}
                  />
                  <Label htmlFor={`license-${type.id}`} className="font-normal">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.licenseTypes && <p className="text-sm text-red-500">{errors.licenseTypes}</p>}
          </div>

          <div className="space-y-2">
            <Label>Languages</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              {languages.map((language) => (
                <div key={language.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language.id}`}
                    checked={selectedLanguages.includes(language.id)}
                    onCheckedChange={() => handleLanguageToggle(language.id)}
                  />
                  <Label htmlFor={`language-${language.id}`} className="font-normal">
                    {language.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderServicesStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Services & Pricing</CardTitle>
          <CardDescription>Enter details about services and pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label>Services Offered</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTheoryLessons"
                    checked={formData.hasTheoryLessons}
                    onCheckedChange={() => handleCheckboxChange("hasTheoryLessons")}
                  />
                  <Label htmlFor="hasTheoryLessons" className="font-normal">
                    Theory Lessons
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPracticalLessons"
                    checked={formData.hasPracticalLessons}
                    onCheckedChange={() => handleCheckboxChange("hasPracticalLessons")}
                  />
                  <Label htmlFor="hasPracticalLessons" className="font-normal">
                    Practical Lessons
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasIntensiveCourses"
                    checked={formData.hasIntensiveCourses}
                    onCheckedChange={() => handleCheckboxChange("hasIntensiveCourses")}
                  />
                  <Label htmlFor="hasIntensiveCourses" className="font-normal">
                    Intensive Courses
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasOnlineBooking"
                    checked={formData.hasOnlineBooking}
                    onCheckedChange={() => handleCheckboxChange("hasOnlineBooking")}
                  />
                  <Label htmlFor="hasOnlineBooking" className="font-normal">
                    Online Booking
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Availability</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasEvening"
                    checked={formData.hasEvening}
                    onCheckedChange={() => handleCheckboxChange("hasEvening")}
                  />
                  <Label htmlFor="hasEvening" className="font-normal">
                    Evening Classes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasWeekend"
                    checked={formData.hasWeekend}
                    onCheckedChange={() => handleCheckboxChange("hasWeekend")}
                  />
                  <Label htmlFor="hasWeekend" className="font-normal">
                    Weekend Classes
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="registrationFee">
                Registration Fee (€) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="registrationFee"
                name="registrationFee"
                type="number"
                value={formData.registrationFee}
                onChange={handleChange}
                placeholder="e.g. 100"
              />
              {errors.registrationFee && <p className="text-sm text-red-500">{errors.registrationFee}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePerTheoryLesson">
                Price per Theory Lesson (€)
                {formData.hasTheoryLessons && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="pricePerTheoryLesson"
                name="pricePerTheoryLesson"
                type="number"
                value={formData.pricePerTheoryLesson}
                onChange={handleChange}
                placeholder="e.g. 15"
                disabled={!formData.hasTheoryLessons}
              />
              {errors.pricePerTheoryLesson && <p className="text-sm text-red-500">{errors.pricePerTheoryLesson}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricePerDrivingLesson">
                Price per Driving Lesson (€)
                {formData.hasPracticalLessons && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="pricePerDrivingLesson"
                name="pricePerDrivingLesson"
                type="number"
                value={formData.pricePerDrivingLesson}
                onChange={handleChange}
                placeholder="e.g. 45"
                disabled={!formData.hasPracticalLessons}
              />
              {errors.pricePerDrivingLesson && <p className="text-sm text-red-500">{errors.pricePerDrivingLesson}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderMediaStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
          <CardDescription>Upload images for the driving school</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>School Logo</Label>
            <div className="flex items-center gap-4">
              <div className="border rounded-md p-2 w-24 h-24 flex items-center justify-center bg-gray-50">
                {logoPreview ? (
                  <div className="relative w-full h-full">
                    <Image src={logoPreview || "/placeholder.svg"} alt="Logo preview" fill className="object-contain" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                      onClick={() => {
                        setLogoPreview(null)
                        setFormData((prev) => ({ ...prev, logo: null }))
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "logo")}
                  className="hidden"
                />
                <Label
                  htmlFor="logo"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                >
                  {logoPreview ? "Change Logo" : "Upload Logo"}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">Recommended size: 200x200px. Max file size: 2MB.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cover Photo</Label>
            <div className="flex flex-col gap-4">
              <div className="border rounded-md p-2 h-40 flex items-center justify-center bg-gray-50">
                {coverPhotoPreview ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={coverPhotoPreview || "/placeholder.svg"}
                      alt="Cover photo preview"
                      fill
                      className="object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                      onClick={() => {
                        setCoverPhotoPreview(null)
                        setFormData((prev) => ({ ...prev, coverPhoto: null }))
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                  </div>
                )}
              </div>
              <div>
                <Input
                  id="coverPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "coverPhoto")}
                  className="hidden"
                />
                <Label
                  htmlFor="coverPhoto"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                >
                  {coverPhotoPreview ? "Change Cover Photo" : "Upload Cover Photo"}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200x400px. Max file size: 5MB.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {galleryPreviews.map((preview, index) => (
                <div key={index} className="relative border rounded-md h-32 bg-gray-50">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600"
                    onClick={() => removeGalleryImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {galleryPreviews.length < 8 && (
                <div className="border rounded-md h-32 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Input
                      id="gallery"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "gallery")}
                      className="hidden"
                    />
                    <Label htmlFor="gallery" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-8 w-8 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add Image</span>
                    </Label>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Upload up to 8 images. Max file size: 5MB each.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderReviewStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review Information</CardTitle>
          <CardDescription>Review all information before submitting</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="owner">Owner</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">School Name</h3>
                  <p>{formData.name || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Founded Year</h3>
                  <p>{formData.foundedYear || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                  <p>{formData.email || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
                  <p>{formData.phone || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Website</h3>
                  <p>{formData.website || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                  <p className="capitalize">{formData.status || "Not provided"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h3 className="font-medium text-sm text-muted-foreground">Address</h3>
                  <p>{formData.address || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">City</h3>
                  <p>{formData.city || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Postal Code</h3>
                  <p>{formData.postalCode || "Not provided"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="owner" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Owner Name</h3>
                  <p>{formData.ownerName || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Owner Email</h3>
                  <p>{formData.ownerEmail || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Owner Phone</h3>
                  <p>{formData.ownerPhone || "Not provided"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                <p className="mt-1">{formData.description || "Not provided"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Number of Instructors</h3>
                  <p>{formData.instructors || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Number of Vehicles</h3>
                  <p>{formData.vehicles || "Not provided"}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-sm text-muted-foreground">License Types</h3>
                {selectedLicenseTypes.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedLicenseTypes.map((type) => (
                      <Badge key={type} variant="outline">
                        {licenseTypes.find((t) => t.id === type)?.label || type}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p>None selected</p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-sm text-muted-foreground">Languages</h3>
                {selectedLanguages.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedLanguages.map((lang) => (
                      <Badge key={lang} variant="outline">
                        {languages.find((l) => l.id === lang)?.label || lang}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p>None selected</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Services</h3>
                  <ul className="mt-1 space-y-1">
                    <li className="flex items-center">
                      {formData.hasTheoryLessons ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      Theory Lessons
                    </li>
                    <li className="flex items-center">
                      {formData.hasPracticalLessons ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      Practical Lessons
                    </li>
                    <li className="flex items-center">
                      {formData.hasIntensiveCourses ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      Intensive Courses
                    </li>
                    <li className="flex items-center">
                      {formData.hasOnlineBooking ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      Online Booking
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Availability</h3>
                  <ul className="mt-1 space-y-1">
                    <li className="flex items-center">
                      {formData.hasEvening ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      Evening Classes
                    </li>
                    <li className="flex items-center">
                      {formData.hasWeekend ? (
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 mr-2 text-red-500" />
                      )}
                      Weekend Classes
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Registration Fee</h3>
                  <p>{formData.registrationFee ? `€${formData.registrationFee}` : "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Price per Theory Lesson</h3>
                  <p>{formData.pricePerTheoryLesson ? `€${formData.pricePerTheoryLesson}` : "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Price per Driving Lesson</h3>
                  <p>{formData.pricePerDrivingLesson ? `€${formData.pricePerDrivingLesson}` : "Not provided"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Logo</h3>
                  {logoPreview ? (
                    <div className="border rounded-md p-2 w-32 h-32 flex items-center justify-center bg-gray-50">
                      <Image
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <p>No logo uploaded</p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-2">Cover Photo</h3>
                  {coverPhotoPreview ? (
                    <div className="border rounded-md p-2 h-40 w-full">
                      <Image
                        src={coverPhotoPreview || "/placeholder.svg"}
                        alt="Cover photo preview"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <p>No cover photo uploaded</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Gallery Images</h3>
                {galleryPreviews.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative border rounded-md h-24 bg-gray-50">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No gallery images uploaded</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfoStep()
      case 1:
        return renderLocationStep()
      case 2:
        return renderOwnerStep()
      case 3:
        return renderDetailsStep()
      case 4:
        return renderServicesStep()
      case 5:
        return renderMediaStep()
      case 6:
        return renderReviewStep()
      default:
        return null
    }
  }

  return (
    <AdminDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Driving School</h1>
        <p className="text-muted-foreground">Create a new driving school in the system</p>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepIndicator()}

        {renderCurrentStep()}

        <div className="mt-6 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 0 ? () => router.push("/admin/schools") : prevStep}
          >
            {currentStep === 0 ? "Cancel" : "Previous"}
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button type="button" className="bg-rose-500 hover:bg-rose-600" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create School"}
            </Button>
          )}
        </div>
      </form>
    </AdminDashboardLayout>
  )
}
