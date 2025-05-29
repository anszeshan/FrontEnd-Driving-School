"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Users, TrendingUp, Clock, Award, Filter, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SchoolDashboardLayout from "@/components/school-dashboard-layout"
import { LineChart, BarChart, PieChart } from "@/components/charts"

export default function SchoolStatisticsPage() {
  const [dateRange, setDateRange] = useState("30days")

  // Mock data for charts
  const inquiriesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Inquiries",
        data: [65, 78, 52, 91, 83, 106, 123, 131, 109, 98, 87, 95],
        borderColor: "#e11d48",
        backgroundColor: "rgba(225, 29, 72, 0.1)",
        tension: 0.4,
      },
    ],
  }

  const conversionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Inquiries",
        data: [65, 78, 52, 91, 83, 106, 123, 131, 109, 98, 87, 95],
        backgroundColor: "rgba(225, 29, 72, 0.2)",
      },
      {
        label: "Registrations",
        data: [28, 35, 19, 43, 41, 53, 62, 76, 51, 49, 39, 47],
        backgroundColor: "rgba(225, 29, 72, 0.8)",
      },
    ],
  }

  const packageDistributionData = {
    labels: ["Basic Package", "Intensive Package", "Premium Package"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#e11d48", "#f43f5e", "#fda4af"],
        borderWidth: 1,
      },
    ],
  }

  const studentDemographicsData = {
    labels: ["18-24", "25-34", "35-44", "45+"],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: ["#e11d48", "#f43f5e", "#fda4af", "#fecdd3"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <SchoolDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Statistics & Analytics</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Students</DropdownMenuItem>
              <DropdownMenuItem>New Students</DropdownMenuItem>
              <DropdownMenuItem>Completed Courses</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Inquiries</p>
                  <h3 className="text-2xl font-bold mt-1">1,248</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% from last period
                  </p>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <h3 className="text-2xl font-bold mt-1">48.2%</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3.7% from last period
                  </p>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Completion Time</p>
                  <h3 className="text-2xl font-bold mt-1">3.2 mo</h3>
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.3 mo from last period
                  </p>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                  <h3 className="text-2xl font-bold mt-1">92.7%</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1.3% from last period
                  </p>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inquiries vs. Registrations</CardTitle>
                <CardDescription>Comparison of inquiries and actual registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart data={conversionData} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Package Distribution</CardTitle>
                <CardDescription>Breakdown of package selections by students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={packageDistributionData} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Inquiries Trend</CardTitle>
              <CardDescription>Number of inquiries received over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart data={inquiriesData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Inquiry Sources</CardTitle>
              <CardDescription>Where your potential students are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PieChart
                  data={{
                    labels: ["Fahrschulfinder", "Direct Website", "Referrals", "Social Media", "Other"],
                    datasets: [
                      {
                        data: [45, 25, 15, 10, 5],
                        backgroundColor: ["#e11d48", "#f43f5e", "#fda4af", "#fecdd3", "#fff1f2"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inquiry Response Time</CardTitle>
              <CardDescription>Average time to respond to student inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Response Time (hours)",
                        data: [6.2, 5.8, 4.9, 4.5, 3.8, 3.2, 2.9, 2.7, 2.5, 2.3, 2.1, 2.0],
                        borderColor: "#e11d48",
                        backgroundColor: "rgba(225, 29, 72, 0.1)",
                        tension: 0.4,
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Age distribution of your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={studentDemographicsData} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>License Types</CardTitle>
                <CardDescription>Distribution of license types being pursued</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart
                    data={{
                      labels: ["Car (B)", "Motorcycle (A)", "Truck (C)", "Other"],
                      datasets: [
                        {
                          data: [70, 15, 10, 5],
                          backgroundColor: ["#e11d48", "#f43f5e", "#fda4af", "#fecdd3"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Satisfaction</CardTitle>
              <CardDescription>Average ratings over time (scale 1-5)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Satisfaction Rating",
                        data: [4.2, 4.3, 4.1, 4.4, 4.5, 4.6, 4.7, 4.8, 4.7, 4.8, 4.9, 4.9],
                        borderColor: "#e11d48",
                        backgroundColor: "rgba(225, 29, 72, 0.1)",
                        tension: 0.4,
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue trends over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Revenue (€)",
                        data: [15200, 16800, 14500, 18900, 19500, 22400, 25800, 28300, 24600, 23100, 21500, 24800],
                        borderColor: "#e11d48",
                        backgroundColor: "rgba(225, 29, 72, 0.1)",
                        tension: 0.4,
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Package</CardTitle>
                <CardDescription>Distribution of revenue across packages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart
                    data={{
                      labels: ["Basic Package", "Intensive Package", "Premium Package", "Individual Lessons"],
                      datasets: [
                        {
                          data: [40, 30, 20, 10],
                          backgroundColor: ["#e11d48", "#f43f5e", "#fda4af", "#fecdd3"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Revenue per Student</CardTitle>
                <CardDescription>Trend of average revenue per student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                      datasets: [
                        {
                          label: "Avg. Revenue (€)",
                          data: [1520, 1580, 1490, 1610, 1650, 1680, 1720, 1750, 1780, 1800, 1820, 1850],
                          borderColor: "#e11d48",
                          backgroundColor: "rgba(225, 29, 72, 0.1)",
                          tension: 0.4,
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </SchoolDashboardLayout>
  )
}
