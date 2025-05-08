"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Clock, AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react"
import { QuestionSkeleton } from "@/components/ui-skeleton"
import { Header } from "@/components/header"

// Mock test data
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

export default function TestPage({ params }: { params: { id: string } }) {
  const t = useTranslations("Test")
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(testData.duration * 60) // in seconds
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  const currentQuestion = testData.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / testData.questions.length) * 100

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowTimeoutDialog(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate loading data
    const loadTimer = setTimeout(() => {
      setLoading(false)
      toast.info(t("timeLeft") + ": " + formatTime(timeLeft))
    }, 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(loadTimer)
    }
  }, [])

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < testData.questions.length) {
      setShowConfirmDialog(true)
    } else {
      submitTest()
    }
  }

  const submitTest = () => {
    // Calculate results and redirect to results page
    const result = {
      testId: testData.id,
      answers,
      timeSpent: testData.duration * 60 - timeLeft,
    }

    // Store result in localStorage for demo purposes
    localStorage.setItem("testResult", JSON.stringify(result))

    // Redirect to results page
    router.push(`/results/${testData.id}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto max-w-3xl py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {testData.title}
            </h1>
            <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className={`font-mono ${timeLeft < 60 ? "text-red-500 animate-pulse" : ""}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span>{t("question", { current: currentQuestionIndex + 1, total: testData.questions.length })}</span>
              <span>{t("complete", { percentage: progress.toFixed(0) })}</span>
            </div>
            <Progress value={progress} className="mt-2 h-2 bg-muted" />
          </div>

          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <QuestionSkeleton />
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-primary/20 shadow-md">
                  <CardHeader>
                    <CardTitle>
                      {t("question", { current: currentQuestionIndex + 1, total: testData.questions.length })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 text-lg">{currentQuestion.text}</div>

                    <RadioGroup
                      value={answers[currentQuestion.id] || ""}
                      onValueChange={handleAnswerChange}
                      className="space-y-3"
                    >
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted cursor-pointer transition-all"
                          onClick={() => handleAnswerChange(option.id)}
                        >
                          <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                          <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                            {option.text}
                          </Label>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className="flex items-center gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t("prevButton")}
                    </Button>

                    {currentQuestionIndex < testData.questions.length - 1 ? (
                      <Button
                        onClick={handleNext}
                        className="flex items-center gap-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        {t("nextButton")}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        {t("submitButton")}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* Confirmation Dialog for Incomplete Test */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("confirmSubmit.title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("confirmSubmit.description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("confirmSubmit.continueButton")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={submitTest}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {t("confirmSubmit.submitButton")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Timeout Dialog */}
      <AlertDialog open={showTimeoutDialog} onOpenChange={setShowTimeoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {t("timeout.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>{t("timeout.description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={submitTest}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {t("timeout.viewResults")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

