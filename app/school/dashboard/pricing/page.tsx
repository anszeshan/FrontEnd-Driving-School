"use client"

import { motion } from "framer-motion"
import { 
  BookOpen, GraduationCap, Shield, Globe, MessageSquare,
  Target, Users, Building2, Car, Calendar, Clock4, 
  FileText, MapPin, CheckCircle, AlertCircle, XCircle,
  TrendingUp, BarChart3, PieChart, LineChart, AreaChart,
  ScatterChart, Activity, ArrowRight
} from "lucide-react"
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card"
import SchoolDashboardLayout from "@/components/school-dashboard-layout"

export default function AboutPage() {
  return (
    <SchoolDashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold">About Fahrschulfinder</h1>
          <p className="text-xl text-muted-foreground">
            Revolutionizing Driving Education Management
          </p>
        </div>

        {/* 1. Vision & Mission */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Vision & Mission</CardTitle>
                <CardDescription>Our purpose and goals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Fahrschulfinder was born from a vision to transform the driving education landscape. 
              Our mission is to create a seamless, efficient, and transparent platform that connects 
              driving schools with students while maintaining the highest standards of quality and safety.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Vision</h3>
                <p className="text-sm text-muted-foreground">
                  To become the global leader in driving education management, setting new standards 
                  for quality, efficiency, and student success.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To empower driving schools with innovative tools and connect them with students 
                  through a transparent, efficient, and quality-focused platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Core Values */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle>Core Values</CardTitle>
                <CardDescription>The principles that guide us</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain the highest standards in driving education and platform quality.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We continuously evolve and improve our platform with cutting-edge technology.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in clear communication and honest relationships with all stakeholders.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. System Overview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>How our platform works</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Fahrschulfinder is a comprehensive platform that streamlines the entire driving 
                education ecosystem. Our system integrates multiple components to create a seamless 
                experience for both driving schools and students.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">For Driving Schools</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Complete school profile management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Resource and instructor tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Service and pricing management</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">For Students</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Easy school discovery and comparison</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Transparent pricing and reviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Progress tracking and scheduling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Key Features */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What makes us unique</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Smart Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithm to match students with the perfect driving school based on 
                  location, preferences, and requirements.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Quality Control</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive verification system for schools, instructors, and vehicles to 
                  ensure the highest standards.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed insights and analytics for schools to optimize their operations and 
                  improve student success rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. Technology Stack */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>Built with modern technology</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Our platform is built using cutting-edge technologies to ensure reliability, 
                scalability, and security.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Frontend</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Next.js for server-side rendering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>React for dynamic user interfaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Tailwind CSS for styling</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Backend</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Node.js and Express</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>MongoDB for data storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>JWT for authentication</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Security & Privacy */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>Your data is safe with us</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                We take security and privacy seriously. Our platform implements multiple layers 
                of protection to ensure your data remains secure.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Data Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    All sensitive data is encrypted using industry-standard protocols.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Access Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Role-based access control ensures data is only accessible to authorized users.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Regular Audits</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuous security monitoring and regular security audits.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Global Reach */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <Globe className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>Connecting driving schools worldwide</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Fahrschulfinder is designed to serve driving schools and students globally, 
                supporting multiple languages and international standards.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">International Support</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Multi-language interface</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>International license types</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Cross-border school networks</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Local Adaptation</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Country-specific regulations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Local payment methods</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Regional pricing support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 8. Future Roadmap */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle>Future Roadmap</CardTitle>
                <CardDescription>Our vision for the future</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                We're constantly evolving and expanding our platform to better serve the driving 
                education community.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">AI Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Implementing AI for better student-instructor matching and progress tracking.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Mobile App</h3>
                  <p className="text-sm text-muted-foreground">
                    Developing native mobile applications for both iOS and Android.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Virtual Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Expanding virtual learning capabilities for theory lessons.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 9. Support & Community */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <CardTitle>Support & Community</CardTitle>
                <CardDescription>We're here to help</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Our support team and community are dedicated to helping you succeed with 
                Fahrschulfinder.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Support Channels</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>24/7 Email Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Live Chat Assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Knowledge Base</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Community Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>User Forums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Success Stories</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Best Practices Sharing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 10. Contact Information */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with us</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  support@fahrschulfinder.com
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  123 Innovation Street<br />
                  Tech City, TC 12345
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SchoolDashboardLayout>
  )
}
