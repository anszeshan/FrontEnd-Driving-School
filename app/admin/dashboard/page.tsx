// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { 
//   Users, Building2, Car, Calendar, DollarSign, Clock4, 
//   FileText, MapPin, CheckCircle, AlertCircle, XCircle,
//   TrendingUp, BarChart3, PieChart, LineChart, AreaChart,
//   ScatterChart, Activity, ArrowRight, BookOpen, Shield, 
//   GraduationCap, CarFront, Clock, Globe, MessageSquare
// } from "lucide-react"
// import { 
//   Card, CardContent, CardDescription, CardHeader, CardTitle 
// } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
//   PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, 
//   Line, AreaChart as RechartsAreaChart, Area, ScatterChart as RechartsScatterChart, 
//   Scatter, ZAxis, Legend
// } from 'recharts'
// import AdminDashboardLayout from "@/components/admin-dashboard-layout"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"

// interface DashboardStats {
//   totalSchools: number
//   activeSchools: number
//   pendingSchools: number
//   totalInstructors: number
//   totalVehicles: number
//   totalRevenue: number
//   schoolsByCity: { city: string; count: number }[]
//   schoolsByMonth: { month: string; count: number }[]
//   schoolsByStatus: { status: string; count: number }[]
//   schoolsByYear: { year: string; count: number }[]
//   schoolsByInstructors: { instructors: number; vehicles: number }[]
//   schoolsByServices: { service: string; count: number }[]
//   schoolsByPriceRange: { range: string; count: number }[]
//   schoolsByOpeningHours: { day: string; open: number; closed: number }[]
//   recentSchools: {
//     id: string
//     name: string
//     city: string
//     status: string
//     createdAt: string
//     instructors: number
//     vehicles: number
//     services: number
//   }[]
//   topSchools: {
//     id: string
//     name: string
//     instructors: number
//     vehicles: number
//     services: number
//   }[]
// }

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658']

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState<DashboardStats | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch('https://backend-ds-blue.vercel.app/api/admin/dashboard/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           },
//           credentials: 'include' // Cookies für Authentifizierung einschließen
//         })

//         if (!response.ok) {
//           if (response.status === 401) {
//             console.error('Nicht autorisiert: Bitte als Administrator anmelden')
//             setStats(null)
//             return
//           }
//           throw new Error(`HTTP-Fehler! Status: ${response.status}`)
//         }

//         const data = await response.json()
//         setStats(data)
//       } catch (error) {
//         console.error('Fehler beim Abrufen der Dashboard-Daten:', error)
//         // Prüfen, ob es sich um einen Verbindungsfehler handelt
//         if (error instanceof TypeError && error.message === 'Failed to fetch') {
//           console.error('Keine Verbindung zum Server. Bitte stellen Sie sicher, dass der Backend-Server unter http://localhost:5000 läuft')
//         }
//         setStats(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [])

//   if (loading) {
//     return (
//       <AdminDashboardLayout>
//         <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
//         </div>
//       </AdminDashboardLayout>
//     )
//   }

//   if (!stats) return null

//   return (
//     <AdminDashboardLayout>
//       <div className="space-y-6">
//         {/* Kopfzeile */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold">Admin-Dashboard</h1>
//           <p className="text-muted-foreground">Willkommen im Admin-Dashboard von Fahrschulfinder.</p>
//         </div>

//         {/* Statistik-Karten */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           {[
//             {
//               title: "Gesamtanzahl Fahrschulen",
//               value: stats.totalSchools,
//               description: "Registrierte Fahrschulen",
//               icon: Building2,
//               color: "bg-blue-500",
//             },
//             {
//               title: "Aktive Fahrschulen",
//               value: stats.totalSchools,
//               description: "Derzeit aktiv",
//               icon: CheckCircle,
//               color: "bg-green-500",
//             },
//             {
//               title: "Gesamtanzahl Fahrlehrer",
//               value: stats.totalInstructors,
//               description: "In allen Fahrschulen",
//               icon: Users,
//               color: "bg-amber-500",
//             },
//             {
//               title: "Gesamtanzahl Fahrzeuge",
//               value: stats.totalVehicles,
//               description: "Schulfahrzeuge",
//               icon: Car,
//               color: "bg-rose-500",
//             },
//           ].map((stat, index) => (
//             <motion.div
//               key={stat.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//             >
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                   <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                   <div className={`p-2 rounded-full ${stat.color}`}>
//                     <stat.icon className="w-4 h-4 text-white" />
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stat.value}</div>
//                   <p className="text-xs text-muted-foreground">{stat.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Hauptinhalt */}
//         <Tabs defaultValue="overview" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="overview">Übersicht</TabsTrigger>
//             <TabsTrigger value="schools">Fahrschulen</TabsTrigger>
//             <TabsTrigger value="analytics">Analysen</TabsTrigger>
//             <TabsTrigger value="system">Systemübersicht</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-4">
//             {/* Neueste und Top-Fahrschulen */}
//             <div className="grid gap-4 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Neueste Fahrschulen</CardTitle>
//                   <CardDescription>Kürzlich registrierte Fahrschulen</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {stats.recentSchools.map((school) => (
//                       <div key={school.id} className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">{school.name}</p>
//                           <p className="text-sm text-muted-foreground">{school.city}</p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Badge variant={
//                             school.status === 'active' ? 'default' :
//                             school.status === 'pending' ? 'secondary' : 'destructive'
//                           }>
//                             {school.status === 'active' ? 'Aktiv' :
//                              school.status === 'pending' ? 'Ausstehend' : 'Inaktiv'}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Top-Fahrschulen</CardTitle>
//                   <CardDescription>Fahrschulen mit den meisten Ressourcen</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {stats.topSchools.map((school) => (
//                       <div key={school.id} className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">{school.name}</p>
//                           <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                             <span>{school.instructors} Fahrlehrer</span>
//                             <span>{school.vehicles} Fahrzeuge</span>
//                           </div>
//                         </div>
//                         <Badge variant="secondary">{school.services} Dienstleistungen</Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Diagramme */}
//             <div className="grid gap-4 md:grid-cols-2">
//               {/* Fahrschulen nach Stadt */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Fahrschulen nach Stadt</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RechartsPieChart>
//                         <Pie
//                           data={stats.schoolsByCity}
//                           dataKey="count"
//                           nameKey="city"
//                           cx="50%"
//                           cy="50%"
//                           outerRadius={80}
//                           label
//                         >
//                           {stats.schoolsByCity.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                       </RechartsPieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="schools" className="space-y-4">
//             {/* Fahrschulen-Tabelle */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Alle Fahrschulen</CardTitle>
//                 <CardDescription>Vollständige Liste der registrierten Fahrschulen</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Stadt</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Fahrlehrer</TableHead>
//                       <TableHead>Fahrzeuge</TableHead>
//                       <TableHead>Dienstleistungen</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {stats.recentSchools.map((school) => (
//                       <TableRow key={school.id}>
//                         <TableCell className="font-medium">{school.name}</TableCell>
//                         <TableCell>{school.city}</TableCell>
//                         <TableCell>
//                           <Badge variant={
//                             school.status === 'active' ? 'default' :
//                             school.status === 'pending' ? 'secondary' : 'destructive'
//                           }>
//                             {school.status === 'active' ? 'Aktiv' :
//                              school.status === 'pending' ? 'Ausstehend' : 'Inaktiv'}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>{school.instructors}</TableCell>
//                         <TableCell>{school.vehicles}</TableCell>
//                         <TableCell>{school.services}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>

//             {/* Zusätzliche Diagramme */}
//             <div className="grid gap-4 md:grid-cols-2">
//               {/* Fahrschulen nach Dienstleistungen */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Beliebte Dienstleistungen</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={stats.schoolsByServices}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="service" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#8884d8" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Fahrschulen nach Preisspanne */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Preisverteilung</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RechartsAreaChart data={stats.schoolsByPriceRange}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="range" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
//                       </RechartsAreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           <TabsContent value="analytics" className="space-y-4">
//             {/* Erweiterte Analysen */}
//             <div className="grid gap-4 md:grid-cols-2">
//               {/* Fahrschulen nach Öffnungszeiten */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Analyse der Öffnungszeiten</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={stats.schoolsByOpeningHours}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="day" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="open" name="Geöffnet" fill="#82ca9d" />
//                         <Bar dataKey="closed" name="Geschlossen" fill="#ff8042" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>

//               <!-- Fahrschulen nach Gründungsjahr -->
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Fahrschulen nach Gründungsjahr</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <RechartsAreaChart data={stats.schoolsByYear}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="year" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
//                       </RechartsAreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <!-- Fahrlehrer vs. Fahrzeuge Streudiagramm -->
//             <Card>
//               <CardHeader>
//                 <CardTitle>Verteilung Fahrlehrer vs. Fahrzeuge</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-[400px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <RechartsScatterChart>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="instructors" name="Fahrlehrer" />
//                       <YAxis dataKey="vehicles" name="Fahrzeuge" />
//                       <ZAxis range={[100, 400]} />
//                       <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//                       <Legend />
//                       <Scatter name="Fahrschulen" data={stats.schoolsByInstructors} fill="#8884d8" />
//                     </RechartsScatterChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="system" className="space-y-6">
//             <!-- Systemübersicht Kopfzeile -->
//             <div className="text-center space-y-2">
//               <h2 className="text-3xl font-bold">Fahrschulfinder-System</h2>
//               <p className="text-muted-foreground">Ihre umfassende Plattform zur Verwaltung von Fahrschulen</p>
//             </div>

//             <!-- Hauptfunktionen -->
//             <div className="grid gap-6 md:grid-cols-3">
//               <Card className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
//                     <BookOpen className="h-6 w-6 text-blue-600" />
//                   </div>
//                   <CardTitle>Fahrschulverwaltung</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Vollständige Fahrschulprofile</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Verwaltung von Dienstleistungen und Preisen</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Ressourcenverfolgung</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
//                     <GraduationCap className="h-6 w-6 text-green-600" />
//                   </div>
//                   <CardTitle>Lernsystem</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Theorieunterricht</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Praktische Ausbildung</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Intensivkurse</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card className="hover:shadow-lg transition-shadow">
//                 <CardHeader>
//                   <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
//                     <Shield className="h-6 w-6 text-purple-600" />
//                   </div>
//                   <CardTitle>Qualitätssicherung</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2 text-sm">
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Führerscheinüberprüfung</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Zertifizierung der Fahrlehrer</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                       <span>Verfolgung der Fahrzeugwartung</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>

//             <!-- Systemablauf -->
//             <Card>
//               <CardHeader>
//                 <CardTitle>Systemablauf</CardTitle>
//                 <CardDescription>Wie Fahrschulfinder funktioniert</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <!-- Ablaufschritte -->
//                   <div className="space-y-8">
//                     <!-- Schritt 1 -->
//                     <div className="flex items-start gap-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         1
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold mb-2">Fahrschulregistrierung</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Fahrschulen registrieren sich mit grundlegenden Informationen, angebotenen Dienstleistungen und erforderlichen Dokumenten.
//                           Das System überprüft die Informationen und aktiviert das Konto.
//                         </p>
//                       </div>
//                     </div>

//                     <!-- Schritt 2 -->
//                     <div className="flex items-start gap-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         2
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold mb-2">Profilverwaltung</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Fahrschulen verwalten ihre Profile, aktualisieren Dienstleistungen, Preise und Ressourcen.
//                           Sie können Fahrlehrer, Fahrzeuge und Öffnungszeiten hinzufügen oder aktualisieren.
//                         </p>
//                       </div>
//                     </div>

//                     <!-- Schritt 3 -->
//                     <div className="flex items-start gap-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         3
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold mb-2">Dienstleistungserbringung</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Fahrschulen bieten Fahrausbildungsdienste an, einschließlich Theorieunterricht,
//                           praktischer Ausbildung und spezialisierten Kursen.
//                         </p>
//                       </div>
//                     </div>

//                     <!-- Schritt 4 -->
//                     <div className="flex items-start gap-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
//                         4
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold mb-2">Qualitätsüberwachung</h3>
//                         <p className="text-sm text-muted-foreground">
//                           Das System überwacht die Leistung der Fahrschulen, die Qualifikationen der Fahrlehrer
//                           und die Fahrzeugwartung, um Qualitätsstandards sicherzustellen.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <!-- Verbindungslinien -->
//                   <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-blue-200"></div>
//                 </div>
//               </CardContent>
//             </Card>

//             <!-- Zusätzliche Funktionen -->
//             <div className="grid gap-6 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Globe className="h-5 w-5" />
//                     Globale Reichweite
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4 text-blue-500" />
//                       <span>Mehrsprachige Unterstützung</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4 text-blue-500" />
//                       <span>Internationale Führerscheintypen</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4 text-blue-500" />
//                       <span>Grenzüberschreitende Fahrschulnetzwerke</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <MessageSquare className="h-5 w-5" />
//                     Kommunikation
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4 text-blue-500" />
//                       <span>Echtzeit-Benachrichtigungen</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4 text-blue-500" />
//                       <span>Automatisierte Updates</span>
//                     </li>
//                     <li className="flex items-center gap-2">
//                       <ArrowRight className="h-4 w-4 text-blue-500" />
//                       <span>Supportsystem</span>
//                     </li>
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </AdminDashboardLayout>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Users, Building2, Car, Calendar, DollarSign, Clock4, 
  FileText, MapPin, CheckCircle, AlertCircle, XCircle,
  TrendingUp, BarChart3, PieChart, LineChart, AreaChart,
  ScatterChart, Activity, ArrowRight, BookOpen, Shield, 
  GraduationCap, CarFront, Clock, Globe, MessageSquare
} from "lucide-react"
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, 
  Line, AreaChart as RechartsAreaChart, Area, ScatterChart as RechartsScatterChart, 
  Scatter, ZAxis, Legend
} from 'recharts'
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface DashboardStats {
  totalSchools: number
  activeSchools: number
  pendingSchools: number
  totalInstructors: number
  totalVehicles: number
  totalRevenue: number
  schoolsByCity: { city: string; count: number }[]
  schoolsByMonth: { month: string; count: number }[]
  schoolsByStatus: { status: string; count: number }[]
  schoolsByYear: { year: string; count: number }[]
  schoolsByInstructors: { instructors: number; vehicles: number }[]
  schoolsByServices: { service: string; count: number }[]
  schoolsByPriceRange: { range: string; count: number }[]
  schoolsByOpeningHours: { day: string; open: number; closed: number }[]
  recentSchools: {
    id: string
    name: string
    city: string
    status: string
    createdAt: string
    instructors: number
    vehicles: number
    services: number
  }[]
  topSchools: {
    id: string
    name: string
    instructors: number
    vehicles: number
    services: number
  }[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658']

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://backend-ds-blue.vercel.app/api/admin/dashboard/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include' // Include cookies for authentication
        })

        if (!response.ok) {
          if (response.status === 401) {
            console.error('Unauthorized: Please log in as admin')
            setStats(null)
            return
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Check if it's a connection error
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          console.error('Could not connect to the server. Please ensure the backend server is running at http://localhost:5000')
        }
        setStats(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <AdminDashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
        </div>
      </AdminDashboardLayout>
    )
  }

  if (!stats) return null

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Fahrschulfinder admin dashboard.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Schools",
              value: stats.totalSchools,
              description: "Registered driving schools",
              icon: Building2,
              color: "bg-blue-500",
            },
            {
              title: "Active Schools",
              value: stats.totalSchools,
              description: "Currently active",
              icon: CheckCircle,
              color: "bg-green-500",
            },
            {
              title: "Total Instructors",
              value: stats.totalInstructors,
              description: "Across all schools",
              icon: Users,
              color: "bg-amber-500",
            },
            {
              title: "Total Vehicles",
              value: stats.totalVehicles,
              description: "Training vehicles",
              icon: Car,
              color: "bg-rose-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Recent Schools and Top Schools */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Schools</CardTitle>
                  <CardDescription>Recently registered driving schools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentSchools.map((school) => (
                      <div key={school.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-sm text-muted-foreground">{school.city}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            school.status === 'active' ? 'default' :
                            school.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {school.status}
                          </Badge>
                          {/* <p className="text-sm text-muted-foreground">
                            {new Date(school.createdAt).toLocaleDateString()}
                          </p> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Schools</CardTitle>
                  <CardDescription>Schools with most resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.topSchools.map((school) => (
                      <div key={school.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{school.instructors} Instructors</span>
                            <span>{school.vehicles} Vehicles</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{school.services} Services</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Schools by City */}
              <Card>
                <CardHeader>
                  <CardTitle>Schools by City</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={stats.schoolsByCity}
                          dataKey="count"
                          nameKey="city"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {stats.schoolsByCity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Schools by Month */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Schools by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={stats.schoolsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>

          <TabsContent value="schools" className="space-y-4">
            {/* Schools Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Schools</CardTitle>
                <CardDescription>Complete list of registered schools</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Instructors</TableHead>
                      <TableHead>Vehicles</TableHead>
                      <TableHead>Services</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentSchools.map((school) => (
                      <TableRow key={school.id}>
                        <TableCell className="font-medium">{school.name}</TableCell>
                        <TableCell>{school.city}</TableCell>
                        <TableCell>
                          <Badge variant={
                            school.status === 'active' ? 'default' :
                            school.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {school.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{school.instructors}</TableCell>
                        <TableCell>{school.vehicles}</TableCell>
                        <TableCell>{school.services}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Additional Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Schools by Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.schoolsByServices}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="service" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Schools by Price Range */}
              <Card>
                <CardHeader>
                  <CardTitle>Price Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsAreaChart data={stats.schoolsByPriceRange}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                      </RechartsAreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {/* Advanced Analytics */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Schools by Opening Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Operating Hours Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.schoolsByOpeningHours}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="open" name="Open" fill="#82ca9d" />
                        <Bar dataKey="closed" name="Closed" fill="#ff8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Schools by Year Founded */}
              <Card>
                <CardHeader>
                  <CardTitle>Schools by Year Founded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsAreaChart data={stats.schoolsByYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                      </RechartsAreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructors vs Vehicles Scatter Plot */}
            <Card>
              <CardHeader>
                <CardTitle>Instructors vs Vehicles Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="instructors" name="Instructors" />
                      <YAxis dataKey="vehicles" name="Vehicles" />
                      <ZAxis range={[100, 400]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Legend />
                      <Scatter name="Schools" data={stats.schoolsByInstructors} fill="#8884d8" />
                    </RechartsScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            {/* System Overview Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Fahrschulfinder System</h2>
              <p className="text-muted-foreground">Your comprehensive driving school management platform</p>
            </div>

            {/* Key Features Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>School Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Complete school profiles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Service & pricing management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Resource tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Learning System</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Theory lessons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Practical training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Intensive courses</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Quality Assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>License verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instructor certification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Vehicle maintenance tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* System Flow */}
            <Card>
              <CardHeader>
                <CardTitle>System Workflow</CardTitle>
                <CardDescription>How Fahrschulfinder operates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Flow Steps */}
                  <div className="space-y-8">
                    {/* Step 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">School Registration</h3>
                        <p className="text-sm text-muted-foreground">
                          Schools register with basic information, services offered, and required documentation.
                          The system verifies the information and activates the account.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Profile Management</h3>
                        <p className="text-sm text-muted-foreground">
                          Schools manage their profiles, update services, pricing, and resources.
                          They can add instructors, vehicles, and update operating hours.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Service Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          Schools provide driving education services, including theory lessons,
                          practical training, and specialized courses.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        4
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Quality Monitoring</h3>
                        <p className="text-sm text-muted-foreground">
                          The system monitors school performance, instructor qualifications,
                          and vehicle maintenance to ensure quality standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-blue-200"></div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Multi-language support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>International license types</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Cross-border school networks</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Real-time notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Automated updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                      <span>Support system</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { Building2, User, Users, Loader2 } from "lucide-react"
// import Link from "next/link"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import AdminDashboardLayout from "@/components/admin-dashboard-layout"
// import { adminAPI } from "@/lib/api"

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true)
//         const { data } = await adminAPI.getStats()
//         setStats(data)
//       } catch (err) {
//         console.error("Error fetching admin stats:", err)
//         setError("Failed to load dashboard data. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStats()
//   }, [])

//   if (loading) {
//     return (
//       <AdminDashboardLayout>
//         <div className="flex items-center justify-center h-[60vh]">
//           <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
//         </div>
//       </AdminDashboardLayout>
//     )
//   }

//   if (error) {
//     return (
//       <AdminDashboardLayout>
//         <Alert variant="destructive" className="mb-6">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       </AdminDashboardLayout>
//     )
//   }

//   // Default stats in case API doesn't return expected format
//   const dashboardStats = [
//     {
//       name: "Total Schools",
//       value: stats?.schools || 0,
//       description: "Driving schools on platform",
//       icon: Building2,
//       color: "text-blue-500",
//       link: "/admin/schools",
//     },
//     {
//       name: "Total Users",
//       value: stats?.users || 0,
//       description: "Registered users",
//       icon: Users,
//       color: "text-green-500",
//       link: "/admin/users",
//     },
//     {
//       name: "Reviews",
//       value: stats?.reviews || 0,
//       description: "Total reviews submitted",
//       icon: User,
//       color: "text-amber-500",
//       link: "/admin/reviews",
//     },
//     {
//       name: "School Owners",
//       value: stats?.schoolOwners || 0,
//       description: "Registered school owners",
//       icon: Building2,
//       color: "text-purple-500",
//       link: "/admin/schools",
//     },
//   ]

//   return (
//     <AdminDashboardLayout>
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <p className="text-muted-foreground">Welcome to the Fahrschulfinder admin panel</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {dashboardStats.map((stat) => (
//           <Card key={stat.name}>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
//               <stat.icon className={`h-5 w-5 ${stat.color}`} />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//               <p className="text-xs text-muted-foreground">{stat.description}</p>
//               <Link href={stat.link} className="text-xs text-rose-500 hover:text-rose-600 mt-2 inline-block">
//                 View details →
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 mt-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Top Rated Schools</CardTitle>
//             <CardDescription>Highest rated driving schools on the platform</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats?.topSchools?.length > 0 ? (
//                 stats.topSchools.map((school) => (
//                   <div key={school._id} className="flex items-center justify-between py-2">
//                     <div>
//                       <div className="font-medium">{school.name}</div>
//                       <div className="text-sm text-muted-foreground">
//                         Rating: {school.averageRating?.toFixed(1) || "N/A"}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-4 text-muted-foreground">No schools found</div>
//               )}
//             </div>
//             <Link href="/admin/schools" className="text-sm text-rose-500 hover:text-rose-600 mt-4 inline-block">
//               View all schools →
//             </Link>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Latest Reviews</CardTitle>
//             <CardDescription>Recent reviews submitted on the platform</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {stats?.latestReviews?.length > 0 ? (
//                 stats.latestReviews.map((review) => (
//                   <div key={review._id} className="flex items-center justify-between py-2">
//                     <div>
//                       <div className="font-medium">{review.title}</div>
//                       <div className="text-sm text-muted-foreground">
//                         {review.user?.name} on {review.school?.name}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-sm text-muted-foreground">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </div>
//                       <div className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
//                         {review.rating}/5
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-4 text-muted-foreground">No reviews found</div>
//               )}
//             </div>
//             <Link href="/admin/reviews" className="text-sm text-rose-500 hover:text-rose-600 mt-4 inline-block">
//               View all reviews →
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </AdminDashboardLayout>
//   )
// }
