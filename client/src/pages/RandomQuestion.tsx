import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { Answers, TQuestions } from '../interfaces/fetch'

const fetchQuestions = (url: string) => {
  return async () => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
}

export const postJSON = async (url: string, json: Object) => {
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
  const query = useQuery<TQuestions, Error>(
    ['question'],
    fetchQuestions('/api/questions')
  )
  const checkAnswer = useMutation(
    ({ id, answer }: { id: number; answer: string }) =>
      postJSON('/api/questions', { id, answer })
  )
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
              .filter((a) => query.data.answers[a as keyof Answers])
              .map((a) => (
                <div key={a}>
                  <label>
                    <input
                      type='radio'
                      value={a}
                      name='answer'
                      onChange={(event) => {
                        setAnswer(event.target.value)
                        console.log(answer)
                      }}
                    />
                    {query.data.answers[a as keyof Answers]}
                  </label>
                </div>
              ))}
            <button
              onClick={async () => {
                if (answer !== '') {
                  const data = checkAnswer.mutate(
                    {
                      id: query.data.id,
                      answer: answer,
                    },
                    {
                      onSuccess: (answerRes) => {
                        queryClient.setQueryData(
                          ['answer', query.data.id],
                          answerRes
                        )
                      },
                    }
                  )
                }
              }}>
              Submit
            </button>
            {checkAnswer.isSuccess && <div>{checkAnswer.data.result}</div>}
          </div>
        )}
      </div>
    </>
  )
}
