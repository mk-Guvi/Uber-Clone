import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { ValidationError, validationResult } from "express-validator";
import userModel from "../models/user.model";
import BlacklistToken from "../models/blacklistToken.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
    });
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    let errorMessage = "Error registering user";

    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;

      // Check for duplicate error (assuming you are using MongoDB)
      if ((error as any).code === 11000) {
        // Use type assertion to access 'code'
        errorMessage = "User already exists";
      }
    }

    res.status(403).json({ message: errorMessage });
  }
};

export const loginUser = async (req: Request, res: Response) => {
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

    const user = await userModel.findOne({ email }).select("+password"); //by default password is not selected
    
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400, //24 hours
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong.Please try again." });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "User Not Found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong.Please try again." });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
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
