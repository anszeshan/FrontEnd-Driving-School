"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, LogOut, Home, Users, School, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    return pathname === path
  }

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Schools", path: "/admin/schools", icon: School },
    { name: "Users", path: "/admin/users", icon: Users },
    
  ]

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex w-64 flex-col bg-white border-r h-screen sticky top-0"
      >
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">Fahrschulfinder</span>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive(item.path)
                    ? "bg-rose-50 text-rose-500 font-medium"
                    : "text-muted-foreground hover:bg-muted transition-colors"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="p-4 border-t">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b h-16 flex items-center px-4 md:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <Link href="/" className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-rose-500" />
                    <span className="text-xl font-bold">Fahrschulfinder</span>
                  </Link>
                </div>
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                          isActive(item.path)
                            ? "bg-rose-50 text-rose-500 font-medium"
                            : "text-muted-foreground hover:bg-muted transition-colors"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="p-4 border-t">
                  <Link href="/">
                    <Button variant="outline" className="w-full justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-medium">Admin</span>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Image
                src="/placeholder.svg?height=32&width=32"
                width="32"
                height="32"
                className="rounded-full"
                alt="Avatar"
              />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
