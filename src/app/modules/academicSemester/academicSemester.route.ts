import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import {
  createAcademicValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation'

const router = express.Router()
router.post(
  '/create-academic-semester',
  validateRequest(createAcademicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
)

router.patch(
  '/:semesterId',
  validateRequest(updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
