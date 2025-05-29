"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Upload, Trash2, CheckCircle } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SchoolDashboardLayout from "@/components/school-dashboard-layout"

export default function SchoolSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [school, setSchool] = useState({
    name: "Fahrschule Mustermann",
    email: "info@mustermann-fahrschule.de",
    phone: "+49 123 456789",
    address: "Musterstraße 123",
    city: "Berlin",
    postalCode: "10115",
    state: "Berlin",
    website: "https://mustermann-fahrschule.de",
    description:
      "We are a professional driving school with over 20 years of experience. Our qualified instructors provide high-quality training for all license types.",
    foundedYear: "2002",
    instructors: 8,
    vehicles: 12,
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "20:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "14:00", closed: false },
      sunday: { open: "10:00", close: "14:00", closed: true },
    },
    services: {
      carLicense: true,
      motorcycleLicense: true,
      truckLicense: false,
      automaticTransmission: true,
      intensiveCourse: true,
      refresherCourse: true,
      anxietySupport: true,
      foreignLanguages: true,
      onlineTheory: true,
    },
    notifications: {
      email: true,
      sms: false,
      newInquiries: true,
      marketingUpdates: false,
      platformUpdates: true,
    },
    visibility: {
      showPricing: true,
      showReviews: true,
      showInstructors: true,
      showVehicles: true,
      featuredOnHomepage: false,
    },
    password: {
      current: "",
      new: "",
      confirm: "",
    },
  })

  const handleSchoolChange = (field, value) => {
    setSchool({
      ...school,
      [field]: value,
    })
  }

  const handleServiceChange = (service, value) => {
    setSchool({
      ...school,
      services: {
        ...school.services,
        [service]: value,
      },
    })
  }

  const handleNotificationChange = (notification, value) => {
    setSchool({
      ...school,
      notifications: {
        ...school.notifications,
        [notification]: value,
      },
    })
  }

  const handleVisibilityChange = (setting, value) => {
    setSchool({
      ...school,
      visibility: {
        ...school.visibility,
        [setting]: value,
      },
    })
  }

  const handleOpeningHoursChange = (day, field, value) => {
    setSchool({
      ...school,
      openingHours: {
        ...school.openingHours,
        [day]: {
          ...school.openingHours[day],
          [field]: field === "closed" ? value : value,
        },
      },
    })
  }

  const handlePasswordChange = (field, value) => {
    setSchool({
      ...school,
      password: {
        ...school.password,
        [field]: value,
      },
    })
  }

  const handleSave = () => {
    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <SchoolDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <Button onClick={handleSave} disabled={isSaving} className="bg-rose-500 hover:bg-rose-600">
          {isSaving ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 text-green-600 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your settings have been saved successfully.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="hours">Opening Hours</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
              <CardDescription>Update your driving school's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">School Name</Label>
                  <Input id="name" value={school.name} onChange={(e) => handleSchoolChange("name", e.target.value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={school.email}
                      onChange={(e) => handleSchoolChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={school.phone}
                      onChange={(e) => handleSchoolChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={school.address}
                    onChange={(e) => handleSchoolChange("address", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={school.city} onChange={(e) => handleSchoolChange("city", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={school.postalCode}
                      onChange={(e) => handleSchoolChange("postalCode", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={school.state} onValueChange={(value) => handleSchoolChange("state", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="berlin">Berlin</SelectItem>
                        <SelectItem value="bavaria">Bavaria</SelectItem>
                        <SelectItem value="hamburg">Hamburg</SelectItem>
                        <SelectItem value="nrw">North Rhine-Westphalia</SelectItem>
                        <SelectItem value="hesse">Hesse</SelectItem>
                        <SelectItem value="bw">Baden-Württemberg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={school.website}
                      onChange={(e) => handleSchoolChange("website", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Year Founded</Label>
                    <Input
                      id="foundedYear"
                      value={school.foundedYear}
                      onChange={(e) => handleSchoolChange("foundedYear", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructors">Number of Instructors</Label>
                    <Input
                      id="instructors"
                      type="number"
                      value={school.instructors}
                      onChange={(e) => handleSchoolChange("instructors", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicles">Number of Vehicles</Label>
                    <Input
                      id="vehicles"
                      type="number"
                      value={school.vehicles}
                      onChange={(e) => handleSchoolChange("vehicles", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className="min-h-[120px]"
                    value={school.description}
                    onChange={(e) => handleSchoolChange("description", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>School Media</CardTitle>
              <CardDescription>Upload your school logo and photos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">School Logo</h3>
                  <div className="flex items-center gap-6">
                    <div className="border rounded-md overflow-hidden w-24 h-24 flex items-center justify-center bg-muted">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt="School logo"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" type="button" className="flex items-center">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Logo
                      </Button>
                      <p className="text-xs text-muted-foreground">Recommended size: 400x400px. Max file size: 2MB.</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">School Photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="relative group">
                        <div className="border rounded-md overflow-hidden aspect-square flex items-center justify-center bg-muted">
                          <Image
                            src={`/placeholder.svg?height=200&width=200&text=Photo ${index}`}
                            alt={`School photo ${index}`}
                            width={200}
                            height={200}
                            className="object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" type="button" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Add More Photos
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    You can upload up to 10 photos. Recommended size: 1200x800px. Max file size: 5MB per photo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>Select the services your driving school offers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="carLicense" className="font-medium">
                      Car License (B)
                    </Label>
                    <p className="text-sm text-muted-foreground">Standard car driving license</p>
                  </div>
                  <Switch
                    id="carLicense"
                    checked={school.services.carLicense}
                    onCheckedChange={(checked) => handleServiceChange("carLicense", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="motorcycleLicense" className="font-medium">
                      Motorcycle License (A)
                    </Label>
                    <p className="text-sm text-muted-foreground">Motorcycle driving license</p>
                  </div>
                  <Switch
                    id="motorcycleLicense"
                    checked={school.services.motorcycleLicense}
                    onCheckedChange={(checked) => handleServiceChange("motorcycleLicense", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="truckLicense" className="font-medium">
                      Truck License (C)
                    </Label>
                    <p className="text-sm text-muted-foreground">Commercial truck driving license</p>
                  </div>
                  <Switch
                    id="truckLicense"
                    checked={school.services.truckLicense}
                    onCheckedChange={(checked) => handleServiceChange("truckLicense", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="automaticTransmission" className="font-medium">
                      Automatic Transmission
                    </Label>
                    <p className="text-sm text-muted-foreground">Lessons with automatic transmission vehicles</p>
                  </div>
                  <Switch
                    id="automaticTransmission"
                    checked={school.services.automaticTransmission}
                    onCheckedChange={(checked) => handleServiceChange("automaticTransmission", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="intensiveCourse" className="font-medium">
                      Intensive Course
                    </Label>
                    <p className="text-sm text-muted-foreground">Accelerated learning program</p>
                  </div>
                  <Switch
                    id="intensiveCourse"
                    checked={school.services.intensiveCourse}
                    onCheckedChange={(checked) => handleServiceChange("intensiveCourse", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="refresherCourse" className="font-medium">
                      Refresher Course
                    </Label>
                    <p className="text-sm text-muted-foreground">For people who already have a license</p>
                  </div>
                  <Switch
                    id="refresherCourse"
                    checked={school.services.refresherCourse}
                    onCheckedChange={(checked) => handleServiceChange("refresherCourse", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="anxietySupport" className="font-medium">
                      Anxiety Support
                    </Label>
                    <p className="text-sm text-muted-foreground">Special support for anxious learners</p>
                  </div>
                  <Switch
                    id="anxietySupport"
                    checked={school.services.anxietySupport}
                    onCheckedChange={(checked) => handleServiceChange("anxietySupport", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="foreignLanguages" className="font-medium">
                      Foreign Language Support
                    </Label>
                    <p className="text-sm text-muted-foreground">Lessons available in other languages</p>
                  </div>
                  <Switch
                    id="foreignLanguages"
                    checked={school.services.foreignLanguages}
                    onCheckedChange={(checked) => handleServiceChange("foreignLanguages", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border rounded-md p-4">
                  <div>
                    <Label htmlFor="onlineTheory" className="font-medium">
                      Online Theory Lessons
                    </Label>
                    <p className="text-sm text-muted-foreground">Digital theory lessons and materials</p>
                  </div>
                  <Switch
                    id="onlineTheory"
                    checked={school.services.onlineTheory}
                    onCheckedChange={(checked) => handleServiceChange("onlineTheory", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Opening Hours</CardTitle>
              <CardDescription>Set your driving school's operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(school.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="w-1/4">
                      <Label className="font-medium capitalize">{day}</Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Switch
                          id={`${day}-closed`}
                          checked={!hours.closed}
                          onCheckedChange={(checked) => handleOpeningHoursChange(day, "closed", !checked)}
                        />
                        <Label htmlFor={`${day}-closed`} className="ml-2">
                          {hours.closed ? "Closed" : "Open"}
                        </Label>
                      </div>
                      {!hours.closed && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={hours.open}
                            onChange={(e) => handleOpeningHoursChange(day, "open", e.target.value)}
                            className="w-32"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={hours.close}
                            onChange={(e) => handleOpeningHoursChange(day, "close", e.target.value)}
                            className="w-32"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Visibility</CardTitle>
              <CardDescription>Control what information is visible on your public profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Label htmlFor="showPricing" className="font-medium">
                      Show Pricing Information
                    </Label>
                    <p className="text-sm text-muted-foreground">Display your pricing details on your profile</p>
                  </div>
                  <Switch
                    id="showPricing"
                    checked={school.visibility.showPricing}
                    onCheckedChange={(checked) => handleVisibilityChange("showPricing", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Label htmlFor="showReviews" className="font-medium">
                      Show Student Reviews
                    </Label>
                    <p className="text-sm text-muted-foreground">Display reviews from your students</p>
                  </div>
                  <Switch
                    id="showReviews"
                    checked={school.visibility.showReviews}
                    onCheckedChange={(checked) => handleVisibilityChange("showReviews", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Label htmlFor="showInstructors" className="font-medium">
                      Show Instructors
                    </Label>
                    <p className="text-sm text-muted-foreground">Display information about your instructors</p>
                  </div>
                  <Switch
                    id="showInstructors"
                    checked={school.visibility.showInstructors}
                    onCheckedChange={(checked) => handleVisibilityChange("showInstructors", checked)}
                  />
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Label htmlFor="showVehicles" className="font-medium">
                      Show Vehicles
                    </Label>
                    <p className="text-sm text-muted-foreground">Display information about your training vehicles</p>
                  </div>
                  <Switch
                    id="showVehicles"
                    checked={school.visibility.showVehicles}
                    onCheckedChange={(checked) => handleVisibilityChange("showVehicles", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featuredOnHomepage" className="font-medium">
                      Featured on Homepage
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Request to be featured on the Fahrschulfinder homepage (subject to approval)
                    </p>
                  </div>
                  <Switch
                    id="featuredOnHomepage"
                    checked={school.visibility.featuredOnHomepage}
                    onCheckedChange={(checked) => handleVisibilityChange("featuredOnHomepage", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={school.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="font-medium">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={school.notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <Label htmlFor="newInquiries" className="font-medium">
                        New Inquiries
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you receive new student inquiries
                      </p>
                    </div>
                    <Switch
                      id="newInquiries"
                      checked={school.notifications.newInquiries}
                      onCheckedChange={(checked) => handleNotificationChange("newInquiries", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <Label htmlFor="marketingUpdates" className="font-medium">
                        Marketing Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive marketing tips and promotional opportunities
                      </p>
                    </div>
                    <Switch
                      id="marketingUpdates"
                      checked={school.notifications.marketingUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("marketingUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="platformUpdates" className="font-medium">
                        Platform Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new features and platform changes
                      </p>
                    </div>
                    <Switch
                      id="platformUpdates"
                      checked={school.notifications.platformUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("platformUpdates", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={school.password.current}
                    onChange={(e) => handlePasswordChange("current", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={school.password.new}
                    onChange={(e) => handlePasswordChange("new", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={school.password.confirm}
                    onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                  />
                </div>

                <Button className="mt-2 bg-rose-500 hover:bg-rose-600">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Label htmlFor="twoFactorAuth" className="font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Set Up</Button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <Label className="font-medium">Active Sessions</Label>
                    <p className="text-sm text-muted-foreground">Manage devices that are currently logged in</p>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium text-red-500">Delete Account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SchoolDashboardLayout>
  )
}
