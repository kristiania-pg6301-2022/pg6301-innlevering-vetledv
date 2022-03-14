import { createRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { AnswerCorrect, TMutate } from '../interfaces/components'
import { TQuestions } from '../interfaces/fetch'
import { useRandomQuestion } from './../hooks/useQuestions'
import { Button } from '../components/Button'

const postQuestions = async (url: string, json: Object) => {
  const res = await fetch(url, {
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
  const query = useRandomQuestion('api/questions')
  const checkAnswer = useMutation<AnswerCorrect, Error, TMutate, () => void>(
    ({ id, answer }) => postQuestions('/api/questions', { id, answer })
  )
  //TODO: blur input on button click
  const inputRef = createRef<HTMLInputElement>()

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
        {query.isLoading && <div>Loading...</div>}
        {query.isError && <div>Error: {query.error.message}</div>}
        {query.data && (
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
              <Button clickHandler={() => handleSubmit()}>Submit</Button>
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
