"use client"

import React, { useEffect } from "react"
import { Globe2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { logMessage } from "@/src/utils/logger"

export interface LanguageItem {
  name: string
  level: string
  flag: string
  variant?: "default" | "secondary" | "outline"
  highlight?: boolean
}

const languagesList: LanguageItem[] = [
  { name: "English", level: "Fluent", flag: "🇬🇧", variant: "secondary" },
  { name: "Tamil", level: "Fluent", flag: "🇮🇳", variant: "secondary" },
  { name: "Hindi", level: "Fluent", flag: "🇮🇳", variant: "secondary" },
  { name: "Gujarati", level: "Med", flag: "🇮🇳", variant: "secondary" },
  { name: "German", level: "A1", flag: "🇩🇪", variant: "outline" },
  { name: "Spanish", level: "Learning", flag: "🇪🇸", variant: "outline", highlight: true },
]

export function LanguagesSection() {
  useEffect(() => {
    logMessage("LANGUAGES_MODULE", "LanguagesSection", "INFO", "Rendered compact Known Languages chips")
  }, [])

  return (
    <div className="space-y-2 pt-1">
      <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-medium">
        <Globe2 className="h-3.5 w-3.5 text-primary shrink-0" />
        <span>Languages Spoken</span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {languagesList.map((lang) => (
          <Badge
            key={lang.name}
            variant={lang.variant || "secondary"}
            className={`text-xs py-0.5 px-2.5 font-normal flex items-center gap-1.5 transition-colors ${
              lang.highlight
                ? "border-amber-500/50 text-amber-600 dark:text-amber-400 bg-amber-500/10"
                : "bg-muted/60 hover:bg-muted text-foreground"
            }`}
          >
            <span>{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
            <span className="text-[10px] opacity-70 font-mono">({lang.level})</span>
          </Badge>
        ))}
      </div>
    </div>
  )
}
