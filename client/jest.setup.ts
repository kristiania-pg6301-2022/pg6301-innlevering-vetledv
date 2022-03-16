import { setLogger } from 'react-query'
import { server } from './src/mocks/server'

beforeAll(() => {
  server.listen()
})
afterEach(async () => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

// suppress network errors being logged to the console for react-query
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})
export const question = {
  id: 69,
  question: "Good day sir what's your name sir",
  answer: {
    answer_a: 'My name deez',
    answer_b: 'Mike Oxlong',
    answer_c: 'I am under the water please help me',
  },
  correct_answers: {
    answer_a_correct: 'true',
    answer_b_correct: 'false',
    answer_c_correct: 'false',
  },
}
