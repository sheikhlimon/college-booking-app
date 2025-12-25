import axios from "axios";

// API Configuration
const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// TypeScript interfaces based on backend models
export interface College {
  _id: string;
  name: string;
  image: string;
  rating: number;
  admissionDate: string;
  events: string[];
  researchCount: number;
  sports: string[];
  gallery: string[];
}

export interface Admission {
  _id: string;
  candidateName: string;
  subject: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  image: string;
  collegeId: College;
  createdAt: string;
}

export interface Review {
  _id: string;
  collegeId: {
    _id: string;
    name: string;
    image: string;
  };
  userName?: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  university: string;
  address: string;
  updatedAt: string;
}

export interface ResearchPaper {
  _id: string;
  collegeId: {
    _id: string;
    name: string;
    image: string;
  };
  title: string;
  authors: string[];
  abstract?: string;
  link: string;
  category: string;
  publishDate: string;
  citations: number;
  createdAt: string;
}

// API Functions

// College endpoints
export const getColleges = async (): Promise<College[]> => {
  try {
    const response = await api.get("/colleges");
    return response.data;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    throw error;
  }
};

export const getCollegeById = async (id: string): Promise<College> => {
  try {
    const response = await api.get(`/colleges/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching college:", error);
    throw error;
  }
};

// Admission endpoints
export const submitAdmission = async (admissionData: {
  candidateName: string;
  subject: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  image: string;
  collegeId: string;
}): Promise<Admission> => {
  try {
    const response = await api.post("/admissions", admissionData);
    return response.data;
  } catch (error) {
    console.error("Error submitting admission:", error);
    throw error;
  }
};

export const getUserAdmissions = async (
  email: string
): Promise<Admission[]> => {
  try {
    const response = await api.get(`/admissions/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user admissions:", error);
    throw error;
  }
};

// Review endpoints
export const submitReview = async (reviewData: {
  collegeId: string;
  userName?: string;
  userEmail: string;
  rating: number;
  comment: string;
}): Promise<Review> => {
  try {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const response = await api.get("/reviews");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Research Paper endpoints
export const getAllPapers = async (filters?: {
  category?: string;
  college?: string;
}): Promise<ResearchPaper[]> => {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.college) params.append("college", filters.college);

    const response = await api.get(`/papers?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching papers:", error);
    throw error;
  }
};

export const getPapersByCollege = async (
  collegeId: string
): Promise<ResearchPaper[]> => {
  try {
    const response = await api.get(`/papers/college/${collegeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching college papers:", error);
    throw error;
  }
};

export const getPaperById = async (id: string): Promise<ResearchPaper> => {
  try {
    const response = await api.get(`/papers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paper:", error);
    throw error;
  }
};

// User endpoints
export const updateUser = async (
  email: string,
  userData: {
    name?: string;
    email?: string;
    university?: string;
    address?: string;
  }
): Promise<User> => {
  try {
    const response = await api.patch(`/users/${email}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Request interceptor for adding auth token (for future use)
api.interceptors.request.use((config) => {
  // Add Firebase auth token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - redirecting to login");
      // You can add redirect logic here
    }
    return Promise.reject(error);
  }
);

export default api;
