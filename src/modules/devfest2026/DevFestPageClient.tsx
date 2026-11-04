"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, FileText, Moon, Presentation, Sun, Video } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { logMessage } from "@/src/utils/logger"

const BASE = "/devfest2026"

const downloads = [
  {
    title: "Slides (PowerPoint)",
    detail: "31 slides with the demo video embedded · about 12 MB",
    href: `${BASE}/Gemma_Local_AI_DevFest2026_Gokulbarath.pptx`,
    icon: <Presentation className="h-5 w-5" />,
    cta: "Download .pptx",
  },
  {
    title: "Slides (PDF)",
    detail: "Same deck, easy to read on a phone · about 3 MB",
    href: `${BASE}/Gemma_Local_AI_DevFest2026_Gokulbarath.pdf`,
    icon: <FileText className="h-5 w-5" />,
    cta: "Download .pdf",
  },
  {
    title: "Demo video",
    detail: "Gemma 4 on a Raspberry Pi 5 driving the robot arm · 48 s, about 4 MB",
    href: `${BASE}/demo.mp4`,
    icon: <Video className="h-5 w-5" />,
    cta: "Download .mp4",
  },
]

const outline = [
  { part: "01", title: "Local AI", text: "What it is and why run models on your own hardware." },
  { part: "02", title: "Meet Gemma 4", text: "Open weights, the model family, per-layer embeddings, TurboQuant and the memory bottleneck." },
  { part: "03", title: "Gemma on a Raspberry Pi 5", text: "Which model the Pi can hold and how to run it in three commands." },
  { part: "04", title: "Gemma + Robotics", text: "An offline robot arm, LoRA fine-tuning of Gemma 4 E2B, and Pi benchmarks." },
  { part: "05", title: "The Future", text: "Robots that think on-device: from a desk to the Moon." },
]

export function DevFestPageClient() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio_theme")
      if (savedTheme) setIsDark(savedTheme === "dark")
    } catch {
      // storage can be blocked; fall back to the light theme
    }
    logMessage("DEVFEST2026_MODULE", "DevFestPageClient", "INFO", "DevFest 2026 page rendered")
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      try {
        localStorage.setItem("portfolio_theme", next ? "dark" : "light")
      } catch {
        // ignore
      }
      return next
    })
  }

  return (
    <div className={isDark ? "dark bg-background text-foreground" : "bg-background text-foreground"}>
      <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
          <div className="max-w-6xl mx-auto p-4 flex justify-between items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold tracking-tight hidden sm:inline">
                DevFest2026<span className="text-primary">_</span>
              </span>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full" aria-label="Toggle theme">
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <section className="border-b py-16 px-4 bg-muted/20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-4"
          >
            <Badge variant="outline" className="px-3 py-1 border-primary/30 bg-primary/5 text-xs uppercase tracking-widest text-primary">
              DevFest 2026 · GDG Chennai
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Local AI: The Google Gemma Edition
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Running Google&apos;s Gemma 4 on a Raspberry Pi 5, and using it to drive a robot arm with no internet.
              Grab the slides and the demo video below.
            </p>
            <p className="text-sm text-muted-foreground">
              Gokulbarath SK · Founder, BGO APPS
            </p>
          </motion.div>
        </section>

        <main className="max-w-5xl mx-auto px-4 py-12 space-y-14">
          <section aria-labelledby="downloads-heading" className="space-y-5">
            <h2 id="downloads-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
              Downloads
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {downloads.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                >
                  <Card className="h-full border-border/80 bg-card/50 flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 text-primary">{item.icon}</div>
                      <CardTitle className="text-lg font-bold mt-2">{item.title}</CardTitle>
                      <CardDescription className="text-sm">{item.detail}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <Button asChild className="w-full gap-2">
                        <a href={item.href} download>
                          <Download className="h-4 w-4" />
                          {item.cta}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          <section aria-labelledby="demo-heading" className="space-y-5">
            <h2 id="demo-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
              Demo: Gemma on a Pi controlling the arm
            </h2>
            <div className="rounded-2xl overflow-hidden border border-border/80 bg-black">
              <video
                className="w-full h-auto"
                controls
                preload="metadata"
                playsInline
                poster={`${BASE}/poster.jpg`}
                src={`${BASE}/demo.mp4`}
              >
                Your browser does not support video playback. You can download the video above.
              </video>
            </div>
            <p className="text-sm text-muted-foreground">
              Everything runs on the Raspberry Pi 5: a fine-tuned Gemma 4 E2B reads the camera image, returns where the
              object is, and the arm picks it up. No cloud, no Wi-Fi needed.
            </p>
          </section>

          <section aria-labelledby="outline-heading" className="space-y-5">
            <h2 id="outline-heading" className="text-xl sm:text-2xl font-bold tracking-tight">
              What&apos;s in the talk
            </h2>
            <ol className="space-y-3">
              {outline.map((item) => (
                <li key={item.part} className="flex gap-4 rounded-xl border border-border/80 bg-card/40 p-4">
                  <span className="font-mono text-sm font-bold text-primary pt-0.5">{item.part}</span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </main>

        <footer className="border-t py-8 text-center text-xs text-muted-foreground bg-muted/20">
          <p>© {new Date().getFullYear()} Gokulbarath. DevFest 2026 Chennai talk materials.</p>
        </footer>
      </div>
    </div>
  )
}
