import axios from "axios";
import { auth } from "../firebase/config";

// API Configuration
const API_BASE_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api`;
const HEALTH_CHECK_URL = API_BASE_URL.replace(/\/api$/, "") + "/health";

const COLD_START_THRESHOLD = 3000;
const HEALTH_POLL_INTERVAL = 3000;
const HEALTH_POLL_TIMEOUT = 60000;

// Cold start overlay — bridge between axios interceptors and React context
type ColdStartCallbacks = {
  start: () => void;
  stop: () => void;
};

let coldStartCallbacks: ColdStartCallbacks | null = null;
let pendingRequests = 0;
let coldStartTimer: ReturnType<typeof setTimeout> | null = null;
let healthPollInProgress = false;

export const registerColdStartCallbacks = (cb: ColdStartCallbacks) => {
  coldStartCallbacks = cb;
};

const trackRequestStart = () => {
  pendingRequests++;
  if (!coldStartTimer) {
    coldStartTimer = setTimeout(() => {
      if (pendingRequests > 0 && coldStartCallbacks) {
        coldStartCallbacks.start();
      }
      coldStartTimer = null;
    }, COLD_START_THRESHOLD);
  }
};

const trackRequestEnd = () => {
  pendingRequests = Math.max(0, pendingRequests - 1);
  if (pendingRequests === 0) {
    if (coldStartTimer) {
      clearTimeout(coldStartTimer);
      coldStartTimer = null;
    }
    coldStartCallbacks?.stop();
  }
};

// Poll /health until the server responds or timeout is reached
const waitForServer = (): Promise<void> => {
  if (healthPollInProgress) {
    // Another request is already polling — just wait for it
    return new Promise((resolve, reject) => {
      const check = setInterval(() => {
        if (!healthPollInProgress) {
          clearInterval(check);
          resolve();
        }
      }, 500);
      setTimeout(() => {
        clearInterval(check);
        reject(new Error("Server wake-up timed out while waiting for existing poll"));
      }, HEALTH_POLL_TIMEOUT);
    });
  }

  healthPollInProgress = true;
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const poll = async () => {
      if (Date.now() - start >= HEALTH_POLL_TIMEOUT) {
        healthPollInProgress = false;
        reject(new Error("Server wake-up timed out"));
        return;
      }

      try {
        await axios.get(HEALTH_CHECK_URL, { timeout: 5000 });
        healthPollInProgress = false;
        resolve();
      } catch {
        setTimeout(poll, HEALTH_POLL_INTERVAL);
      }
    };

    poll();
  });
};

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — add auth token
api.interceptors.request.use((config) => {
  trackRequestStart();

  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor — token refresh + health-poll retry for cold starts
api.interceptors.response.use(
  (response) => {
    trackRequestEnd();
    return response;
  },
  async (error) => {
    trackRequestEnd();
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }

    // Handle 401 — try refreshing the Firebase token and retry once
    if (error.response?.status === 401 && !(config as any)._tokenRefreshed) {
      const user = auth.currentUser;
      if (user) {
        try {
          const freshToken = await user.getIdToken(true);
          localStorage.setItem("authToken", freshToken);
          config.headers.Authorization = `Bearer ${freshToken}`;
          (config as any)._tokenRefreshed = true;
          return api.request(config);
        } catch {
          return Promise.reject(error);
        }
      }
    }

    // Only health-poll retry on network errors or 5xx (server sleeping / cold start)
    const shouldRetry =
      !error.response || error.response.status >= 500;

    if (!shouldRetry || (config as any)._healthPolled) {
      return Promise.reject(error);
    }

    // Mark so we don't re-enter the health poll loop on the retry
    (config as any)._healthPolled = true;

    try {
      await waitForServer();
      trackRequestStart();
      return api.request(config);
    } catch {
      return Promise.reject(error);
    }
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
