import { Types } from 'mongoose'

// interface
export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  user: Types.ObjectId // Types come from mongoose
  password: string
  name: UserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: string
  email: string
  avatar?: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian?: Guardian
  localGuardian?: LocalGuardian
  profileImg?: string
  admissionSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}
