"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
          <div className="flex mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
          </div>
          <p className="text-muted-foreground">{testimonial.content}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
