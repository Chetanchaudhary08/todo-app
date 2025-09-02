import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string || "todogdg";

export interface AuthRequest extends Request {
    user?: any;
}

export const usermiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    console.log("Auth header:", authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extracted:", token);
    console.log("JWT Secret being used:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        console.log("Verifying token:", token);
        console.log("Using secret:", process.env.JWT_SECRET);

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

        console.log("Decoded payload:", decoded);

        req.user = decoded;

        next();
    } catch (err) {
        console.error("JWT verify error:", err);
        res.status(400).json({ message: "Invalid token" });
    }
};
