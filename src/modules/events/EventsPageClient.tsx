"use client"

import React, { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  MapPin,
  ExternalLink,
  Search,
  Sparkles,
  Users,
  Presentation,
  CheckCircle2,
  ArrowLeft,
  Moon,
  Sun,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { eventsData, type TimelineEventItem } from "./eventsData"
import { logMessage } from "@/src/utils/logger"

const categories: { label: string; value: string; icon: React.ReactNode }[] = [
  { label: "All Events", value: "All", icon: <Sparkles className="h-4 w-4" /> },
  { label: "Hosted & Organized", value: "Hosted & Organized", icon: <Presentation className="h-4 w-4" /> },
  { label: "Events Attended", value: "Events Attended", icon: <Users className="h-4 w-4" /> },
]

export function EventsPageClient() {
  const [isDark, setIsDark] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
    logMessage("EVENTS_MODULE", "EventsPageClient", "INFO", "Events page rendered")
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem("portfolio_theme", next ? "dark" : "light")
      return next
    })
  }


  useEffect(() => {
    logMessage(
      "EVENTS_MODULE",
      "filterEvents",
      "INFO",
      `Events filter changed to category="${selectedCategory}", query="${searchQuery}"`
    )
  }, [selectedCategory, searchQuery])

  // Filter & sort events timeline chronologically
  const filteredEvents = useMemo(() => {
    return eventsData
      .filter((event) => {
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory
        const matchesQuery =
          searchQuery === "" ||
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          event.role.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesQuery
      })
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
  }, [selectedCategory, searchQuery])

  // Count stats
  const stats = useMemo(() => {
    return {
      total: eventsData.length,
      hosted: eventsData.filter((e) => e.category === "Hosted & Organized").length,
      attended: eventsData.filter((e) => e.category === "Events Attended").length,
    }
  }, [])

  return (
    <div className={isDark ? "dark bg-background text-foreground" : "bg-background text-foreground"}>
      <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
        {/* Navigation Header */}
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
                Events<span className="text-primary">_</span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Header Section */}
        <section className="relative border-b py-16 px-4 bg-muted/20 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-3 px-3 py-1 border-primary/30 bg-primary/5 text-xs uppercase tracking-widest text-primary">
                Timeline &amp; Workshops
              </Badge>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Events &amp; Workshops
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg mt-3">
                A timeline of tech workshops I&apos;ve hosted, live sessions, and developer events attended.
              </p>
            </motion.div>

            {/* Quick Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto pt-6"
            >
              <div className="p-4 rounded-xl border border-border/80 bg-card/50 backdrop-blur-sm text-center shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">{stats.total}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total Events</div>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-card/50 backdrop-blur-sm text-center shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500">{stats.hosted}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Hosted &amp; Organized</div>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-card/50 backdrop-blur-sm text-center shadow-xs col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">{stats.attended}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Events Attended</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="sticky top-[57px] z-40 bg-background/95 backdrop-blur-md border-b py-4 px-4 shadow-xs">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-start overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="rounded-full text-xs gap-1.5 whitespace-nowrap transition-all"
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-input bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Timeline View Section */}
        <main className="max-w-4xl mx-auto px-4 py-12">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16 border rounded-2xl bg-card/40 my-8">
              <Filter className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-semibold">No matching events found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try clearing your search query or switching filter categories.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All")
                  setSearchQuery("")
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="relative border-l-2 border-primary/30 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-10">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((item, index) => {
                  const isHosted = item.category === "Hosted & Organized"

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative group"
                    >
                      {/* Timeline Node Marker */}
                      <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-primary ring-4 ring-background shadow-xs group-hover:scale-125 transition-transform duration-200">
                        {isHosted ? (
                          <Presentation className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <Users className="h-3 w-3 text-amber-500" />
                        )}
                      </span>

                      {/* Event Card */}
                      <Card className={`border transition-all duration-300 group-hover:shadow-md ${
                        item.featured
                          ? "border-primary/40 bg-card/80 shadow-xs"
                          : "border-border/80 bg-card/40"
                      }`}>
                        <CardHeader className="pb-3">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <Badge
                                  variant={isHosted ? "default" : "outline"}
                                  className={`text-[11px] px-2.5 py-0.5 font-medium ${
                                    isHosted
                                      ? "bg-emerald-600 text-white"
                                      : "border-amber-500/50 text-amber-500"
                                  }`}
                                >
                                  {item.category}
                                </Badge>
                                {item.featured && (
                                  <Badge variant="outline" className="text-[10px] border-primary/40 text-primary bg-primary/5">
                                    Featured Event
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                              <CardDescription className="text-sm font-medium text-foreground/80 mt-0.5 flex items-center gap-2">
                                <span className="text-primary font-semibold">{item.role}</span>
                                {item.organization && (
                                  <>
                                    <span>•</span>
                                    <span>{item.organization}</span>
                                  </>
                                )}
                              </CardDescription>
                            </div>

                            <div className="flex flex-col items-end text-xs text-muted-foreground shrink-0">
                              <span className="flex items-center gap-1 font-mono font-medium">
                                <Calendar className="h-3.5 w-3.5 text-primary/70" />
                                {item.date}
                              </span>
                              <span className="flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {item.location}
                              </span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4 pt-0">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>

                          {/* Key Takeaways / Highlights */}
                          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                            <div className="bg-muted/40 rounded-xl p-3.5 space-y-2 border border-border/50">
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Event Highlights
                              </p>
                              <ul className="space-y-1.5">
                                {item.keyTakeaways.map((takeaway, idx) => (
                                  <li key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[11px] font-normal px-2 py-0.5 bg-muted hover:bg-muted/80"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* LinkedIn Post Link Button */}
                          {item.linkedInUrl && (
                            <div className="pt-2">
                              <a
                                href={item.linkedInUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline group/link"
                              >
                                <span>View LinkedIn Event Post</span>
                                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                              </a>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t py-8 text-center text-xs text-muted-foreground bg-muted/20">
          <p>© {new Date().getFullYear()} Gokulbarath. Events &amp; Workshops.</p>
        </footer>
      </div>
    </div>
  )
}
