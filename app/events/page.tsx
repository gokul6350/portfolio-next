import { Metadata } from "next"
import { EventsPageClient } from "@/src/modules/events/EventsPageClient"

export const metadata: Metadata = {
  title: "Events & Workshops | Gokulbarath",
  description:
    "Explore Gokulbarath's hosted events, workshops on Kotlin, AI, and ESP32, and developer community sessions.",
}

export default function EventsPage() {
  return <EventsPageClient />
}
