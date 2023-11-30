/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.router";
import { UserRoute } from "./modules/user/user.router";
import httpStatus from "http-status";
import { AcademicSemisterRoute } from "./modules/academicSemister/academicSemister.router";
const app: Application = express();

// middlewere

app.use(express.json());

app.use(cors());

// application routes

// student routes
app.use("/api/v1/students", StudentRoutes)
// user routes
app.use("/api/v1/user", UserRoute)
// Academic routes
app.use("/api/v1/academy", AcademicSemisterRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) =>{
  const statusCode = 500;
  const message = "something went wrong";

  return res.status(statusCode).json({
    success: false,
    message: err.message || message,
    error: err 
  })

})

app.all("*", (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!"
  })
})

export default app;
