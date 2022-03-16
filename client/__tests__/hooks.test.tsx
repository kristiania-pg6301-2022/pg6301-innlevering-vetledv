import { renderHook } from '@testing-library/react-hooks'
import { rest, server } from '../src/mocks/server'
import { useRandomQuestion } from '../src/hooks/useQuestions'
import { createWrapper } from './client.test'
import { questionTestObj } from '../src/mocks/handlers'

describe('custom hooks', () => {
  const { id, category, question, answers, correct_answers } = questionTestObj
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
    // console.log(result.current.error)
    expect(result.current.error).toBeDefined()
  })

  test('success useRandomQuestion', async () => {
    const { result, waitFor } = renderHook(() => useRandomQuestion(), {
      wrapper: createWrapper(),
    })
    await waitFor(() => {
      return result.current.isSuccess
    })
    // console.log(result.current.data)
    expect(result.current.data).toEqual({ id, category, question, answers })
    expect(result.current.data).not.toContain({correct_answers})
  })
})
