"use client"

import { useState, useEffect } from "react"
import { Search, MoreHorizontal, Trash2, UserPlus, Eye, EyeOff } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"

// Types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  status: string
  createdAt: string
}

interface UserStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  usersByRole: { role: string; count: number }[]
  usersByMonth: { month: string; count: number }[]
  usersByDayOfWeek: { day: string; count: number }[]
  usersByHour: { hour: string; count: number }[]
  usersByNameLength: { nameLength: number; count: number }[]
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    usersByRole: [],
    usersByMonth: [],
    usersByDayOfWeek: [],
    usersByHour: [],
    usersByNameLength: []
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
  })
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  })

  // Fetch users and stats
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://backend-ds-blue.vercel.app/api/admin/users')
        const data = await response.json()
        setUsers(data.users)
        setStats(data.stats)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  )

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      const response = await fetch(`https://backend-ds-blue.vercel.app/api/admin/users/${userToDelete}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userToDelete))
        setDeleteDialogOpen(false)
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const validateForm = () => {
    let valid = true
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    }

    if (!newUser.firstName.trim()) {
      errors.firstName = "First name is required"
      valid = false
    }

    if (!newUser.lastName.trim()) {
      errors.lastName = "Last name is required"
      valid = false
    }

    if (!newUser.email.trim()) {
      errors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email is invalid"
      valid = false
    }

    if (!newUser.password.trim()) {
      errors.password = "Password is required"
      valid = false
    } else if (newUser.password.length < 6) {
      errors.password = "Password must be at least 6 characters"
      valid = false
    }

    if (!newUser.phone.trim()) {
      errors.phone = "Phone number is required"
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  const handleAddUser = async () => {
    if (!validateForm()) return

    try {
      const response = await fetch('https://backend-ds-blue.vercel.app/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      if (response.ok) {
        const data = await response.json()
        setUsers([...users, data])
        setAddUserDialogOpen(false)
        setNewUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          role: "student",
        })
        setFormErrors({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
        })
        setShowPassword(false)
      } else {
        console.error('Failed to add user')
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-rose-500">Admin</Badge>
      case "school_admin":
        return <Badge className="bg-blue-500">School Admin</Badge>
      case "student":
        return <Badge className="bg-yellow-500">Student</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658']

  return (
    <AdminDashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button className="bg-rose-500 hover:bg-rose-600" onClick={() => setAddUserDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">{stats.totalUsers}</div> */}
            <div className="text-2xl font-bold">
              {stats.usersByMonth[stats.usersByMonth.length - 1]?.count || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
              {stats.usersByMonth[stats.usersByMonth.length - 1]?.count || 0}
            </div>
            {/* <div className="text-2xl font-bold">{stats.activeUsers}</div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Users (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.usersByMonth[stats.usersByMonth.length - 1]?.count || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 1. Users by Role (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.usersByRole}
                    dataKey="count"
                    nameKey="role"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {stats.usersByRole.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 2. Users by Month (Line Chart) */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Users by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.usersByMonth}>
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

        {/* 3. Users by Day of Week (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Day of Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.usersByDayOfWeek}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 4. Users by Hour of Registration (Area Chart) */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Users by Hour of Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.usersByHour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* 5. Users by Name Length (Scatter Chart) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Users by Name Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nameLength" name="Name Length" />
                  <YAxis dataKey="count" name="Number of Users" />
                  <ZAxis range={[100, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Users" data={stats.usersByNameLength} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
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
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  {/* <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      {/* <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell> */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setUserToDelete(user.id)
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Enter the details of the new user to add them to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleNewUserChange}
                  placeholder="Enter first name"
                  required
                />
                {formErrors.firstName && <p className="text-sm text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleNewUserChange}
                  placeholder="Enter last name"
                  required
                />
                {formErrors.lastName && <p className="text-sm text-red-500">{formErrors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleNewUserChange}
                placeholder="Enter email address"
                required
              />
              {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={newUser.phone}
                onChange={handleNewUserChange}
                placeholder="Enter phone number"
                required
              />
              {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={newUser.password}
                  onChange={handleNewUserChange}
                  placeholder="Enter password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
              <p className="text-xs text-muted-foreground">Password must be at least 6 characters long.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="school_admin">School Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminDashboardLayout>
  )
}


// // "use client"

// // import { useState } from "react"
// // import { Search, MoreHorizontal, Trash2 } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import AdminDashboardLayout from "@/components/admin-dashboard-layout"

// // // Mock data for users
// // const initialUsers = [
// //   {
// //     id: 1,
// //     name: "John Doe",
// //     email: "john.doe@example.com",
// //     role: "student",
// //     status: "active",
// //     createdAt: "2023-01-15",
// //   },
// //   {
// //     id: 2,
// //     name: "Jane Smith",
// //     email: "jane.smith@example.com",
// //     role: "student",
// //     status: "active",
// //     createdAt: "2023-02-20",
// //   },
// //   {
// //     id: 3,
// //     name: "Michael Johnson",
// //     email: "michael.johnson@example.com",
// //     role: "student",
// //     status: "inactive",
// //     createdAt: "2023-03-10",
// //   },
// //   {
// //     id: 4,
// //     name: "Emily Davis",
// //     email: "emily.davis@example.com",
// //     role: "admin",
// //     status: "active",
// //     createdAt: "2023-01-05",
// //   },
// //   {
// //     id: 5,
// //     name: "Robert Wilson",
// //     email: "robert.wilson@example.com",
// //     role: "school_admin",
// //     status: "active",
// //     createdAt: "2023-04-12",
// //   },
// // ]

// // export default function UsersPage() {
// //   const [users, setUsers] = useState(initialUsers)
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
// //   const [userToDelete, setUserToDelete] = useState(null)

// //   const filteredUsers = users.filter(
// //     (user) =>
// //       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       user.role.toLowerCase().includes(searchTerm.toLowerCase()),
// //   )

// //   const handleDeleteUser = () => {
// //     setUsers(users.filter((user) => user.id !== userToDelete))
// //     setDeleteDialogOpen(false)
// //   }

// //   const getStatusBadge = (status) => {
// //     switch (status) {
// //       case "active":
// //         return <Badge className="bg-green-500">Active</Badge>
// //       case "inactive":
// //         return <Badge className="bg-gray-500">Inactive</Badge>
// //       default:
// //         return <Badge>{status}</Badge>
// //     }
// //   }

// //   const getRoleBadge = (role) => {
// //     switch (role) {
// //       case "admin":
// //         return <Badge className="bg-rose-500">Admin</Badge>
// //       case "school_admin":
// //         return <Badge className="bg-blue-500">School Admin</Badge>
// //       case "student":
// //         return <Badge className="bg-yellow-500">Student</Badge>
// //       default:
// //         return <Badge>{role}</Badge>
// //     }
// //   }

// //   return (
// //     <AdminDashboardLayout>
// //       <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl font-bold">Users</h1>
// //       </div>

// //       <Card className="mb-6">
// //         <CardHeader className="pb-3">
// //           <CardTitle>User Management</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="flex items-center mb-4">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 type="search"
// //                 placeholder="Search users..."
// //                 className="pl-8"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           <div className="rounded-md border">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHead>Name</TableHead>
// //                   <TableHead>Email</TableHead>
// //                   <TableHead>Role</TableHead>
// //                   <TableHead>Status</TableHead>
// //                   <TableHead>Created</TableHead>
// //                   <TableHead className="text-right">Actions</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredUsers.length === 0 ? (
// //                   <TableRow>
// //                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
// //                       No users found
// //                     </TableCell>
// //                   </TableRow>
// //                 ) : (
// //                   filteredUsers.map((user) => (
// //                     <TableRow key={user.id}>
// //                       <TableCell className="font-medium">{user.name}</TableCell>
// //                       <TableCell>{user.email}</TableCell>
// //                       <TableCell>{getRoleBadge(user.role)}</TableCell>
// //                       <TableCell>{getStatusBadge(user.status)}</TableCell>
// //                       <TableCell>{user.createdAt}</TableCell>
// //                       <TableCell className="text-right">
// //                         <DropdownMenu>
// //                           <DropdownMenuTrigger asChild>
// //                             <Button variant="ghost" size="icon">
// //                               <MoreHorizontal className="h-4 w-4" />
// //                               <span className="sr-only">Actions</span>
// //                             </Button>
// //                           </DropdownMenuTrigger>
// //                           <DropdownMenuContent align="end">
// //                             <DropdownMenuItem
// //                               className="text-red-600"
// //                               onClick={() => {
// //                                 setUserToDelete(user.id)
// //                                 setDeleteDialogOpen(true)
// //                               }}
// //                             >
// //                               <Trash2 className="mr-2 h-4 w-4" />
// //                               Delete
// //                             </DropdownMenuItem>
// //                           </DropdownMenuContent>
// //                         </DropdownMenu>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         </CardContent>
// //       </Card>

// //       {/* Delete Confirmation Dialog */}
// //       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Delete User</DialogTitle>
// //             <DialogDescription>
// //               Are you sure you want to delete this user? This action cannot be undone.
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
// //               Cancel
// //             </Button>
// //             <Button variant="destructive" onClick={handleDeleteUser}>
// //               Delete
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </AdminDashboardLayout>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { Search, MoreHorizontal, Trash2, Loader2 } from "lucide-react"

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
// import { usersAPI } from "@/lib/api"

// export default function UsersPage() {
//   const [users, setUsers] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [userToDelete, setUserToDelete] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       setLoading(true)
//       const { data } = await usersAPI.getUsers()
//       setUsers(data.data || [])
//     } catch (err) {
//       console.error("Error fetching users:", err)
//       setError("Failed to load users. Please try again later.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.role?.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handleDeleteUser = async () => {
//     try {
//       await usersAPI.deleteUser(userToDelete)
//       setUsers(users.filter((user) => user._id !== userToDelete))
//       setDeleteDialogOpen(false)
//     } catch (err) {
//       console.error("Error deleting user:", err)
//       setError("Failed to delete user. Please try again.")
//     }
//   }

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "active":
//         return <Badge className="bg-green-500">Active</Badge>
//       case "inactive":
//         return <Badge className="bg-gray-500">Inactive</Badge>
//       default:
//         return <Badge>{status || "Active"}</Badge>
//     }
//   }

//   const getRoleBadge = (role) => {
//     switch (role) {
//       case "admin":
//         return <Badge className="bg-rose-500">Admin</Badge>
//       case "school":
//         return <Badge className="bg-blue-500">School Admin</Badge>
//       case "user":
//         return <Badge className="bg-yellow-500">Student</Badge>
//       default:
//         return <Badge>{role || "User"}</Badge>
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
//         <h1 className="text-2xl font-bold">Users</h1>
//       </div>

//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <Card className="mb-6">
//         <CardHeader className="pb-3">
//           <CardTitle>User Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search users..."
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
//                   <TableHead>Email</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredUsers.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
//                       No users found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredUsers.map((user) => (
//                     <TableRow key={user._id}>
//                       <TableCell className="font-medium">{user.name}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>{getRoleBadge(user.role)}</TableCell>
//                       <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
//                       <TableCell className="text-right">
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="h-4 w-4" />
//                               <span className="sr-only">Actions</span>
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem
//                               className="text-red-600"
//                               onClick={() => {
//                                 setUserToDelete(user._id)
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
//             <DialogTitle>Delete User</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this user? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteUser}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </AdminDashboardLayout>
//   )
// }
