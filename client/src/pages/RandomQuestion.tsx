import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { AnswerCorrect, TMutate } from '../interfaces/components'
import { TQuestions } from '../interfaces/fetch'
import { useRandomQuestion } from './../hooks/useQuestions'

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
      <h1>Random Question</h1>
      <Link to={'/'}>Back</Link>
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
            <button onClick={() => handleSubmit()}>Submit</button>
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
