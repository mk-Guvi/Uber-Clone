import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.model";
import captainModel from "../models/captain.model";

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
    res.status(401).json({ message: "Error authenticating user" });
  }
};

export const authCaptain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const isBlacklisted = await BlacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.captain = captain;

    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: "Unauthorized" });
  }
};
