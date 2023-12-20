/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./modules/student/student.router";
import { UserRoute } from "./modules/user/user.router";
import httpStatus from "http-status";
import { AcademicSemisterRoute } from "./modules/academicSemister/academicSemister.router";
import { FacultyRoutes } from "./modules/AcademicFaculty/faculty.router";
import { DepartmentRoutes } from "./modules/department/department.route";
// import { ZodError } from "zod";
// import config from "./config";
// import handleZodError, { TErrorSource } from "./modules/utils/handleZodError";
// import handleValidationError from "./modules/utils/handleValidationError";
// import handleCastError from "./modules/utils/handleCastError";
// import handleDuplicateKeyError from "./modules/utils/handleDuplicateKeyError";
// import AppError from "./modules/utils/AppError";
import globalErrorHandler from "./modules/utils/errorHandler";
import { CourseRoutes } from "./modules/course/course.router";
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
app.use("/api/v1/courses", CourseRoutes)



const test =async (req:Request, res: Response) => {
  const a = 20
  res.send(a)
}
app.get("/", test)


app.use(globalErrorHandler)



app.all("*", (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!"
  })
})

export default app;
