"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios" // Verwendung von axios für Konsistenz

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SchoolLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post('https://backend-ds-blue.vercel.app/api/school/login', credentials)

      // Token in localStorage speichern (sicherere Optionen wie httpOnly-Cookies wären in der Produktion besser)
      localStorage.setItem('authToken', response.data.token)
      localStorage.setItem('schoolName', response.data.school.name)
      
      // Weiterleitung zum Dashboard
      router.push("/school/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || 'Anmeldung fehlgeschlagen')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
              <Image
                src="https://static.vecteezy.com/system/resources/previews/015/618/042/non_2x/driving-school-with-education-process-of-car-training-and-learning-to-drive-to-get-drivers-license-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg"
                alt="Fahrschul-Dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
                <h2 className="text-white text-3xl font-bold mb-4">Willkommen zurück!</h2>
                <p className="text-white/80 mb-6">
                  Melden Sie sich an, um Ihr Fahrschulprofil zu verwalten, Preise zu aktualisieren und mit potenziellen Schülern in Kontakt zu treten.
                </p>
                <div className="flex gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
                    <div className="text-white text-2xl font-bold">500+</div>
                    <div className="text-white/80 text-sm">Fahrschulen</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
                    <div className="text-white text-2xl font-bold">50.000+</div>
                    <div className="text-white/80 text-sm">Erreichte Schüler</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Fahrschul-Anmeldung</CardTitle>
                <CardDescription>Geben Sie Ihre Zugangsdaten ein, um auf Ihr Fahrschul-Dashboard zuzugreifen</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200">
                      {error}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="email@example.com" 
                          className="pl-10" 
                          value={credentials.email}
                          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Passwort</Label>
                        <Link href="#" className="text-sm text-rose-500 hover:underline">
                          Passwort vergessen?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="font-normal text-sm">
                        Für 30 Tage merken
                      </Label>
                    </div>
                    <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
                      {isLoading ? "Anmelden..." : "Anmelden"}
                    </Button>
                  </div>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-xs text-muted-foreground">ODER WEITER MIT</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Google"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Microsoft"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    Microsoft
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
                <div className="text-sm text-muted-foreground">
                  Haben Sie kein Konto?{" "}
                  <Link href="/school/register" className="text-rose-500 hover:underline font-medium">
                    Hier registrieren
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// // "use client"

// // import { useState } from "react"
// // import { motion } from "framer-motion"
// // import { Eye, EyeOff, Lock, Mail } from "lucide-react"
// // import Link from "next/link"
// // import Image from "next/image"
// // import { useRouter } from "next/navigation"

// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { Separator } from "@/components/ui/separator"
// // import Navbar from "@/components/navbar"
// // import Footer from "@/components/footer"

// // export default function SchoolLoginPage() {
// //   const router = useRouter()
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [error, setError] = useState("")
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [credentials, setCredentials] = useState({ email: "", password: "" })

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setIsLoading(true)
// //     setError("")

// //     try {
// //       const response = await fetch('https://backend-ds-blue.vercel.app/api/school/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(credentials),
// //       })

// //       const data = await response.json()
// //       if (!response.ok) {
// //         throw new Error(data.message || 'Login failed')
// //       }

// //       // Store schoolId and email in localStorage
// //       localStorage.setItem('schoolId', data.schoolId);
// //       localStorage.setItem('schoolEmail', credentials.email); // Add this line to store email
// //       router.push("/school/dashboard")
// //     } catch (err) {
// //       setError(err.message)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="flex flex-col min-h-screen bg-muted/30">
// //       <Navbar />
// //       <main className="flex-1 flex items-center justify-center p-4 md:p-8">
// //         <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
// //           <motion.div
// //             className="hidden md:block"
// //             initial={{ opacity: 0, x: -20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
// //               <Image
// //                 src="/placeholder.svg?height=500&width=500"
// //                 alt="Driving school dashboard"
// //                 fill
// //                 className="object-cover"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
// //                 <h2 className="text-white text-3xl font-bold mb-4">Welcome Back!</h2>
// //                 <p className="text-white/80 mb-6">
// //                   Log in to manage your driving school profile, update pricing, and connect with potential students.
// //                 </p>
// //                 <div className="flex gap-4">
// //                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
// //                     <div className="text-white text-2xl font-bold">500+</div>
// //                     <div className="text-white/80 text-sm">Driving Schools</div>
// //                   </div>
// //                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
// //                     <div className="text-white text-2xl font-bold">50k+</div>
// //                     <div className="text-white/80 text-sm">Students Reached</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </motion.div>

// //           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
// //             <Card className="border-none shadow-lg">
// //               <CardHeader className="space-y-1">
// //                 <CardTitle className="text-2xl font-bold">School Login</CardTitle>
// //                 <CardDescription>Enter your credentials to access your school dashboard</CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleSubmit}>
// //                   {error && (
// //                     <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200">
// //                       {error}
// //                     </div>
// //                   )}
// //                   <div className="space-y-4">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="email">Email</Label>
// //                       <div className="relative">
// //                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
// //                         <Input 
// //                           id="email" 
// //                           type="email" 
// //                           placeholder="email@example.com" 
// //                           className="pl-10" 
// //                           value={credentials.email}
// //                           onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
// //                           required 
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="space-y-2">
// //                       <div className="flex items-center justify-between">
// //                         <Label htmlFor="password">Password</Label>
// //                         <Link href="#" className="text-sm text-rose-500 hover:underline">
// //                           Forgot password?
// //                         </Link>
// //                       </div>
// //                       <div className="relative">
// //                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
// //                         <Input
// //                           id="password"
// //                           type={showPassword ? "text" : "password"}
// //                           className="pl-10 pr-10"
// //                           value={credentials.password}
// //                           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
// //                           required
// //                         />
// //                         <button
// //                           type="button"
// //                           onClick={() => setShowPassword(!showPassword)}
// //                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
// //                         >
// //                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                         </button>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-center space-x-2">
// //                       <Checkbox id="remember" />
// //                       <Label htmlFor="remember" className="font-normal text-sm">
// //                         Remember me for 30 days
// //                       </Label>
// //                     </div>
// //                     <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
// //                       {isLoading ? "Logging in..." : "Login"}
// //                     </Button>
// //                   </div>
// //                 </form>

// //                 <div className="relative my-6">
// //                   <div className="absolute inset-0 flex items-center">
// //                     <Separator />
// //                   </div>
// //                   <div className="relative flex justify-center">
// //                     <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                   <Button variant="outline" type="button" className="w-full">
// //                     <Image
// //                       src="/placeholder.svg?height=24&width=24"
// //                       alt="Google"
// //                       width={18}
// //                       height={18}
// //                       className="mr-2"
// //                     />
// //                     Google
// //                   </Button>
// //                   <Button variant="outline" type="button" className="w-full">
// //                     <Image
// //                       src="/placeholder.svg?height=24&width=24"
// //                       alt="Microsoft"
// //                       width={18}
// //                       height={18}
// //                       className="mr-2"
// //                     />
// //                     Microsoft
// //                   </Button>
// //                 </div>
// //               </CardContent>
// //               <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
// //                 <div className="text-sm text-muted-foreground">
// //                   Don't have an account?{" "}
// //                   <Link href="/school/register" className="text-rose-500 hover:underline font-medium">
// //                     Register here
// //                   </Link>
// //                 </div>
// //               </CardFooter>
// //             </Card>
// //           </motion.div>
// //         </div>
// //       </main>
// //       <Footer />
// //     </div>
// //   )
// // }


// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Eye, EyeOff, Lock, Mail } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import axios from "axios" // Using axios for consistency

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Separator } from "@/components/ui/separator"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"

// export default function SchoolLoginPage() {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [credentials, setCredentials] = useState({ email: "", password: "" })

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await axios.post('https://backend-ds-blue.vercel.app/api/school/login', credentials)

//       // Store token in localStorage (more secure options like httpOnly cookies would be better in production)
//       localStorage.setItem('authToken', response.data.token)
//       localStorage.setItem('schoolName', response.data.school.name)
      
//       // Redirect to dashboard
//       router.push("/school/dashboard")
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-muted/30">
//       <Navbar />
//       <main className="flex-1 flex items-center justify-center p-4 md:p-8">
//         <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
//           <motion.div
//             className="hidden md:block"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="relative h-[500px] w-full rounded-xl overflow-hidden">
//               <Image
//                 src="https://static.vecteezy.com/system/resources/previews/015/618/042/non_2x/driving-school-with-education-process-of-car-training-and-learning-to-drive-to-get-drivers-license-in-flat-cartoon-hand-drawn-templates-illustration-vector.jpg"
//                 alt="Driving school dashboard"
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-8">
//                 <h2 className="text-white text-3xl font-bold mb-4">Welcome Back!</h2>
//                 <p className="text-white/80 mb-6">
//                   Log in to manage your driving school profile, update pricing, and connect with potential students.
//                 </p>
//                 <div className="flex gap-4">
//                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
//                     <div className="text-white text-2xl font-bold">500+</div>
//                     <div className="text-white/80 text-sm">Driving Schools</div>
//                   </div>
//                   <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex-1">
//                     <div className="text-white text-2xl font-bold">50k+</div>
//                     <div className="text-white/80 text-sm">Students Reached</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//             <Card className="border-none shadow-lg">
//               <CardHeader className="space-y-1">
//                 <CardTitle className="text-2xl font-bold">School Login</CardTitle>
//                 <CardDescription>Enter your credentials to access your school dashboard</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit}>
//                   {error && (
//                     <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm border border-red-200">
//                       {error}
//                     </div>
//                   )}
//                   <div className="space-y-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email</Label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                         <Input 
//                           id="email" 
//                           type="email" 
//                           placeholder="email@example.com" 
//                           className="pl-10" 
//                           value={credentials.email}
//                           onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
//                           required 
//                         />
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <Label htmlFor="password">Password</Label>
//                         <Link href="#" className="text-sm text-rose-500 hover:underline">
//                           Forgot password?
//                         </Link>
//                       </div>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                         <Input
//                           id="password"
//                           type={showPassword ? "text" : "password"}
//                           className="pl-10 pr-10"
//                           value={credentials.password}
//                           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
//                         >
//                           {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                         </button>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="remember" />
//                       <Label htmlFor="remember" className="font-normal text-sm">
//                         Remember me for 30 days
//                       </Label>
//                     </div>
//                     <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
//                       {isLoading ? "Logging in..." : "Login"}
//                     </Button>
//                   </div>
//                 </form>

//                 <div className="relative my-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <Separator />
//                   </div>
//                   <div className="relative flex justify-center">
//                     <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <Button variant="outline" type="button" className="w-full">
//                     <Image
//                       src="/placeholder.svg?height=24&width=24"
//                       alt="Google"
//                       width={18}
//                       height={18}
//                       className="mr-2"
//                     />
//                     Google
//                   </Button>
//                   <Button variant="outline" type="button" className="w-full">
//                     <Image
//                       src="/placeholder.svg?height=24&width=24"
//                       alt="Microsoft"
//                       width={18}
//                       height={18}
//                       className="mr-2"
//                     />
//                     Microsoft
//                   </Button>
//                 </div>
//               </CardContent>
//               <CardFooter className="flex flex-col items-center gap-2 border-t p-6">
//                 <div className="text-sm text-muted-foreground">
//                   Don't have an account?{" "}
//                   <Link href="/school/register" className="text-rose-500 hover:underline font-medium">
//                     Register here
//                   </Link>
//                 </div>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }
