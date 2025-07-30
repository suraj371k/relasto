import { create } from "zustand";
import axios from "axios";
import { baseURL } from "@/lib/baseUrl";

axios.defaults.withCredentials = true;

interface Properties {
  _id: string;
  title: string;
  description: string;
  price: number;
  parking: boolean;
  outdoor: boolean;
  ac: boolean;
  yearBuilt: number;
  agentName:
    | string
    | { _id: string; name: string; email: string; phoneNumber: string };
  location: string;
  area: number;
  bedroom: number;
  bathroom: number;
  images: string[]; 
  propertyType: "house" | "apartment" | "villa" | "studio" | "commercial";
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
  status: "active" | "sold" | "pending";
}

interface PropertyQueryParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  furnishing?: string;
  bedroom?: number;
  bathroom?: number;
  location?: string;
  page?: number;
  limit?: number;
}

interface PropertiesState {
  properties: Properties[]; // fixed
  loading: boolean;
  error: string | null;
  agentProperties: Properties[];
  status: string;
  total: number;
  totalPages: number;
  filters: PropertyQueryParams;

  // actions
  setFilters: (filters: Partial<PropertyQueryParams>) => void;
  updateStatus: (
    id: string,
    newStatus: "active" | "pending" | "sold"
  ) => Promise<void>;
  getAgentProperties: (agentId: string) => Promise<void>;
  createProperties: (data: Properties) => Promise<void>;
  uploadImages: (files: File[]) => Promise<string[]>;
  getAllProperties: () => void;
  getPropertyBYId: (id: string) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

export const usePropertiesStore = create<PropertiesState>((set, get) => ({
  properties: [],
  loading: false,
  agentProperties: [],
  status: "active",
  error: null,
  total: 0,
  totalPages: 0,
  filters: {
    search: "",
    minPrice: undefined,
    maxPrice: undefined,
    propertyType: "",
    furnishing: "",
    bedroom: undefined,
    bathroom: undefined,
    location: "",
    page: 1,
    limit: 10,
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }));
  },

  createProperties: async (data) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.post(`${baseURL}/api/property/create`, data);

      set((state) => ({
        properties: [...state.properties, response.data.property],
        loading: false,
      }));
    } catch (error: any) {
      console.error("❌ Error response:", error.response?.data); // 🔍
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Property creation failed";

      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  deleteProperty: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.delete(`${baseURL}/api/property/${id}`);
      set((state) => ({
        agentProperties: state.agentProperties.filter(
          (prop) => prop._id !== id
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to delete property",
        loading: false,
      });
    }
  },

  updateStatus: async (
    id: string,
    newStatus: "active" | "pending" | "sold"
  ) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.patch(`${baseURL}/api/property/status/${id}`, {
        status: newStatus,
      });

      // Optional: update agentProperties in-place
      set((state) => ({
        agentProperties: state.agentProperties.map((prop) =>
          prop._id === id ? { ...prop, status: newStatus } : prop
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update status",
      });
    }
  },

  getAgentProperties: async (agentId: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${baseURL}/api/property/agent/${agentId}`);

      set({ agentProperties: response.data.properties, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.response?.data?.message });
    }
  },

  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await axios.post(`${baseURL}/api/property/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.imageUrls; // make sure your backend returns `imageUrls: string[]`
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Image upload failed";
      console.error("Image upload error:", message);
      throw new Error(message);
    }
  },

  getAllProperties: async () => {
    try {
      const { filters } = get();
      set({ loading: true, error: null });
      const response = await axios.get(`${baseURL}/api/property/all`, {
        params: filters,
      });
      set({
        properties: response.data.properties,
        total: response.data.total,
        totalPages: response.data.totalPages,
        loading: false,
      });
    } catch (error) {
      set({ loading: false, error: "error in get all properties" });
    }
  },

  getPropertyBYId: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${baseURL}/api/property/${id}`);
      set({ properties: [response.data.property], loading: false });
    } catch (error) {
      set({ loading: false, error: "error in get property details" });
    }
  },
}));
