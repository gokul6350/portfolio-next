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
  lumaEmbedUrl?: string
}

export const eventsData: TimelineEventItem[] = [
  {
    id: "evt-1lwCaTsSudEXiRC",
    title: "SHARK TANK (ROBOTICS EDITION)",
    role: "Organizer",
    organization: "Sathyabama Institute of Science and Technology",
    date: "July 21, 2026",
    timestamp: "2026-07-21",
    location: "Chennai, India",
    category: "Hosted & Organized",
    description:
      "Present your robotics startup idea before a panel of judges. Convince then that your innovation deserves investment through strong technical design, real-world feasibility, and market potential.",
    tags: ["Robotics", "Startup", "Pitch"],
    lumaEmbedUrl: "https://luma.com/embed/event/evt-1lwCaTsSudEXiRC/simple",
  },
  {
    id: "evt-SXBcLPrFGBXDSFD",
    title: "DIGITAL TWIN WORKSHOP FOR INDUSTRY 4.0",
    role: "Organizer & Host",
    organization: "Sathyabama Institute of Science and Technology",
    date: "July 27, 2026",
    timestamp: "2026-07-27",
    location: "Chennai, India",
    category: "Hosted & Organized",
    description:
      "Get hands-on experience building and simulating Digital Twins. Learn to model, visualize and control real-time cyber-physical systems used in modern smart manufacturing and Industry 4.0. Perfect for beginners and enthusiasts.",
    tags: ["Digital Twin", "Industry 4.0", "Workshop", "Simulation"],
    lumaEmbedUrl: "https://luma.com/embed/event/evt-SXBcLPrFGBXDSFD/simple",
  },
  {
    id: "evt-wWhDo0pPsbeizmV",
    title: "RoBoSIST",
    role: "Organizer",
    organization: "Sathyabama Institute of Science and Technology",
    date: "August 28, 2026",
    timestamp: "2026-08-28",
    location: "Chennai, India",
    category: "Hosted & Organized",
    description: "RoBoSIST event featuring innovations and latest trends in the field of robotics.",
    tags: ["Robotics", "Event", "Tech"],
    lumaEmbedUrl: "https://luma.com/embed/event/evt-wWhDo0pPsbeizmV/simple",
  },
  {
    id: "64t7lgsz",
    title: "Kotlin Beyond Apps: Al, Hardware & the Connected Future",
    role: "Guest Speaker & Co-host",
    organization: "Kotlin User Group Chennai",
    date: "July 11, 2026",
    timestamp: "2026-07-11",
    location: "Chennai, India",
    category: "Hosted & Organized",
    description:
      "Think Kotlin is just for Android apps? Think again. The tech landscape is shifting rapidly, and Kotlin is breaking out of the mobile ecosystem to power the next generation of intelligent, connected systems. From embedded hardware to cutting-edge AI integrations, Kotlin is proving to be the ultimate versatile tool for the modern developer.",
    keyTakeaways: [
      "Kotlin in the Age of AI: How to leverage Kotlin for machine learning models and intelligent automation.",
      "Hardware & IoT: Running Kotlin on embedded devices and smart hardware.",
      "The Connected Ecosystem: Architecting cross-platform connected systems that talk to each other seamlessly."
    ],
    tags: ["Kotlin", "AI", "Hardware", "IoT", "Workshop"],
    lumaEmbedUrl: "https://luma.com/embed/event/64t7lgsz/simple",
  }
]
