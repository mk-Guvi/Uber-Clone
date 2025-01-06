import { body } from "express-validator";

export const captainRegisterValidation = [
  body("fullName.firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),

  body("fullName.lastName")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 characters long"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 characters long"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Invalid vehicle type"),
];
