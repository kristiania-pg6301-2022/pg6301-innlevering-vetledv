import { renderHook } from '@testing-library/react-hooks'
import { rest } from 'msw'
import { answers, category, correct_answers, id, question } from '../jest.setup'
import { useTheme } from '../src/hooks/useTheme'
import { useRandomQuestion } from '../src/hooks/useRandomQuestions'
import { server } from '../src/mocks/server'
import { createWrapper } from './client.test'
import { ThemeBtn } from '../src/components/ThemeBtn'

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
