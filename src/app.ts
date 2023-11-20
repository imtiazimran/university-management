import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.router";
const app: Application = express();

// middlewere

app.use(express.json());

app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.all("/*", (err: unknown, req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "something went wrong /"
  })
})

export default app;
