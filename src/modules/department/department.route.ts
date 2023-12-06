import express from 'express'
import validateRequest from '../utils/validate'
import { departmentValidation } from './department.validation'
import { DepartmentController } from './department.controller'

const router = express.Router()

// create faculty
router.post('/create-department', validateRequest(departmentValidation.createDepartmentValidationSchema), DepartmentController.createDepartment)
// get all faculty
router.get("/", DepartmentController.AllDepartment)
// single faculty
router.get("/:id", DepartmentController.SingleDepartment)
// update faculty
router.patch("/:id", validateRequest(departmentValidation.updateDepartmentValidationSchema), DepartmentController.UpdateADepartment)

export const DepartmentRoutes = router