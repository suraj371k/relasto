import { create } from "zustand";
import axios from "axios";

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
  images: string[]; // fixed
  propertyType: "house" | "apartment" | "villa" | "studio" | "commercial";
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
  status: "active" | "sold" | "pending";
}

interface PropertiesState {
  properties: Properties[]; // fixed
  loading: boolean;
  error: string | null;

  // actions
  createProperties: (data: Properties) => Promise<void>;
  uploadImages: (files: File[]) => Promise<string[]>;
  getAllProperties: () => void;
  getPropertyBYId: (id: string) => Promise<void>;
}

export const usePropertiesStore = create<PropertiesState>((set) => ({
  properties: [],
  loading: false,
  error: null,

  createProperties: async (data) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(`/api/property/create`, data);
      set((state) => ({
        properties: [...state.properties, response.data.property], // ✅ fix here
        loading: false,
      }));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Property creation failed";

      set({ loading: false, error: errorMessage });
      console.error("Error creating property:", errorMessage);
      throw error;
    }
  },

  uploadImages: async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await axios.post("/api/property/upload", formData, {
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
      set({ loading: true, error: null });
      const response = await axios.get(`/api/property/all`);
      set({ properties: response.data.properties, loading: false });
    } catch (error) {
      set({ loading: false, error: "error in get all properties" });
    }
  },

  getPropertyBYId: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`/api/property/${id}`);
      set({ properties: [response.data.property], loading: false });
    } catch (error) {
      set({ loading: false, error: "error in get property details" });
    }
  },
}));
