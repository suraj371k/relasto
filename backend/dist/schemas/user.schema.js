"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: zod_1.z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    role: zod_1.z.enum(["user", "agent"]).default("user"),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password is required"),
});
exports.UpdateUserSchema = exports.RegisterSchema.partial();
