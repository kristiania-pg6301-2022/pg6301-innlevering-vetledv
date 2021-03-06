import { TQuestions } from '../../client/src/interfaces/fetch'

//https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&difficulty=Easy&limit=10&tags=JavaScript
export const questions: TQuestions[] = [
  {
    id: 993,
    question: 'Which event occurs when the user clicks on an HTML element?',
    description: null,
    answers: {
      answer_a: 'onchange',
      answer_b: 'onmouseclick',
      answer_c: 'onmouseover',
      answer_d: 'onclick',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'false',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
      answer_d_correct: 'true',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 995,
    question: 'Which operator is used to assign a value to a variable?',
    description: null,
    answers: {
      answer_a: 'x',
      answer_b: '-',
      answer_c: '=',
      answer_d: '*',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'false',
      answer_b_correct: 'false',
      answer_c_correct: 'true',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 982,
    question:
      'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    description: null,
    answers: {
      answer_a: 'if (i != 5)',
      answer_b: 'if (i <> 5)',
      answer_c: 'if i =! 5 then',
      answer_d: 'if i <> 5',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'true',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 979,
    question: 'How do you create a function in JavaScript?',
    description: null,
    answers: {
      answer_a: 'function myFunction()',
      answer_b: 'function:myFunction()',
      answer_c: 'function = myFunction()',
      answer_d: null,
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'true',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 978,
    question: 'How do you write "Hello World" in an alert box?',
    description: null,
    answers: {
      answer_a: 'msgBox("Hello World");',
      answer_b: 'alert("Hello World");',
      answer_c: 'msg("Hello World");',
      answer_d: 'alertBox("Hello World");',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'false',
      answer_b_correct: 'true',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 984,
    question: 'How does a FOR loop start?',
    description: null,
    answers: {
      answer_a: 'for i = 1 to 5',
      answer_b: 'for (i = 0; i <= 5; i++)',
      answer_c: 'for (i <= 5; i++)',
      answer_d: 'for (i = 0; i <= 5)',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'false',
      answer_b_correct: 'true',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 985,
    question: 'How can you add a comment in a JavaScript?',
    description: null,
    answers: {
      answer_a: '//This is a comment',
      answer_b: "'This is a comment",
      answer_c: '<!--This is a comment-->',
      answer_d: null,
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'true',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 989,
    question: 'How do you find the number with the highest value of x and y?',
    description: null,
    answers: {
      answer_a: 'ceil(x, y)',
      answer_b: 'Math.ceil(x, y)',
      answer_c: 'Math.max(x, y)',
      answer_d: 'top(x, y)',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'false',
      answer_b_correct: 'false',
      answer_c_correct: 'true',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 983,
    question: 'How does a WHILE loop start?',
    description: null,
    answers: {
      answer_a: 'while (i <= 10)',
      answer_b: 'while i = 1 to 10',
      answer_c: 'while (i <= 10; i++)',
      answer_d: null,
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'true',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
  {
    id: 988,
    question: 'How do you round the number 7.25, to the nearest integer?',
    description: null,
    answers: {
      answer_a: 'Math.round(7.25)',
      answer_b: 'round(7.25)',
      answer_c: 'rnd(7.25)',
      answer_d: 'Math.rnd(7.25)',
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: 'false',
    correct_answers: {
      answer_a_correct: 'true',
      answer_b_correct: 'false',
      answer_c_correct: 'false',
      answer_d_correct: 'false',
      answer_e_correct: 'false',
      answer_f_correct: 'false',
    },
    correct_answer: 'answer_a',
    explanation: null,
    tip: null,
    tags: [{ name: 'JavaScript' }],
    category: 'Code',
    difficulty: 'Easy',
  },
]
