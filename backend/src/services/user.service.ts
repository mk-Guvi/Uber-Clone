import userModel from "../models/user.model";
import { ICreateUserPayload } from "../types/user.types";

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}: ICreateUserPayload) => {
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
  });

  return user;
};
