import { rest } from 'msw'
import { question } from '../../jest.setup'

export const handlers = [
  rest.get('/api/questions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(question))
  }),
  rest.post('/api/questions', (req, res, ctx) => {}),
]
