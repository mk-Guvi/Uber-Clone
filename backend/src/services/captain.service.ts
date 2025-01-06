import captainModel from "../models/captain.model";
import { ICreateCaptainPayload } from "../types/captain";

export const createCaptain = async (payload: ICreateCaptainPayload) => {
  const {
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType,
  } = payload;

  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};
