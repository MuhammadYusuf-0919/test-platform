export interface User {
  id: number
  name: string
  email: string
  testsCompleted: number
  averageScore: number
}

export interface Test {
  id: number
  title: string
  category: string
  questions: number
  duration: number
  level: string
}

export interface Question {
  id: number
  text: string
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string
}

export interface TestResult {
  testId: number
  answers: Record<number, string>
  timeSpent: number
}

