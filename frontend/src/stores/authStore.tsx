import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "agent";
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    //actions
    login: (userData: { email: string; password: string }) => void;
    logout: () => void;
    register: (userData: { name: string; email: string; password: string; phoneNumber: string; role: "user" | "agent" }) => void;
    fetchProfile: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  // Computed property
  get isAuthenticated() {
    return get().user !== null;
  },

     login: async (userData: { email: string; password: string }) => {
    try {
        set({ loading: true, error: null });
        const response = await axios.post(`/api/auth/login`, userData, {
            withCredentials: true,
        });
        set({ user: response.data.user, loading: false });
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Login failed";
        set({ loading: false, error: errorMessage });
        console.log("error in login:", error.response?.data);
        throw error;
    }
   },

   register: async (userData) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`/api/auth/register`, userData, {
        withCredentials: true,
      });
      set({ user: response.data.user, loading: false });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed";
      set({ loading: false, error: errorMessage });
      console.log("Backend error:", error.response?.data);
      throw error;
    }
  },
  fetchProfile: async () => {
    try {
        set({loading: true , error: null})
        const response = await axios.get(`/api/auth/my-profile`)
        set({user: response.data.user , loading: false})
    } catch (error: any) {
        set({loading: false , error: error.message})
        console.log("Error in get profile" , error.response?.data)
        throw error
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axios.post(`/api/auth/logout`);
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
      console.log("error in register" , error.response.data);
      throw error
    }
  },
}));
