"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function Home() {
  const t = useTranslations("Home")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container grid items-center gap-6 py-20 md:py-32">
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="max-w-[700px] text-lg text-muted-foreground md:text-xl"
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  {t("hero.startButton")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl font-bold text-primary">100+</div>
              <p className="text-sm text-muted-foreground">{t("stats.tests")}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl font-bold text-primary">10K+</div>
              <p className="text-sm text-muted-foreground">{t("stats.users")}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex flex-col items-center gap-2 rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl font-bold text-primary">50+</div>
              <p className="text-sm text-muted-foreground">{t("stats.categories")}</p>
            </motion.div>
          </motion.div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50 rounded-lg">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-4"
            >
              {t("howItWorks.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {t("howItWorks.subtitle")}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t("howItWorks.steps.register.title"),
                description: t("howItWorks.steps.register.description"),
                icon: "👤",
                delay: 0.3,
              },
              {
                title: t("howItWorks.steps.choose.title"),
                description: t("howItWorks.steps.choose.description"),
                icon: "📝",
                delay: 0.5,
              },
              {
                title: t("howItWorks.steps.results.title"),
                description: t("howItWorks.steps.results.description"),
                icon: "🏆",
                delay: 0.7,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 bg-muted/30">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} TestPlatform. {t("footer.rights")}
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.terms")}
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.privacy")}
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.contact")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

