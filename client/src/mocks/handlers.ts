import { rest } from 'msw'
import { answers, category, id, question } from '../../jest.setup'

export const handlers = [
  rest.get('/api/questions/v1/random', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id, category, question, answers }))
  }),
]
