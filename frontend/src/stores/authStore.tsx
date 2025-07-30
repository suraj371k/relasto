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
  isAuthenticated: boolean;
  agents: User[];

  //actions
  getAgents: () => void;
  login: (userData: { email: string; password: string }) => void;
  logout: () => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "user" | "agent";
  }) => void;
  fetchProfile: () => void;
  updateProfile: (agentData: {
    experience: number;
    social: string[];
    image: File;
  }) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  agents: [],

  // Computed property
  get isAuthenticated() {
    return get().user !== null;
  },

  login: async (userData: { email: string; password: string }) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`${baseURL}/api/auth/login`, userData, {
        withCredentials: true,
      });
      set({ user: response.data.user, loading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      set({ loading: false, error: errorMessage });
      console.log("error in login:", error.response?.data);
      throw error;
    }
  },

  getAgents: async () => {
    try {
      set({ loading: false, error: null });
      const response = await axios.get(`${baseURL}/api/auth/agents`);
      set({ agents: response.data.agents, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.response.data });
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        userData,
        {
          withCredentials: true,
        }
      );
      set({ user: response.data.user, loading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      set({ loading: false, error: errorMessage });
      console.log("Backend error:", error.response?.data);
      throw error;
    }
  },
  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${baseURL}/api/auth/my-profile`);
      set({ user: response.data.user, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
      console.log("Error in get profile", error.response?.data);
      throw error;
    }
  },

  updateProfile: async (agentData: {
    experience: number;
    social: string[];
    image?: File;
  }) => {
    try {
      set({ loading: true, error: null });
      const formData = new FormData();
      formData.append("experience", agentData.experience.toString());
      agentData.social.forEach((socialLink) => {
        formData.append("social", socialLink);
      });

      if (agentData.image) {
        formData.append("image", agentData.image);
      }
      const response = await axios.put(
        `${baseURL}/api/auth/agents/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      set({ user: response.data.agent, loading: false });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Update failed";
      set({ loading: false, error: errorMessage });
      console.error("Update error:", error.response?.data);
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axios.post(`${baseURL}/api/auth/logout`);
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
      console.log("error in register", error.response.data);
      throw error;
    }
  },
}));
