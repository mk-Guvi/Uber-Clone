import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./db/db";
import userRoutes from "./routes/user.routes";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Server is running!");
});

export default app;
