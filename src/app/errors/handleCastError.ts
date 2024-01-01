import mongoose from 'mongoose'
import { TErrorSources, TGenericResponse } from '../interface/error'

const handleCastError = (error: mongoose.Error.CastError): TGenericResponse => {
  const errorSources: TErrorSources = [
    {
      path: error?.path,
      message: error?.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Mongoose Cast Validation Error: Invalid ID',
    errorSources,
  }
}

export default handleCastError;
