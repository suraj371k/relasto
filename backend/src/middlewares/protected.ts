import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt"; // your jwt.verify wrapper

// ✅ Extend Express Request to add authenticated user info
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: "user" | "agent";
  };
}

// ✅ Authentication middleware
export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized. Token missing." });
      return;
    }

    const decoded = verifyToken(token); // expected to return { userId, role }
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// ✅ Role-based middleware: Only users
export const isUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "user") {
    res.status(403).json({ message: "Access denied: User only." });
    return;
  }
  next();
};

// ✅ Role-based middleware: Only agents
export const isAgent = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "agent") {
    res.status(403).json({ message: "Access denied: Agent only." });
    return;
  }
  next();
};
