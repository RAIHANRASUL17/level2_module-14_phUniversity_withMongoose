import { model, Schema } from 'mongoose'
import { IAcademicDepartment } from './academicDepartment.interface'
import { AppError } from '../../errors/appError'

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// // Doc middleware
// academicDepartmentSchema.pre('save', async function (next) {
//   const isDepartmentExit = await AcademicDepartmentModel.findOne({
//     name: this.name,
//   })
//   if (isDepartmentExit) {
//     throw new Error('This Department Already Exist!')
//   }
//   next()
// })

// Query Middleware
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  // console.log(query)
  const isDepartmentExit = await AcademicDepartmentModel.findOne(query)
  if (!isDepartmentExit) {
    // throw new Error('This department Does not Exits!')
    throw new AppError(404, 'This department Does not Exits!')
  }
  next()
})

export const AcademicDepartmentModel = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
