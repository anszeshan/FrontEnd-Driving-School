"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingCard({ plan }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }} className="flex">
      <Card className={`flex flex-col h-full ${plan.popular ? "border-rose-500 shadow-lg shadow-rose-100" : ""}`}>
        {plan.popular && (
          <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">Most Popular</div>
        )}
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <div className="mt-4 flex items-baseline">
            <span className="text-3xl font-bold">€{plan.price}</span>
            <span className="ml-1 text-muted-foreground">/month</span>
          </div>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className={`w-full ${plan.popular ? "bg-rose-500 hover:bg-rose-600" : ""}`}
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
