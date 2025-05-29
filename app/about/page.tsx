"use client"

import { motion } from "framer-motion"
import { Users, Award, Clock, MapPin, Target, Lightbulb, Zap, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Anna Schmidt",
      role: "Founder & CEO",
      bio: "Former driving instructor with 15 years of experience. Founded Fahrschulfinder to make finding the right driving school easier for everyone.",
      image: "data:image/jpeg;base64,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",
    },
    {
      name: "Markus Weber",
      role: "CTO",
      bio: "Tech enthusiast with a background in software engineering. Leads the development of Fahrschulfinder's platform and features.",
          image: "data:image/jpeg;base64,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",

    },
    {
      name: "Jula Becker",
      role: "Head of Partnerships",
      bio: "Builds relationships with driving schools across the country. Ensures that our platform offers the best selection of schools.",
           image: "data:image/jpeg;base64,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",

    },
    {
      name: "Thomas Müller",
      role: "Marketing Director",
      bio: "Digital marketing expert who helps driving schools grow their business through Fahrschulfinder's platform.",
           image: "data:image/jpeg;base64,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",

    },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8 text-rose-500" />,
      title: "Transparency",
      description:
        "We believe in providing clear, honest information about driving schools, including pricing, services, and reviews.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-rose-500" />,
      title: "Innovation",
      description:
        "We continuously improve our platform to offer the best experience for both students and driving schools.",
    },
    {
      icon: <Zap className="h-8 w-8 text-rose-500" />,
      title: "Efficiency",
      description:
        "We streamline the process of finding and comparing driving schools, saving time and effort for our users.",
    },
    {
      icon: <Shield className="h-8 w-8 text-rose-500" />,
      title: "Quality",
      description:
        "We partner with reputable driving schools to ensure our users receive high-quality driving education.",
    },
  ]

  const stats = [
    { value: "2018", label: "Founded", icon: <Clock className="h-6 w-6 text-rose-500" /> },
    { value: "500+", label: "Driving Schools", icon: <Users className="h-6 w-6 text-rose-500" /> },
    { value: "100+", label: "Cities Covered", icon: <MapPin className="h-6 w-6 text-rose-500" /> },
    { value: "50,000+", label: "Students Helped", icon: <Award className="h-6 w-6 text-rose-500" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    About <span className="text-rose-500">Fahrschulfinder</span>
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    We're on a mission to make finding the perfect driving school simple, transparent, and stress-free.
                  </motion.p>
                </div>
                <motion.p
                  className="max-w-[600px] text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Founded in 2018, Fahrschulfinder has grown to become the leading platform for comparing driving
                  schools across Germany. We help thousands of students find their ideal driving school every month,
                  while providing driving schools with a platform to showcase their services and attract new students.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link href="/contact">
                    <Button>Contact Us</Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src="https://www.shutterstock.com/image-vector/man-learning-drive-car-on-260nw-2581509471.jpg"
                  alt="About Fahrschulfinder"
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

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                How Fahrschulfinder came to be and our journey so far
              </motion.p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Image
                  src="https://thumbs.dreamstime.com/b/our-story-us-concept-words-unique-arrangement-white-background-49261141.jpg"
                  alt="Our journey"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold">From Idea to Reality</h3>
                <p className="text-muted-foreground">
                  Fahrschulfinder began with a simple observation: finding the right driving school was unnecessarily
                  complicated. Our founder, Anna Schmidt, a former driving instructor, noticed that students often
                  struggled to compare schools based on price, quality, and services.
                </p>
                <p className="text-muted-foreground">
                  In 2018, Anna teamed up with tech expert Markus Weber to create a platform that would make this
                  process easier. They started with just 20 driving schools in Berlin, and quickly expanded as both
                  students and schools saw the value in the service.
                </p>
                <p className="text-muted-foreground">
                  Today, Fahrschulfinder covers over 100 cities across Germany, helping thousands of students find their
                  perfect driving school every month. We continue to innovate and improve our platform, always keeping
                  our original mission in mind: making driving education more accessible and transparent for everyone.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Our Values
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                The principles that guide everything we do
              </motion.p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                The people behind Fahrschulfinder
              </motion.p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 rounded-full overflow-hidden w-32 h-32">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-rose-500 mb-2">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </motion.div>
              ))}
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
                Join Our Mission
              </motion.h2>
              <motion.p
                className="mx-auto max-w-[700px] md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Whether you're a student looking for a driving school or a driving school looking to grow, we're here to
                help.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Link href="/comparison">
                  <Button size="lg" variant="secondary">
                    Find a Driving School
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="bg-rose-600 hover:bg-rose-700 text-white">
                    For Driving Schools
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


// "use client"

// import { motion } from "framer-motion"
// import { Users, Award, Clock, MapPin, Target, Lightbulb, Zap, Shield } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"

// export default function AboutPage() {
//   const teamMembers = [
//     {
//       name: "Anna Schmidt",
//       role: "Founder & CEO",
//       bio: "Former driving instructor with 15 years of experience. Founded Fahrschulfinder to make finding the right driving school easier for everyone.",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Markus Weber",
//       role: "CTO",
//       bio: "Tech enthusiast with a background in software engineering. Leads the development of Fahrschulfinder's platform and features.",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Julia Becker",
//       role: "Head of Partnerships",
//       bio: "Builds relationships with driving schools across the country. Ensures that our platform offers the best selection of schools.",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//     {
//       name: "Thomas Müller",
//       role: "Marketing Director",
//       bio: "Digital marketing expert who helps driving schools grow their business through Fahrschulfinder's platform.",
//       image: "/placeholder.svg?height=300&width=300",
//     },
//   ]

//   const values = [
//     {
//       icon: <Target className="h-8 w-8 text-rose-500" />,
//       title: "Transparency",
//       description:
//         "We believe in providing clear, honest information about driving schools, including pricing, services, and reviews.",
//     },
//     {
//       icon: <Lightbulb className="h-8 w-8 text-rose-500" />,
//       title: "Innovation",
//       description:
//         "We continuously improve our platform to offer the best experience for both students and driving schools.",
//     },
//     {
//       icon: <Zap className="h-8 w-8 text-rose-500" />,
//       title: "Efficiency",
//       description:
//         "We streamline the process of finding and comparing driving schools, saving time and effort for our users.",
//     },
//     {
//       icon: <Shield className="h-8 w-8 text-rose-500" />,
//       title: "Quality",
//       description:
//         "We partner with reputable driving schools to ensure our users receive high-quality driving education.",
//     },
//   ]

//   const stats = [
//     { value: "2018", label: "Founded", icon: <Clock className="h-6 w-6 text-rose-500" /> },
//     { value: "500+", label: "Driving Schools", icon: <Users className="h-6 w-6 text-rose-500" /> },
//     { value: "100+", label: "Cities Covered", icon: <MapPin className="h-6 w-6 text-rose-500" /> },
//     { value: "50,000+", label: "Students Helped", icon: <Award className="h-6 w-6 text-rose-500" /> },
//   ]

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <motion.h1
//                     className="text-3xl font-bold tracking-tighter sm:text-5xl"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     About <span className="text-rose-500">Fahrschulfinder</span>
//                   </motion.h1>
//                   <motion.p
//                     className="max-w-[600px] text-muted-foreground md:text-xl"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.1 }}
//                   >
//                     We're on a mission to make finding the perfect driving school simple, transparent, and stress-free.
//                   </motion.p>
//                 </div>
//                 <motion.p
//                   className="max-w-[600px] text-muted-foreground"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.2 }}
//                 >
//                   Founded in 2018, Fahrschulfinder has grown to become the leading platform for comparing driving
//                   schools across Germany. We help thousands of students find their ideal driving school every month,
//                   while providing driving schools with a platform to showcase their services and attract new students.
//                 </motion.p>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 }}
//                 >
//                   <Link href="/contact">
//                     <Button>Contact Us</Button>
//                   </Link>
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
//                   alt="About Fahrschulfinder"
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

//         {/* Our Story Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
//               <motion.h2
//                 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 Our Story
//               </motion.h2>
//               <motion.p
//                 className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 How Fahrschulfinder came to be and our journey so far
//               </motion.p>
//             </div>
//             <div className="grid gap-10 md:grid-cols-2 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <Image
//                   src="/placeholder.svg?height=400&width=600"
//                   alt="Our journey"
//                   width={600}
//                   height={400}
//                   className="rounded-lg object-cover"
//                 />
//               </motion.div>
//               <motion.div
//                 className="space-y-4"
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h3 className="text-2xl font-bold">From Idea to Reality</h3>
//                 <p className="text-muted-foreground">
//                   Fahrschulfinder began with a simple observation: finding the right driving school was unnecessarily
//                   complicated. Our founder, Anna Schmidt, a former driving instructor, noticed that students often
//                   struggled to compare schools based on price, quality, and services.
//                 </p>
//                 <p className="text-muted-foreground">
//                   In 2018, Anna teamed up with tech expert Markus Weber to create a platform that would make this
//                   process easier. They started with just 20 driving schools in Berlin, and quickly expanded as both
//                   students and schools saw the value in the service.
//                 </p>
//                 <p className="text-muted-foreground">
//                   Today, Fahrschulfinder covers over 100 cities across Germany, helping thousands of students find their
//                   perfect driving school every month. We continue to innovate and improve our platform, always keeping
//                   our original mission in mind: making driving education more accessible and transparent for everyone.
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Our Values Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
//               <motion.h2
//                 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 Our Values
//               </motion.h2>
//               <motion.p
//                 className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 The principles that guide everything we do
//               </motion.p>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {values.map((value, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="mb-4">{value.icon}</div>
//                   <h3 className="text-xl font-bold mb-2">{value.title}</h3>
//                   <p className="text-muted-foreground">{value.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
//               <motion.h2
//                 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 Meet Our Team
//               </motion.h2>
//               <motion.p
//                 className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 The people behind Fahrschulfinder
//               </motion.p>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {teamMembers.map((member, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col items-center text-center"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="mb-4 rounded-full overflow-hidden w-32 h-32">
//                     <Image
//                       src={member.image || "/placeholder.svg"}
//                       alt={member.name}
//                       width={128}
//                       height={128}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                   <h3 className="text-xl font-bold">{member.name}</h3>
//                   <p className="text-rose-500 mb-2">{member.role}</p>
//                   <p className="text-muted-foreground">{member.bio}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-500 text-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <motion.h2
//                 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 Join Our Mission
//               </motion.h2>
//               <motion.p
//                 className="mx-auto max-w-[700px] md:text-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 Whether you're a student looking for a driving school or a driving school looking to grow, we're here to
//                 help.
//               </motion.p>
//               <motion.div
//                 className="flex flex-col sm:flex-row gap-4 mt-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <Link href="/comparison">
//                   <Button size="lg" variant="secondary">
//                     Find a Driving School
//                   </Button>
//                 </Link>
//                 <Link href="/pricing">
//                   <Button size="lg" variant="outline" className="bg-rose-600 hover:bg-rose-700 text-white">
//                     For Driving Schools
//                   </Button>
//                 </Link>
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
