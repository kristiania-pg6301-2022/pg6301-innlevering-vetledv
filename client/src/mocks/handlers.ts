import { rest } from 'msw'
import { question } from './../../__tests__/client.test'

export const handlers = [
  rest.get('/api/questions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(question))
  }),
]
