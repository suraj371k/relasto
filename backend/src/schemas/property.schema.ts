import { z } from "zod";

export const PropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  price: z.number().min(0, "Price is required"),
  parking: z.boolean(),
  outdoor: z.boolean(),
  ac: z.boolean(),
  yearBuilt: z.number().int().min(1800, "Year built is required"),
  agentName: z.string().min(1, "Agent is required"), 
  location: z.string().min(1, "Location is required"),
  area: z.number().min(0, "Area is required"),
  bedroom: z.number().int().min(0, "Bedroom count is required"),
  bathroom: z.number().int().min(0, "Bathroom count is required"),
  images: z
    .array(z.string().url("Image must be a valid URL")),
  propertyType: z.enum(["house", "apartment", "villa", "studio", "commercial"]),
  furnishing: z.enum(["furnished", "semi-furnished", "unfurnished"]),
});
