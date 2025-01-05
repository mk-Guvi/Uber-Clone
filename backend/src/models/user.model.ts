import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IUserMethods, IUserModel } from "../types/user";

const userSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.static("hashPassword", async function (password: string) {
  return await bcrypt.hash(password, 10);
});

const userModel = mongoose.model<IUser, IUserModel>("user", userSchema);

export default userModel;
