import express from "express"
import { StudentController } from "./student.controller"
import validateRequest from "../utils/validate"
import { validation } from "./student.zodValidation"

const router = express.Router()


// router will call controller
router.get("/", StudentController.getAllStudens)
router.get("/:id", StudentController.getSingleStudent)
router.patch("/:id",
validateRequest(validation.updateStudentSchema), StudentController.updateOneStudent)
router.delete("/:id", StudentController.deleteOneStudent)

export const StudentRoutes = router;