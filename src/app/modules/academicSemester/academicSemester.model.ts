import { Schema, model } from 'mongoose'
import { IAcademicSemester } from './academicSemester.interface'
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant'

// main
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
)

//mongoose DOC middleware
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExists) {
    throw new Error('Semester Is Already Exists!')
  }
  next()
})

export const AcademicSemesterModel = model<IAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)

// Name Year
//2030 Autumn => Created
// 2031 Autumn
//2030 Autumn => XXX
//2030 Fall => Created

// Autumn 01
// Summar 02
// Fall 03
