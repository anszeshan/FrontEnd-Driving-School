"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "@/lib/api"

interface School {
  _id: string
  name: string
  email: string
  role: string
  city: string
  address: string
  phone: string
  description: string
  photo: string
}

interface SchoolAuthContextType {
  school: School | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (schoolData: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  clearError: () => void
}

const SchoolAuthContext = createContext<SchoolAuthContextType | undefined>(undefined)

export const SchoolAuthProvider = ({ children }: { children: ReactNode }) => {
  const [school, setSchool] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if school is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("schoolToken")
        if (!token) {
          setLoading(false)
          return
        }

        const { data } = await authAPI.getCurrentUser()

        // Only set as authenticated if user is a school
        if (data.role === "school") {
          setSchool(data)
        } else {
          // If not school, clear token
          localStorage.removeItem("schoolToken")
        }
      } catch (err) {
        console.error("Authentication error:", err)
        localStorage.removeItem("schoolToken")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await authAPI.schoolLogin(email, password)

      // Check if user is a school
      if (data.user.role !== "school") {
        setError("Unauthorized. School access only.")
        setLoading(false)
        return
      }

      localStorage.setItem("schoolToken", data.token)
      setSchool(data.user)
      router.push("/school/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const register = async (schoolData: any) => {
    setLoading(true)
    setError(null)

    try {
      const { data } = await authAPI.schoolRegister(schoolData)
      localStorage.setItem("schoolToken", data.token)
      setSchool(data.user)
      router.push("/school/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authAPI.logout("school")
    setSchool(null)
    router.push("/school/login")
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <SchoolAuthContext.Provider
      value={{
        school,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!school,
        clearError,
      }}
    >
      {children}
    </SchoolAuthContext.Provider>
  )
}

export const useSchoolAuth = () => {
  const context = useContext(SchoolAuthContext)
  if (context === undefined) {
    throw new Error("useSchoolAuth must be used within a SchoolAuthProvider")
  }
  return context
}
