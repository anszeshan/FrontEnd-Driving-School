"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function FAQPage() {
  const categories = [
    { id: "general", name: "General" },
    { id: "students", name: "For Students" },
    { id: "schools", name: "For Driving Schools" },
    { id: "pricing", name: "Pricing & Billing" },
    { id: "technical", name: "Technical" },
  ]

  const faqs = {
    general: [
      {
        question: "What is Fahrschulfinder?",
        answer:
          "Fahrschulfinder is a platform that helps students find and compare driving schools in their area. We provide detailed information about each school, including pricing, services, and reviews, to help students make an informed decision.",
      },
      {
        question: "How does Fahrschulfinder work?",
        answer:
          "Fahrschulfinder allows you to compare driving schools in your area based on price, services, and reviews. Simply select your city, browse the available schools, and use our price calculator to estimate the total cost based on your specific needs.",
      },
      {
        question: "Is Fahrschulfinder available in my city?",
        answer:
          "Fahrschulfinder is currently available in over 100 cities across Germany. You can check if your city is covered by using the city selector on our homepage.",
      },
      {
        question: "Who can use Fahrschulfinder?",
        answer:
          "Fahrschulfinder is designed for anyone looking for a driving school, whether you're a first-time driver, looking to upgrade your license, or need a refresher course. It's also a platform for driving schools to showcase their services and attract new students.",
      },
      {
        question: "How do I contact Fahrschulfinder?",
        answer:
          "You can contact us through our Contact page, where you'll find a contact form, email address, and phone number. We're available Monday through Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM.",
      },
    ],
    students: [
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
        question: "How do I leave a review for a driving school?",
        answer:
          "After completing your driving education with a school listed on Fahrschulfinder, you can leave a review on their profile page. You'll need to create an account or log in to submit a review.",
      },
      {
        question: "What should I consider when choosing a driving school?",
        answer:
          "When choosing a driving school, consider factors such as price, location, instructor qualifications, pass rates, available services (like intensive courses or foreign language instruction), and reviews from other students. Our comparison tool helps you evaluate these factors side by side.",
      },
    ],
    schools: [
      {
        question: "How do I list my driving school on Fahrschulfinder?",
        answer:
          "You can register your driving school by clicking on the 'For Driving Schools' link in the footer and following the registration process. We offer different listing options to suit your needs and budget.",
      },
      {
        question: "What are the benefits of listing my driving school?",
        answer:
          "Listing your driving school on Fahrschulfinder increases your visibility to potential students in your area. Our platform helps you showcase your services, pricing, and unique selling points, and allows students to contact you directly.",
      },
      {
        question: "How do I update my driving school's information?",
        answer:
          "Once registered, you can log in to your dashboard to update your school's information, including contact details, services, pricing, and photos. Changes are typically reflected on the platform within 24 hours.",
      },
      {
        question: "Can I respond to reviews about my driving school?",
        answer:
          "Yes, as a registered driving school, you can respond to reviews left by students. This allows you to address any concerns and showcase your commitment to customer satisfaction.",
      },
      {
        question: "How can I make my driving school stand out on Fahrschulfinder?",
        answer:
          "To make your driving school stand out, consider upgrading to a Premium or Professional plan, which offers enhanced visibility and features. Additionally, encourage satisfied students to leave positive reviews, keep your information up-to-date, and highlight your unique selling points.",
      },
    ],
    pricing: [
      {
        question: "What are the pricing plans for driving schools?",
        answer:
          "We offer three pricing plans for driving schools: Basic (free), Premium (€29.99/month), and Professional (€79.99/month). Each plan offers different features and levels of visibility. You can find detailed information on our Pricing page.",
      },
      {
        question: "Is there a free trial for premium plans?",
        answer:
          "Yes, we offer a 14-day free trial for our Premium plan. This allows you to experience the benefits of enhanced visibility and features before committing to a subscription.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers for annual plans. For monthly plans, we accept credit cards and PayPal.",
      },
      {
        question: "Do you offer discounts for non-profits or educational institutions?",
        answer:
          "Yes, we offer special pricing for non-profit organizations and educational institutions. Please contact our sales team for more information.",
      },
    ],
    technical: [
      {
        question: "How do I reset my password?",
        answer:
          "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
      },
      {
        question: "Is my data secure on Fahrschulfinder?",
        answer:
          "Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your personal information. You can read more about our data protection practices in our Privacy Policy.",
      },
      {
        question: "Can I integrate Fahrschulfinder with my driving school's website?",
        answer:
          "Yes, our Professional plan includes API access that allows you to integrate Fahrschulfinder with your website. This can include displaying your profile information, reviews, or even embedding our price calculator.",
      },
      {
        question: "What browsers are supported by Fahrschulfinder?",
        answer:
          "Fahrschulfinder supports all modern browsers, including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience.",
      },
      {
        question: "Is there a mobile app for Fahrschulfinder?",
        answer:
          "Currently, we don't have a dedicated mobile app, but our website is fully responsive and optimized for mobile devices. You can access all features of Fahrschulfinder from your smartphone or tablet.",
      },
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h1
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Frequently Asked Questions
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find answers to common questions about Fahrschulfinder
              </motion.p>
            </div>

            <motion.div
              className="max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search for answers..." className="pl-10 py-6 text-base" />
              </div>
            </motion.div>

            <Tabs defaultValue="general" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(faqs).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                If you couldn't find the answer to your question, feel free to contact our support team.
              </p>
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
