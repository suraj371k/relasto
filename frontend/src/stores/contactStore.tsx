import { create } from "zustand";
import axios from "axios";

interface ContactFormState {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  loading: boolean;
  success: boolean;
  error: string | null;
  setField: (field: string, value: string) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

export const useContactStore = create<ContactFormState>((set, get) => ({
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
  loading: false,
  success: false,
  error: null,

  setField: (field, value) => set({ [field]: value }),

  resetForm: () =>
    set({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
      loading: false,
      success: false,
      error: null,
    }),
  submitForm: async () => {
    const { name, email, phoneNumber, message } = get();
    set({ loading: true, error: null, success: false });

    try {
      const response = await axios.post("/api/contact", {
        name,
        email,
        phoneNumber,
        message,
      });

      if (response.data.success) {
        set({ success: true });
        get().resetForm();
      } else {
        set({ error: "Something went wrong" });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.error || "Server error" });
    } finally {
      set({ loading: false });
    }
  },
}));
