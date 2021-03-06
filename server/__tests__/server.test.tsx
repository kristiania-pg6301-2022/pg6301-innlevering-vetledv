import bodyParser from 'body-parser'
import express, { Express } from 'express'
import request from 'supertest'
import { TReqProps } from '../../client/src/interfaces/fetch'
import { quizApp } from '../src/quizApi'

const app: Express = express()
app.use(bodyParser.json())
app.use('/api/questions/v1', quizApp)

describe('Server tests', () => {
  it('returns status 200', async () => {
    await request(app).get('/api/questions/v1/random').expect(200)
  })
  it('returns status 404', async () => {
    await request(app).get('/deez').expect(404)
  })
  it('returns a random question', async () => {
    const res = await request(app).get('/api/questions/v1/random')
    expect(res.body).toMatchObject<TReqProps>({
      id: expect.any(Number),
      answers: expect.any(Object),
      category: expect.any(String),
      question: expect.any(String),
    })
    expect(res.body).not.toHaveProperty('correct_answers')
  })

  it('responds with bool true on post', async () => {
    await request(app)
      .post('/api/questions/v1/random')
      .send({
        id: 993,
        answer: 'answer_d',
      })
      .expect({ answerCorrect: true })
  })
  it('responds with bool false on post', async () => {
    await request(app)
      .post('/api/questions/v1/random')
      .send({
        id: 993,
        answer: 'answer_c',
      })
      .expect({ answerCorrect: false })
  })
})
