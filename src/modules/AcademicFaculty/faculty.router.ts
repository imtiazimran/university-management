import express from 'express'
import validateRequest from '../utils/validate'
import { FacultyController } from './faculty.controller'
import facultyValidationSchema from './faculty.validation'

const router = express.Router()

// create faculty
router.post('/create-faculty', validateRequest(facultyValidationSchema), FacultyController.createFaculty)
// get all faculty
router.get("/", FacultyController.AllFaculty)
// single faculty
router.get("/:id", FacultyController.SingleFaculty)
// update faculty
router.patch("/:id", validateRequest(facultyValidationSchema), FacultyController.UpdateAFaculty)

export const FacultyRoutes = router