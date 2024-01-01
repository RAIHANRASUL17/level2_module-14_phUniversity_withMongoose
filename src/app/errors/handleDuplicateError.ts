/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericResponse } from '../interface/error';

const handleDuplicateError = (error: any):TGenericResponse => {
  // Extract value within double quotes using regex
  const match = error.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'mongoose: Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;