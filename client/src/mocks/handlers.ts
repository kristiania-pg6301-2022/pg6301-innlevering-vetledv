import { rest } from 'msw'
import { id, category, question, answers } from '../../jest.setup'

export const handlers = [
  rest.get('/api/questions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id, category, question, answers }))
  }),
  rest.post('/api/questions', (req, res, ctx) => {}),
]
