import mongoose from 'mongoose'
import { StudentModel } from './student.model'
import { AppError } from '../../errors/appError'
import httpStatus from 'http-status'
import { UserModel } from '../user/user.model'
import { Student } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableField } from './student.constant'


// get all students
const getAllStudentIntoDB = async (query: Record<string, unknown>) => {
  /*____________QueryBuilder start____________*/

  const studentQuery = new QueryBuilder(StudentModel.find().populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }), query).search(studentSearchableField).filter().sort().paginate().fields();

  const result = await studentQuery.modelQuery;
  return result
  /*____________QueryBuilder end  ____________*/
};
// specific student/ dynamic route
const getSingleStudentIntoDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}
// update
const updateStudentIntoDB = async (id: string, payLoad: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  // console.log(modifiedUpdatedData)
  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  )
  return result
}
// delete student
const deleteStudentIntoDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to delete student')
    }
    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Fail to delete student')
  }
}

export const StudentServices = {
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  updateStudentIntoDB,
  deleteStudentIntoDB,
}
