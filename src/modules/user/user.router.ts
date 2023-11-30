import express from "express"
import { UserController } from "./user.controller"
import { validation } from "../student/student.zodValidation"
import validateRequest from "../utils/validate"
const router = express.Router()





// create user and a student
router.post("/create-student", validateRequest(validation.studentCreateValidatorSchema), UserController.createStudent)

export const UserRoute = router;