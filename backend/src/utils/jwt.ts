import jwt from 'jsonwebtoken'

export interface JwtPayload {
    userId: string;
    role: "user" | "agent"
}

//generate token
export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload , process.env.JWT_SECRET! , {expiresIn: '7d'})
}

//verify token
export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token , process.env.JWT_SECRET!) as JwtPayload
}

