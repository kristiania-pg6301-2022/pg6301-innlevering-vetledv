export interface TQuestions {
  id: number
  question: string
  category?: string
  answers: Record<string, string | null>
  description?: string | null
  multiple_correct_answers?: 'true' | 'false'
  correct_answers: Record<string, 'true' | 'false'>
  correct_answer: string
  explanation?: string | null
  tip?: string | null
  tags?: Tag[]
  difficulty?: string
}

export interface TReqProps {
  id: number
  question: string
  category?: string
  answers: Record<string, string | null>
}

export interface Tag {
  name: string
}
