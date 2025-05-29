"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calculator, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export default function PriceCalculator({ schools }) {
  const [experienceLevel, setExperienceLevel] = useState("beginner")
  const [theoryLessons, setTheoryLessons] = useState(14)
  const [drivingLessons, setDrivingLessons] = useState(20)
  const [additionalServices, setAdditionalServices] = useState({
    nightDriving: true,
    highwayDriving: true,
    intensiveCourse: false,
    onlineTheory: false,
  })

  const [schoolPrices, setSchoolPrices] = useState([])

  useEffect(() => {
    // Calculate prices for each school based on selections
    const prices = schools.map((school) => {
      // Base price calculation
      let totalPrice = school.prices?.registrationFee || 100

      // Theory lessons
      totalPrice += (school.prices?.theoryLesson || 15) * theoryLessons

      // Driving lessons based on experience
      let lessonMultiplier = 1
      if (experienceLevel === "intermediate") lessonMultiplier = 0.8
      if (experienceLevel === "advanced") lessonMultiplier = 0.6

      totalPrice += (school.prices?.drivingLesson || 50) * drivingLessons * lessonMultiplier

      // Additional services
      if (additionalServices.nightDriving) {
        totalPrice += (school.prices?.nightDriving || 55) * 3 // Assuming 3 night driving lessons
      }

      if (additionalServices.highwayDriving) {
        totalPrice += (school.prices?.highwayDriving || 55) * 3 // Assuming 3 highway driving lessons
      }

      if (additionalServices.intensiveCourse) {
        totalPrice += 200 // Additional fee for intensive course
      }

      if (additionalServices.onlineTheory) {
        totalPrice += 50 // Additional fee for online theory access
      }

      // Exam fees
      totalPrice += school.prices?.examFee || 150 // Practical exam
      totalPrice += school.prices?.theoryExam || 80 // Theory exam

      return {
        id: school.id,
        name: school.name,
        totalPrice: Math.round(totalPrice),
      }
    })

    // Sort by price
    prices.sort((a, b) => a.totalPrice - b.totalPrice)
    setSchoolPrices(prices)
  }, [schools, experienceLevel, theoryLessons, drivingLessons, additionalServices])

  const handleAdditionalServiceChange = (service) => {
    setAdditionalServices({
      ...additionalServices,
      [service]: !additionalServices[service],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Price Calculator
        </CardTitle>
        <CardDescription>Customize your driving course to see estimated prices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Experience Level</h3>
            <RadioGroup
              value={experienceLevel}
              onValueChange={setExperienceLevel}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="cursor-pointer">
                  Beginner (No experience)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="cursor-pointer">
                  Intermediate (Some experience)
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="cursor-pointer">
                  Advanced (Refresher course)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="theoryLessons">Theory Lessons</Label>
                <span className="font-medium">{theoryLessons}</span>
              </div>
              <Slider
                id="theoryLessons"
                min={10}
                max={20}
                step={1}
                value={[theoryLessons]}
                onValueChange={(value) => setTheoryLessons(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10 lessons</span>
                <span>20 lessons</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="drivingLessons">Driving Lessons</Label>
                <span className="font-medium">{drivingLessons}</span>
              </div>
              <Slider
                id="drivingLessons"
                min={15}
                max={40}
                step={1}
                value={[drivingLessons]}
                onValueChange={(value) => setDrivingLessons(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>15 lessons</span>
                <span>40 lessons</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Additional Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Label className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={additionalServices.nightDriving}
                  onCheckedChange={() => handleAdditionalServiceChange("nightDriving")}
                />
                <span>Night Driving Lessons</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={additionalServices.highwayDriving}
                  onCheckedChange={() => handleAdditionalServiceChange("highwayDriving")}
                />
                <span>Highway Driving Lessons</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={additionalServices.intensiveCourse}
                  onCheckedChange={() => handleAdditionalServiceChange("intensiveCourse")}
                />
                <span>Intensive Course</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={additionalServices.onlineTheory}
                  onCheckedChange={() => handleAdditionalServiceChange("onlineTheory")}
                />
                <span>Online Theory Access</span>
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full space-y-2">
          <h3 className="font-medium">Estimated Prices:</h3>
          {schoolPrices.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-3 rounded-md ${index === 0 ? "bg-green-50 border border-green-200" : "border"}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium flex items-center">
                    {index === 0 && <Check className="h-4 w-4 text-green-500 mr-1" />}
                    {school.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {index === 0 ? "Best price" : `${index + 1}. option`}
                  </div>
                </div>
                <div className="text-xl font-bold">€{school.totalPrice}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
