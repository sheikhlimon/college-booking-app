import axios from "axios";

type RetryConfig = {
  retryCount?: number;
  maxRetries?: number;
};

// API Configuration
const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api`;

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

// Create axios instance with retry logic
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Increased to 60s for cold starts
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add retry config and auth token
api.interceptors.request.use((config) => {
  (config as RetryConfig).retryCount = 0;
  (config as RetryConfig).maxRetries = MAX_RETRIES;

  // Add Firebase auth token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for error handling and retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as RetryConfig & typeof error.config;

    if (!config) {
      return Promise.reject(error);
    }

    // Retry on network errors, timeouts, or 5xx server errors (including cold starts)
    const shouldRetry =
      !error.response || // Network error or timeout
      error.response.status >= 500; // Server error (503 during cold start)

    if (!shouldRetry) {
      return Promise.reject(error);
    }

    const retryCount = config.retryCount || 0;
    const maxRetries = config.maxRetries || MAX_RETRIES;

    if (retryCount >= maxRetries) {
      return Promise.reject(error);
    }

    config.retryCount = retryCount + 1;

    // Exponential backoff: 2s, 4s, 8s for cold starts
    const backoffDelay = Math.min(
      BASE_DELAY * Math.pow(2, retryCount) * 2,
      15000
    );
    await new Promise((resolve) => setTimeout(resolve, backoffDelay));

    return api.request(config);
  }
);

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
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    // Return null if user not found (404), throw for other errors
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error("Error fetching user:", error);
    throw error;
  }
};

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

export default api;
