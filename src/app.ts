/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.router";
import { UserRoute } from "./modules/user/user.router";
import httpStatus from "http-status";
import { AcademicSemisterRoute } from "./modules/academicSemister/academicSemister.router";
import { FacultyRoutes } from "./modules/AcademicFaculty/faculty.router";
import { DepartmentRoutes } from "./modules/department/department.route";
import { ZodError } from "zod";
import config from "./config";
import handleZodError, { TErrorSource } from "./modules/utils/handleZodError";
import handleValidationError from "./modules/utils/handleValidationError";
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
// Academic Faculty routes
app.use("/api/v1/faculty", FacultyRoutes)
// Academic Department routes
app.use("/api/v1/department", DepartmentRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});







// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = err.message || "something went wrong";


  let errorSource: TErrorSource = [{
    path: '',
    message: "something went wrong"
  }]




  if (err instanceof ZodError) {
    // eslint-disable-next-line no-unused-expressions
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSource = simplifiedError?.errorSource
  }
  else if (err.message = "ValidationError") {
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSource = simplifiedError?.errorSource
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.NODE_ENV === "devolopment" ? err?.stack : null
  })


})

app.all("*", (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!"
  })
})

export default app;
