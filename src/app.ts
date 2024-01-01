import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

const app: Application = express()
// const port = 3000

// parsers
app.use(express.json())
app.use(cors())

// for cleaning the to call here is router
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('this is main route')
})

const test = async(req: Request, res: Response) => {
  // Promise.reject()
  const a = 10
  res.send(a)
}
app.get('/test', test)

//global error handler
app.use(globalErrorHandler)
// not found
app.use(notFound)

export default app
