import { Dispatch, SetStateAction } from 'react'

export interface TMutate {
  id: number
  answer: string
}

export type AnswerCorrect = { answerCorrect: boolean }

export type themeState = 'dark' | 'light'

export type setThemeState = Dispatch<SetStateAction<themeState>>

export interface IThemeBtn {
  colorTheme: themeState
  setTheme: setThemeState
}
