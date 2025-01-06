import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db/db";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import captainRoutes from "./routes/captain.routes";


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Server is running!");
});

export default app;
