import pretty from 'pretty'
import { render as domrender, unmountComponentAtNode } from 'react-dom'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../src/pages/Home'
import { RandomQuestion } from '../src/pages/RandomQuestion'
import { renderHook } from '@testing-library/react-hooks'
import { useRandomQuestion } from '../src/hooks/useQuestions'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render } from '@testing-library/react'

export const handlers = [
  rest.get('*/react-query', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        answer: 42,
      })
    )
  }),
]
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  }
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('quiz', () => {
  const server = setupServer(...handlers)
  const queryCache = new QueryCache()
  let container: HTMLDivElement

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  })
  // const wrapper = ({ children }: any) => (
  //   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  // )

  beforeAll(() => server.listen())
  beforeEach(async () => {
    container = await document.createElement('div')
  })
  afterEach(async () => {
    server.resetHandlers()
    unmountComponentAtNode(await container)
    queryCache.clear()
  })
  afterAll(() => server.close())

  // silence react-query errors
  setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
  })

  const question = () => ({
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

  test('renders RandomQuestion component', () => {
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

    await waitFor(() => result.current.isError)

    expect(result.current.error).toBeDefined()
  })
  test('successful hook', async () => {
    server.use(
      rest.get('/api/questions', (req, res, ctx) => {
        return res(ctx.status(200))
      })
    )
    // const scope = nock('http://example.com').get('/api/questions').reply(200, {
    //   answer: 42,
    // })
    const { result, waitFor } = renderHook(() => useRandomQuestion(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => result.current.isFetched)
    expect(result.current).toBeDefined()
  })
})
