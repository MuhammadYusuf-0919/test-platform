import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: "Online Test Platform",
  description: "Interactive and efficient platform for online quizzes and exams",
}

const inter = Inter({ subsets: ["latin"] })

async function getLocales(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}
export default async function RootLayout(props: Props) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const messages = await getLocales(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

