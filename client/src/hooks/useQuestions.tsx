import { useQuery } from 'react-query'
import { TQuestions } from '../interfaces/fetch'

export const postQuestions = async (url: string, json: Object) => {
    const res = await fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(json),
    })
    return res.json()
  }
const fetchQuestions = (url: string) => {
  return async () => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
}
export const useRandomQuestion = (url: string) => {
  return useQuery<TQuestions, Error>(['question'], fetchQuestions(url))
}
