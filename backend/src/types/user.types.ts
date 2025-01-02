import mongoose from "mongoose";

export interface ICreateUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IUser {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  socketId?: string;
}

export interface IUserMethods {
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends mongoose.Model<IUser, {}, IUserMethods> {
  hashPassword(password: string): Promise<string>;
}
