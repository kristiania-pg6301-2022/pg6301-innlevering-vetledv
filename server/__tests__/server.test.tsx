import bodyParser from 'body-parser'
import express, { Express } from 'express'
import request from 'supertest'
import { quizApp } from '../src/quizApi'

const app: Express = express()
app.use(bodyParser.json())
app.use('/api', quizApp)

describe('Start testing server side', () => {
  it('return status 200', async () => {
    const response = await request(app).get('/api/questions').expect(200)
    expect(response.body).toMatchObject({
        id: expect.any(Number),
        question: expect.any(String),
        answers: expect.any(Object),
        category: expect.any(String),
      });
      expect(response.body).not.toHaveProperty("correct_answers");
  })
})
