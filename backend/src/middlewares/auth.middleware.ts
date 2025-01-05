import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.model";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const token =
      (req.cookies?.token as string) ||
      (req.headers["authorization"]?.split(" ")[1] as string);

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Find user
    const user = await userModel.findById(decoded._id);
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: "Error authenticating user" });
  }
};
