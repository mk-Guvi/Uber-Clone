import { ValidationError, validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service";
import { Request, Response } from "express";
import captainModel from "../models/captain.model";
import BlacklistToken from "../models/blacklistToken.model";

export const registerCaptain = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, vehicle } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const captain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
      color: vehicle.color,
      plate: vehicle.plate,
    });
    const token = captain.generateAuthToken();

    res.status(201).json({ captain, token });
  } catch (error) {
    let errorMessage = "Error registering captain";

    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;

      // Check for duplicate error (assuming you are using MongoDB)
      if ((error as any).code === 11000) {
        // Use type assertion to access 'code'
        errorMessage = "Captain already exists";
      }
    }

    res.status(403).json({ message: errorMessage });
  }
};

export const loginCaptain = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const captain = await captainModel.findOne({ email }).select("+password"); //by default password is not selected
    if (!captain) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400, //24 hours
    });
    res.status(200).json({ captain, token });
  } catch (error) {
    res.status(403).json({ message: "Error logging in captain" });
  }
};

export const getCaptainProfile = async (req: Request, res: Response) => {
  try {
    const captain = req.captain;
    if (!captain) {
      res.status(401).json({ message: "Captain Not Found" });
      return;
    }
    res.json(captain);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong.Please try again." });
  }
};

export const logoutCaptain = async (req: Request, res: Response) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers["authorization"]?.split(" ")[1] as string);
    res.clearCookie("token");
    await BlacklistToken.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    let errorMessage = "Something Went Wrong.Please try again.";
    if ((error as any).code === 11000) {
      errorMessage = "Token already exists";
    }
    res.status(500).json({ message: "Something Went Wrong.Please try again." });
  }
};
