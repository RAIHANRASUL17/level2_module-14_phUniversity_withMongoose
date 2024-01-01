import { z } from 'zod'

const contactNoSchema = z
  .string()
  .min(10, 'Contact number should have at least 10 digits')
  .max(15, 'Contact number should not exceed 15 digits')
  .regex(/^\d+$/, 'Contact number should only contain digits')

const emergencyContactNoSchema = z.string()
// main
export const createStudentZodValidationSchema = z.object({
  body: z.object({
    // id: z.string(),
    password: z.string().max(8),
    student: z.object({
      name: z.object({
        firstName: z.string().max(20, 'First name cannot exceed 20 characters'),
        middleName: z.string().optional(),
        lastName: z.string(),
      }),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format'),
      contactNo: contactNoSchema,
      emergencyContactNo: emergencyContactNoSchema,
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: z.object({
        fatherName: z.string(),
        fatherOccupation: z.string(),
        fatherContactNo: contactNoSchema,
        motherName: z.string(),
        motherOccupation: z.string(),
        motherContactNo: contactNoSchema,
      }),
      localGuardian: z.object({
        name: z.string(),
        occupation: z.string(),
        contactNo: contactNoSchema,
        address: z.string(),
      }),
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
})

// update
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
})
// main
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
})
