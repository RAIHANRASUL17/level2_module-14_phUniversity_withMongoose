import { NextFunction, Request, RequestHandler, Response } from 'express'

// Higher Order Func
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error))
  }
}

export default catchAsync
