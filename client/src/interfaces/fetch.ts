//http://json2ts.com/

export interface TQuestions {
  id: number
  question: string
  description?: any
  answers: Answers
  multiple_correct_answers: string
  correct_answers: CorrectAnswers
  correct_answer: string
  explanation?: any
  tip?: any
  tags: Tag[]
  category: string
  difficulty: string
}

export interface Answers {
  answer_a: string
  answer_b: string
  answer_c: string
  answer_d: string
  answer_e?: any
  answer_f?: any
}

export interface CorrectAnswers {
  answer_a_correct: string
  answer_b_correct: string
  answer_c_correct: string
  answer_d_correct: string
  answer_e_correct: string
  answer_f_correct: string
}

export interface Tag {
  name: string
}
