import axios from "axios"

// Base URL for API calls
const API_URL = "http://localhost:5000/api"

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    // Check if we should use admin or school token based on the URL
    const isAdminRoute = config.url?.includes("/admin")
    const token = localStorage.getItem(isAdminRoute ? "adminToken" : "schoolToken")
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response?.status === 401) {
      // Check if it's an admin or school route
      const isAdminRoute = error.config.url?.includes("/admin")
      
      if (isAdminRoute) {
        localStorage.removeItem("adminToken")
        window.location.href = "/admin/login"
      } else {
        localStorage.removeItem("schoolToken")
        window.location.href = "/school/login"
      }
    }
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
  // Admin login
  adminLogin: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password, role: "admin" })
    return response.data
  },
  
  // School login
  schoolLogin: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password, role: "school" })
    return response.data
  },
  
  // School registration
  schoolRegister: async (schoolData: any) => {
    const response = await api.post("/auth/register", { ...schoolData, role: "school" })
    return response.data
  },
  
  // Get current user (works for both admin and school)
  getCurrentUser: async () => {
    const response = await api.get("/auth/me")
    return response.data
  },
  
  // Logout (client-side only)
  logout: (role: "admin" | "school") => {
    localStorage.removeItem(role === "admin" ? "adminToken" : "schoolToken")
  },
}

// Admin API calls
export const adminAPI = {
  getStats: async () => {
    const response = await api.get("/admin/stats")
    return response.data
  },
}

// Schools API calls
export const schoolsAPI = {
  // Admin endpoints
  getSchools: async (query = "") => {
    const response = await api.get(`/schools${query}`)
    return response.data
  },
  getSchool: async (id: string) => {
    const response = await api.get(`/schools/${id}`)
    return response.data
  },
  createSchool: async (schoolData: any) => {
    const response = await api.post("/admin/schools", schoolData)
    return response.data
  },
  updateSchool: async (id: string, schoolData: any) => {
    const response = await api.put(`/schools/${id}`, schoolData)
    return response.data
  },
  deleteSchool: async (id: string) => {
    const response = await api.delete(`/schools/${id}`)
    return response.data
  },
  updateSchoolStatus: async (id: string, status: string) => {
    const response = await api.put(`/schools/${id}/status`, { status })
    return response.data
  },
  
  // School dashboard endpoints
  getSchoolProfile: async () => {
    const response = await api.get("/schools/me")
    return response.data
  },
  updateSchoolProfile: async (profileData: any) => {
    const response = await api.put("/schools/me", profileData)
    return response.data
  },
  getSchoolStats: async () => {
    const response = await api.get("/schools/me/stats")
    return response.data
  },
  uploadSchoolPhoto: async (formData: FormData) => {
    const response = await api.post("/schools/me/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },
}

// Services API calls
export const servicesAPI = {
  getSchoolServices: async () => {
    const response = await api.get("/services/me")
    return response.data
  },
  createService: async (serviceData: any) => {
    const response = await api.post("/services", serviceData)
    return response.data
  },
  updateService: async (id: string, serviceData: any) => {
    const response = await api.put(`/services/${id}`, serviceData)
    return response.data
  },
  deleteService: async (id: string) => {
    const response = await api.delete(`/services/${id}`)
    return response.data
  },
}

// Pricing API calls
export const pricingAPI = {
  getSchoolPricing: async () => {
    const response = await api.get("/schools/me/pricing")
    return response.data
  },
  updateSchoolPricing: async (pricingData: any) => {
    const response = await api.put("/schools/me/pricing", pricingData)
    return response.data
  },
}

// Users API calls
export const usersAPI = {
  getUsers: async () => {
    const response = await api.get("/users")
    return response.data
  },
  getUser: async (id: string) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}

export default api
