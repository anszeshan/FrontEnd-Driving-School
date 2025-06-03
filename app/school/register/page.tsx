"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SchoolRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState("")
  const [files, setFiles] = useState({ logo: null, businessLicense: null, photos: [] })

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
      carLicense: true,
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
      registrationFee: 100,
      theoryLesson: 15,
      drivingLesson: 50,
      examFee: 150,
      theoryExam: 80,
      nightDriving: 55,
      highwayDriving: 55,
    },
    instructors: 1,
    vehicles: 1,
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
    termsAgreed: false,
    certify: false,
  })

  const handleInputChange = (section, field, value) => {
    if (section) {
      setSchoolData({
        ...schoolData,
        [section]: {
          ...schoolData[section],
          [field]: value,
        },
      })
    } else {
      setSchoolData({
        ...schoolData,
        [field]: value,
      })
    }
  }

  const handleServiceChange = (service, checked) => {
    setSchoolData({
      ...schoolData,
      services: {
        ...schoolData.services,
        [service]: checked,
      },
    })
  }

  const handleFileChange = (field, e) => {
    console.log('Feld:', field, 'Dateien:', e.target.files);
    const selectedFiles = e.target.files;
    const maxSize = field === 'businessLicense' ? 5 * 1024 * 1024 : 2 * 1024 * 1024; // 5MB oder 2MB
    const validTypes = {
      logo: ['image/png', 'image/jpeg', 'image/svg+xml'],
      businessLicense: ['image/png', 'image/jpeg', 'application/pdf'],
      photos: ['image/png', 'image/jpeg'],
    };
  
    if (field === 'photos') {
      const photos = Array.from(selectedFiles);
      if (photos.length > 5) {
        alert('Maximal 5 Fotos erlaubt');
        return;
      }
      for (let file of photos) {
        if (file.size > maxSize) {
          alert(`Datei ${file.name} überschreitet die 2MB-Grenze`);
          return;
        }
        if (!validTypes.photos.includes(file.type)) {
          alert(`Datei ${file.name} hat keinen gültigen Typ (JPG/PNG)`);
          return;
        }
      }
      setFiles({ ...files, photos });
    } else {
      const file = selectedFiles[0];
      if (!file) return;
      if (file.size > maxSize) {
        alert(`Datei ${file.name} überschreitet die Größenbeschränkung`);
        return;
      }
      if (!validTypes[field].includes(file.type)) {
        alert(`Datei ${file.name} hat keinen gültigen Typ`);
        return;
      }
      setFiles({ ...files, [field]: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const formData = new FormData();
      
      // Alle Fahrschuldaten hinzufügen
      Object.keys(schoolData).forEach(key => {
        if (key === 'services' || key === 'prices' || key === 'openingHours') {
          formData.append(key, JSON.stringify(schoolData[key]));
        } else if (key !== 'logo' && key !== 'businessLicense' && key !== 'photos') {
          formData.append(key, schoolData[key]);
        }
      });

      // Dateien hinzufügen
      if (files.logo) formData.append('logo', files.logo);
      if (files.businessLicense) formData.append('businessLicense', files.businessLicense);
      files.photos.forEach(photo => formData.append('photos', photo));

      const response = await fetch('https://backend-ds-blue.vercel.app/api/school/register', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Registrierung fehlgeschlagen')
      }

      setIsComplete(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const steps = [
    { number: 1, title: "Kontoinformationen" },
    { number: 2, title: "Fahrschuldetails" },
    { number: 3, title: "Dienstleistungen & Preise" },
    { number: 4, title: "Öffnungszeiten" },
    { number: 5, title: "Verifizierung" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Zurück zur Startseite
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-rose-500 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Fahrschulregistrierung</CardTitle>
                <CardDescription className="text-rose-100">
                  Registrieren Sie Ihre Fahrschule, um auf Fahrschulfinder gelistet zu werden
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {isComplete ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center px-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Registrierung abgeschlossen!</h2>
                    <p className="text-muted-foreground mb-8 max-w-md">
                      Ihre Fahrschule wurde erfolgreich registriert. Sie können sich jetzt anmelden, um Ihr Profil und Ihre Preise zu verwalten.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/school/login">
                        <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                          Zur Anmeldung
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button size="lg" variant="outline">
                          Zurück zur Startseite
                        </Button>
                      </Link>
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

                    <form onSubmit={handleSubmit} className="p-6">
                      {step === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div>
                            <h2 className="text-xl font-semibold mb-4">Kontoinformationen</h2>
                            <p className="text-muted-foreground mb-6">
                              Erstellen Sie Ihr Konto, um Ihre Fahrschulliste zu verwalten
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">Vorname</Label>
                                <Input
                                  id="firstName"
                                  placeholder="John"
                                  value={schoolData.firstName}
                                  onChange={(e) => handleInputChange(null, "firstName", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Nachname</Label>
                                <Input
                                  id="lastName"
                                  placeholder="Doe"
                                  value={schoolData.lastName}
                                  onChange={(e) => handleInputChange(null, "lastName", e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">E-Mail-Adresse</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={schoolData.email}
                                onChange={(e) => handleInputChange(null, "email", e.target.value)}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Wir senden einen Verifizierungslink an diese E-Mail-Adresse
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Telefonnummer</Label>
                              <Input
                                id="phone"
                                placeholder="+49 123 456789"
                                value={schoolData.phone}
                                onChange={(e) => handleInputChange(null, "phone", e.target.value)}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="password">Passwort</Label>
                              <Input
                                id="password"
                                type="password"
                                placeholder="Passwort erstellen"
                                value={schoolData.password}
                                onChange={(e) => handleInputChange(null, "password", e.target.value)}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Mindestens 8 Zeichen mit einer Zahl und einem Sonderzeichen
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Passwort bestätigen"
                                value={schoolData.confirmPassword}
                                onChange={(e) => handleInputChange(null, "confirmPassword", e.target.value)}
                                required
                              />
                            </div>

                            <div className="flex items-start space-x-2 pt-2">
                              <Checkbox
                                id="terms"
                                checked={schoolData.termsAgreed}
                                onCheckedChange={(checked) => handleInputChange(null, "termsAgreed", checked)}
                                required
                              />
                              <Label htmlFor="terms" className="font-normal text-sm leading-tight">
                                Ich stimme den{" "}
                                <Link href="/terms" className="text-rose-500 hover:underline">
                                  Nutzungsbedingungen
                                </Link>{" "}
                                und der{" "}
                                <Link href="/privacy" className="text-rose-500 hover:underline">
                                  Datenschutzrichtlinie
                                </Link>{" "}
                                zu
                              </Label>
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
                            <h2 className="text-xl font-semibold mb-4">Fahrschuldetails</h2>
                            <p className="text-muted-foreground mb-6">
                              Erzählen Sie uns von Ihrer Fahrschule und ihrem Standort
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="schoolName">Fahrschulname</Label>
                              <Input
                                id="schoolName"
                                placeholder="Geben Sie den Namen Ihrer Fahrschule ein"
                                value={schoolData.name}
                                onChange={(e) => handleInputChange(null, "name", e.target.value)}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="foundedYear">Gründungsjahr</Label>
                              <Input
                                id="foundedYear"
                                type="number"
                                placeholder="z.B. 2010"
                                value={schoolData.foundedYear}
                                onChange={(e) => handleInputChange(null, "foundedYear", e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="instructors">Anzahl der Fahrlehrer</Label>
                                <Input
                                  id="instructors"
                                  type="number"
                                  placeholder="z.B. 5"
                                  value={schoolData.instructors}
                                  onChange={(e) => handleInputChange(null, "instructors", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="vehicles">Anzahl der Fahrzeuge</Label>
                                <Input
                                  id="vehicles"
                                  type="number"
                                  placeholder="z.B. 8"
                                  value={schoolData.vehicles}
                                  onChange={(e) => handleInputChange(null, "vehicles", e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="city">Stadt</Label>
                              <Select
                                value={schoolData.city}
                                onValueChange={(value) => handleInputChange(null, "city", value)}
                                required
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Wählen Sie eine Stadt" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="berlin">Berlin</SelectItem>
                                  <SelectItem value="munich">München</SelectItem>
                                  <SelectItem value="hamburg">Hamburg</SelectItem>
                                  <SelectItem value="cologne">Köln</SelectItem>
                                  <SelectItem value="frankfurt">Frankfurt</SelectItem>
                                  <SelectItem value="stuttgart">Stuttgart</SelectItem>
                                  <SelectItem value="dusseldorf">Düsseldorf</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="address">Straßenadresse</Label>
                              <Input
                                id="address"
                                placeholder="Geben Sie Ihre Straßenadresse ein"
                                value={schoolData.address}
                                onChange={(e) => handleInputChange(null, "address", e.target.value)}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="postalCode">Postleitzahl</Label>
                                <Input
                                  id="postalCode"
                                  placeholder="z.B. 10115"
                                  value={schoolData.postalCode}
                                  onChange={(e) => handleInputChange(null, "postalCode", e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="state">Bundesland</Label>
                                <Select
                                  value={schoolData.state}
                                  onValueChange={(value) => handleInputChange(null, "state", value)}
                                  required
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Wählen Sie ein Bundesland" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="berlin">Berlin</SelectItem>
                                    <SelectItem value="bavaria">Bayern</SelectItem>
                                    <SelectItem value="hamburg">Hamburg</SelectItem>
                                    <SelectItem value="nrw">Nordrhein-Westfalen</SelectItem>
                                    <SelectItem value="hesse">Hessen</SelectItem>
                                    <SelectItem value="bw">Baden-Württemberg</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="website">Website (Optional)</Label>
                              <Input
                                id="website"
                                placeholder="https://www.example.com"
                                value={schoolData.website}
                                onChange={(e) => handleInputChange(null, "website", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="description">Fahrschulbeschreibung</Label>
                              <Textarea
                                id="description"
                                placeholder="Erzählen Sie potenziellen Schülern von Ihrer Fahrschule"
                                className="min-h-[120px]"
                                value={schoolData.description}
                                onChange={(e) => handleInputChange(null, "description", e.target.value)}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Beschreiben Sie die Spezialitäten Ihrer Fahrschule, Ihre Lehrmethoden und was Sie einzigartig macht
                              </p>
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
                            <h2 className="text-xl font-semibold mb-4">Dienstleistungen & Preise</h2>
                            <p className="text-muted-foreground mb-6">
                              Informieren Sie uns über die angebotenen Dienstleistungen und Ihre Preisstruktur
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Angebotene Führerscheinklassen</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseB"
                                    checked={schoolData.services.carLicense}
                                    onCheckedChange={(checked) => handleServiceChange("carLicense", checked)}
                                  />
                                  <Label htmlFor="licenseB" className="font-normal">
                                    PKW-Führerschein (B)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseA"
                                    checked={schoolData.services.motorcycleLicense}
                                    onCheckedChange={(checked) => handleServiceChange("motorcycleLicense", checked)}
                                  />
                                  <Label htmlFor="licenseA" className="font-normal">
                                    Motorrad-Führerschein (A)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseC"
                                    checked={schoolData.services.truckLicense}
                                    onCheckedChange={(checked) => handleServiceChange("truckLicense", checked)}
                                  />
                                  <Label htmlFor="licenseC" className="font-normal">
                                    LKW-Führerschein (C)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseD"
                                    checked={schoolData.services.busLicense}
                                    onCheckedChange={(checked) => handleServiceChange("busLicense", checked)}
                                  />
                                  <Label htmlFor="licenseD" className="font-normal">
                                    Bus-Führerschein (D)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseAM"
                                    checked={schoolData.services.mopedLicense}
                                    onCheckedChange={(checked) => handleServiceChange("mopedLicense", checked)}
                                  />
                                  <Label htmlFor="licenseAM" className="font-normal">
                                    Roller-Führerschein (AM)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="licenseE"
                                    checked={schoolData.services.trailerLicense}
                                    onCheckedChange={(checked) => handleServiceChange("trailerLicense", checked)}
                                  />
                                  <Label htmlFor="licenseE" className="font-normal">
                                    Anhänger-Führerschein (BE)
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Zusätzliche Dienstleistungen</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="refresher"
                                    checked={schoolData.services.refresherCourses}
                                    onCheckedChange={(checked) => handleServiceChange("refresherCourses", checked)}
                                  />
                                  <Label htmlFor="refresher" className="font-normal">
                                    Auffrischungskurse
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="intensive"
                                    checked={schoolData.services.intensiveCourses}
                                    onCheckedChange={(checked) => handleServiceChange("intensiveCourses", checked)}
                                  />
                                  <Label htmlFor="intensive" className="font-normal">
                                    Intensivkurse
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="foreign"
                                    checked={schoolData.services.foreignLanguageSupport}
                                    onCheckedChange={(checked) =>
                                      handleServiceChange("foreignLanguageSupport", checked)
                                    }
                                  />
                                  <Label htmlFor="foreign" className="font-normal">
                                    Unterstützung in Fremdsprachen
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="anxiety"
                                    checked={schoolData.services.anxietySupport}
                                    onCheckedChange={(checked) => handleServiceChange("anxietySupport", checked)}
                                  />
                                  <Label htmlFor="anxiety" className="font-normal">
                                    Unterstützung bei Prüfungsangst
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="automatic"
                                    checked={schoolData.services.automaticTransmission}
                                    onCheckedChange={(checked) => handleServiceChange("automaticTransmission", checked)}
                                  />
                                  <Label htmlFor="automatic" className="font-normal">
                                    Automatikgetriebe
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id="online"
                                    checked={schoolData.services.onlineTheory}
                                    onCheckedChange={(checked) => handleServiceChange("onlineTheory", checked)}
                                  />
                                  <Label htmlFor="online" className="font-normal">
                                    Online-Theorieunterricht
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 border-t">
                              <h3 className="font-medium mb-4">Grundlegende Preisinformationen</h3>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="registrationFee">Anmeldegebühr (€)</Label>
                                    <Input
                                      id="registrationFee"
                                      type="number"
                                      placeholder="z.B. 100"
                                      value={schoolData.prices.registrationFee}
                                      onChange={(e) => handleInputChange("prices", "registrationFee", e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="theoryLesson">Theorieunterricht (€)</Label>
                                    <Input
                                      id="theoryLesson"
                                      type="number"
                                      placeholder="z.B. 15"
                                      value={schoolData.prices.theoryLesson}
                                      onChange={(e) => handleInputChange("prices", "theoryLesson", e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="drivingLesson">Fahrstunde (€)</Label>
                                    <Input
                                      id="drivingLesson"
                                      type="number"
                                      placeholder="z.B. 50"
                                      value={schoolData.prices.drivingLesson}
                                      onChange={(e) => handleInputChange("prices", "drivingLesson", e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="examFee">Praktische Prüfungsgebühr (€)</Label>
                                    <Input
                                      id="examFee"
                                      type="number"
                                      placeholder="z.B. 150"
                                      value={schoolData.prices.examFee}
                                      onChange={(e) => handleInputChange("prices", "examFee", e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="nightDriving">Nachtfahrstunde (€)</Label>
                                    <Input
                                      id="nightDriving"
                                      type="number"
                                      placeholder="z.B. 55"
                                      value={schoolData.prices.nightDriving}
                                      onChange={(e) => handleInputChange("prices", "nightDriving", e.target.value)}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="highwayDriving">Autobahnfahrstunde (€)</Label>
                                    <Input
                                      id="highwayDriving"
                                      type="number"
                                      placeholder="z.B. 55"
                                      value={schoolData.prices.highwayDriving}
                                      onChange={(e) => handleInputChange("prices", "highwayDriving", e.target.value)}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Sie können nach der Registrierung detailliertere Preisinformationen in Ihrem Dashboard hinzufügen
                              </p>
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
                            <h2 className="text-xl font-semibold mb-4">Öffnungszeiten</h2>
                            <p className="text-muted-foreground mb-6">Legen Sie die Öffnungszeiten Ihrer Fahrschule fest</p>
                          </div>

                          <div className="space-y-4">
                            {Object.entries(schoolData.openingHours).map(([day, hours]) => (
                              <div key={day} className="flex items-center justify-between border-b pb-4 last:border-0">
                                <div className="w-1/4">
                                  <Label className="font-medium capitalize">
                                    {day === "monday" ? "Montag" :
                                     day === "tuesday" ? "Dienstag" :
                                     day === "wednesday" ? "Mittwoch" :
                                     day === "thursday" ? "Donnerstag" :
                                     day === "friday" ? "Freitag" :
                                     day === "saturday" ? "Samstag" :
                                     "Sonntag"}
                                  </Label>
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
                                      {hours.closed ? "Geschlossen" : "Geöffnet"}
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
                                      <span>bis</span>
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
                            <h2 className="text-xl font-semibold mb-4">Verifizierung & Medien</h2>
                            <p className="text-muted-foreground mb-6">
                              Laden Sie Dokumente hoch, um Ihr Unternehmen zu verifizieren, und fügen Sie Medien hinzu, um Ihre Fahrschule zu präsentieren
                            </p>
                          </div>

                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="logo">Fahrschullogo</Label>
                              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">Ziehen Sie Ihr Logo hierher</p>
                                <p className="text-xs text-muted-foreground mb-4">PNG, JPG oder SVG (max. 2MB)</p>
                                <Input
                                  id="logo"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange('logo', e)}
                                  className="hidden"
                                />
                                <label htmlFor="logo">
                                  <Button variant="outline" size="sm" type="button">
                                    Datei auswählen
                                  </Button>
                                </label>
                                {files.logo && <p className="text-sm mt-2">Ausgewählt: {files.logo.name}</p>}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="businessLicense">Gewerbeanmeldung oder -lizenz</Label>
                              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">
                                  Laden Sie Ihre Gewerbeanmeldung oder Lizenz hoch
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">PDF, JPG oder PNG (max. 5MB)</p>
                                <Input
                                  id="businessLicense"
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) => handleFileChange('businessLicense', e)}
                                  className="hidden"
                                />
                                <label htmlFor="businessLicense">
                                  <Button variant="outline" size="sm" type="button">
                                    Datei auswählen
                                  </Button>
                                </label>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Dieses Dokument wird zur Verifizierung Ihres Unternehmens verwendet und ist nicht öffentlich sichtbar
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="photos">Fahrschulfotos (Optional)</Label>
                              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground mb-1">
                                  Fügen Sie Fotos Ihrer Einrichtungen, Fahrzeuge oder Fahrlehrer hinzu
                                </p>
                                <p className="text-xs text-muted-foreground mb-4">
                                  JPG oder PNG (max. 5 Fotos, je 2MB)
                                </p>
                                <Input
                                  id="photos"
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) => handleFileChange('photos', e)}
                                  className="hidden"
                                />
                                <label htmlFor="photos">
                                  <Button variant="outline" size="sm" type="button">
                                    Dateien auswählen
                                  </Button>
                                </label>
                              </div>
                            </div>

                            <div className="pt-4">
                              <div className="flex items-start space-x-2">
                                <Checkbox
                                  id="certify"
                                  checked={schoolData.certify}
                                  onCheckedChange={(checked) => handleInputChange(null, "certify", checked)}
                                  required
                                />
                                <Label htmlFor="certify" className="font-normal text-sm leading-tight">
                                  Ich bestätige, dass ich berechtigt bin, diese Fahrschule zu registrieren, und dass alle angegebenen Informationen korrekt und vollständig sind. Ich verstehe, dass die Angabe falscher Informationen zur Entfernung meines Eintrags führen kann.
                                </Label>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex justify-between mt-8">
                        {step > 1 ? (
                          <Button type="outline" variant="button" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Zurück
                          </Button>
                        ) : (
                          <div></div>
                        )}

                        {step < steps.length ? (
                          <Button type="button" onClick={nextStep} className="bg-rose-600 hover:bg-rose">
                            Weiter
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button type="submit" disabled={isSubmitting} className="bg-rose-500 hover:bg-rose-600">
                            {isSubmitting ? "Registrieren..." : "Registrierung abschließen"}
                          </Button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Haben Sie bereits ein Konto?{" "}
              <Link href="/school/login" className="text-rose-600 hover:underline">
                Hier anmelden
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Upload, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"

// export default function SchoolRegisterPage() {
//   const router = useRouter()
//   const [step, setStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isComplete, setIsComplete] = useState(false)
//   const [error, setError] = useState("")
//   const [files, setFiles] = useState({ logo: null, businessLicense: null, photos: [] })

//   const [schoolData, setSchoolData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     foundedYear: "",
//     city: "",
//     address: "",
//     postalCode: "",
//     state: "",
//     website: "",
//     description: "",
//     services: {
//       carLicense: true,
//       motorcycleLicense: false,
//       truckLicense: false,
//       busLicense: false,
//       mopedLicense: false,
//       trailerLicense: false,
//       refresherCourses: false,
//       intensiveCourses: false,
//       foreignLanguageSupport: false,
//       anxietySupport: false,
//       automaticTransmission: false,
//       onlineTheory: false,
//     },
//     prices: {
//       registrationFee: 100,
//       theoryLesson: 15,
//       drivingLesson: 50,
//       examFee: 150,
//       theoryExam: 80,
//       nightDriving: 55,
//       highwayDriving: 55,
//     },
//     instructors: 1,
//     vehicles: 1,
//     openingHours: {
//       monday: { open: "09:00", close: "18:00", closed: false },
//       tuesday: { open: "09:00", close: "18:00", closed: false },
//       wednesday: { open: "09:00", close: "18:00", closed: false },
//       thursday: { open: "09:00", close: "18:00", closed: false },
//       friday: { open: "09:00", close: "18:00", closed: false },
//       saturday: { open: "10:00", close: "14:00", closed: false },
//       sunday: { open: "10:00", close: "14:00", closed: true },
//     },
//     logo: null,
//     businessLicense: null,
//     photos: [],
//     termsAgreed: false,
//     certify: false,
//   })

//   const handleInputChange = (section, field, value) => {
//     if (section) {
//       setSchoolData({
//         ...schoolData,
//         [section]: {
//           ...schoolData[section],
//           [field]: value,
//         },
//       })
//     } else {
//       setSchoolData({
//         ...schoolData,
//         [field]: value,
//       })
//     }
//   }

//   const handleServiceChange = (service, checked) => {
//     setSchoolData({
//       ...schoolData,
//       services: {
//         ...schoolData.services,
//         [service]: checked,
//       },
//     })
//   }
//   const handleFileChange = (field, e) => {
//     console.log('Field:', field, 'Files:', e.target.files);
//     const selectedFiles = e.target.files;
//     const maxSize = field === 'businessLicense' ? 5 * 1024 * 1024 : 2 * 1024 * 1024; // 5MB or 2MB
//     const validTypes = {
//       logo: ['image/png', 'image/jpeg', 'image/svg+xml'],
//       businessLicense: ['image/png', 'image/jpeg', 'application/pdf'],
//       photos: ['image/png', 'image/jpeg'],
//     };
  
//     if (field === 'photos') {
//       const photos = Array.from(selectedFiles);
//       if (photos.length > 5) {
//         alert('Maximum 5 photos allowed');
//         return;
//       }
//       for (let file of photos) {
//         if (file.size > maxSize) {
//           alert(`File ${file.name} exceeds 2MB limit`);
//           return;
//         }
//         if (!validTypes.photos.includes(file.type)) {
//           alert(`File ${file.name} is not a valid type (JPG/PNG)`);
//           return;
//         }
//       }
//       setFiles({ ...files, photos });
//     } else {
//       const file = selectedFiles[0];
//       if (!file) return;
//       if (file.size > maxSize) {
//         alert(`File ${file.name} exceeds size limit`);
//         return;
//       }
//       if (!validTypes[field].includes(file.type)) {
//         alert(`File ${file.name} is not a valid type`);
//         return;
//       }
//       setFiles({ ...files, [field]: file });
//     }
//   };
//   // const handleFileChange = (field, e) => {
//   //   const selectedFiles = e.target.files;
//   //   if (field === 'photos') {
//   //     setFiles({ ...files, photos: Array.from(selectedFiles) });
//   //   } else {
//   //     setFiles({ ...files, [field]: selectedFiles[0] });
//   //   }
//   // }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setError("")

//     try {
//       const formData = new FormData();
      
//       // Append all school data
//       Object.keys(schoolData).forEach(key => {
//         if (key === 'services' || key === 'prices' || key === 'openingHours') {
//           formData.append(key, JSON.stringify(schoolData[key]));
//         } else if (key !== 'logo' && key !== 'businessLicense' && key !== 'photos') {
//           formData.append(key, schoolData[key]);
//         }
//       });

//       // Append files
//       if (files.logo) formData.append('logo', files.logo);
//       if (files.businessLicense) formData.append('businessLicense', files.businessLicense);
//       files.photos.forEach(photo => formData.append('photos', photo));

//       const response = await fetch('https://backend-ds-blue.vercel.app/api/school/register', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await response.json()
//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed')
//       }

//       setIsComplete(true)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const nextStep = () => setStep(step + 1)
//   const prevStep = () => setStep(step - 1)

//   const steps = [
//     { number: 1, title: "Account Information" },
//     { number: 2, title: "School Details" },
//     { number: 3, title: "Services & Pricing" },
//     { number: 4, title: "Opening Hours" },
//     { number: 5, title: "Verification" },
//   ]

//   return (
//     <div className="flex flex-col min-h-screen bg-muted/30">
//       <Navbar />
//       <main className="flex-1 py-12 md:py-16 lg:py-24">
//         <div className="container px-4 md:px-6 max-w-4xl mx-auto">
//           <div className="mb-8">
//             <Link
//               href="/"
//               className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
//             >
//               <ArrowLeft className="mr-1 h-4 w-4" />
//               Back to Home
//             </Link>
//           </div>

//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//             <Card className="border-none shadow-lg">
//               <CardHeader className="bg-rose-500 text-white rounded-t-lg">
//                 <CardTitle className="text-2xl">Driving School Registration</CardTitle>
//                 <CardDescription className="text-rose-100">
//                   Register your driving school to be listed on Fahrschulfinder
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-0">
//                 {isComplete ? (
//                   <motion.div
//                     className="flex flex-col items-center justify-center py-16 text-center px-6"
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
//                       <CheckCircle className="h-10 w-10 text-green-500" />
//                     </div>
//                     <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
//                     <p className="text-muted-foreground mb-8 max-w-md">
//                       Your driving school has been registered successfully. You can now log in to manage your profile
//                       and pricing.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4">
//                       <Link href="/school/login">
//                         <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
//                           Go to Login
//                         </Button>
//                       </Link>
//                       <Link href="/">
//                         <Button size="lg" variant="outline">
//                           Return to Home
//                         </Button>
//                       </Link>
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <div>
//                     {error && (
//                       <div className="bg-red-50 text-red-500 p-3 rounded-md m-6 text-sm border border-red-200">
//                         {error}
//                       </div>
//                     )}
//                     <div className="p-6 border-b">
//                       <div className="flex justify-between items-center">
//                         {steps.map((s) => (
//                           <div key={s.number} className="flex flex-col items-center">
//                             <div
//                               className={`flex items-center justify-center w-10 h-10 rounded-full ${
//                                 s.number === step
//                                   ? "bg-rose-500 text-white"
//                                   : s.number < step
//                                     ? "bg-green-500 text-white"
//                                     : "bg-gray-200 text-gray-500"
//                               }`}
//                             >
//                               {s.number < step ? <CheckCircle className="h-5 w-5" /> : s.number}
//                             </div>
//                             <span
//                               className={`text-xs mt-2 hidden sm:block ${
//                                 s.number === step ? "text-rose-500 font-medium" : "text-muted-foreground"
//                               }`}
//                             >
//                               {s.title}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="relative h-2 bg-gray-200 rounded-full mt-4">
//                         <motion.div
//                           className="absolute top-0 left-0 h-full bg-rose-500 rounded-full"
//                           initial={{ width: "0%" }}
//                           animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
//                           transition={{ duration: 0.3 }}
//                         />
//                       </div>
//                     </div>

//                     <form onSubmit={handleSubmit} className="p-6">
//                       {step === 1 && (
//                         <motion.div
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="space-y-6"
//                         >
//                           <div>
//                             <h2 className="text-xl font-semibold mb-4">Account Information</h2>
//                             <p className="text-muted-foreground mb-6">
//                               Create your account to manage your driving school listing
//                             </p>
//                           </div>

//                           <div className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div className="space-y-2">
//                                 <Label htmlFor="firstName">First Name</Label>
//                                 <Input
//                                   id="firstName"
//                                   placeholder="John"
//                                   value={schoolData.firstName}
//                                   onChange={(e) => handleInputChange(null, "firstName", e.target.value)}
//                                   required
//                                 />
//                               </div>
//                               <div className="space-y-2">
//                                 <Label htmlFor="lastName">Last Name</Label>
//                                 <Input
//                                   id="lastName"
//                                   placeholder="Doe"
//                                   value={schoolData.lastName}
//                                   onChange={(e) => handleInputChange(null, "lastName", e.target.value)}
//                                   required
//                                 />
//                               </div>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="email">Email Address</Label>
//                               <Input
//                                 id="email"
//                                 type="email"
//                                 placeholder="john.doe@example.com"
//                                 value={schoolData.email}
//                                 onChange={(e) => handleInputChange(null, "email", e.target.value)}
//                                 required
//                               />
//                               <p className="text-xs text-muted-foreground">
//                                 We'll send a verification link to this email
//                               </p>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="phone">Phone Number</Label>
//                               <Input
//                                 id="phone"
//                                 placeholder="+49 123 456789"
//                                 value={schoolData.phone}
//                                 onChange={(e) => handleInputChange(null, "phone", e.target.value)}
//                                 required
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="password">Password</Label>
//                               <Input
//                                 id="password"
//                                 type="password"
//                                 placeholder="Create a password"
//                                 value={schoolData.password}
//                                 onChange={(e) => handleInputChange(null, "password", e.target.value)}
//                                 required
//                               />
//                               <p className="text-xs text-muted-foreground">
//                                 Must be at least 8 characters with a number and a special character
//                               </p>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="confirmPassword">Confirm Password</Label>
//                               <Input
//                                 id="confirmPassword"
//                                 type="password"
//                                 placeholder="Confirm your password"
//                                 value={schoolData.confirmPassword}
//                                 onChange={(e) => handleInputChange(null, "confirmPassword", e.target.value)}
//                                 required
//                               />
//                             </div>

//                             <div className="flex items-start space-x-2 pt-2">
//                               <Checkbox
//                                 id="terms"
//                                 checked={schoolData.termsAgreed}
//                                 onCheckedChange={(checked) => handleInputChange(null, "termsAgreed", checked)}
//                                 required
//                               />
//                               <Label htmlFor="terms" className="font-normal text-sm leading-tight">
//                                 I agree to the{" "}
//                                 <Link href="/terms" className="text-rose-500 hover:underline">
//                                   Terms of Service
//                                 </Link>{" "}
//                                 and{" "}
//                                 <Link href="/privacy" className="text-rose-500 hover:underline">
//                                   Privacy Policy
//                                 </Link>
//                               </Label>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}

//                       {step === 2 && (
//                         <motion.div
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="space-y-6"
//                         >
//                           <div>
//                             <h2 className="text-xl font-semibold mb-4">School Details</h2>
//                             <p className="text-muted-foreground mb-6">
//                               Tell us about your driving school and its location
//                             </p>
//                           </div>

//                           <div className="space-y-4">
//                             <div className="space-y-2">
//                               <Label htmlFor="schoolName">School Name</Label>
//                               <Input
//                                 id="schoolName"
//                                 placeholder="Enter your driving school name"
//                                 value={schoolData.name}
//                                 onChange={(e) => handleInputChange(null, "name", e.target.value)}
//                                 required
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="foundedYear">Year Founded</Label>
//                               <Input
//                                 id="foundedYear"
//                                 type="number"
//                                 placeholder="e.g. 2010"
//                                 value={schoolData.foundedYear}
//                                 onChange={(e) => handleInputChange(null, "foundedYear", e.target.value)}
//                               />
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div className="space-y-2">
//                                 <Label htmlFor="instructors">Number of Instructors</Label>
//                                 <Input
//                                   id="instructors"
//                                   type="number"
//                                   placeholder="e.g. 5"
//                                   value={schoolData.instructors}
//                                   onChange={(e) => handleInputChange(null, "instructors", e.target.value)}
//                                   required
//                                 />
//                               </div>
//                               <div className="space-y-2">
//                                 <Label htmlFor="vehicles">Number of Vehicles</Label>
//                                 <Input
//                                   id="vehicles"
//                                   type="number"
//                                   placeholder="e.g. 8"
//                                   value={schoolData.vehicles}
//                                   onChange={(e) => handleInputChange(null, "vehicles", e.target.value)}
//                                   required
//                                 />
//                               </div>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="city">City</Label>
//                               <Select
//                                 value={schoolData.city}
//                                 onValueChange={(value) => handleInputChange(null, "city", value)}
//                                 required
//                               >
//                                 <SelectTrigger>
//                                   <SelectValue placeholder="Select a city" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="berlin">Berlin</SelectItem>
//                                   <SelectItem value="munich">Munich</SelectItem>
//                                   <SelectItem value="hamburg">Hamburg</SelectItem>
//                                   <SelectItem value="cologne">Cologne</SelectItem>
//                                   <SelectItem value="frankfurt">Frankfurt</SelectItem>
//                                   <SelectItem value="stuttgart">Stuttgart</SelectItem>
//                                   <SelectItem value="dusseldorf">Düsseldorf</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="address">Street Address</Label>
//                               <Input
//                                 id="address"
//                                 placeholder="Enter your street address"
//                                 value={schoolData.address}
//                                 onChange={(e) => handleInputChange(null, "address", e.target.value)}
//                                 required
//                               />
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                               <div className="space-y-2">
//                                 <Label htmlFor="postalCode">Postal Code</Label>
//                                 <Input
//                                   id="postalCode"
//                                   placeholder="e.g. 10115"
//                                   value={schoolData.postalCode}
//                                   onChange={(e) => handleInputChange(null, "postalCode", e.target.value)}
//                                   required
//                                 />
//                               </div>
//                               <div className="space-y-2">
//                                 <Label htmlFor="state">State</Label>
//                                 <Select
//                                   value={schoolData.state}
//                                   onValueChange={(value) => handleInputChange(null, "state", value)}
//                                   required
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue placeholder="Select a state" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="berlin">Berlin</SelectItem>
//                                     <SelectItem value="bavaria">Bavaria</SelectItem>
//                                     <SelectItem value="hamburg">Hamburg</SelectItem>
//                                     <SelectItem value="nrw">North Rhine-Westphalia</SelectItem>
//                                     <SelectItem value="hesse">Hesse</SelectItem>
//                                     <SelectItem value="bw">Baden-Württemberg</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="website">Website (Optional)</Label>
//                               <Input
//                                 id="website"
//                                 placeholder="https://www.example.com"
//                                 value={schoolData.website}
//                                 onChange={(e) => handleInputChange(null, "website", e.target.value)}
//                               />
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="description">School Description</Label>
//                               <Textarea
//                                 id="description"
//                                 placeholder="Tell potential students about your driving school"
//                                 className="min-h-[120px]"
//                                 value={schoolData.description}
//                                 onChange={(e) => handleInputChange(null, "description", e.target.value)}
//                                 required
//                               />
//                               <p className="text-xs text-muted-foreground">
//                                 Describe your school's specialties, teaching philosophy, and what makes you unique
//                               </p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}

//                       {step === 3 && (
//                         <motion.div
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="space-y-6"
//                         >
//                           <div>
//                             <h2 className="text-xl font-semibold mb-4">Services & Pricing</h2>
//                             <p className="text-muted-foreground mb-6">
//                               Tell us about the services you offer and your pricing structure
//                             </p>
//                           </div>

//                           <div className="space-y-4">
//                             <div className="space-y-2">
//                               <Label>License Types Offered</Label>
//                               <div className="grid grid-cols-2 gap-2">
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="licenseB"
//                                     checked={schoolData.services.carLicense}
//                                     onCheckedChange={(checked) => handleServiceChange("carLicense", checked)}
//                                   />
//                                   <Label htmlFor="licenseB" className="font-normal">
//                                     Car License (B)
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="licenseA"
//                                     checked={schoolData.services.motorcycleLicense}
//                                     onCheckedChange={(checked) => handleServiceChange("motorcycleLicense", checked)}
//                                   />
//                                   <Label htmlFor="licenseA" className="font-normal">
//                                     Motorcycle License (A)
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="licenseC"
//                                     checked={schoolData.services.truckLicense}
//                                     onCheckedChange={(checked) => handleServiceChange("truckLicense", checked)}
//                                   />
//                                   <Label htmlFor="licenseC" className="font-normal">
//                                     Truck License (C)
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="licenseD"
//                                     checked={schoolData.services.busLicense}
//                                     onCheckedChange={(checked) => handleServiceChange("busLicense", checked)}
//                                   />
//                                   <Label htmlFor="licenseD" className="font-normal">
//                                     Bus License (D)
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="licenseAM"
//                                     checked={schoolData.services.mopedLicense}
//                                     onCheckedChange={(checked) => handleServiceChange("mopedLicense", checked)}
//                                   />
//                                   <Label htmlFor="licenseAM" className="font-normal">
//                                     Moped License (AM)
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="licenseE"
//                                     checked={schoolData.services.trailerLicense}
//                                     onCheckedChange={(checked) => handleServiceChange("trailerLicense", checked)}
//                                   />
//                                   <Label htmlFor="licenseE" className="font-normal">
//                                     Trailer License (BE)
//                                   </Label>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="space-y-2">
//                               <Label>Additional Services</Label>
//                               <div className="grid grid-cols-2 gap-2">
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="refresher"
//                                     checked={schoolData.services.refresherCourses}
//                                     onCheckedChange={(checked) => handleServiceChange("refresherCourses", checked)}
//                                   />
//                                   <Label htmlFor="refresher" className="font-normal">
//                                     Refresher Courses
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="intensive"
//                                     checked={schoolData.services.intensiveCourses}
//                                     onCheckedChange={(checked) => handleServiceChange("intensiveCourses", checked)}
//                                   />
//                                   <Label htmlFor="intensive" className="font-normal">
//                                     Intensive Courses
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="foreign"
//                                     checked={schoolData.services.foreignLanguageSupport}
//                                     onCheckedChange={(checked) =>
//                                       handleServiceChange("foreignLanguageSupport", checked)
//                                     }
//                                   />
//                                   <Label htmlFor="foreign" className="font-normal">
//                                     Foreign Language Support
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="anxiety"
//                                     checked={schoolData.services.anxietySupport}
//                                     onCheckedChange={(checked) => handleServiceChange("anxietySupport", checked)}
//                                   />
//                                   <Label htmlFor="anxiety" className="font-normal">
//                                     Anxiety Support
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="automatic"
//                                     checked={schoolData.services.automaticTransmission}
//                                     onCheckedChange={(checked) => handleServiceChange("automaticTransmission", checked)}
//                                   />
//                                   <Label htmlFor="automatic" className="font-normal">
//                                     Automatic Transmission
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <Checkbox
//                                     id="online"
//                                     checked={schoolData.services.onlineTheory}
//                                     onCheckedChange={(checked) => handleServiceChange("onlineTheory", checked)}
//                                   />
//                                   <Label htmlFor="online" className="font-normal">
//                                     Online Theory Lessons
//                                   </Label>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="pt-4 border-t">
//                               <h3 className="font-medium mb-4">Basic Pricing Information</h3>
//                               <div className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="space-y-2">
//                                     <Label htmlFor="registrationFee">Registration Fee (€)</Label>
//                                     <Input
//                                       id="registrationFee"
//                                       type="number"
//                                       placeholder="e.g. 100"
//                                       value={schoolData.prices.registrationFee}
//                                       onChange={(e) => handleInputChange("prices", "registrationFee", e.target.value)}
//                                       required
//                                     />
//                                   </div>
//                                   <div className="space-y-2">
//                                     <Label htmlFor="theoryLesson">Theory Lesson (€)</Label>
//                                     <Input
//                                       id="theoryLesson"
//                                       type="number"
//                                       placeholder="e.g. 15"
//                                       value={schoolData.prices.theoryLesson}
//                                       onChange={(e) => handleInputChange("prices", "theoryLesson", e.target.value)}
//                                       required
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="space-y-2">
//                                     <Label htmlFor="drivingLesson">Driving Lesson (€)</Label>
//                                     <Input
//                                       id="drivingLesson"
//                                       type="number"
//                                       placeholder="e.g. 50"
//                                       value={schoolData.prices.drivingLesson}
//                                       onChange={(e) => handleInputChange("prices", "drivingLesson", e.target.value)}
//                                       required
//                                     />
//                                   </div>
//                                   <div className="space-y-2">
//                                     <Label htmlFor="examFee">Practical Exam Fee (€)</Label>
//                                     <Input
//                                       id="examFee"
//                                       type="number"
//                                       placeholder="e.g. 150"
//                                       value={schoolData.prices.examFee}
//                                       onChange={(e) => handleInputChange("prices", "examFee", e.target.value)}
//                                       required
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="space-y-2">
//                                     <Label htmlFor="nightDriving">Night Driving Lesson (€)</Label>
//                                     <Input
//                                       id="nightDriving"
//                                       type="number"
//                                       placeholder="e.g. 55"
//                                       value={schoolData.prices.nightDriving}
//                                       onChange={(e) => handleInputChange("prices", "nightDriving", e.target.value)}
//                                       required
//                                     />
//                                   </div>
//                                   <div className="space-y-2">
//                                     <Label htmlFor="highwayDriving">Highway Driving Lesson (€)</Label>
//                                     <Input
//                                       id="highwayDriving"
//                                       type="number"
//                                       placeholder="e.g. 55"
//                                       value={schoolData.prices.highwayDriving}
//                                       onChange={(e) => handleInputChange("prices", "highwayDriving", e.target.value)}
//                                       required
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                               <p className="text-xs text-muted-foreground mt-2">
//                                 You can add more detailed pricing information in your dashboard after registration
//                               </p>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}

//                       {step === 4 && (
//                         <motion.div
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="space-y-6"
//                         >
//                           <div>
//                             <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
//                             <p className="text-muted-foreground mb-6">Set your driving school's operating hours</p>
//                           </div>

//                           <div className="space-y-4">
//                             {Object.entries(schoolData.openingHours).map(([day, hours]) => (
//                               <div key={day} className="flex items-center justify-between border-b pb-4 last:border-0">
//                                 <div className="w-1/4">
//                                   <Label className="font-medium capitalize">{day}</Label>
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                   <div className="flex items-center">
//                                     <Checkbox
//                                       id={`${day}-open`}
//                                       checked={!hours.closed}
//                                       onCheckedChange={(checked) =>
//                                         handleInputChange("openingHours", day, {
//                                           ...hours,
//                                           closed: !checked,
//                                         })
//                                       }
//                                     />
//                                     <Label htmlFor={`${day}-open`} className="ml-2">
//                                       {hours.closed ? "Closed" : "Open"}
//                                     </Label>
//                                   </div>
//                                   {!hours.closed && (
//                                     <div className="flex items-center gap-2">
//                                       <Input
//                                         type="time"
//                                         value={hours.open}
//                                         onChange={(e) =>
//                                           handleInputChange("openingHours", day, {
//                                             ...hours,
//                                             open: e.target.value,
//                                           })
//                                         }
//                                         className="w-32"
//                                       />
//                                       <span>to</span>
//                                       <Input
//                                         type="time"
//                                         value={hours.close}
//                                         onChange={(e) =>
//                                           handleInputChange("openingHours", day, {
//                                             ...hours,
//                                             close: e.target.value,
//                                           })
//                                         }
//                                         className="w-32"
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </motion.div>
//                       )}

//                       {step === 5 && (
//                         <motion.div
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className="space-y-6"
//                         >
//                           <div>
//                             <h2 className="text-xl font-semibold mb-4">Verification & Media</h2>
//                             <p className="text-muted-foreground mb-6">
//                               Upload documents to verify your business and add media to showcase your school
//                             </p>
//                           </div>

//                           <div className="space-y-6">
//                           <div className="space-y-2">
//                           <Label htmlFor="logo">School Logo</Label>
//                           <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
//                             <Upload className="h-8 w-8 text-muted-foreground mb-2" />
//                             <p className="text-sm text-muted-foreground mb-1">Drag and drop your logo here</p>
//                             <p className="text-xs text-muted-foreground mb-4">PNG, JPG or SVG (max. 2MB)</p>
//                             <Input
//                               id="logo"
//                               type="file"
//                               accept="image/*"
//                               onChange={(e) => handleFileChange('logo', e)}
//                               className="hidden"
//                             />
//                             <label htmlFor="logo">
//                               <Button variant="outline" size="sm" type="button">
//                                 Select File
//                               </Button>
//                             </label>
//                             {files.logo && <p className="text-sm mt-2">Selected: {files.logo.name}</p>}
//                           </div>
//                         </div>
//                             {/* <div className="space-y-2">
//                               <Label htmlFor="logo">School Logo</Label>
//                               <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
//                                 <Upload className="h-8 w-8 text-muted-foreground mb-2" />
//                                 <p className="text-sm text-muted-foreground mb-1">Drag and drop your logo here</p>
//                                 <p className="text-xs text-muted-foreground mb-4">PNG, JPG or SVG (max. 2MB)</p>
//                                 <Input
//                                   id="logo"
//                                   type="file"
//                                   accept="image/*"
//                                   onChange={(e) => handleFileChange('logo', e)}
//                                   className="hidden"
//                                 />
//                                 <label htmlFor="logo">
//                                   <Button variant="outline" size="sm" type="button">
//                                     Select File
//                                   </Button>
//                                 </label>
//                               </div>
//                             </div> */}

//                             <div className="space-y-2">
//                               <Label htmlFor="businessLicense">Business License or Registration</Label>
//                               <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
//                                 <Upload className="h-8 w-8 text-muted-foreground mb-2" />
//                                 <p className="text-sm text-muted-foreground mb-1">
//                                   Upload your business license or registration document
//                                 </p>
//                                 <p className="text-xs text-muted-foreground mb-4">PDF, JPG or PNG (max. 5MB)</p>
//                                 <Input
//                                   id="businessLicense"
//                                   type="file"
//                                   accept="image/*,.pdf"
//                                   onChange={(e) => handleFileChange('businessLicense', e)}
//                                   className="hidden"
//                                 />
//                                 <label htmlFor="businessLicense">
//                                   <Button variant="outline" size="sm" type="button">
//                                     Select File
//                                   </Button>
//                                 </label>
//                               </div>
//                               <p className="text-xs text-muted-foreground">
//                                 This document will be used to verify your business and will not be publicly visible
//                               </p>
//                             </div>

//                             <div className="space-y-2">
//                               <Label htmlFor="photos">School Photos (Optional)</Label>
//                               <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
//                                 <Upload className="h-8 w-8 text-muted-foreground mb-2" />
//                                 <p className="text-sm text-muted-foreground mb-1">
//                                   Add photos of your facilities, vehicles, or instructors
//                                 </p>
//                                 <p className="text-xs text-muted-foreground mb-4">
//                                   JPG or PNG (max. 5 photos, 2MB each)
//                                 </p>
//                                 <Input
//                                   id="photos"
//                                   type="file"
//                                   accept="image/*"
//                                   multiple
//                                   onChange={(e) => handleFileChange('photos', e)}
//                                   className="hidden"
//                                 />
//                                 <label htmlFor="photos">
//                                   <Button variant="outline" size="sm" type="button">
//                                     Select Files
//                                   </Button>
//                                 </label>
//                               </div>
//                             </div>

//                             <div className="pt-4">
//                               <div className="flex items-start space-x-2">
//                                 <Checkbox
//                                   id="certify"
//                                   checked={schoolData.certify}
//                                   onCheckedChange={(checked) => handleInputChange(null, "certify", checked)}
//                                   required
//                                 />
//                                 <Label htmlFor="certify" className="font-normal text-sm leading-tight">
//                                   I certify that I am authorized to register this driving school and that all
//                                   information provided is accurate and complete. I understand that providing false
//                                   information may result in the removal of my listing.
//                                 </Label>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}

//                       <div className="flex justify-between mt-8">
//                         {step > 1 ? (
//                           <Button type="button" variant="outline" onClick={prevStep}>
//                             <ArrowLeft className="mr-2 h-4 w-4" />
//                             Previous
//                           </Button>
//                         ) : (
//                           <div></div>
//                         )}

//                         {step < steps.length ? (
//                           <Button type="button" onClick={nextStep} className="bg-rose-500 hover:bg-rose-600">
//                             Next
//                             <ArrowRight className="ml-2 h-4 w-4" />
//                           </Button>
//                         ) : (
//                           <Button type="submit" disabled={isSubmitting} className="bg-rose-500 hover:bg-rose-600">
//                             {isSubmitting ? "Registering..." : "Complete Registration"}
//                           </Button>
//                         )}
//                       </div>
//                     </form>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </motion.div>

//           <div className="mt-8 text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link href="/school/login" className="text-rose-500 hover:underline font-medium">
//                 Log in here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
