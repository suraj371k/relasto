"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertySchema = void 0;
const zod_1 = require("zod");
exports.PropertySchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z
        .string()
        .min(10, "Description should be at least 10 characters"),
    price: zod_1.z.number().min(0, "Price is required"),
    parking: zod_1.z.boolean(),
    outdoor: zod_1.z.boolean(),
    ac: zod_1.z.boolean(),
    yearBuilt: zod_1.z.number().int().min(1800, "Year built is required"),
    agentName: zod_1.z.string().min(1, "Agent is required"),
    location: zod_1.z.string().min(1, "Location is required"),
    area: zod_1.z.number().min(0, "Area is required"),
    bedroom: zod_1.z.number().int().min(0, "Bedroom count is required"),
    bathroom: zod_1.z.number().int().min(0, "Bathroom count is required"),
    images: zod_1.z.array(zod_1.z.string().url("Image must be a valid URL")).optional(),
    propertyType: zod_1.z.enum(["house", "apartment", "villa", "studio", "commercial"]),
    furnishing: zod_1.z.enum(["furnished", "semi-furnished", "unfurnished"]),
    status: zod_1.z.enum(["active", "pending", "sold"]),
});
