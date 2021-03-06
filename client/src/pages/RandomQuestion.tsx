import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { AnswerCorrect, TMutate } from '../interfaces/components'
import { useRandomQuestion } from '../hooks/useRandomQuestions'

const postQuestions = async (json: Object) => {
  const res = await fetch('/api/questions/v1/random', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(json),
  })
  return res.json()
}

export const RandomQuestion = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [answer, setAnswer] = useState<string>('')
  const query = useRandomQuestion()
  const checkAnswer = useMutation<AnswerCorrect, Error, TMutate, () => void>(
    ({ id, answer }) => postQuestions({ id, answer })
  )

  const handleSubmit = async () => {
    if (answer !== '' && query.data) {
      const data = checkAnswer.mutate(
        {
          id: query.data.id,
          answer: answer,
        },
        {
          onSuccess: (answerRes) => {
            queryClient.setQueryData(['answer', query.data.id], answerRes)
          },
        }
      )
    }
  }

  if (query.isLoading || query.isRefetching)
    return <div className='text-2xl font-bold py-2'>Loading...</div>

  return (
    <div className='w-full'>
      <Button
        clickHandler={() => {
          query.refetch()
          checkAnswer.reset()
        }}>
        Get a new question
      </Button>
      <div className='rounded-lg bg-secondary px-4 py-2'>
        {query.isError && (
          <div className='text-2xl font-bold py-2'>
            Error: {query.error.message}
          </div>
        )}

        {query.data && query.isSuccess && (
          <div>
            <div className='text-2xl font-bold py-2'>{query.data.question}</div>
            <div className='px-4'>
              {Object.keys(query.data.answers)
                .filter((a) => query.data.answers[a])
                .map((a) => (
                  <div className='py-2' key={a}>
                    <label className='flex flex-row'>
                      <div className='px-1 py-1'>
                        <input
                          type='radio'
                          value={a}
                          name='answer'
                          onChange={(event) => {
                            setAnswer(event.target.value)
                          }}
                        />
                      </div>
                      <div className='px-1 text-xl'>
                        {query.data.answers[a]}
                      </div>
                    </label>
                  </div>
                ))}
            </div>
            <div className='flex gap-2'>
              <Button
                clickHandler={() => {
                  handleSubmit()
                }}>
                Submit
              </Button>
              <Button clickHandler={() => navigate('/')}>Back</Button>
            </div>
            {checkAnswer.isSuccess && (
              <div>
                {checkAnswer.data.answerCorrect
                  ? 'Correct!'
                  : 'Wrong, try again'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
