import { useState } from 'react'
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
    <>
      <Button clickHandler={() => query.refetch()}>Get a new question</Button>
      <div>
        {query.isLoading && <div>Loading...</div>}
        {query.isError && <div>Error: {query.error.message}</div>}
        {query.data && (
          <div>
            <div>{query.data.question}</div>
            {Object.keys(query.data.answers)
              .filter((a) => query.data.answers[a])
              .map((a) => (
                <div key={a}>
                  <label>
                    <input
                      type='radio'
                      value={a}
                      name='answer'
                      onChange={(event) => {
                        setAnswer(event.target.value)
                      }}
                    />
                    {query.data.answers[a]}
                  </label>
                </div>
              ))}
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
    </>
  )
}
