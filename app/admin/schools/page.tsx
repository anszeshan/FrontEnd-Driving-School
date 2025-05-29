"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Search, MoreHorizontal, Check, X, Clock, Eye } from "lucide-react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ScatterChart, 
  Scatter, ZAxis 
} from 'recharts'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { useToast } from "@/components/ui/use-toast"

// Types
interface School {
  id: string
  name: string
  city: string
  email: string
  phone: string
  status: string
  foundedYear: string
  instructors: string
  vehicles: string
  createdAt: string
  website?: string
}

interface SchoolStats {
  schoolsByCity: { city: string; count: number }[]
  schoolsByMonth: { month: string; count: number }[]
  schoolsByStatus: { status: string; count: number }[]
  schoolsByYear: { year: string; count: number }[]
  schoolsByInstructors: { instructors: number; vehicles: number }[]
}

export default function SchoolsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [schools, setSchools] = useState<School[]>([])
  const [stats, setStats] = useState<SchoolStats>({
    schoolsByCity: [],
    schoolsByMonth: [],
    schoolsByStatus: [],
    schoolsByYear: [],
    schoolsByInstructors: []
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [schoolToDelete, setSchoolToDelete] = useState<string | null>(null)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [schoolToUpdateStatus, setSchoolToUpdateStatus] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState("")

  // Fetch schools and stats
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('https://backend-ds-blue.vercel.app/api/admin/schools')
        const data = await response.json()
        setSchools(data.schools)
        setStats(data.stats)
      } catch (error) {
        console.error('Error fetching schools:', error)
      }
    }

    fetchSchools()
  }, [])

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return

    try {
      const response = await fetch(`https://backend-ds-blue.vercel.app/api/admin/schools/${schoolToDelete}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSchools(schools.filter((school) => school.id !== schoolToDelete))
        setDeleteDialogOpen(false)
        toast({
          title: "School Deleted",
          description: "The school has been successfully deleted.",
          className: "bg-green-500 text-white",
        })
      } else {
        console.error('Failed to delete school')
      }
    } catch (error) {
      console.error('Error deleting school:', error)
    }
  }

  const handleUpdateStatus = async () => {
    if (!schoolToUpdateStatus || !newStatus) return

    try {
      const response = await fetch(`https://backend-ds-blue.vercel.app/api/admin/schools/${schoolToUpdateStatus}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setSchools(
          schools.map((school) =>
            school.id === schoolToUpdateStatus ? { ...school, status: newStatus } : school
          )
        )
        setStatusDialogOpen(false)
      } else {
        console.error('Failed to update school status')
      }
    } catch (error) {
      console.error('Error updating school status:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658']

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Driving Schools</h1>
        {/* <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => router.push("/admin/schools/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schools.filter(school => school.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schools.filter(school => school.status === 'inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>

          {/* School Table */}
          <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>School Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search schools..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Contact</TableHead>
                  {/* <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No schools found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSchools.map((school) => (
                    <TableRow key={school.id}>
                      <TableCell className="font-medium">{school.name}</TableCell>
                      <TableCell>{school.city}</TableCell>
                      <TableCell>
                        <div>{school.email}</div>
                        <div className="text-sm text-muted-foreground">{school.phone}</div>
                      </TableCell>
                      {/* <TableCell>{getStatusBadge(school.status)}</TableCell>
                      <TableCell>{new Date(school.createdAt).toLocaleDateString()}</TableCell> */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/schools/${school.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSchoolToDelete(school.id)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Detailed School Cards */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">School Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-gradient-to-r from-rose-500 to-rose-600">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{school.name}</h3>
                  <p className="text-white/90">{school.city}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <span className="w-20 text-muted-foreground">Email:</span>
                        <span>{school.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-20 text-muted-foreground">Phone:</span>
                        <span>{school.phone}</span>
                      </div>
                      {school.website && (
                        <div className="flex items-center text-sm">
                          <span className="w-20 text-muted-foreground">Website:</span>
                          <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">
                            {school.website}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* School Details */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">School Details</h4>
                    <div className="space-y-1">
                      {school.foundedYear && (
                        <div className="flex items-center text-sm">
                          <span className="w-20 text-muted-foreground">Founded:</span>
                          <span>{school.foundedYear}</span>
                        </div>
                      )}
                      {school.instructors && (
                        <div className="flex items-center text-sm">
                          <span className="w-20 text-muted-foreground">Instructors:</span>
                          <span>{school.instructors}</span>
                        </div>
                      )}
                      {school.vehicles && (
                        <div className="flex items-center text-sm">
                          <span className="w-20 text-muted-foreground">Vehicles:</span>
                          <span>{school.vehicles}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status and Created Date */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Status Information</h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <span className="w-20 text-muted-foreground">Status:</span>
                        {getStatusBadge(school.status)}
                      </div>
                      {school.createdAt && (
                        <div className="flex items-center text-sm">
                          <span className="w-20 text-muted-foreground">Created:</span>
                          <span>{new Date(school.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/schools/${school.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSchoolToDelete(school.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 1. Schools by City (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Schools by City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 2. Schools by Month (Line Chart) */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Schools by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.schoolsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* 3. Schools by Status (Bar Chart) */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Schools by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.schoolsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* 4. Schools by Year Founded (Area Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Schools by Year Founded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.schoolsByYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 5. Schools by Instructor Count (Scatter Chart) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schools by Instructor Count vs Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="instructors" name="Instructors" />
                  <YAxis dataKey="vehicles" name="Vehicles" />
                  <ZAxis range={[100, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Schools" data={stats.schoolsByInstructors} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

  


      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete School</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this school? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchool}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Plus, Pencil, Trash2, Search, MoreHorizontal, Check, X, Clock, Loader2 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import AdminDashboardLayout from "@/components/admin-dashboard-layout"
// import { schoolsAPI } from "@/lib/api"

// export default function SchoolsPage() {
//   const router = useRouter()
//   const [schools, setSchools] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [schoolToDelete, setSchoolToDelete] = useState(null)
//   const [statusDialogOpen, setStatusDialogOpen] = useState(false)
//   const [schoolToUpdateStatus, setSchoolToUpdateStatus] = useState(null)
//   const [newStatus, setNewStatus] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchSchools()
//   }, [])

//   const fetchSchools = async () => {
//     try {
//       setLoading(true)
//       const { data } = await schoolsAPI.getSchools()
//       setSchools(data.data || [])
//     } catch (err) {
//       console.error("Error fetching schools:", err)
//       setError("Failed to load schools. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredSchools = schools.filter(
//     (school) =>
//       school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       school.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       school.email?.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handleDeleteSchool = async () => {
//     try {
//       await schoolsAPI.deleteSchool(schoolToDelete)
//       setSchools(schools.filter((school) => school._id !== schoolToDelete))
//       setDeleteDialogOpen(false)
//     } catch (err) {
//       console.error("Error deleting school:", err)
//       setError("Failed to delete school. Please try again.")
//     }
//   }

//   const handleUpdateStatus = async () => {
//     try {
//       await schoolsAPI.updateSchoolStatus(schoolToUpdateStatus, newStatus)
//       setSchools(
//         schools.map((school) => (school._id === schoolToUpdateStatus ? { ...school, status: newStatus } : school)),
//       )
//       setStatusDialogOpen(false)
//     } catch (err) {
//       console.error("Error updating school status:", err)
//       setError("Failed to update school status. Please try again.")
//     }
//   }

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "active":
//         return <Badge className="bg-green-500">Active</Badge>
//       case "pending":
//         return <Badge className="bg-yellow-500">Pending</Badge>
//       case "inactive":
//         return <Badge className="bg-gray-500">Inactive</Badge>
//       default:
//         return <Badge>{status || "Unknown"}</Badge>
//     }
//   }

//   if (loading) {
//     return (
//       <AdminDashboardLayout>
//         <div className="flex items-center justify-center h-[60vh]">
//           <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
//         </div>
//       </AdminDashboardLayout>
//     )
//   }

//   return (
//     <AdminDashboardLayout>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Driving Schools</h1>
//         <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => router.push("/admin/schools/add")}>
//           <Plus className="mr-2 h-4 w-4" />
//           Add School
//         </Button>
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <Card className="mb-6">
//         <CardHeader className="pb-3">
//           <CardTitle>School Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search schools..."
//                 className="pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>City</TableHead>
//                   <TableHead>Contact</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredSchools.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                       No schools found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredSchools.map((school) => (
//                     <TableRow key={school._id}>
//                       <TableCell className="font-medium">{school.name}</TableCell>
//                       <TableCell>{school.location?.city || "N/A"}</TableCell>
//                       <TableCell>
//                         <div>{school.email || "N/A"}</div>
//                         <div className="text-sm text-muted-foreground">{school.phone || "N/A"}</div>
//                       </TableCell>
//                       <TableCell>{getStatusBadge(school.status)}</TableCell>
//                       <TableCell>{new Date(school.createdAt).toLocaleDateString()}</TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="h-4 w-4" />
//                               <span className="sr-only">Actions</span>
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem onClick={() => router.push(`/admin/schools/edit/${school._id}`)}>
//                               <Pencil className="mr-2 h-4 w-4" />
//                               Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => {
//                                 setSchoolToUpdateStatus(school._id)
//                                 setNewStatus(school.status || "pending")
//                                 setStatusDialogOpen(true)
//                               }}
//                             >
//                               <Check className="mr-2 h-4 w-4" />
//                               Change Status
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               className="text-red-600"
//                               onClick={() => {
//                                 setSchoolToDelete(school._id)
//                                 setDeleteDialogOpen(true)
//                               }}
//                             >
//                               <Trash2 className="mr-2 h-4 w-4" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete School</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this school? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteSchool}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Status Update Dialog */}
//       <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update School Status</DialogTitle>
//             <DialogDescription>Change the status of this driving school.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-3 gap-4">
//               <Button
//                 variant={newStatus === "active" ? "default" : "outline"}
//                 className={newStatus === "active" ? "bg-green-500 hover:bg-green-600" : ""}
//                 onClick={() => setNewStatus("active")}
//               >
//                 <Check className="mr-2 h-4 w-4" />
//                 Active
//               </Button>
//               <Button
//                 variant={newStatus === "pending" ? "default" : "outline"}
//                 className={newStatus === "pending" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
//                 onClick={() => setNewStatus("pending")}
//               >
//                 <Clock className="mr-2 h-4 w-4" />
//                 Pending
//               </Button>
//               <Button
//                 variant={newStatus === "inactive" ? "default" : "outline"}
//                 className={newStatus === "inactive" ? "bg-gray-500 hover:bg-gray-600" : ""}
//                 onClick={() => setNewStatus("inactive")}
//               >
//                 <X className="mr-2 h-4 w-4" />
//                 Inactive
//               </Button>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleUpdateStatus}>Update Status</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </AdminDashboardLayout>
//   )
// }
