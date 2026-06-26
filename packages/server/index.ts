import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
