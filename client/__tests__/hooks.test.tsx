import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'
import { answers, category, correct_answers, id, question } from '../jest.setup'
import { useRandomQuestion } from '../src/hooks/useQuestions'
import { rest, server } from '../src/mocks/server'
import { createWrapper } from './client.test'

export const renderWithClient = (
  client: QueryClient,
  ui: React.ReactElement
) => {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>
      ),
  }
}

describe('custom hooks', () => {
  test('error useRandomQuestion', async () => {
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
    expect(result.current.error).toBeDefined()
  })

  test('success useRandomQuestion', async () => {
    const { result, waitFor } = renderHook(() => useRandomQuestion(), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      return result.current.isSuccess
    })
    expect(result.current.data).toEqual({ id, category, question, answers })
    expect(result.current.data).not.toContain({ correct_answers })
  })
})
