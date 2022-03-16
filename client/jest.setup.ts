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

