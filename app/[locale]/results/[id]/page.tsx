"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Home, RotateCcw, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import confetti from "canvas-confetti"

// Mock test data (same as in test page)
const testData = {
  id: 1,
  title: "Mathematics",
  duration: 45, // minutes
  questions: [
    {
      id: 1,
      text: "What is the value of π (pi) to two decimal places?",
      options: [
        { id: "a", text: "3.14" },
        { id: "b", text: "3.16" },
        { id: "c", text: "3.12" },
        { id: "d", text: "3.18" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      text: "Solve for x: 2x + 5 = 13",
      options: [
        { id: "a", text: "x = 3" },
        { id: "b", text: "x = 4" },
        { id: "c", text: "x = 5" },
        { id: "d", text: "x = 6" },
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      text: "What is the area of a circle with radius 5 units?",
      options: [
        { id: "a", text: "25π square units" },
        { id: "b", text: "10π square units" },
        { id: "c", text: "5π square units" },
        { id: "d", text: "15π square units" },
      ],
      correctAnswer: "a",
    },
    {
      id: 4,
      text: "What is the square root of 144?",
      options: [
        { id: "a", text: "12" },
        { id: "b", text: "14" },
        { id: "c", text: "10" },
        { id: "d", text: "16" },
      ],
      correctAnswer: "a",
    },
    {
      id: 5,
      text: "If a triangle has angles measuring 30°, 60°, and 90°, what type of triangle is it?",
      options: [
        { id: "a", text: "Equilateral" },
        { id: "b", text: "Isosceles" },
        { id: "c", text: "Scalene" },
        { id: "d", text: "Right-angled" },
      ],
      correctAnswer: "d",
    },
  ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const t = useTranslations("Results")
  const [result, setResult] = useState<{
    testId: number
    answers: Record<number, string>
    timeSpent: number
  } | null>(null)

  const [score, setScore] = useState({
    correct: 0,
    total: testData.questions.length,
    percentage: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get result from localStorage
    const storedResult = localStorage.getItem("testResult")
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult)
      setResult(parsedResult)

      // Calculate score
      let correctCount = 0
      testData.questions.forEach((question) => {
        if (parsedResult.answers[question.id] === question.correctAnswer) {
          correctCount++
        }
      })

      const percentage = Math.round((correctCount / testData.questions.length) * 100)

      setScore({
        correct: correctCount,
        total: testData.questions.length,
        percentage,
      })

      // Simulate loading
      setTimeout(() => {
        setLoading(false)

        // Trigger confetti if score is good
        if (percentage >= 70) {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
            toast.success(t("score.correct", { correct: correctCount, total: testData.questions.length }))
          }, 500)
        } else {
          toast.info(t("score.correct", { correct: correctCount, total: testData.questions.length }))
        }
      }, 1000)
    } else {
      setLoading(false)
    }
  }, [])

  // Format time spent as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} min ${secs} sec`
  }

  if (!result && !loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="container flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md text-center border-primary/20 shadow-md">
            <CardHeader>
              <CardTitle>{t("noResult.title")}</CardTitle>
              <CardDescription>{t("noResult.description")}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  {t("noResult.button")}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto max-w-3xl py-8">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-20 w-20 bg-primary/20 rounded-full mb-4"></div>
              <div className="h-6 w-40 bg-primary/20 rounded mb-2"></div>
              <div className="h-4 w-60 bg-muted rounded"></div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="mb-8 border-primary/20 shadow-md overflow-hidden">
              <div
                className={`h-2 ${score.percentage >= 70 ? "bg-green-500" : score.percentage >= 40 ? "bg-amber-500" : "bg-red-500"}`}
              ></div>
              <CardHeader>
                <CardTitle className="text-2xl">{t("title")} { testData.title }</CardTitle>
                <CardDescription>{t("completed", { time: formatTime(result!.timeSpent) })}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  className="flex flex-col items-center justify-center space-y-2 text-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <div
                    className={`text-6xl font-bold ${
                      score.percentage >= 70
                        ? "text-green-500"
                        : score.percentage >= 40
                          ? "text-amber-500"
                          : "text-red-500"
                    }`}
                  >
                    {score.percentage}%
                  </div>
                  <Progress
                    value={score.percentage}
                    className="h-3 w-full max-w-md"
                    indicatorClassName={
                      score.percentage >= 70 ? "bg-green-500" : score.percentage >= 40 ? "bg-amber-500" : "bg-red-500"
                    }
                  />
                  <p className="text-muted-foreground">
                    {t("score.correct", { correct: score.correct, total: score.total })}
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-lg border bg-muted/50 p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{t("stats.totalQuestions")}</p>
                      <p className="text-xl font-bold">{score.total}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{t("stats.correctAnswers")}</p>
                      <p className="text-xl font-bold text-green-500">{score.correct}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{t("stats.incorrectAnswers")}</p>
                      <p className="text-xl font-bold text-red-500">{score.total - score.correct}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{t("stats.timeSpent")}</p>
                      <p className="text-xl font-bold">{formatTime(result!.timeSpent)}</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
                <Link href="/dashboard">
                  <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                    <Home className="h-4 w-4" />
                    {t("actions.dashboard")}
                  </Button>
                </Link>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 flex-1 sm:flex-initial"
                    onClick={() => toast.success(t("notifications.shared"))}
                  >
                    <Share2 className="h-4 w-4" />
                    {t("actions.share")}
                  </Button>
                  <Link href={`/test/${testData.id}`}>
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 flex-1 sm:flex-initial">
                      <RotateCcw className="h-4 w-4" />
                      {t("actions.retake")}
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <h2 className="mb-4 text-xl font-bold">{t("detailedResults")}</h2>

            {testData.questions.map((question, index) => {
              const userAnswer = result!.answers[question.id] || ""
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Card
                    key={question.id}
                    className={`mb-4 border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"} shadow-sm`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{t("question", { number: index + 1 })}</CardTitle>
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{question.text}</p>

                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const isUserAnswer = userAnswer === option.id
                          const isCorrectAnswer = question.correctAnswer === option.id

                          let className = "p-2 rounded-md border"

                          if (isUserAnswer && isCorrectAnswer) {
                            className += " bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                          } else if (isUserAnswer && !isCorrectAnswer) {
                            className += " bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
                          } else if (isCorrectAnswer) {
                            className += " bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                          }

                          return (
                            <div key={option.id} className={className}>
                              <div className="flex items-center gap-2">
                                {isUserAnswer && isCorrectAnswer && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                                {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-500" />}
                                {!isUserAnswer && isCorrectAnswer && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                                <span>{option.text}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}

