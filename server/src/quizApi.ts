import express from 'express'
import { TQuestions } from '../../client/src/interfaces/fetch'
import { questions } from './questions'

export const getRandomQuestion = (): TQuestions => {
  return questions[Math.trunc(Math.random() * questions.length)]
}

export const isCorrectAnswer = (question: TQuestions, answer: string) => {
  return question.correct_answers[answer + '_correct'] === 'true'
}

export const quizApp = express.Router()

quizApp.get('/random', (req: express.Request, res: express.Response) => {
  const { id, category, question, answers } = getRandomQuestion()
  res.json({ id, category, question, answers })
})

quizApp.post('/random', (req: express.Request, res: express.Response) => {
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
