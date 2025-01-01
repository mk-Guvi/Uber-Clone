import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";


const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

export default app;
