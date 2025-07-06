"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const user_schema_1 = require("../schemas/user.schema");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        //parse and validate with zod
        const result = user_schema_1.RegisterSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { name, email, password, role, phoneNumber } = req.body;
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: "user already exist" });
        }
        //hash the password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        //create user
        const user = await user_model_1.User.create({
            name,
            role,
            email,
            phoneNumber,
            password: hashedPassword,
        });
        //generate jwt token
        const token = (0, jwt_1.generateToken)({
            userId: String(user._id),
            role: user.role,
        });
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const result = user_schema_1.LoginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                message: "validation failed",
                error: result.error.flatten().fieldErrors,
            });
        }
        const { password, email } = req.body;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            res
                .status(400)
                .json({ success: false, message: "Invalid email or password" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res
                .status(400)
                .json({ success: false, message: "Invalid email or password" });
        }
        const token = (0, jwt_1.generateToken)({
            userId: String(user._id),
            role: user.role,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.logout = logout;
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const dbUser = await user_model_1.User.findById(user.userId).select('-password');
        if (!dbUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({
            success: true,
            user: dbUser
        });
    }
    catch (error) {
        console.error("Error in get profile controller", error);
        res.status(500).json({ succcess: false, message: "Internal server error" });
    }
};
exports.getProfile = getProfile;
