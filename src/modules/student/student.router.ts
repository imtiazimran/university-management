import express from "express"
import { StudentController } from "./student.controller"

const router = express.Router()


// router will call controller
router.post("/create-student", StudentController.createStudent)
router.get("/", StudentController.getAllStudens)
router.get("/:id", StudentController.getSingleStudent)
router.delete("/:id", StudentController.deleteOneStudent)

export const StudentRoutes = router;