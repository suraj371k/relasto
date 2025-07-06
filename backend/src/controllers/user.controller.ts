import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schemas/user.schema";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

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

export const getProfile = async (req: Request , res: Response): Promise <void> => {
    try {
    const user = (req as any).user;
    if (!user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }

    const dbUser = await User.findById(user.userId).select('-password');

    if (!dbUser) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
    }

    res.status(200).json({
        success: true,
        user: dbUser
    });
    } catch (error) {
        console.error("Error in get profile controller" , error)
        res.status(500).json({succcess: false , message: "Internal server error"})
    }
}