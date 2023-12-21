import express from 'express'
import validateRequest from '../utils/validate'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'

const router = express.Router()

// create faculty
router.post('/create-course', validateRequest(CourseValidation.createCourseValidationSchema), CourseController.createCourse)
// get all faculty
router.get("/", CourseController.AllCourse)
// single faculty
router.get("/:id", CourseController.SingleCourse)
// update faculty
router.put("/:id/assign-faculties",
    validateRequest(CourseValidation.courseFacultieValidationSchema)
    , CourseController.AssignFaculties)

// remove faculty
router.delete("/:id/remove-faculties",
    validateRequest(CourseValidation.courseFacultieValidationSchema)
    , CourseController.RemoveFacultieFromCourse)

router.delete('/:id', CourseController.DeleteCourse)

export const CourseRoutes = router