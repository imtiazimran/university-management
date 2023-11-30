import express from 'express'
import { AcademicSemisterController } from './academicSemister.controller'
import validateRequest from '../utils/validate'
import  { validate } from './academicSemister.validation'

const router = express.Router()

router.post('/create-semister',validateRequest(validate.AcademicSemesterValidationSchema) ,  AcademicSemisterController.createAcademicSemister )

router.get("/", AcademicSemisterController.AllAcademicSemisters)
router.get("/:id", AcademicSemisterController.SingleAcademicSemisters)
router.patch("/:id",validateRequest(validate.UpdateAcademicSemesterValidationSchema), AcademicSemisterController.UpdateASemister)

export const AcademicSemisterRoute = router