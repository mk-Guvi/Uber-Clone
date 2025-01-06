import mongoose, { Document } from "mongoose";

export interface ICreateCaptainPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  color: string;
  plate: string;
  capacity: number;
  vehicleType: string;
}

export interface ICaptain {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  status: string;
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}

export interface ICaptainMethods {
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// Add IUserDocument interface
export interface ICaptainDocument extends ICaptain, Document {
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

export interface ICaptainModel
  extends mongoose.Model<ICaptainDocument, {}, ICaptainMethods> {
  hashPassword(password: string): Promise<string>;
}
