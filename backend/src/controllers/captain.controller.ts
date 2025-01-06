import { ValidationError, validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service";
import { Request, Response } from "express";
import captainModel from "../models/captain.model";

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
