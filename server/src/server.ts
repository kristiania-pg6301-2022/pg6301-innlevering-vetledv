import bodyParser from 'body-parser'
import { Express } from 'express'
import express from 'express'
import { AddressInfo } from 'net'
import * as path from 'path'
import { getRandomQuestion, questions, isCorrectAnswer } from './questions'

export interface TReqResNext {
  req: express.Request
  res: express.Response
  next: express.NextFunction
}

const app: Express = express()
app.use(bodyParser.json())

app.get('/api/questions', (req: express.Request, res: express.Response) => {
  const { id, category, question, answers } = getRandomQuestion()
  res.json({ id, category, question, answers })
})

app.post('/api/questions', (req: express.Request, res: express.Response) => {
  const { id, answer }: { id: number; answer: string } = req.body
  const question = questions.find((q) => q.id === id)
  if (question) {
    let answerCorrect = false
    if (isCorrectAnswer(question, answer)) {
      answerCorrect = true
      return res.json({ answerCorrect })
    } else return res.json({ answerCorrect })
  }
})

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
