"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Upload, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SchoolDashboardLayout from "@/components/school-dashboard-layout";

export default function SchoolProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState({ logo: null, businessLicense: null, photos: [] });
  const [schoolData, setSchoolData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
    foundedYear: "",
    city: "",
    address: "",
    postalCode: "",
    state: "",
    website: "",
    description: "",
    services: {
      carLicense: false,
      motorcycleLicense: false,
      truckLicense: false,
      busLicense: false,
      mopedLicense: false,
      trailerLicense: false,
      refresherCourses: false,
      intensiveCourses: false,
      foreignLanguageSupport: false,
      anxietySupport: false,
      automaticTransmission: false,
      onlineTheory: false,
    },
    prices: {
      registrationFee: 0,
      theoryLesson: 0,
      drivingLesson: 0,
      examFee: 0,
      theoryExam: 0,
      nightDriving: 0,
      highwayDriving: 0,
    },
    instructors: 0,
    vehicles: 0,
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "14:00", closed: false },
      sunday: { open: "10:00", close: "14:00", closed: true },
    },
    logo: null,
    businessLicense: null,
    photos: [],
    certify: false,
  });
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) {
      router.push("/school/login");
      return;
    }

    const fetchSchoolProfile = async () => {
      try {
        const response = await axios.get("https://backend-ds-blue.vercel.app/api/school/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setSchoolData((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          name: data.name || "",
          foundedYear: data.foundedYear || "",
          city: data.city || "",
          address: data.address || "",
          postalCode: data.postalCode || "",
          state: data.state || "",
          website: data.website || "",
          description: data.description || "",
          instructors: data.instructors || 0,
          vehicles: data.vehicles || 0,
          logo: data.logo || null,
          photos: data.photos || [],
          services: data.services || prev.services,
          prices: data.prices || prev.prices,
          openingHours: data.openingHours || prev.openingHours,
        }));
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          router.push("/school/login");
        } else {
          setError("Failed to load profile data");
          setLoading(false);
        }
      }
    };
    fetchSchoolProfile();
  }, [token, router]);

  const handleInputChange = (section, field, value) => {
    setSchoolData((prev) => ({
      ...prev,
      [section ? section : field]: section
        ? { ...prev[section], [field]: value }
        : value,
    }));
  };

  const handleServiceChange = (service, checked) => {
    setSchoolData((prev) => ({
      ...prev,
      services: { ...prev.services, [service]: checked },
    }));
  };

  const handleFileChange = (field, e) => {
    const selectedFiles = e.target.files;
    if (field === "photos") {
      setFiles((prev) => ({ ...prev, photos: Array.from(selectedFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [field]: selectedFiles[0] }));
    }
  };


const handleSave = async () => {
  if (!token) {
    setError("No authentication token found. Please log in again.");
    router.push("/school/login");
    return;
  }

  setIsSaving(true);
  setSaveSuccess(false);
  setError("");

  try {
    const formData = new FormData();

    // Log schoolData for debugging
    console.log("schoolData before FormData:", schoolData);

    const response = await axios.put("https://backend-ds-blue.vercel.app/api/school/profile", schoolData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Update response:", response.data);
    setSchoolData(response.data.school);
    setFiles({ logo: null, businessLicense: null, photos: [] });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to update profile");
    console.error("Save error:", err.response?.data || err.message);
  } finally {
    setIsSaving(false);
  }
};


  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const steps = [
    { number: 1, title: "Account Information" },
    { number: 2, title: "School Details" },
    { number: 3, title: "Services & Pricing" },
    { number: 4, title: "Opening Hours" },
    { number: 5, title: "Verification & Media" },
  ];

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <SchoolDashboardLayout>
      <div className="flex flex-col min-h-screen bg-muted/30">
        <main className="flex-1 py-12 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                href="/school/dashboard"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-rose-500 text-white rounded-t-lg">
                  <CardTitle className="text-2xl">Update School Profile</CardTitle>
                  <CardDescription className="text-rose-100">
                    Manage and update your driving school profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {saveSuccess ? (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-center px-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Profile Updated!</h2>
                      <p className="text-muted-foreground mb-8 max-w-md">
                        Your driving school profile has been updated successfully.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600" onClick={prevStep}>
                          Continue Editing
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div>
                      {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-md m-6 text-sm border border-red-200">
                          {error}
                        </div>
                      )}
                      <div className="p-6 border-b">
                        <div className="flex justify-between items-center">
                          {steps.map((s) => (
                            <div key={s.number} className="flex flex-col items-center">
                              <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                  s.number === step
                                    ? "bg-rose-500 text-white"
                                    : s.number < step
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {s.number < step ? <CheckCircle className="h-5 w-5" /> : s.number}
                              </div>
                              <span
                                className={`text-xs mt-2 hidden sm:block ${
                                  s.number === step ? "text-rose-500 font-medium" : "text-muted-foreground"
                                }`}
                              >
                                {s.title}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full mt-4">
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-rose-500 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="p-6">
                        {step === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                              <p className="text-muted-foreground mb-6">
                                Update your account details
                              </p>
                            </div>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input
                                    id="firstName"
                                    value={schoolData.firstName}
                                    onChange={(e) => handleInputChange(null, "firstName", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="lastName">Last Name</Label>
                                  <Input
                                    id="lastName"
                                    value={schoolData.lastName}
                                    onChange={(e) => handleInputChange(null, "lastName", e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={schoolData.email}
                                  onChange={(e) => handleInputChange(null, "email", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  value={schoolData.phone}
                                  onChange={(e) => handleInputChange(null, "phone", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                  id="password"
                                  type="password"
                                  placeholder="Update password"
                                  value={schoolData.password}
                                  onChange={(e) => handleInputChange(null, "password", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                  id="confirmPassword"
                                  type="password"
                                  placeholder="Confirm new password"
                                  value={schoolData.confirmPassword}
                                  onChange={(e) => handleInputChange(null, "confirmPassword", e.target.value)}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-xl font-semibold mb-4">School Details</h2>
                              <p className="text-muted-foreground mb-6">
                                Update your driving school information
                              </p>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">School Name</Label>
                                <Input
                                  id="name"
                                  value={schoolData.name}
                                  onChange={(e) => handleInputChange(null, "name", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="foundedYear">Year Founded</Label>
                                <Input
                                  id="foundedYear"
                                  value={schoolData.foundedYear}
                                  onChange={(e) => handleInputChange(null, "foundedYear", e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="instructors">Number of Instructors</Label>
                                  <Input
                                    id="instructors"
                                    type="number"
                                    value={schoolData.instructors}
                                    onChange={(e) => handleInputChange(null, "instructors", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="vehicles">Number of Vehicles</Label>
                                  <Input
                                    id="vehicles"
                                    type="number"
                                    value={schoolData.vehicles}
                                    onChange={(e) => handleInputChange(null, "vehicles", e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Select
                                  value={schoolData.city}
                                  onValueChange={(value) => handleInputChange(null, "city", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a city" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="berlin">Berlin</SelectItem>
                                    <SelectItem value="munich">Munich</SelectItem>
                                    <SelectItem value="hamburg">Hamburg</SelectItem>
                                    <SelectItem value="cologne">Cologne</SelectItem>
                                    <SelectItem value="frankfurt">Frankfurt</SelectItem>
                                    <SelectItem value="stuttgart">Stuttgart</SelectItem>
                                    <SelectItem value="dusseldorf">Düsseldorf</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="address">Street Address</Label>
                                <Input
                                  id="address"
                                  value={schoolData.address}
                                  onChange={(e) => handleInputChange(null, "address", e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="postalCode">Postal Code</Label>
                                  <Input
                                    id="postalCode"
                                    value={schoolData.postalCode}
                                    onChange={(e) => handleInputChange(null, "postalCode", e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="state">State</Label>
                                  <Select
                                    value={schoolData.state}
                                    onValueChange={(value) => handleInputChange(null, "state", value)}
                                  >
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
                              <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input
                                  id="website"
                                  value={schoolData.website}
                                  onChange={(e) => handleInputChange(null, "website", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="description">School Description</Label>
                                <Textarea
                                  id="description"
                                  className="min-h-[120px]"
                                  value={schoolData.description}
                                  onChange={(e) => handleInputChange(null, "description", e.target.value)}
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-xl font-semibold mb-4">Services & Pricing</h2>
                              <p className="text-muted-foreground mb-6">
                                Update the services you offer and their pricing
                              </p>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>License Types Offered</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(schoolData.services)
                                    .slice(0, 6)
                                    .map(([service, value]) => (
                                      <div key={service} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={service}
                                          checked={value}
                                          onCheckedChange={(checked) => handleServiceChange(service, checked)}
                                        />
                                        <Label htmlFor={service} className="font-normal capitalize">
                                          {service.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                        </Label>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Additional Services</Label>
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(schoolData.services)
                                    .slice(6)
                                    .map(([service, value]) => (
                                      <div key={service} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={service}
                                          checked={value}
                                          onCheckedChange={(checked) => handleServiceChange(service, checked)}
                                        />
                                        <Label htmlFor={service} className="font-normal capitalize">
                                          {service.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                        </Label>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div className="pt-4 border-t">
                                <h3 className="font-medium mb-4">Basic Pricing Information</h3>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="registrationFee">Registration Fee (€)</Label>
                                      <Input
                                        id="registrationFee"
                                        type="number"
                                        value={schoolData.prices.registrationFee}
                                        onChange={(e) =>
                                          handleInputChange("prices", "registrationFee", e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="theoryLesson">Theory Lesson (€)</Label>
                                      <Input
                                        id="theoryLesson"
                                        type="number"
                                        value={schoolData.prices.theoryLesson}
                                        onChange={(e) =>
                                          handleInputChange("prices", "theoryLesson", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="drivingLesson">Driving Lesson (€)</Label>
                                      <Input
                                        id="drivingLesson"
                                        type="number"
                                        value={schoolData.prices.drivingLesson}
                                        onChange={(e) =>
                                          handleInputChange("prices", "drivingLesson", e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="examFee">Practical Exam Fee (€)</Label>
                                      <Input
                                        id="examFee"
                                        type="number"
                                        value={schoolData.prices.examFee}
                                        onChange={(e) => handleInputChange("prices", "examFee", e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="nightDriving">Night Driving Lesson (€)</Label>
                                      <Input
                                        id="nightDriving"
                                        type="number"
                                        value={schoolData.prices.nightDriving}
                                        onChange={(e) =>
                                          handleInputChange("prices", "nightDriving", e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="highwayDriving">Highway Driving Lesson (€)</Label>
                                      <Input
                                        id="highwayDriving"
                                        type="number"
                                        value={schoolData.prices.highwayDriving}
                                        onChange={(e) =>
                                          handleInputChange("prices", "highwayDriving", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="theoryExam">Theory Exam Fee (€)</Label>
                                    <Input
                                      id="theoryExam"
                                      type="number"
                                      value={schoolData.prices.theoryExam}
                                      onChange={(e) =>
                                        handleInputChange("prices", "theoryExam", e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {step === 4 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                              <p className="text-muted-foreground mb-6">Update your operating hours</p>
                            </div>
                            <div className="space-y-4">
                              {Object.entries(schoolData.openingHours).map(([day, hours]) => (
                                <div key={day} className="flex items-center justify-between border-b pb-4 last:border-0">
                                  <div className="w-1/4">
                                    <Label className="font-medium capitalize">{day}</Label>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                      <Checkbox
                                        id={`${day}-open`}
                                        checked={!hours.closed}
                                        onCheckedChange={(checked) =>
                                          handleInputChange("openingHours", day, {
                                            ...hours,
                                            closed: !checked,
                                          })
                                        }
                                      />
                                      <Label htmlFor={`${day}-open`} className="ml-2">
                                        {hours.closed ? "Closed" : "Open"}
                                      </Label>
                                    </div>
                                    {!hours.closed && (
                                      <div className="flex items-center gap-2">
                                        <Input
                                          type="time"
                                          value={hours.open}
                                          onChange={(e) =>
                                            handleInputChange("openingHours", day, {
                                              ...hours,
                                              open: e.target.value,
                                            })
                                          }
                                          className="w-32"
                                        />
                                        <span>to</span>
                                        <Input
                                          type="time"
                                          value={hours.close}
                                          onChange={(e) =>
                                            handleInputChange("openingHours", day, {
                                              ...hours,
                                              close: e.target.value,
                                            })
                                          }
                                          className="w-32"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {step === 5 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div>
                              <h2 className="text-xl font-semibold mb-4">Verification & Media</h2>
                              <p className="text-muted-foreground mb-6">
                                Update documents to verify your business and media to showcase your school
                              </p>
                            </div>
                            <div className="space-y-6">
                              <div className="space-y-2">
                                <Label htmlFor="logo">School Logo</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                  {schoolData.logo ? (
                                    <Image
                                      src={`http://localhost:5000${schoolData.logo}`}
                                      alt="School logo"
                                      width={96}
                                      height={96}
                                      className="object-cover mb-2"
                                    />
                                  ) : files.logo ? (
                                    <Image
                                      src={URL.createObjectURL(files.logo)}
                                      alt="New logo preview"
                                      width={96}
                                      height={96}
                                      className="object-cover mb-2"
                                    />
                                  ) : (
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                  )}
                                  <p className="text-sm text-muted-foreground mb-1">Drag and drop your logo here or</p>
                                  <p className="text-xs text-muted-foreground mb-4">PNG, JPG or SVG (max. 2MB)</p>
                                  <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange("logo", e)}
                                    className="hidden"
                                  />
                                  <label htmlFor="logo">
                                    <Button variant="outline" size="sm" type="button">
                                      Select File
                                    </Button>
                                  </label>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="businessLicense">Business License or Registration</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                  {schoolData.businessLicense ? (
                                    <p className="text-sm text-muted-foreground mb-2">File uploaded</p>
                                  ) : files.businessLicense ? (
                                    <p className="text-sm text-muted-foreground mb-2">New file selected</p>
                                  ) : (
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                  )}
                                  <p className="text-sm text-muted-foreground mb-1">
                                    Upload your business license or registration document
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-4">PDF, JPG or PNG (max. 5MB)</p>
                                  <Input
                                    id="businessLicense"
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => handleFileChange("businessLicense", e)}
                                    className="hidden"
                                  />
                                  <label htmlFor="businessLicense">
                                    <Button variant="outline" size="sm" type="button">
                                      Select File
                                    </Button>
                                  </label>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  This document will not be publicly visible
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="photos">School Photos (Optional)</Label>
                                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    {schoolData.photos?.map((photo, index) => (
                                      <div key={index} className="relative group">
                                        <Image
                                          src={`http://localhost:5000${photo}`}
                                          alt={`School photo ${index + 1}`}
                                          width={200}
                                          height={200}
                                          className="object-cover"
                                        />
                                      </div>
                                    ))}
                                    {files.photos.map((file, index) => (
                                      <div key={`new-${index}`} className="relative group">
                                        <Image
                                          src={URL.createObjectURL(file)}
                                          alt={`New photo ${index + 1}`}
                                          width={200}
                                          height={200}
                                          className="object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground mb-1">
                                    Add photos of your facilities, vehicles, or instructors
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-4">
                                    JPG or PNG (max. 10 photos, 5MB each)
                                  </p>
                                  <Input
                                    id="photos"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleFileChange("photos", e)}
                                    className="hidden"
                                  />
                                  <label htmlFor="photos">
                                    <Button variant="outline" size="sm" type="button">
                                      Select Files
                                    </Button>
                                  </label>
                                </div>
                              </div>
                              <div className="flex items-start space-x-2">
                                <Checkbox
                                  id="certify"
                                  checked={schoolData.certify}
                                  onCheckedChange={(checked) => handleInputChange(null, "certify", checked)}
                                />
                                <Label htmlFor="certify" className="font-normal text-sm leading-tight">
                                  I certify that all information provided is accurate and complete.
                                </Label>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div className="flex justify-between mt-8">
                          {step > 1 ? (
                            <Button type="button" variant="outline" onClick={prevStep}>
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous
                            </Button>
                          ) : (
                            <div></div>
                          )}
                          {step < steps.length ? (
                            <Button type="button" onClick={nextStep} className="bg-rose-500 hover:bg-rose-600">
                              Next
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            <Button type="submit" disabled={isSaving} className="bg-rose-500 hover:bg-rose-600">
                              {isSaving ? "Saving..." : "Save Changes"}
                              <Save className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </SchoolDashboardLayout>
  );
}