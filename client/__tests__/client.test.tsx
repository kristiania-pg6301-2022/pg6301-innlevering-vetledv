import pretty from 'pretty'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
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
        retry: false,
      },
    },
  })
  const wrapper = ({ children }: Element) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
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
      answer_c:
        'I am under the water, please help me, there is too much raining, burururuurur',
    },
    correct_answers: {
      answer_a_correct: 'true',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
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

  // it('fetches question', () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter initialEntries={['/questions']}>
  //         <RandomQuestion />
  //       </MemoryRouter>
  //     </QueryClientProvider>,
  //     container
  //   )
  //   expect(pretty(container.innerHTML)).toMatchSnapshot()
  // })
})
