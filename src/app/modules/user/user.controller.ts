import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

/*______________ User service st___________________*/
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(password, studentData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'student is created successfully',
    success: true,
    data: result,
  })
})
/*______________User service end_________________________*/

export const UserControllers = {
  createStudent,
}
