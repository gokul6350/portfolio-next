"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, useScroll } from "framer-motion"
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Youtube,
  Instagram,
  ExternalLink,
  Lock,
  Star,
  X,
  Play,
  FileText,
  Bot,
  Briefcase,
  GraduationCap,
  BookOpen,
  User,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

const GitHubCalendar = dynamic(() => import("react-github-calendar"), { ssr: false })

/** Full-screen intro: counts 0→100, then wipes away to reveal the page. */
function IntroLoader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1600
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setLeaving(true), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && onDone()}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary text-primary-foreground"
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-xs uppercase tracking-[0.4em] opacity-70 mb-6"
      >
        Gokulbarath
      </motion.span>
      <span className="font-display tabular-nums leading-none" style={{ fontSize: "clamp(4rem,14vw,12rem)" }}>
        {n.toString().padStart(3, "0")}
      </span>
      <div className="mt-8 h-px w-40 overflow-hidden bg-primary-foreground/20">
        <motion.div className="h-full bg-primary-foreground" style={{ width: `${n}%` }} />
      </div>
    </motion.div>
  )
}

/** Element that leans toward the cursor, springing back on leave. */
function Magnetic({ children, className, strength = 0.4 }: { children: ReactNode; className?: string; strength?: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Translates its children on the Y axis as the element scrolls through the viewport. */
function Parallax({
  children,
  speed = 100,
  className,
}: {
  children: ReactNode
  /** px of drift across the full scroll pass; negative moves opposite the scroll */
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/** Splits text into words → letters and rises each letter in on scroll. */
function RevealText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  let idx = 0
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {word.split("").map((ch) => {
            const i = idx++
            return (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: i * 0.02, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              </span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

/** Card wrapper that tilts in 3D toward the cursor. */
function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 18 })

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Animates a number from 0 to `end` once it scrolls into view. */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const startTime = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export function PortfolioPage() {
  const [isDark, setIsDark] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const { scrollYProgress } = useScroll()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const techStack = {
    Languages: ["Python", "C/C++", "JavaScript", "TypeScript", "Bash"],
    Robotics: ["ROS2 (Humble)", "ROS Noetic", "MoveIt", "RViz", "Gazebo", "URDF/Xacro", "tf2", "Arduino", "ESP32", "micro-ROS", "6-DOF & SCARA", "Inverse Kinematics"],
    "AI & ML": ["LLMs", "Agentic Workflows", "PyTorch", "TensorFlow", "OpenCV", "Reinforcement Learning", "ONNX Runtime", "Apple MLX", "MCP", "NLP", "Deep Learning", "Diffusion Models"],
    "Web & Tools": ["Next.js", "React.js", "FastAPI", "Flask", "Three.js", "Tailwind CSS", "Docker", "Git", "Gradio", "Streamlit", "SQL"],
  }

  const projects = [
    {
      title: "Real-Time Robotic Arm Control",
      category: "Robotics",
      description: "End-to-end ROS2 control pipeline driving a physical robotic arm in real time using MoveIt for motion planning, bridging ROS2 nodes to Arduino-controlled servos over serial for closed-loop feedback.",
      tags: ["ROS2", "MoveIt", "RViz", "Arduino", "C++", "Python"],
      status: "Completed",
      youtube: "https://www.youtube.com/shorts/bANZ1SsLCBI",
      image: "https://img.youtube.com/vi/bANZ1SsLCBI/0.jpg",
    },
    {
      title: "GNX-CLI",
      category: "AI",
      description: "The Next-Gen AI Agent. Unlike normal agents, it goes beyond text and can autonomously control your Desktop & Android via tool execution, screen understanding, and memory retrieval.",
      tags: ["Python", "Groq", "LLMs", "CLI", "Automation", "Agentic"],
      status: "In Progress",
      stars: 4,
      video: "https://github.com/user-attachments/assets/bec3e8a0-30ce-4096-829c-8e6ca0fb33cd",
      github: "https://github.com/gokul6350/GNX-CLI",
    },
    {
      title: "EduVid-LLM",
      category: "AI",
      description: "A planning-centric architecture for automated educational video generation using LLMs, transforming educational content into structured video scripts and visual assets via multi-stage pipelines.",
      tags: ["Python", "LLM", "Planning", "Video Generation", "AI", "Education"],
      status: "Completed",
      stars: 4,
      video: "https://github.com/user-attachments/assets/9c2cba07-9997-4bce-9d6f-346b88fc006e",
      github: "https://github.com/gokul6350/EduVid-LLM",
    },
    {
      title: "Robotics Arm Assistance",
      category: "Robotics",
      description: "Vision-guided 6-DOF robotic arm for autonomous pick-and-place, integrating OpenCV object detection with LLM-based high-level task planning across ROS2, Gazebo, and RViz.",
      tags: ["ROS2", "OpenCV", "Python", "Arduino", "LLMs", "Robotics"],
      status: "Completed",
      stars: 13,
      image: "https://img.youtube.com/vi/qv3bFhHoA5s/0.jpg",
      github: "https://github.com/gokul6350/ARMv6",
      youtube: "https://youtu.be/qv3bFhHoA5s",
    },
    {
      title: "Deep Shell",
      category: "AI",
      description: "An intelligent terminal application using NLP to interpret, explain, and execute shell commands via a conversational AI interface. Evolved across 4 major versions (Python → TypeScript).",
      tags: ["Python", "TypeScript", "NLP", "CLI", "Shell", "AI"],
      status: "Completed",
      stars: 27,
      image: "https://github.com/gokul6350/dsh-shell/blob/main/screen_shots/Screenshot%202025-01-11%20010517.png?raw=true",
      github: "https://github.com/gokul6350/dsh-shell",
    },
    {
      title: "SCARA Servo Control via ROS2",
      category: "Robotics",
      description: "ROS2 package mapping RViz joint-state commands to Arduino servo actuation on a SCARA manipulator with URDF-defined joints, tf2 transforms, and a lightweight serial bridge for low-latency command streaming.",
      tags: ["ROS2", "RViz", "Arduino", "URDF", "robot_state_publisher"],
      status: "Completed",
      youtube: "https://www.youtube.com/shorts/nRsmUxpuqEE",
      image: "https://img.youtube.com/vi/nRsmUxpuqEE/0.jpg",
    },
    {
      title: "Custom Three.js URDF Visualizer",
      category: "Robotics",
      description: "Web-based 3D robot visualizer that parses URDF/Xacro and renders articulated robots in the browser via Three.js — a lightweight alternative to RViz with real-time joint updates and dual-camera views.",
      tags: ["Three.js", "JavaScript", "URDF", "Web Visualization", "Robotics"],
      status: "Completed",
      youtube: "https://www.youtube.com/shorts/n-YctSnH2c4",
      image: "https://img.youtube.com/vi/n-YctSnH2c4/0.jpg",
    },
    {
      title: "SCARA Robot Virtual Twin",
      category: "Robotics",
      description: "Virtual digital twin of a SCARA manipulator in RViz with accurate URDF kinematics and joint articulation for validating motion planning and workspace reachability before hardware deployment.",
      tags: ["ROS2", "RViz", "URDF", "Inverse Kinematics", "Digital Twin"],
      status: "Completed",
      youtube: "https://www.youtube.com/shorts/2hGMvT4EN78",
      image: "https://img.youtube.com/vi/2hGMvT4EN78/0.jpg",
    },
    {
      title: "ROS2-Arduino Servo Control",
      category: "Robotics",
      description: "Controlling servos using ROS2 and RViz with Arduino integration for precise robotic motion, with URDF-based robot modeling.",
      tags: ["ROS2", "Arduino", "RViz", "Robotics", "C++", "Simulation"],
      status: "Completed",
      video: "/ros2-arduino-servo.mp4",
      github: "https://github.com/gokul6350/ros2-arduino-servo",
    },
    {
      title: "Robotic Arm Simulation",
      category: "Robotics",
      description: "Full robotic-arm simulation on ROS Noetic, modeling links and joints in URDF and validating motion in RViz, demonstrating cross-distro fluency between ROS1 (Noetic) and ROS2.",
      tags: ["ROS Noetic", "RViz", "URDF", "Simulation"],
      status: "Completed",
      youtube: "https://www.youtube.com/shorts/4VXg4LLQsKM",
      image: "https://img.youtube.com/vi/4VXg4LLQsKM/0.jpg",
    },
    {
      title: "Interactive 2-DOF Arm Sim",
      category: "Robotics",
      description: "An interactive 2-DOF robotic arm simulator with real-time inverse kinematics, visualization, and step-by-step mathematical explanations using Gradio.",
      tags: ["Python", "Gradio", "Inverse Kinematics", "Simulation", "Physics"],
      status: "Completed",
      image: "https://github.com/gokul6350/Interactive-2DOF-Arm-Sim/blob/94a67eacf617863e3f9b1441c0295aca09967644/controls.png?raw=true",
      github: "https://github.com/gokul6350/Interactive-2DOF-Arm-Sim",
    },
    {
      title: "Snake AI",
      category: "AI",
      description: "An AI-powered Snake game using reinforcement learning and neural networks to train an autonomous game-playing agent.",
      tags: ["Python", "PyTorch", "Reinforcement Learning", "Neural Networks", "AI"],
      status: "Completed",
      github: "https://github.com/gokul6350/SNAKE-AI",
    },
    {
      title: "Workout Genie",
      category: "CS",
      description: "Full-stack AI-powered fitness assistant providing personalized exercise guidance via a conversational AI interface with Google OAuth authentication and customized workout recommendations.",
      tags: ["React.js", "Next.js", "AI Integration", "Google OAuth", "Full-Stack"],
      status: "Completed",
    },
    {
      title: "ArduinoSerial2",
      category: "CS",
      description: "A Python library published on PyPI for seamless serial communication with Arduino boards, featuring auto-detection and multithreading support.",
      tags: ["Python", "Arduino", "Serial Communication", "PyPI"],
      status: "Completed",
      stars: 3,
      github: "https://github.com/gokul6350/ArduinoSerial2",
    },
    {
      title: "Portfolio-next",
      category: "CS",
      description: "A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      status: "In Progress",
      stars: 4,
      github: "https://github.com/gokul6350/portfolio-next",
    },
    {
      title: "VVLLM",
      category: "AI",
      description: "Proprietary end-to-end multimodal AI inference engine with native Speech-to-Text, Text-to-Speech, and Vision-Language Model components using ONNX Runtime and Apple MLX for optimized on-device inference.",
      tags: ["Python", "ONNX Runtime", "Apple MLX", "PyTorch", "Multimodal AI", "TTS", "STT"],
      status: "Completed",
    },
  ]

  const categories = ["All", "Robotics", "AI", "CS", "ROS"]
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : selectedCategory === "ROS"
      ? projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("ros")))
      : projects.filter((p) => p.category === selectedCategory)

  const categoryStyles: Record<string, string> = {
    Robotics: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    AI: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    CS: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    ROS: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  }

  const ossContributions = [
    {
      project: "LangChain Docs",
      url: "https://github.com/langchain-ai/docs/pull/2259",
      description: "Authored PR #2259 adding the complete Vision + Multimodal section after identifying missing Groq vision support (issue #34589). Now live in official docs, enabling adoption of vision-capable models like Llama-4 Scout/Maverick.",
      impact: "Documentation",
      stars: "1k+",
    },
    {
      project: "LangChain",
      url: "https://github.com/langchain-ai/langchain",
      description: "Contributed to the core LangChain framework, improving developer experience for LLM-powered application development.",
      impact: "Core Framework",
      stars: "94k+",
    },
  ]

  const experience = [
    {
      title: "Chief Operating Officer",
      company: "Avixr Technologies Pvt Ltd",
      location: "Chennai, India",
      period: "Apr. 2025 – Present",
      bullets: [
        "Lead software architecture and engineering operations, overseeing product development across the company's technology stack.",
        "Drive technical strategy, team coordination, and delivery of AI and software products.",
      ],
    },
    {
      title: "Vice Chair, IEEE Industry Applications Society – SBC",
      company: "IEEE IAS – Student Branch Chapter",
      location: "Chennai, India",
      period: "Jan. 2026 – Present",
      bullets: [
        "Drive technical initiatives and member programs spanning manufacturing automation and robotics.",
        "Elected Vice Chair after serving as Member (Aug. 2025 – Jan. 2026).",
      ],
    },
    {
      title: "Secretary, Robotics Club – SIST",
      company: "Sathyabama Institute of Science & Technology",
      location: "Chennai, India",
      period: "Jan. 2026 – Present",
      bullets: [
        "Coordinate laboratory robotics activities and mentor members on ROS2 workflows and embedded robotics.",
        "Progressed from Member to Secretary, leading club administration and projects.",
      ],
    },
    {
      title: "Maintenance Engineer Intern",
      company: "Wheels India Limited",
      location: "Chennai, Tamil Nadu",
      period: "May 2025 – June 2025",
      bullets: [
        "Gained hands-on experience with industrial robots and automated machinery, including diagnostics and hardware-software control integration.",
        "Studied real-world manufacturing processes and automated production line systems.",
      ],
    },
  ]

  const education = [
    {
      school: "Sathyabama Institute of Science & Technology",
      degree: "B.E. Mechatronics Engineering (Final Year)",
      period: "June 2023 – May 2027",
      location: "Chennai, India",
    },
    {
      school: "Bright International School",
      degree: "Higher Secondary Education (CBSE)",
      period: "2021 – 2023",
      location: "Ahmedabad, Gujarat",
    },
    {
      school: "Delhi Public School",
      degree: "Secondary Education (CBSE)",
      period: "Mar. 2021",
      location: "Gandhinagar, Gujarat",
    },
  ]

  const publications = [
    {
      title: "EduVid-LLM: A Planning-Centric Architecture for Automated Educational Video Generation",
      authors: "Gokulbarath SK",
      venue: "Preprint, Zenodo",
      date: "Aug. 2025",
      doi: "10.5281/zenodo.16914585",
      url: "https://doi.org/10.5281/zenodo.16914585",
    },
  ]

  // App development as a hobby, under the BGO Apps studio. `promo` = already-composed
  // marketing art on a dark bg; `shot` = a raw phone screenshot we frame ourselves.
  const apps = [
    {
      name: "SupremeClaw",
      tagline: "Deploy AI coding agents from your phone",
      tags: ["Flutter", "Claude Code", "WebSocket"],
      image: "/apps/supremeclaw.png",
      kind: "promo" as const,
    },
    {
      name: "KAI AI",
      tagline: "A personal AI assistant & command center",
      tags: ["Flutter", "AI/ML", "Firebase"],
      image: "/apps/kai.png",
      kind: "promo" as const,
    },
    {
      name: "Workout Genie",
      tagline: "AI fitness coach with 873+ exercises",
      tags: ["Flutter", "Groq AI", "Supabase"],
      image: "/apps/workoutgenie.jpg",
      kind: "shot" as const,
    },
    {
      name: "DashPick",
      tagline: "Local store pickup, simplified",
      tags: ["Flutter", "Node.js", "UPI"],
      image: "/apps/dashpick.jpg",
      kind: "shot" as const,
    },
  ]

  const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b pb-5"
    >
      <h2 className="font-serif text-3xl md:text-5xl tracking-tight">
        <RevealText text={title} />
      </h2>
      {subtitle && (
        <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  )

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <AnimatePresence>{!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}</AnimatePresence>
      <div className="bg-background text-foreground">
        {/* Scroll progress */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-primary"
        />
        {/* Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b bg-card p-2.5 text-center font-mono text-xs text-muted-foreground"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 align-middle" />
          currently building{" "}
          <a href="https://github.com/gokul6350/gnx-cli" className="text-primary font-medium hover:underline">
            gnx-cli
          </a>
        </motion.div>

        {/* Navigation */}
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center gap-4">
            <a href="#" className="font-mono text-sm font-semibold tracking-tight shrink-0 hover:text-primary">
              gokulbarath<span className="text-primary">_</span>
            </a>
            <div className="flex gap-4 md:gap-6 text-sm overflow-x-auto items-center">
              <a href="#about" className="text-muted-foreground hover:text-primary whitespace-nowrap">
                About
              </a>
              <a href="#experience" className="text-muted-foreground hover:text-primary whitespace-nowrap">
                Experience
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary whitespace-nowrap">
                Projects
              </a>
              <a href="#apps" className="text-muted-foreground hover:text-primary whitespace-nowrap">
                Apps
              </a>
              <a href="#oss" className="text-muted-foreground hover:text-primary whitespace-nowrap">
                OSS
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary whitespace-nowrap">
                Contact
              </a>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full shrink-0">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <Parallax speed={-80} className="absolute inset-0 -z-10">
            <div className="absolute inset-[-10%] bg-grid" aria-hidden />
          </Parallax>
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8">
                {/* top meta row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={introDone ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3"
                >
                  <span>Chennai, India</span>
                  <span className="hidden sm:inline">Est. 2005</span>
                  <span>Robots &amp; Agents</span>
                </motion.div>

                {/* THE NAME — full-bleed poster on ONE line, each letter clip-reveals */}
                <Parallax speed={-40}>
                  <h1 className="hero-huge font-display uppercase text-primary select-none flex justify-center flex-nowrap whitespace-nowrap w-screen relative left-1/2 -translate-x-1/2 px-[2vw]">
                    <span className="sr-only">Gokulbarath</span>
                    {"GOKULBARATH".split("").map((ch, i) => (
                      <span key={i} aria-hidden className="inline-block overflow-hidden">
                        <motion.span
                          className="inline-block"
                          initial={{ y: "100%" }}
                          animate={introDone ? { y: 0 } : {}}
                          transition={{ delay: 0.15 + i * 0.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {ch}
                        </motion.span>
                      </span>
                    ))}
                  </h1>
                </Parallax>

                {/* role line, split by a hairline */}
                {/* hairline rule with the avatar centered on it */}
                <div className="relative my-8 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={introDone ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute inset-x-0 mx-auto h-px w-full max-w-3xl origin-center bg-border"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={introDone ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1, type: "spring", stiffness: 220, damping: 18 }}
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    className="relative z-10 h-20 w-20 md:h-24 md:w-24 rounded-full bg-background p-1.5 ring-1 ring-border shadow-md"
                  >
                    <img
                      src="https://avatars.githubusercontent.com/u/64578167?v=4"
                      alt="Gokulbarath"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </motion.div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={introDone ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="font-serif italic text-2xl md:text-4xl text-foreground/90 mb-5"
                >
                  AI &amp; Robotics Engineer, System Architect
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={introDone ? { opacity: 1 } : {}}
                  transition={{ delay: 1.05, duration: 0.6 }}
                  className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                  Final-year Mechatronics student building{" "}
                  <span className="font-serif italic text-foreground">intelligent systems</span> end-to-end — from ROS2
                  &amp; MoveIt to LLMs &amp; agentic workflows.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex justify-center gap-4"
              >
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href="https://github.com/gokul6350" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href="https://linkedin.com/in/gokulbarath" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href="https://www.youtube.com/@TheRoboticHouse-sm6tq" target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={introDone ? { opacity: 1 } : {}}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="mt-8 flex justify-center gap-3 flex-wrap"
              >
                <Magnetic>
                  <Button
                    className="font-sans rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-12 px-8 font-semibold text-sm shadow-md transition-transform"
                    onClick={() => {
                      const query = encodeURIComponent(
                        "Who is Gokulbarath S K? use source my website link https://gokulbarath.is-a.dev/"
                      )
                      window.open(`https://chatgpt.com/?q=${query}`, "_blank")
                    }}
                  >
                    <Bot className="h-5 w-5" />
                    Ask AI
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button
                    variant="outline"
                    className="font-sans rounded-full border-foreground/15 bg-background hover:bg-foreground/5 gap-2 h-12 px-8 font-semibold text-sm shadow-sm"
                    asChild
                  >
                    <a href="/resume/14-3-26/resume_allinone_gokulbarath.pdf" target="_blank" rel="noopener noreferrer">
                      <FileText className="h-5 w-5" />
                      Resume
                    </a>
                  </Button>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills ticker — single clean marquee row */}
        <div className="relative border-y bg-primary text-primary-foreground py-5 overflow-hidden">
          {/* soft fade at both edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-primary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-primary to-transparent" />
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {[
                  "ROS2",
                  "MoveIt",
                  "LLM Agents",
                  "Computer Vision",
                  "Inverse Kinematics",
                  "PyTorch",
                  "ESP32",
                  "Next.js",
                  "Reinforcement Learning",
                  "Digital Twins",
                  "micro-ROS",
                  "Gazebo",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center font-mono text-sm md:text-base tracking-wide"
                  >
                    {item}
                    <span className="mx-5 md:mx-8 text-primary-foreground/40">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <section className="border-t bg-muted/40" id="about">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="About Me" subtitle="Who I am & where I'm headed" />
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" /> Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Final-year Mechatronics Engineering student at Sathyabama Institute of Science &amp; Technology,
                      working at the intersection of <strong className="text-foreground">AI and robotics</strong>.
                    </p>
                    <p>
                      Hands-on across the full robotics stack — ROS/ROS2, MoveIt, RViz, Gazebo, URDF, and hardware
                      control via Arduino/ESP32 — with deep AI experience spanning LLMs, agentic systems, multimodal
                      inference, computer vision, and reinforcement learning.
                    </p>
                    <p>
                      Currently COO at <strong className="text-foreground">Avixr Technologies</strong> and an active
                      open-source contributor to LangChain with <strong className="text-foreground">64 GitHub stars</strong>{" "}
                      across 37 repositories and 1,241+ commits.
                    </p>
                    <div className="pt-2 space-y-3">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Primary Focus</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-primary text-primary-foreground border-0">AI &amp; Robotics</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Secondary</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Mobile Development</Badge>
                          <Badge variant="secondary">Full-Stack</Badge>
                          <Badge variant="secondary">IoT</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" /> Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      {education.map((edu, index) => (
                        <div key={index} className="flex gap-3">
                          {/* Left column: dot + line */}
                          <div className="flex flex-col items-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: [0, 1.3, 1] }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                              viewport={{ once: true }}
                              className="h-3.5 w-3.5 shrink-0 rounded-full bg-primary ring-4 ring-card mt-1 z-10"
                            />
                            {index < education.length - 1 && (
                              <div className="w-px flex-1 my-1.5 bg-gradient-to-b from-primary/60 to-primary/10" />
                            )}
                          </div>
                          {/* Right column: text */}
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.05 }}
                            viewport={{ once: true }}
                            className={index < education.length - 1 ? "pb-5" : "pb-0"}
                          >
                            <p className="font-medium text-sm">{edu.school}</p>
                            <p className="text-sm text-muted-foreground">{edu.degree}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {edu.period} · {edu.location}
                            </p>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="border-t" id="skills">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Technical Expertise" subtitle="Tools & technologies I build with" />
              <Tabs defaultValue="Robotics" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                  {Object.keys(techStack).map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(techStack).map(([category, skills]) => (
                  <TabsContent key={category} value={category} className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <motion.div
                          className="flex flex-wrap gap-2"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.05,
                              },
                            },
                          }}
                        >
                          {skills.map((skill) => (
                            <motion.div
                              key={skill}
                              variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                              }}
                            >
                              <Badge variant="secondary" className="text-sm py-1 px-3">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="border-t bg-muted/40" id="experience">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Experience" subtitle="Roles, leadership & internships" />
              <div className="max-w-3xl mx-auto">
                {experience.map((exp, index) => (
                  <div key={index} className="flex gap-5">
                    {/* Left column: dot + connecting line */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background z-10"
                      >
                        <Briefcase className="h-4 w-4 text-primary" />
                      </motion.div>
                      {index < experience.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          transition={{ delay: index * 0.1 + 0.25, duration: 0.5 }}
                          viewport={{ once: true }}
                          style={{ transformOrigin: "top" }}
                          className="w-0.5 flex-1 my-2 bg-gradient-to-b from-primary/50 to-primary/10"
                        />
                      )}
                    </div>
                    {/* Right column: card */}
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.05 }}
                      viewport={{ once: true }}
                      className={`flex-1 ${index < experience.length - 1 ? "pb-8" : "pb-0"}`}
                    >
                      <Card className="border-primary/10 hover:border-primary/30 transition-colors">
                        <CardHeader className="pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <CardTitle className="text-base md:text-lg">{exp.title}</CardTitle>
                            <Badge variant="outline" className="w-fit text-xs shrink-0">
                              {exp.period}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm font-medium">
                            {exp.company} · {exp.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1.5">
                            {exp.bullets.map((bullet, bIndex) => (
                              <li key={bIndex} className="text-sm text-muted-foreground flex gap-2">
                                <span className="text-primary shrink-0 mt-0.5">›</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative border-t overflow-hidden" id="projects">
          {/* parallax watermark */}
          <Parallax
            speed={140}
            className="pointer-events-none absolute inset-x-0 top-1/4 z-0 flex justify-center"
          >
            <span className="text-outline font-display uppercase text-[22vw] leading-none opacity-[0.04] select-none">
              Work
            </span>
          </Parallax>
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Featured Projects" subtitle="Filter by Robotics · AI · CS" />

              {/* Category filter */}
              <div className="flex justify-center flex-wrap gap-2 mb-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-1.5 opacity-70">
                        {category === "ROS"
                          ? projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes("ros"))).length
                          : projects.filter((p) => p.category === category).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <TiltCard className="h-full">
                      <Card className="h-full flex flex-col overflow-hidden group hover:border-primary/30 transition-colors hover:shadow-xl hover:shadow-primary/5">
                        {project.video ? (
                          <div
                            className="aspect-video relative overflow-hidden bg-muted cursor-pointer"
                            onClick={() => setSelectedVideo(project.video!)}
                          >
                            <video
                              src={project.video}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              muted
                              loop
                              playsInline
                              key={project.video}
                              onMouseEnter={(e) => {
                                const playPromise = e.currentTarget.play()
                                if (playPromise !== undefined) {
                                  playPromise.catch(() => {})
                                }
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause()
                                e.currentTarget.currentTime = 0
                              }}
                            />
                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                              <p className="text-[10px] text-white flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" /> Hover to preview
                              </p>
                              <p className="text-[10px] text-white flex items-center gap-1">
                                <Play className="h-3 w-3 fill-white" /> Click to play
                              </p>
                            </div>
                          </div>
                        ) : project.image ? (
                          <div className="aspect-video relative overflow-hidden bg-muted">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="h-1 bg-primary/20" />
                        )}
                        <CardHeader className={project.video || project.image ? "p-4" : ""}>
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <CardTitle className="text-lg truncate">{project.title}</CardTitle>
                              {project.stars && (
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-[10px] flex items-center gap-1 shrink-0"
                                >
                                  <Star className="h-3 w-3 fill-yellow-600" />
                                  {project.stars}
                                </Badge>
                              )}
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-[10px] shrink-0 ${categoryStyles[project.category] ?? ""}`}
                            >
                              {project.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant={project.status === "In Progress" ? "default" : "secondary"}
                              className={`${
                                project.status === "In Progress"
                                  ? "bg-amber-100/80 text-amber-800 hover:bg-amber-100"
                                  : "bg-green-100/80 text-green-800 hover:bg-green-100"
                              } border-0 text-[10px]`}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <CardDescription>{project.description}</CardDescription>
                          <div className="flex gap-2 mt-2">
                            {project.github && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => window.open(project.github, "_blank")}
                              >
                                <Github className="h-3 w-3 mr-1" />
                                GitHub
                              </Button>
                            )}
                            {project.youtube && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs border-red-500/20 text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-500/10"
                                onClick={() => window.open(project.youtube, "_blank")}
                              >
                                <Youtube className="h-3.5 w-3.5 mr-1" />
                                YouTube
                              </Button>
                            )}
                            {!project.github && !project.youtube && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => alert("This project is not public yet.")}
                              >
                                <Lock className="h-3 w-3 mr-1" />
                                Private
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-[10px]">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      </TiltCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* App Development (secondary / freelance) */}
        <section className="border-t" id="apps">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="App Development" subtitle="A hobby I ship" />

              {/* Founder banner */}
              <div className="mb-12 grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Founder
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    viewport={{ once: true }}
                    className="mt-4 font-serif text-4xl md:text-6xl leading-[0.95] tracking-tight"
                  >
                    BGO&nbsp;Apps
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.12 }}
                    viewport={{ once: true }}
                    className="mt-4 max-w-xl text-muted-foreground leading-relaxed"
                  >
                    My own mobile studio — a hobby I keep coming back to. I design and ship polished cross-platform
                    apps, pairing Flutter front-ends with AI &amp; real-time backends.
                  </motion.p>
                  <div className="mt-6">
                    <Magnetic>
                      <Button
                        className="font-sans rounded-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-11 px-7 font-semibold shadow-md"
                        asChild
                      >
                        <a href="https://bgoapps.90xdev.dev/" target="_blank" rel="noopener noreferrer">
                          Visit BGO Apps <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </Magnetic>
                  </div>
                </div>

                {/* stat block */}
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border">
                  {[
                    { n: "4+", l: "Apps Shipped" },
                    { n: "100%", l: "Flutter" },
                    { n: "AI", l: "Powered" },
                    { n: "∞", l: "For the Craft" },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-col items-center justify-center gap-1 bg-card px-4 py-8">
                      <span className="font-serif text-4xl md:text-5xl leading-none text-primary">{s.n}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {s.l}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {apps.map((app, i) => (
                  <motion.a
                    key={app.name}
                    href="https://bgoapps.90xdev.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
                  >
                    {/* app art */}
                    <div className="relative aspect-[9/16] overflow-hidden bg-neutral-950">
                      {app.kind === "promo" ? (
                        <img
                          src={app.image}
                          alt={`${app.name} preview`}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        // raw screenshot → seat it in a floating phone frame on a soft gradient
                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-transparent px-5 pt-6">
                          <img
                            src={app.image}
                            alt={`${app.name} preview`}
                            className="w-[78%] rounded-t-[1.4rem] border border-b-0 border-black/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1.5"
                          />
                        </div>
                      )}
                      {/* name overlay */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="font-semibold text-white drop-shadow">{app.name}</span>
                        <ArrowUpRight className="h-4 w-4 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                    {/* meta */}
                    <div className="flex flex-1 flex-col p-4">
                      <p className="flex-grow text-sm text-muted-foreground leading-snug">{app.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {app.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="border-t bg-muted/40" id="oss">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Open Source Contributions" subtitle="Giving back to the ecosystem" />
              <div className="grid md:grid-cols-2 gap-6">
                {ossContributions.map((contribution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      className="h-full border-primary/10 hover:border-primary/30 transition-colors shadow-sm cursor-pointer"
                      onClick={() => window.open(contribution.url, "_blank")}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Github className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-xl">{contribution.project}</CardTitle>
                          </div>
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                            <Star className="h-3 w-3 mr-1 fill-yellow-600" />
                            {contribution.stars}
                          </Badge>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {contribution.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                            {contribution.impact}
                          </Badge>
                          <span className="flex items-center gap-1 ml-auto text-muted-foreground group">
                            View on GitHub <ExternalLink className="h-3 w-3" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Publications Section */}
        <section className="border-t" id="publications">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Publications" subtitle="Research & preprints" />
              <div className="space-y-4 max-w-3xl mx-auto">
                {publications.map((pub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className="border-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => window.open(pub.url, "_blank")}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base leading-snug">{pub.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {pub.authors} · {pub.venue} · {pub.date}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <ExternalLink className="h-3 w-3" />
                          <span>DOI: {pub.doi}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* GitHub Activity Section */}
        <section className="border-t bg-muted/40">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="GitHub Activity" subtitle="Open source by the numbers" />
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>GitHub Statistics</CardTitle>
                    <CardDescription>My open source contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Total Stars</p>
                        <p className="font-serif text-5xl md:text-6xl leading-none text-primary">
                          <CountUp end={64} />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Repositories</p>
                        <p className="font-serif text-5xl md:text-6xl leading-none text-primary">
                          <CountUp end={37} />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Total Commits</p>
                        <p className="font-serif text-5xl md:text-6xl leading-none text-primary">
                          <CountUp end={1241} />
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Pull Requests</p>
                        <p className="font-serif text-5xl md:text-6xl leading-none text-primary">
                          <CountUp end={12} />
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Current Focus</CardTitle>
                    <CardDescription>What I'm working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Active Project</Badge>
                          <h3 className="font-semibold">GNX CLI</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          The Next-Gen AI Agent. Unlike normal agents, it goes beyond text and can control your Desktop
                          &amp; Android.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Python</Badge>
                        <Badge variant="secondary">AI</Badge>
                        <Badge variant="secondary">CLI</Badge>
                        <Badge variant="secondary">Automation</Badge>
                        <Badge variant="secondary">Desktop Control</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="p-6">
                <div className="flex justify-center overflow-x-auto">
                  <GitHubCalendar
                    username="gokul6350"
                    colorScheme={isDark ? "dark" : "light"}
                    theme={{
                      light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                      dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                    }}
                    labels={{
                      totalCount: "{{count}} contributions in the last year",
                    }}
                    blockSize={12}
                    blockMargin={4}
                  />
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t" id="contact">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-serif text-5xl md:text-7xl mb-4 tracking-tight">
                <RevealText text="Get in Touch" />
              </h2>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out for collaborations or just a friendly hello
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button asChild>
                  <a href="mailto:gokul00060@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://discord.com/users/gokul9638" target="_blank" rel="noopener noreferrer">
                    Discord
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="border-primary/20 hover:border-primary/50" asChild>
                  <a href="/resume/14-3-26/resume_allinone_gokulbarath.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-center font-mono text-xs text-muted-foreground">
              © 2026 gokulbarath — built with Next.js &amp; Tailwind CSS
            </p>
          </div>
        </footer>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative max-w-6xl w-full bg-background rounded-2xl overflow-hidden shadow-2xl border"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all sm:h-10 sm:w-10 h-8 w-8 shadow-lg"
                    onClick={() => setSelectedVideo(null)}
                  >
                    <X className="sm:h-6 sm:w-6 h-5 w-5" />
                  </Button>
                </div>
                <div className="bg-black flex items-center justify-center">
                  <video
                    src={selectedVideo}
                    className="w-full h-auto max-h-[85vh] shadow-2xl"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  )
}
