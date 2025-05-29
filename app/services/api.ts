import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

// School API
export const schoolAPI = {
  register: async (schoolData: FormData) => {
    const response = await api.post('/auth/school/register', schoolData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/school/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/school/me');
    return response.data;
  },

  getSchools: async (params?: Record<string, any>) => {
    const response = await api.get('/schools', { params });
    return response.data;
  },

  getSchoolById: async (id: string) => {
    const response = await api.get(`/schools/${id}`);
    return response.data;
  },

  updateSchool: async (id: string, schoolData: FormData) => {
    const response = await api.put(`/schools/${id}`, schoolData);
    return response.data;
  },

  deleteSchool: async (id: string) => {
    const response = await api.delete(`/schools/${id}`);
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData: {
    name: string;
    description: string;
    foundedYear: number;
    email: string;
    phone: string;
    website?: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    services: {
      [key: string]: boolean;
    };
    instructors: number;
    vehicles: number;
    openingHours: {
      [key: string]: {
        open: string;
        close: string;
        closed: boolean;
      };
    };
  }) => {
    const response = await api.put('/schools/profile', profileData);
    return response.data;
  },

  // Update pricing
  updatePricing: async (pricingData: {
    prices: {
      registrationFee: number;
      theoryLesson: number;
      drivingLesson: number;
      examFee: number;
      theoryExam: number;
      nightDriving: number;
      highwayDriving: number;
    };
  }) => {
    const response = await api.put('/schools/pricing', pricingData);
    return response.data;
  },

  // Upload media
  uploadMedia: async (mediaData: FormData) => {
    const response = await api.put('/schools/media', mediaData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Review API
export const reviewAPI = {
  createReview: async (schoolId: string, reviewData: {
    title: string;
    text: string;
    rating: number;
  }) => {
    const response = await api.post(`/schools/${schoolId}/reviews`, reviewData);
    return response.data;
  },

  getReviews: async (schoolId: string) => {
    const response = await api.get(`/schools/${schoolId}/reviews`);
    return response.data;
  },
};

// User API
export const userAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData: {
    name?: string;
    email?: string;
    phone?: string;
  }) => {
    const response = await api.put('/auth/updatedetails', userData);
    return response.data;
  },

  updatePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put('/auth/updatepassword', passwordData);
    return response.data;
  },

  logout: async () => {
    const response = await api.get('/auth/logout');
    return response.data;
  },
};

export default api; 