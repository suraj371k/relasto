import { create } from "zustand";
import axios from "axios";
import { baseURL } from "@/lib/baseUrl";

axios.defaults.withCredentials = true;

interface User {
  image: string | Blob | undefined;
  user: any;
  _id: string;
  name: string;
  email: string;
  role: "user" | "agent";
  experience: number;
  social: string[];
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  agents: User[];
  isAuthenticated: boolean;

  // actions
  getAgents: () => void;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "user" | "agent";
  }) => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (agentData: {
    experience: number;
    social: string[];
    image?: File;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  agents: [],
  isAuthenticated: false,

  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(
        `${baseURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed";
      set({ error: msg, loading: false });
      console.error("Login error:", err.response?.data);
      throw err;
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.post(`${baseURL}/api/auth/register`, userData, {
        withCredentials: true,
      });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed";
      set({ error: msg, loading: false });
      console.error("Register error:", err.response?.data);
      throw err;
    }
  },

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${baseURL}/api/auth/my-profile`, {
        withCredentials: true,
      });
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Fetch profile failed";
      set({ error: msg, user: null, isAuthenticated: false, loading: false });
      console.error("Error in fetchProfile:", err.response?.data);
      throw err;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axios.post(`${baseURL}/api/auth/logout`, {}, { withCredentials: true });
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Logout failed";
      set({ error: msg, loading: false });
      console.error("Logout error:", err.response?.data);
      throw err;
    }
  },

  getAgents: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`${baseURL}/api/auth/agents`);
      set({ agents: res.data.agents, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Fetch agents failed";
      set({ error: msg, loading: false });
      console.error("GetAgents error:", err.response?.data);
    }
  },

  updateProfile: async ({ experience, social, image }) => {
    try {
      set({ loading: true, error: null });

      const formData = new FormData();
      formData.append("experience", experience.toString());
      social.forEach((link) => formData.append("social", link));
      if (image) formData.append("image", image);

      const res = await axios.put(
        `${baseURL}/api/auth/agents/profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      set({ user: res.data.agent, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Profile update failed";
      set({ error: msg, loading: false });
      console.error("UpdateProfile error:", err.response?.data);
      throw err;
    }
  },
}));
