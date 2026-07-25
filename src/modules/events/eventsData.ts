/**
 * Data structure and content for Events timeline.
 * ONLY contains real events hosted, organized, or attended by Gokulbarath.
 */

export type EventCategory = "Hosted & Organized" | "Events Attended"

export interface TimelineEventItem {
  id: string
  title: string
  role: string
  organization?: string
  date: string
  timestamp: string // Used for chronological timeline sorting
  location: string
  category: EventCategory
  description: string
  keyTakeaways?: string[]
  tags: string[]
  linkedInUrl?: string
  featured?: boolean
  image?: string
}

export const eventsData: TimelineEventItem[] = [
  {
    id: "event-kotlin-ai-esp32",
    title: "Kotlin, AI & ESP32 Live Workshop & Hands-on Session",
    role: "Host & Speaker",
    organization: "Tech Community",
    date: "February 2025",
    timestamp: "2025-02-15",
    location: "Chennai, India",
    category: "Hosted & Organized",
    description:
      "Organized and hosted an interactive hands-on workshop focused on bridging Kotlin application software with AI capabilities and ESP32 hardware microcontrollers. Demonstrated real-time communication pipelines between smart agents and embedded devices.",
    keyTakeaways: [
      "Hardware-software control integration using Kotlin and ESP32 over serial/Wi-Fi",
      "Embedding lightweight AI agents into embedded IoT systems",
      "Live interactive Q&A and code walkthrough with developers & students",
    ],
    tags: ["Kotlin", "AI", "ESP32", "IoT", "Embedded Systems", "Workshop"],
    linkedInUrl:
      "https://www.linkedin.com/posts/gokulbarath_kotlin-ai-esp32-ugcPost-7482821364010102784-21pv/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAETwxSUBpMp4nljQ9G95pzGg5RY6-QJkp7M",
    featured: true,
  },
]
