import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { updateStudentValidationSchema } from './student.zod.validation'

const router = express.Router()

// // will call controller function
// router.post('/create-student', StudentControllers.createStudent)

// get all student
router.get('/', StudentControllers.getAllStudent)
// get single student
router.get('/:studentId', StudentControllers.getSingleStudent)
// update
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
)
// delete student
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router
