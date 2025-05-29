"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SchoolCard({ school }) {
  const [experienceLevel, setExperienceLevel] = useState("beginner")

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48">
          <Image
            src={school.image || "/placeholder.svg?height=200&width=400"}
            alt={school.name}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-semibold">{school.name}</h3>
            <div className="flex items-center mt-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < school.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                  />
                ))}
              <span className="ml-2 text-white text-sm">{school.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Average Price</div>
              <div className="font-bold">€{school.averagePrice.toFixed(2)}</div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {school.address}, {school.city}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                Contact
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

                <div className="pt-4 border-t">
                  <div className="mb-3 font-medium">Select your experience level:</div>
                  <RadioGroup
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="beginner" id={`beginner-${school.id}`} />
                      <Label htmlFor={`beginner-${school.id}`}>Beginner (No experience)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id={`intermediate-${school.id}`} />
                      <Label htmlFor={`intermediate-${school.id}`}>Intermediate (Some experience)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advanced" id={`advanced-${school.id}`} />
                      <Label htmlFor={`advanced-${school.id}`}>Advanced (Refresher course)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline">Send Message</Button>
                <Button>Call Now</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Link href={`/comparison/school/${school.id}`} className="flex-1">
            <Button className="w-full">Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
