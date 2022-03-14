import pretty from 'pretty'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../src/pages/Home'
import { RandomQuestion } from '../src/pages/RandomQuestion'

describe('quiz', () => {
  let container: HTMLDivElement
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        keepPreviousData: true,
      },
    },
  })

  beforeEach(async () => {
    container = await document.createElement('div')
  })

  afterEach(async () => {
    unmountComponentAtNode(await container)
    jest.fn().mockClear()
  })

  it('renders Home component', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      container
    )
    expect(pretty(container.innerHTML)).toMatchSnapshot()
  })
  it('renders RandomQuestion component', () => {
    render(
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
