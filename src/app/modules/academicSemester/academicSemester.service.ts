import {
  IAcademicSemester,
  academicSemesterNameCodeMapper,
} from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payLoad: IAcademicSemester) => {
  // validate code
  // type TAcademicSemesterNameCodeMapper = {
  //     Autumn: string;
  //     Summer: string;
  //     Fall: string;
  // }
  // const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  //     Autumn :'01',
  //     Summer:  '02',
  //     Fall: '03'
  // }
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw Error('Invalid Semester Code')
  }

  // main
  const result = await AcademicSemesterModel.create(payLoad)
  return result
}
// get all
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find()
  return result
}

//get single
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id)
  return result
}

//update
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<IAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
