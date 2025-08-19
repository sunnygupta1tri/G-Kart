import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

export const authenticateUser = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.id = decoded._id;
  next();
} catch (error) {
  console.error("Error authenticating user:", error);
  res.status(401).json({ message: "Unauthorized" });
} 
};
