import { rest } from 'msw'
import {
  id,
  category,
  question,
  answers,
  correct_answers,
} from '../../jest.setup'

export const handlers = [
  rest.get('/api/questions/v1/random', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id, category, question, answers }))
  }),
]
