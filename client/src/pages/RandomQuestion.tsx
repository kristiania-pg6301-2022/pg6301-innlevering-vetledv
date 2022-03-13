import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Answers, TQuestions } from '../interfaces/fetch'

const fetchQuestions = (url: string) => {
  return async () => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
}


export const RandomQuestion = () => {
  const query = useQuery<TQuestions, Error>(
    ['question'],
    fetchQuestions('/api/questions')
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
                    <input type='radio' value={a} name='answer' onChange={()=>console.log(a)} />
                    {query.data.answers[a as keyof Answers]}
                  </label>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}