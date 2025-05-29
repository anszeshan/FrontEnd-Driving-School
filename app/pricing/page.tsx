"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Basic",
      price: { monthly: "0", yearly: "0" },
      description: "For driving schools just getting started",
      features: [
        "Basic profile listing",
        "Contact information display",
        "Up to 3 services listed",
        "Standard position in search results",
      ],
      limitations: ["Limited analytics", "No customer reviews management", "No featured placement"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: { monthly: "29.99", yearly: "299.90" },
      description: "For established driving schools",
      features: [
        "Enhanced profile with photos",
        "Highlighted in search results",
        "Unlimited services listed",
        "Customer reviews management",
        "Basic analytics dashboard",
        "Email support",
      ],
      limitations: ["No featured placement", "Limited API access"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Professional",
      price: { monthly: "79.99", yearly: "799.90" },
      description: "For driving school chains and large operations",
      features: [
        "All Premium features",
        "Multiple location management",
        "Featured placement in search results",
        "Advanced analytics and reporting",
        "Dedicated support",
        "API access for integration",
        "Custom branding options",
        "Priority listing in comparison results",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.",
    },
    {
      question: "Is there a contract or commitment?",
      answer:
        "No, all plans are subscription-based with no long-term commitment. You can cancel at any time and your plan will remain active until the end of the current billing cycle.",
    },
    {
      question: "Do you offer discounts for non-profits or educational institutions?",
      answer:
        "Yes, we offer special pricing for non-profit organizations and educational institutions. Please contact our sales team for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans. For monthly plans, we accept credit cards and PayPal.",
    },
    {
      question: "Can I try before I buy?",
      answer: "Yes, we offer a 14-day free trial for our Premium plan. No credit card is required to start your trial.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h1
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Pricing Plans
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Choose the perfect plan for your driving school
              </motion.p>
            </div>

            <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly Billing (Save 20%)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <Card
                        className={`flex flex-col h-full ${
                          plan.popular ? "border-rose-500 shadow-lg shadow-rose-100" : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">
                            Most Popular
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4 flex items-baseline">
                            <span className="text-3xl font-bold">€{plan.price.monthly}</span>
                            <span className="ml-1 text-muted-foreground">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Features</h3>
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {plan.limitations.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Limitations</h3>
                                <ul className="space-y-2">
                                  {plan.limitations.map((limitation, i) => (
                                    <li key={i} className="flex items-start text-muted-foreground">
                                      <span className="mr-2">•</span>
                                      <span>{limitation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
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
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="yearly" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  {pricingPlans.map((plan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <Card
                        className={`flex flex-col h-full ${
                          plan.popular ? "border-rose-500 shadow-lg shadow-rose-100" : ""
                        }`}
                      >
                        {plan.popular && (
                          <div className="bg-rose-500 text-white text-center py-1 text-sm font-medium">
                            Most Popular
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4 flex items-baseline">
                            <span className="text-3xl font-bold">€{plan.price.yearly}</span>
                            <span className="ml-1 text-muted-foreground">/year</span>
                          </div>
                          {plan.price.yearly !== "0" && (
                            <p className="text-sm text-green-600 mt-1">Save 20% with annual billing</p>
                          )}
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Features</h3>
                              <ul className="space-y-2">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {plan.limitations.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Limitations</h3>
                                <ul className="space-y-2">
                                  {plan.limitations.map((limitation, i) => (
                                    <li key={i} className="flex items-start text-muted-foreground">
                                      <span className="mr-2">•</span>
                                      <span>{limitation}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
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
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16 max-w-3xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  Have questions about our pricing plans? Find answers to common questions below.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We offer custom solutions for large driving school chains and special requirements. Contact our sales
                team to discuss your needs.
              </p>
              <Link href="/contact">
                <Button size="lg">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                What Our Customers Say
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Hear from driving schools that have grown their business with Fahrschulfinder
              </motion.p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Thomas K."
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Thomas K.</h3>
                    <p className="text-sm text-muted-foreground">Fahrschule Express, Munich</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Since listing our driving school on Fahrschulfinder, we've seen a 40% increase in new students. The
                  platform is easy to use and the dashboard provides valuable insights."
                </p>
              </motion.div>

              <motion.div
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Maria S."
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Maria S.</h3>
                    <p className="text-sm text-muted-foreground">City Fahrschule, Berlin</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The Premium plan has been a game-changer for our driving school. The enhanced profile and highlighted
                  search results have significantly increased our visibility and bookings."
                </p>
              </motion.div>

              <motion.div
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Jan B."
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Jan B.</h3>
                    <p className="text-sm text-muted-foreground">Drive Easy, Hamburg</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a small driving school, the Basic plan gave us the online presence we needed without breaking the
                  bank. We've since upgraded to Premium as our business has grown."
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to Grow Your Driving School?
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Join hundreds of driving schools already using Fahrschulfinder to attract new students.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/school/register">
                  <Button size="lg" variant="secondary">
                    Register Your School
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-rose-600 hover:bg-rose-700 text-white">
                    Contact Sales
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
