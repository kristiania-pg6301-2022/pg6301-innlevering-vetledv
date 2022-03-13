import express from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
import { getRandomQuestion, isCorrectAnswer, questions } from './questions.js'

const app = express()

app.use(bodyParser.json())

app.get('/api/questions', (req, res) => {
  const { id, category, question, answers } = getRandomQuestion()
  res.json({ id, category, question, answers })
})

app.post(
  '/api/questions',
  (req, res) => {
    const { id, answer } = req.body
    const question = questions.find((q) => q.id === id)
    if (isCorrectAnswer(question, answer)) {
      return res.json({ result: 'correct' })
    } else return res.json({ result: 'incorrect' })
  }
)

app.use(express.static('../client/dist'))
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.resolve('../client/dist/index.html'))
  } else {
    next()
  }
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`)
})
