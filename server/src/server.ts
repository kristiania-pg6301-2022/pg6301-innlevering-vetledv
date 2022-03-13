import bodyParser from 'body-parser'
import express, { Express } from 'express'
import { AddressInfo } from 'net'
import * as path from 'path'
import { quizApp } from './quizApi'

export interface TReqResNext {
  req: express.Request
  res: express.Response
  next: express.NextFunction
}

const app: Express = express()
app.use(bodyParser.json())

app.use('/api', quizApp)

app.use(express.static('../client/dist'))
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.resolve('../client/dist/index.html'))
    } else next()
  }
)

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Started on http://localhost:${(server.address() as AddressInfo).port}`
  )
})
