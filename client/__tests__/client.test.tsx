import pretty from 'pretty'
import { render as reactdomrender, unmountComponentAtNode } from 'react-dom'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { Layout } from '../src/components/Layout'
import { Home } from '../src/pages/Home'
import { RandomQuestion } from '../src/pages/RandomQuestion'
require('whatwg-fetch')

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

  test('render Home', () => {
    reactdomrender(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })

  test('render RandomQuestion', () => {
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

})
