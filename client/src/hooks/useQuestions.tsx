import { useQuery } from 'react-query'
import { TQuestions } from '../interfaces/fetch'

const fetchQuestions = (url: string) => {
  return async () => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }
}
export const useRandomQuestion = () => {
  return useQuery<any, Error>(['question'], fetchQuestions('/api/questions'))
}
