import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import pretty from 'pretty'
import { render as reactdomrender, unmountComponentAtNode } from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
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

//wrap custom hook in wrapper
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
//internal function used from react-query
//https://github.com/tannerlinsley/react-query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17
export const renderWithClient = (ui: React.ReactElement) => {
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
})
