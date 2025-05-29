"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Building, MapPin, Car, Clock } from "lucide-react";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SchoolDashboardLayout from "@/components/school-dashboard-layout";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

export default function SchoolDashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("https://backend-ds-blue.vercel.app/api/school/dashboard");
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  // Prepare chart data
  // 1. Services Distribution (Bar Chart)
  const servicesChartData = {
    labels: Object.keys(dashboardData.servicesCount).map(key => key.replace(/([A-Z])/g, ' $1').trim()),
    datasets: [
      {
        label: "Number of Schools Offering",
        data: Object.values(dashboardData.servicesCount),
        backgroundColor: "rgba(225, 29, 72, 0.6)",
        borderColor: "#e11d48",
        borderWidth: 1,
      },
    ],
  };

  // 2. Schools by City (Pie Chart)
  const cityChartData = {
    labels: Object.keys(dashboardData.schoolsByCity),
    datasets: [
      {
        data: Object.values(dashboardData.schoolsByCity),
        backgroundColor: ["#e11d48", "#f43f5e", "#fda4af", "#fecdd3", "#fff1f2"],
        borderWidth: 1,
      },
    ],
  };

  // 3. Founded Year Trend (Line Chart)
  const foundedYearChartData = {
    labels: Object.keys(dashboardData.foundedYearTrend).sort(),
    datasets: [
      {
        label: "Schools Founded",
        data: Object.keys(dashboardData.foundedYearTrend)
          .sort()
          .map(year => dashboardData.foundedYearTrend[year]),
        borderColor: "#e11d48",
        backgroundColor: "rgba(225, 29, 72, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // 4. Average Prices (Bar Chart)
  const pricesChartData = {
    labels: Object.keys(dashboardData.avgPrices).map(key => key.replace(/([A-Z])/g, ' $1').trim()),
    datasets: [
      {
        label: "Average Price (€)",
        data: Object.values(dashboardData.avgPrices),
        backgroundColor: "rgba(225, 29, 72, 0.6)",
        borderColor: "#e11d48",
        borderWidth: 1,
      },
    ],
  };

  // 5. Instructors and Vehicles (Bar Chart)
  const resourcesChartData = {
    labels: ["Instructors", "Vehicles"],
    datasets: [
      {
        label: "Average per School",
        data: [dashboardData.avgInstructors, dashboardData.avgVehicles],
        backgroundColor: "rgba(225, 29, 72, 0.6)",
        borderColor: "#e11d48",
        borderWidth: 1,
      },
    ],
  };

  // 6. Weekend Availability (Pie Chart)
  const weekendChartData = {
    labels: ["Open on Saturday", "Open on Sunday", "Closed on Weekends"],
    datasets: [
      {
        data: [
          dashboardData.weekendAvailability.openSaturday,
          dashboardData.weekendAvailability.openSunday,
          dashboardData.weekendAvailability.closedWeekends,
        ],
        backgroundColor: ["#e11d48", "#f43f5e", "#fda4af"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SchoolDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">School Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Schools</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboardData.totalSchools}</h3>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Instructors</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboardData.avgInstructors}</h3>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Vehicles</p>
                  <h3 className="text-2xl font-bold mt-1">{dashboardData.avgVehicles}</h3>
                </div>
                <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <Car className="h-6 w-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Services Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Services Offered by Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar
                data={servicesChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schools by City */}
        <Card>
          <CardHeader>
            <CardTitle>Schools by City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Pie
                data={cityChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Founded Year Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Schools Founded Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line
                data={foundedYearChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Average Prices */}
        <Card>
          <CardHeader>
            <CardTitle>Average Prices Across Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar
                data={pricesChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Instructors and Vehicles */}
        <Card>
          <CardHeader>
            <CardTitle>Average Resources per School</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar
                data={resourcesChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } },
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Weekend Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Weekend Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Pie
                data={weekendChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'right' } },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="space-y-6">
        {/* Schools List */}
        <Card>
          <CardHeader>
            <CardTitle>List of Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Instructors</TableHead>
                  <TableHead>Vehicles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.schools.map((school, index) => (
                  <TableRow key={index}>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>{school.city}</TableCell>
                    <TableCell>{school.instructors}</TableCell>
                    <TableCell>{school.vehicles}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Price Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Price Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price Type</TableHead>
                  <TableHead>Min (€)</TableHead>
                  <TableHead>Max (€)</TableHead>
                  <TableHead>Avg (€)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(dashboardData.avgPrices).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{key.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                    <TableCell>{dashboardData.minPrices[key]}</TableCell>
                    <TableCell>{dashboardData.maxPrices[key]}</TableCell>
                    <TableCell>{dashboardData.avgPrices[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Opening Hours Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Average Opening Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Avg. Open</TableHead>
                  <TableHead>Avg. Close</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(dashboardData.avgOpeningHours).map((day) => (
                  <TableRow key={day}>
                    <TableCell className="capitalize">{day}</TableCell>
                    <TableCell>{dashboardData.avgOpeningHours[day].open}</TableCell>
                    <TableCell>{dashboardData.avgOpeningHours[day].close}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SchoolDashboardLayout>
  );
}