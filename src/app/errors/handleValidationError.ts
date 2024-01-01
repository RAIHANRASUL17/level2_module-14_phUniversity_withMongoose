import mongoose from 'mongoose'
import { TErrorSources, TGenericResponse } from '../interface/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericResponse => {
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'This is mongoose Validation Error',
    errorSources,
  }
}

export default handleValidationError
