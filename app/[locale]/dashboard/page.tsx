"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Award, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TestCardSkeleton, StatCardSkeleton } from "@/components/ui-skeleton"
import { Header } from "@/components/header"

// Mock data for tests
const testCategories = [
  {
    id: "all",
    name: "all",
    tests: [
      {
        id: 1,
        title: "Mathematics",
        category: "Academic",
        questions: 30,
        duration: 45,
        level: "Medium",
      },
      {
        id: 2,
        title: "English Grammar",
        category: "Language",
        questions: 25,
        duration: 30,
        level: "Easy",
      },
      {
        id: 3,
        title: "Physics",
        category: "Academic",
        questions: 40,
        duration: 60,
        level: "Hard",
      },
      {
        id: 4,
        title: "General Knowledge",
        category: "Trivia",
        questions: 20,
        duration: 20,
        level: "Easy",
      },
      {
        id: 5,
        title: "Programming Basics",
        category: "IT",
        questions: 35,
        duration: 50,
        level: "Medium",
      },
      {
        id: 6,
        title: "History",
        category: "Academic",
        questions: 30,
        duration: 40,
        level: "Medium",
      },
    ],
  },
  {
    id: "academic",
    name: "academic",
    tests: [
      {
        id: 1,
        title: "Mathematics",
        category: "Academic",
        questions: 30,
        duration: 45,
        level: "Medium",
      },
      {
        id: 3,
        title: "Physics",
        category: "Academic",
        questions: 40,
        duration: 60,
        level: "Hard",
      },
      {
        id: 6,
        title: "History",
        category: "Academic",
        questions: 30,
        duration: 40,
        level: "Medium",
      },
    ],
  },
  {
    id: "language",
    name: "language",
    tests: [
      {
        id: 2,
        title: "English Grammar",
        category: "Language",
        questions: 25,
        duration: 30,
        level: "Easy",
      },
    ],
  },
  {
    id: "it",
    name: "it",
    tests: [
      {
        id: 5,
        title: "Programming Basics",
        category: "IT",
        questions: 35,
        duration: 50,
        level: "Medium",
      },
    ],
  },
  {
    id: "trivia",
    name: "trivia",
    tests: [
      {
        id: 4,
        title: "General Knowledge",
        category: "Trivia",
        questions: 20,
        duration: 20,
        level: "Easy",
      },
    ],
  },
]

export default function DashboardPage() {
  const t = useTranslations("Dashboard")
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    completedTests: 12,
    averageScore: 78,
  }

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
      toast.success(t("notifications.welcome", { name: user.name }))
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter tests based on search query
  const filteredTests =
    testCategories
      .find((cat) => cat.id === activeTab)
      ?.tests.filter(
        (test) =>
          test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} />

      <main className="flex-1 py-6">
        <div className="container">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {loading ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("stats.completedTests")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <div className="text-2xl font-bold">
                          {user.completedTests}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("stats.averageScore")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <div className="text-2xl font-bold">
                          {user.averageScore}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("stats.lastTest")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">Mathematics - 85%</div>
                      <div className="text-xs text-muted-foreground">
                        {t("stats.daysAgo", { days: 2 })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold">{t("availableTests")}</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4">
                {testCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {t(`categories.${category.name}`)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {[...Array(6)].map((_, i) => (
                        <TestCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredTests.length > 0 ? (
                        filteredTests.map((test, index) => (
                          <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="transition-all"
                          >
                            <Card className="h-full flex flex-col hover:shadow-md border-primary/10">
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle>{test.title}</CardTitle>
                                  <Badge
                                    variant={
                                      test.level === "Easy"
                                        ? "outline"
                                        : test.level === "Medium"
                                          ? "secondary"
                                          : "destructive"
                                    }
                                  >
                                    {t(`levels.${test.level.toLowerCase()}`)}
                                  </Badge>
                                </div>
                                <CardDescription>
                                  {t(
                                    `categories.${test.category.toLowerCase()}`
                                  )}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="flex-grow">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    <span>
                                      {test.questions} {t("testCard.questions")}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-primary" />
                                    {/* <span>{t("testCard.duration", { minutes: test.duration })}</span> */}
                                    <span>
                                      {t("testCard.duration")} {test?.duration}
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Link
                                  href={`/test/${test.id}`}
                                  className="w-full"
                                >
                                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                                    {t("testCard.startButton")}
                                  </Button>
                                </Link>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))
                      ) : (
                        <div className="col-span-full py-12 text-center">
                          <p className="text-muted-foreground">
                            {t("noTestsFound")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
