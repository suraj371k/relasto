import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: "user" | "agent";
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
       res.status(401).json({ message: "Unauthorize. Token missing" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
     res.status(401).json({ message: "Invalid or expired token." });
  }
};


// 🔐 Role-based guard: Only user
export const isUser = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.role !== "user") {
       res.status(403).json({ message: "Access denied: User only." });
    }
    next();
  };
  
  // 🔐 Role-based guard: Only agent
  export const isAgent = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.role !== "agent") {
       res.status(403).json({ message: "Access denied: Agent only." });
    }
    next();
  };
  