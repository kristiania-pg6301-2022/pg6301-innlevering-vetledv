import { renderHook } from '@testing-library/react-hooks'
import { render, screen, waitFor } from '@testing-library/react'
import pretty from 'pretty'
import { render as reactdomrender, unmountComponentAtNode } from 'react-dom'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { Layout } from '../src/components/Layout'
import { Home } from '../src/pages/Home'
import { RandomQuestion } from '../src/pages/RandomQuestion'
import { rest, server } from '../src/mocks/server'
require('whatwg-fetch')
import '@testing-library/jest-dom'
import { id } from '../jest.setup'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export const createWrapper = () => {
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

describe('quiz', () => {
  //nock bad, msw good :)
  let container: HTMLDivElement

  beforeEach(async () => {
    container = await document.createElement('div')
  })
  afterEach(async () => {
    unmountComponentAtNode(await container)
  })

  test('render Layout', () => {
    reactdomrender(
      <MemoryRouter>
        <Layout></Layout>
      </MemoryRouter>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })
  test('render App', () => {
    reactdomrender(<App />, container)
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })

  test('render page Home', () => {
    reactdomrender(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })

  test('render page RandomQuestion', () => {
    const queryClient = new QueryClient()
    reactdomrender(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <RandomQuestion />
        </MemoryRouter>
      </QueryClientProvider>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })
  test('loading on page RandomQuestion', async () => {
    renderWithClient(
      <MemoryRouter>
        <RandomQuestion />
      </MemoryRouter>
    )
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument()
  })
  test('error on page RandomQuestion', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    renderWithClient(
      <MemoryRouter>
        <RandomQuestion />
      </MemoryRouter>
    )

    expect(await screen.findByText(/Error:/i)).toBeInTheDocument()
  })
  test('RandomQuestion page displays data', async () => {
    renderWithClient(
      <MemoryRouter>
        <RandomQuestion />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(
        screen.getByText(/Good day sir what's your name sir/i)
      ).toBeInTheDocument()
    })
  })
})
