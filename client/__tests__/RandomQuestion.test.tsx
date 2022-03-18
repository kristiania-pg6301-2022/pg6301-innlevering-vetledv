import { fireEvent, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import { id } from '../jest.setup'
import { server } from '../src/mocks/server'
import { RandomQuestion } from '../src/pages/RandomQuestion'
import { renderWithClient } from './client.test'

describe('RandomQuestion page tests', () => {
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

  test('RandomQuestion useMutate submit correct answer', async () => {
    server.use(
      rest.post('/api/questions/v1/random', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ id, answerCorrect: true }))
      })
    )
    renderWithClient(
      <MemoryRouter>
        <RandomQuestion />
      </MemoryRouter>
    )
    const correctAnswerBtn = await screen.findByText(/My name deez/i)
    const submitBtn = await screen.findByText(/Submit/i)
    fireEvent.click(correctAnswerBtn)
    fireEvent.click(submitBtn)
    const submitResponse = await screen.findByText(/Correct!/i)

    expect(submitResponse).toBeInTheDocument()
  })

  test('RandomQuestion useMutate submit wrong answer', async () => {
    server.use(
      rest.post('/api/questions/v1/random', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ id, answerCorrect: false }))
      })
    )
    renderWithClient(
      <MemoryRouter>
        <RandomQuestion />
      </MemoryRouter>
    )
    const correctAnswerBtn = await screen.findByText(/Mike Oxlong/i)
    const submitBtn = await screen.findByText(/Submit/i)
    fireEvent.click(correctAnswerBtn)
    fireEvent.click(submitBtn)
    const submitResponse = await screen.findByText(/Wrong, try again/i)

    expect(submitResponse).toBeInTheDocument()
  })
})
