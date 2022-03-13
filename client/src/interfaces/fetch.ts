
export interface TQuestions {
  id: number
  question: string
  description?: string | null
  answers: Record<string, string | null>
  multiple_correct_answers?: 'true' | 'false'
  correct_answers: Record<string, 'true' | 'false'>
  correct_answer:string
  explanation?: string | null
  tip?: string | null
  tags?: Tag[]
  category?: string
  difficulty?: string
}

export interface Tag {
  name: string
}
