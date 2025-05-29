"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, ChevronRight, Star, CheckCircle, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import CitySelector from "@/components/city-selector"
import SchoolCard from "@/components/school-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TestimonialCard from "@/components/testimonial-card"
import PricingCard from "@/components/pricing-card"
import { mockSchools } from "@/lib/mock-data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("")
  const [showComparison, setShowComparison] = useState(false)

  const filteredSchools = selectedCity ? mockSchools.filter((school) => school.city === selectedCity) : []

  const pricingPlans = [
    {
      name: "Basic",
      price: "0",
      description: "For driving schools just getting started",
      features: [
        "Basic profile listing",
        "Contact information display",
        "Up to 3 services listed",
        "Standard position in search results",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "29.99",
      description: "For established driving schools",
      features: [
        "Enhanced profile with photos",
        "Highlighted in search results",
        "Unlimited services listed",
        "Customer reviews management",
        "Basic analytics dashboard",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Professional",
      price: "79.99",
      description: "For driving school chains and large operations",
      features: [
        "All Premium features",
        "Multiple location management",
        "Featured placement in search results",
        "Advanced analytics and reporting",
        "Dedicated support",
        "API access for integration",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const testimonials = [
    {
      name: "Addison M.",
      role: "New Driver",
      content:
        "Fahrschulfinder helped me find the perfect driving school for my needs. I was able to compare prices and read reviews before making my decision. I passed my test on the first try!",
      avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
    },
    {
      name: "Thomas K.",
      role: "Driving School Owner",
      content:
        "Since listing our driving school on Fahrschulfinder, we've seen a 40% increase in new students. The platform is easy to use and the dashboard provides valuable insights.",
      avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
    },
    {
      name: "John B.",
      role: "Parent",
      content:
        "I used Fahrschulfinder to find a reliable driving school for my teenager. The comparison tool made it easy to find a school with good reviews and reasonable prices in our area.",
      avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 4,
    },
  ]

  const stats = [
    { value: "500+", label: "Driving Schools", icon: <Users className="h-6 w-6 text-rose-500" /> },
    { value: "50,000+", label: "Satisfied Students", icon: <CheckCircle className="h-6 w-6 text-rose-500" /> },
    { value: "100+", label: "Cities Covered", icon: <MapPin className="h-6 w-6 text-rose-500" /> },
    { value: "95%", label: "Pass Rate", icon: <Award className="h-6 w-6 text-rose-500" /> },
  ]

  const faqs = [
    {
      question: "How does Fahrschulfinder work?",
      answer:
        "Fahrschulfinder allows you to compare driving schools in your area based on price, services, and reviews. Simply select your city, browse the available schools, and use our price calculator to estimate the total cost based on your specific needs.",
    },
    {
      question: "Is Fahrschulfinder free to use?",
      answer:
        "Yes, Fahrschulfinder is completely free for students and individuals looking for driving schools. We offer premium listing options for driving schools that want to enhance their visibility on our platform.",
    },
    {
      question: "How accurate are the prices shown?",
      answer:
        "The prices shown are provided directly by the driving schools and are updated regularly. Our price calculator gives you an estimate based on your specific requirements, but the final price may vary depending on individual circumstances.",
    },
    {
      question: "Can I book driving lessons through Fahrschulfinder?",
      answer:
        "Currently, you cannot book lessons directly through our platform. However, you can contact the driving schools through their profile page to inquire about availability and booking.",
    },
    {
      question: "I own a driving school. How can I list it on Fahrschulfinder?",
      answer:
        "You can register your driving school by clicking on the 'For Driving Schools' link in the footer and following the registration process. We offer different listing options to suit your needs and budget.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-rose-50">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge className="mb-2" variant="outline">
                      #1 Driving School Comparison Platform
                    </Badge>
                  </motion.div>
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Find Your Perfect <span className="text-rose-500">Driving School</span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Compare driving schools easily and transparently. Find the best prices, services, and reviews all in
                    one place.
                  </motion.p>
                </div>
                <motion.div
                  className="w-full max-w-md space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex flex-col space-y-2">
                    <CitySelector onCitySelect={setSelectedCity} />
                    <Button onClick={() => setShowComparison(true)} disabled={!selectedCity} className="w-full">
                      Compare Driving Schools
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src="https://thumbs.dreamstime.com/b/driving-lessons-school-autoclass-class-next-to-car-there-chairs-wheels-form-road-signs-waiting-students-153575727.jpg"
                  alt="Driving school illustration"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Results (Conditional) */}
        {showComparison && selectedCity && (
          <motion.section
            className="w-full py-12 md:py-16 bg-muted/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
              <div className="flex flex-col items-start gap-4 md:gap-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Driving Schools in {selectedCity}</h2>
                  <p className="text-muted-foreground">Compare {filteredSchools.length} driving schools in your area</p>
                </div>
                <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSchools.map((school) => (
                    <SchoolCard key={school.id} school={school} />
                  ))}
                </div>
                <div className="w-full flex justify-center mt-4">
                  <Link href={`/comparison?city=${selectedCity}`}>
                    <Button size="lg">
                      View Detailed Comparison
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find and compare driving schools in just a few simple steps
                </p>
              </motion.div>
              <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-3">
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <MapPin className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">Select Your City</h3>
                  <p className="text-center text-muted-foreground">
                    Choose your location to find driving schools near you
                  </p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <Search className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">Compare Schools</h3>
                  <p className="text-center text-muted-foreground">View and compare prices, services, and reviews</p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <Star className="h-8 w-8 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold">Choose the Best</h3>
                  <p className="text-center text-muted-foreground">
                    Select the driving school that fits your needs and budget
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
   
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Trusted by thousands of students and driving schools across the country
                </p>
              </motion.div>
              <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find answers to common questions about Fahrschulfinder
                </p>
              </motion.div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Ready to Find Your Perfect Driving School?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of satisfied students who found their ideal driving school with Fahrschulfinder.
                </p>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/comparison">
                  <Button size="lg" variant="secondary">
                    Compare Schools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="bg-rose-600 hover:bg-rose-700 text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Search, MapPin, ChevronRight, Star, CheckCircle, Users, Award, ArrowRight } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"

// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import CitySelector from "@/components/city-selector"
// import SchoolCard from "@/components/school-card"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import TestimonialCard from "@/components/testimonial-card"
// import PricingCard from "@/components/pricing-card"
// import { mockSchools } from "@/lib/mock-data"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// export default function HomePage() {
//   const [selectedCity, setSelectedCity] = useState("")
//   const [showComparison, setShowComparison] = useState(false)

//   const filteredSchools = selectedCity ? mockSchools.filter((school) => school.city === selectedCity) : []

//   const pricingPlans = [
//     {
//       name: "Basic",
//       price: "0",
//       description: "For driving schools just getting started",
//       features: [
//         "Basic profile listing",
//         "Contact information display",
//         "Up to 3 services listed",
//         "Standard position in search results",
//       ],
//       cta: "Get Started",
//       popular: false,
//     },
//     {
//       name: "Premium",
//       price: "29.99",
//       description: "For established driving schools",
//       features: [
//         "Enhanced profile with photos",
//         "Highlighted in search results",
//         "Unlimited services listed",
//         "Customer reviews management",
//         "Basic analytics dashboard",
//       ],
//       cta: "Start Free Trial",
//       popular: true,
//     },
//     {
//       name: "Professional",
//       price: "79.99",
//       description: "For driving school chains and large operations",
//       features: [
//         "All Premium features",
//         "Multiple location management",
//         "Featured placement in search results",
//         "Advanced analytics and reporting",
//         "Dedicated support",
//         "API access for integration",
//       ],
//       cta: "Contact Sales",
//       popular: false,
//     },
//   ]

//   const testimonials = [
//     {
//       name: "Sarah M.",
//       role: "New Driver",
//       content:
//         "Fahrschulfinder helped me find the perfect driving school for my needs. I was able to compare prices and read reviews before making my decision. I passed my test on the first try!",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 5,
//     },
//     {
//       name: "Thomas K.",
//       role: "Driving School Owner",
//       content:
//         "Since listing our driving school on Fahrschulfinder, we've seen a 40% increase in new students. The platform is easy to use and the dashboard provides valuable insights.",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 5,
//     },
//     {
//       name: "Julia B.",
//       role: "Parent",
//       content:
//         "I used Fahrschulfinder to find a reliable driving school for my teenager. The comparison tool made it easy to find a school with good reviews and reasonable prices in our area.",
//       avatar: "/placeholder.svg?height=80&width=80",
//       rating: 4,
//     },
//   ]

//   const stats = [
//     { value: "500+", label: "Driving Schools", icon: <Users className="h-6 w-6 text-rose-500" /> },
//     { value: "50,000+", label: "Satisfied Students", icon: <CheckCircle className="h-6 w-6 text-rose-500" /> },
//     { value: "100+", label: "Cities Covered", icon: <MapPin className="h-6 w-6 text-rose-500" /> },
//     { value: "95%", label: "Pass Rate", icon: <Award className="h-6 w-6 text-rose-500" /> },
//   ]

//   const faqs = [
//     {
//       question: "How does Fahrschulfinder work?",
//       answer:
//         "Fahrschulfinder allows you to compare driving schools in your area based on price, services, and reviews. Simply select your city, browse the available schools, and use our price calculator to estimate the total cost based on your specific needs.",
//     },
//     {
//       question: "Is Fahrschulfinder free to use?",
//       answer:
//         "Yes, Fahrschulfinder is completely free for students and individuals looking for driving schools. We offer premium listing options for driving schools that want to enhance their visibility on our platform.",
//     },
//     {
//       question: "How accurate are the prices shown?",
//       answer:
//         "The prices shown are provided directly by the driving schools and are updated regularly. Our price calculator gives you an estimate based on your specific requirements, but the final price may vary depending on individual circumstances.",
//     },
//     {
//       question: "Can I book driving lessons through Fahrschulfinder?",
//       answer:
//         "Currently, you cannot book lessons directly through our platform. However, you can contact the driving schools through their profile page to inquire about availability and booking.",
//     },
//     {
//       question: "I own a driving school. How can I list it on Fahrschulfinder?",
//       answer:
//         "You can register your driving school by clicking on the 'For Driving Schools' link in the footer and following the registration process. We offer different listing options to suit your needs and budget.",
//     },
//   ]

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-rose-50">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Badge className="mb-2" variant="outline">
//                       #1 Driving School Comparison Platform
//                     </Badge>
//                   </motion.div>
//                   <motion.h1
//                     className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.1 }}
//                   >
//                     Find Your Perfect <span className="text-rose-500">Driving School</span>
//                   </motion.h1>
//                   <motion.p
//                     className="max-w-[600px] text-muted-foreground md:text-xl"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                   >
//                     Compare driving schools easily and transparently. Find the best prices, services, and reviews all in
//                     one place.
//                   </motion.p>
//                 </div>
//                 <motion.div
//                   className="w-full max-w-md space-y-2"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                 >
//                   <div className="flex flex-col space-y-2">
//                     <CitySelector onCitySelect={setSelectedCity} />
//                     <Button onClick={() => setShowComparison(true)} disabled={!selectedCity} className="w-full">
//                       Compare Driving Schools
//                       <ChevronRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </div>
//                 </motion.div>
//               </div>
//               <motion.div
//                 className="flex items-center justify-center"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//               >
//                 <Image
//                   src="/placeholder.svg?height=500&width=500"
//                   alt="Driving school illustration"
//                   width={500}
//                   height={500}
//                   className="rounded-lg object-cover"
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="w-full py-12 md:py-16 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col items-center text-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="mb-2">{stat.icon}</div>
//                   <div className="text-3xl font-bold">{stat.value}</div>
//                   <div className="text-muted-foreground">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Comparison Results (Conditional) */}
//         {showComparison && selectedCity && (
//           <motion.section
//             className="w-full py-12 md:py-16 bg-muted/30"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="container px-4 md:px-6">
//               <div className="flex flex-col items-start gap-4 md:gap-8">
//                 <div>
//                   <h2 className="text-3xl font-bold tracking-tight">Driving Schools in {selectedCity}</h2>
//                   <p className="text-muted-foreground">Compare {filteredSchools.length} driving schools in your area</p>
//                 </div>
//                 <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
//                   {filteredSchools.map((school) => (
//                     <SchoolCard key={school.id} school={school} />
//                   ))}
//                 </div>
//                 <div className="w-full flex justify-center mt-4">
//                   <Link href={`/comparison?city=${selectedCity}`}>
//                     <Button size="lg">
//                       View Detailed Comparison
//                       <ChevronRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </motion.section>
//         )}

//         {/* How It Works Section */}
//         <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <motion.div
//                 className="space-y-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Find and compare driving schools in just a few simple steps
//                 </p>
//               </motion.div>
//               <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-3">
//                 <motion.div
//                   className="flex flex-col items-center space-y-4"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
//                     <MapPin className="h-8 w-8 text-rose-500" />
//                   </div>
//                   <h3 className="text-xl font-bold">Select Your City</h3>
//                   <p className="text-center text-muted-foreground">
//                     Choose your location to find driving schools near you
//                   </p>
//                 </motion.div>
//                 <motion.div
//                   className="flex flex-col items-center space-y-4"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
//                     <Search className="h-8 w-8 text-rose-500" />
//                   </div>
//                   <h3 className="text-xl font-bold">Compare Schools</h3>
//                   <p className="text-center text-muted-foreground">View and compare prices, services, and reviews</p>
//                 </motion.div>
//                 <motion.div
//                   className="flex flex-col items-center space-y-4"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
//                     <Star className="h-8 w-8 text-rose-500" />
//                   </div>
//                   <h3 className="text-xl font-bold">Choose the Best</h3>
//                   <p className="text-center text-muted-foreground">
//                     Select the driving school that fits your needs and budget
//                   </p>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Pricing Plans Section */}
   
//         {/* Testimonials Section */}
//         <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <motion.div
//                 className="space-y-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Trusted by thousands of students and driving schools across the country
//                 </p>
//               </motion.div>
//               <div className="mx-auto grid max-w-5xl gap-6 py-8 md:grid-cols-3">
//                 {testimonials.map((testimonial, index) => (
//                   <TestimonialCard key={index} testimonial={testimonial} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
//           <div className="container px-4 md:px-6 max-w-4xl">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
//               <motion.div
//                 className="space-y-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
//                   Frequently Asked Questions
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Find answers to common questions about Fahrschulfinder
//                 </p>
//               </motion.div>
//             </div>
//             <Accordion type="single" collapsible className="w-full">
//               {faqs.map((faq, index) => (
//                 <AccordionItem key={index} value={`item-${index}`}>
//                   <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
//                   <AccordionContent>{faq.answer}</AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//             <div className="mt-10 text-center">
//               <p className="text-muted-foreground mb-4">Still have questions?</p>
//               <Link href="/contact">
//                 <Button>Contact Us</Button>
//               </Link>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <motion.div
//                 className="space-y-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
//                   Ready to Find Your Perfect Driving School?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] md:text-xl">
//                   Join thousands of satisfied students who found their ideal driving school with Fahrschulfinder.
//                 </p>
//               </motion.div>
//               <div className="flex flex-col sm:flex-row gap-4 mt-6">
//                 <Link href="/comparison">
//                   <Button size="lg" variant="secondary">
//                     Compare Schools
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//                 <Link href="/about">
//                   <Button size="lg" variant="outline" className="bg-rose-600 hover:bg-rose-700 text-white">
//                     Learn More
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
