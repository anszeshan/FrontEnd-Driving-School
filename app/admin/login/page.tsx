"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // For demo purposes, hardcoded admin credentials
    if (email === "admin@fahrschulfinder.de" && password === "Admin!@#$1234") {
      // Simulate API call
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 1000)
    } else {
      setError("Invalid email or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <MapPin className="h-6 w-6 text-rose-500" />
        <span className="text-xl font-bold">Fahrschulfinder</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-rose-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Login
            </CardTitle>
            <CardDescription className="text-rose-100">
              Access the admin dashboard to manage driving schools and users
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@fahrschulfinder.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/admin/forgot-password" className="text-xs text-rose-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>For demo purposes, use:</p>
              <p className="font-medium">Email: admin@fahrschulfinder.de</p>
              <p className="font-medium">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-8">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { MapPin, Lock } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useAuth } from "@/context/AuthContext"

// export default function AdminLoginPage() {
//   const router = useRouter()
//   const { login, error, loading, isAuthenticated } = useAuth()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   useEffect(() => {
//     // Redirect if already authenticated
//     if (isAuthenticated) {
//       router.push("/admin/dashboard")
//     }
//   }, [isAuthenticated, router])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await login(email, password)
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
//       <Link href="/" className="flex items-center gap-2 mb-8">
//         <MapPin className="h-6 w-6 text-rose-500" />
//         <span className="text-xl font-bold">Fahrschulfinder</span>
//       </Link>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md"
//       >
//         <Card className="border-none shadow-lg">
//           <CardHeader className="bg-rose-500 text-white rounded-t-lg">
//             <CardTitle className="text-2xl flex items-center gap-2">
//               <Lock className="h-5 w-5" />
//               Admin Login
//             </CardTitle>
//             <CardDescription className="text-rose-100">
//               Access the admin dashboard to manage driving schools and users
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {error && (
//               <Alert variant="destructive" className="mb-4">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="admin@fahrschulfinder.de"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Password</Label>
//                   <Link href="/admin/forgot-password" className="text-xs text-rose-500 hover:underline">
//                     Forgot password?
//                   </Link>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </form>

//             <div className="mt-6 text-center text-sm text-muted-foreground">
//               <p>For demo purposes, use:</p>
//               <p className="font-medium">Email: admin@fahrschulfinder.de</p>
//               <p className="font-medium">Password: admin123</p>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <div className="mt-8">
//         <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
//           ← Back to Homepage
//         </Link>
//       </div>
//     </div>
//   )
// }
