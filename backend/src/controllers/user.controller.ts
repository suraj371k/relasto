import {Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/protected";
import { LoginSchema, RegisterSchema } from "../schemas/user.schema";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { Agent } from "../models/agentsProfile.model";
import mongoose from "mongoose";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    //parse and validate with zod
    const result = RegisterSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "validation failed",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, password, role, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ success: false, message: "user already exist" });
      return;
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      name,
      role,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    //generate jwt token
    const token = generateToken({
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
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = LoginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "validation failed",
        error: result.error.flatten().fieldErrors,
      });
      return;
    }

    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return;
    }

    const token = generateToken({
      userId: String(user._id),
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const dbUser = await User.findById(user.userId).select("-password");

    if (!dbUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      user: dbUser,
    });
  } catch (error) {
    console.error("Error in get profile controller", error);
    res.status(500).json({ succcess: false, message: "Internal server error" });
  }
};

export const getAllAgents = async (req: Request, res: Response) => {
  try {
    const agents = await Agent.find()
      .populate("user", "name email phoneNumber role")
      .populate("reviews.userId", "name email")
      .exec();

    res.status(200).json({ success: true, agents });
  } catch (error: any) {
    console.error("Error fetching agents:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch agents",
      error: error.message,
    });
  }
};

export const addReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { agentId } = req.params;
    const { stars, comment } = req.body;
    const userId = req.user?.userId;

    //validate input
    if (!stars || stars < 1 || stars > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Stars must be between 1 and 5" });
    }
    if (!comment || comment.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Comment is required" });
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid agent ID" });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });
    }

    // Prevent duplicate reviews (optional)
    const alreadyReviewed = agent.reviews.find(
      (r) => r.userId.toString() === userId
    );
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ success: false, message: "You already reviewed this agent" });
    }
    agent.reviews.push({
      userId: new mongoose.Types.ObjectId(userId),
      comment,
      stars,
      date: new Date(),
    });

    // Recalculate average rating
    const totalStars = agent.reviews.reduce((sum, r) => sum + r.stars, 0);
    agent.rating = parseFloat((totalStars / agent.reviews.length).toFixed(1));

    await agent.save();

    res
      .status(201)
      .json({ success: true, message: "Review added successfully", agent });
  } catch (error: any) {
    console.error("Error adding review:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
  }
};

export const getAgentReviews = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      return res.status(400).json({ success: false, message: "Invalid agent ID" });
    }

    const agent = await Agent.findById(agentId).populate("reviews.userId", "name email");

    if (!agent) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    res.status(200).json({
      success: true,
      reviews: agent.reviews,
    });
  } catch (error: any) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
