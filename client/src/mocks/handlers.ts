import { rest } from 'msw'

export const questionTestObj = {
  id: 69,
  question: "Good day sir what's your name sir",
  answers: {
    answer_a: 'My name deez',
    answer_b: 'Mike Oxlong',
    answer_c: 'I am under the water please help me',
  },
  correct_answers: {
    answer_a_correct: 'true',
    answer_b_correct: 'false',
    answer_c_correct: 'false',
  },
  category: 'deez',
}
const { id, category, question, answers } = questionTestObj

export const handlers = [
  rest.get('/api/questions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id, category, question, answers }))
  }),
  rest.post('/api/questions', (req, res, ctx) => {}),
]
