"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAgent = exports.isUser = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorize. Token missing" });
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
exports.authenticate = authenticate;
// 🔐 Role-based guard: Only user
const isUser = (req, res, next) => {
    if (req.user?.role !== "user") {
        res.status(403).json({ message: "Access denied: User only." });
    }
    next();
};
exports.isUser = isUser;
// 🔐 Role-based guard: Only agent
const isAgent = (req, res, next) => {
    if (req.user?.role !== "agent") {
        res.status(403).json({ message: "Access denied: Agent only." });
    }
    next();
};
exports.isAgent = isAgent;
