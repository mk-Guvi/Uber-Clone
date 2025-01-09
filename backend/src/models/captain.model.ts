import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ICaptain, ICaptainMethods, ICaptainModel } from "../types/captain";

const captainSchema = new mongoose.Schema<
  ICaptain,
  ICaptainModel,
  ICaptainMethods
>({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long."],
    },
    lastName: {
      type: String,
      required: false,
      minLength: [3, "Last name must be at least 3 characters long."],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: [5, "Email must be at least 5 characters long"],
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [8, "Password must be at least 8 characters long"],
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    default: "inactive",
    enum: ["active", "inactive"],
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      mimeType: [3, "Color must be at least 3 characters long."],
    },
    plate: {
      type: String,
      required: true,
      mimeType: [3, "Plate number must be at least 3 characters long."],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1."],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "auto", "moto"],
    },
  },
  location: {
    lat: {
      type: Number,
      required: false,
    },
    lng: {
      type: Number,
      required: false,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.static("hashPassword", async function (password: string) {
  return await bcrypt.hash(password, 10);
});

const captainModel = mongoose.model<ICaptain, ICaptainModel>(
  "captain",
  captainSchema
);

export default captainModel;
