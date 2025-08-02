import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/protected";
import { LoginSchema, RegisterSchema } from "../schemas/user.schema";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { Agent } from "../models/agentsProfile.model";
import mongoose from "mongoose";
import { cloudinary } from "../utils/cloudinary";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse and validate with zod
    const result = RegisterSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, email, password, role, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      role,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    // ✅ Auto-create Agent entry if role is agent
    if (role === "agent") {
      const existingAgent = await Agent.findOne({ user: user._id });
      if (!existingAgent) {
        await Agent.create({
          user: user._id,
          image: "default.jpg", // or accept from req.body
          experience: 0,
          rating: 0,
          social: [],
          reviews: [],
        });
      }
    }

    // Generate JWT token
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
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

    // ✅ Fetch agent profile and attach to user object
    let agentData = null;
    if (dbUser.role === "agent") {
      const agent = await Agent.findOne({ user: dbUser._id }).select(
        "image experience social"
      );
      if (agent) {
        agentData = {
          image: agent.image,
          experience: agent.experience,
          social: agent.social,
        };
      }
    }

    res.status(200).json({
      success: true,
      user: {
        ...dbUser.toObject(),
        ...(agentData || {}), // merge agent fields into user
      },
    });
  } catch (error) {
    console.error("Error in get profile controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllAgents = async (req: Request, res: Response) => {
  try {
    const agents = await Agent.find()
      .populate({
        path: "user",
        select: "name email phoneNumber role",
        match: { role: "agent" },
      })
      .select("-__v");

    const filteredAgents = agents.filter((agent) => agent.user !== null);

    res.status(200).json({ success: true, agents: filteredAgents });
  } catch (error: any) {
    console.error("Error fetching agents:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch agents",
      error: error.message,
    });
  }
};

export const updateAgentProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const { experience, social } = req.body;
    const file = req.file;

    // Validate agent role
    if (req.user?.role !== "agent") {
      return res
        .status(403)
        .json({ success: false, message: "Only agents can update profile" });
    }

    const agent = await Agent.findOne({ user: userId });
    if (!agent) {
      return res
        .status(404)
        .json({ success: false, message: "Agent profile not found" });
    }

    // ✅ Just use the already-uploaded image URL
    if (file && file.path) {
      agent.image = file.path;
    }

    if (experience) agent.experience = experience;
    if (social) agent.social = Array.isArray(social) ? social : [social];

    await agent.save();

    return res.status(200).json({ success: true, agent });
  } catch (error: any) {
    console.error("Update error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error?.message,
    });
  }
};
