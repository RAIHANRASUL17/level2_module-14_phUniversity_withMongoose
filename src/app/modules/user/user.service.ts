import { AppError } from './../../errors/appError'
import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { Student } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { IUser } from './user.interface'
import { UserModel } from './user.model'
import { generatedStudentId } from './user.utils'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payLoad: Student) => {
  const userData: Partial<IUser> = {}

  // if password given, use default password
  userData.password = password || (config.default_pass as string)

  //set student role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payLoad.admissionSemester,
  )

  // Isolated environment
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    if (!admissionSemester) {
      throw new AppError(httpStatus.BAD_REQUEST, 'dfjdjdkdk')
    }
    //auto generate userData id
    userData.id = await generatedStudentId(admissionSemester)

    //create a user(transaction-1)
    const result = await UserModel.create([userData], { session }) //array

    //  create a student
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'fail to create user')
    }
    // set id, _id as user
    payLoad.id = result[0].id //embedding id
    payLoad.user = result[0]._id //reference _id

    // create a new student(transaction-2)
    const newStudent = await StudentModel.create([payLoad], { session })
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create new student')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('create a new user/student')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
