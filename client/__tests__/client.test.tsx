import { renderHook } from '@testing-library/react-hooks'
import pretty from 'pretty'
import { render as domrender, unmountComponentAtNode } from 'react-dom'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { useRandomQuestion } from '../src/hooks/useQuestions'
// import nock = require('nock')
require('whatwg-fetch')
import { rest, server } from '../src/mocks/server'
import { Home } from '../src/pages/Home'
import { RandomQuestion } from '../src/pages/RandomQuestion'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
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

const createWrapper = () => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('quiz', () => {
  //nock bad, msw good :)
  let container: HTMLDivElement

  beforeAll(() => {
    server.listen()
  })
  beforeEach(async () => {
    container = await document.createElement('div')
  })
  afterEach(async () => {
    server.resetHandlers()
    unmountComponentAtNode(await container)
  })
  afterAll(() => {
    // nock.restore()
    // nock.cleanAll()
    server.close()
  })

  // silence react-query errors
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  })

  test('render Home component', () => {
    domrender(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })

  test('render RandomQuestion component', () => {
    const queryClient = new QueryClient()
    domrender(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RandomQuestion />
        </MemoryRouter>
      </QueryClientProvider>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })

  test('failure query hook', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const { result, waitFor } = renderHook(() => useRandomQuestion(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      return result.current.isError
    })
    // console.log(result.current.error)
    expect(result.current.error).toBeDefined()
  })

  test('successful hook', async () => {
    const { result, waitFor } = renderHook(() => useRandomQuestion(), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      return result.current.isSuccess
    })
    // console.log(result.current.data)
    // expect(result.current).toBeDefined()
    expect(result.current.data).toEqual(question)
  })
})
