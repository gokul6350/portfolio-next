import { Metadata } from "next"
import { DevFestPageClient } from "@/src/modules/devfest2026/DevFestPageClient"

export const metadata: Metadata = {
  title: "Local AI: The Google Gemma Edition | DevFest 2026 Chennai | Gokulbarath",
  description:
    "Slides, PDF and demo video from Gokulbarath's DevFest 2026 Chennai talk: running Google's Gemma 4 locally on a Raspberry Pi 5 and driving a robot arm offline.",
}

export default function DevFest2026Page() {
  return <DevFestPageClient />
}
