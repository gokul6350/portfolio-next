"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Moon,
  Sun,
  Github,
  Twitter,
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

} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"


const GitHubCalendar = dynamic(() => import("react-github-calendar"), { ssr: false })

export function PortfolioPage() {
  const [isDark, setIsDark] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)




  const techStack = {
    Languages: ["C/C++", "Python", "JavaScript", "Rust", "Java"],
    Frameworks: ["FastAPI", "TensorFlow", "Keras", "NumPy", "OpenCV", "Flask"],
    Hardware: ["Arduino", "Raspberry Pi", "Robotics", "Sensors"],
    Tools: [
      "Git",
      "Docker",
      "Linux",
      "VS Code",
      "Jupyter",
      "Claude",
      "Perplexity",
      "Cursor",
      "OpenInterpreter",
      "o1 & gpt4.x",
    ],
  }

  const projects = [
    {
      title: "GNX-CLI",
      description: "🤖 The Next-Gen AI Agent. Unlike normal agents, it goes beyond text and can control your Desktop & Android.",
      tags: ["Python", "AI", "CLI", "Automation", "Desktop Control", "Android Control"],
      status: "Completed",
      stars: 4,
      video: "https://github.com/user-attachments/assets/bec3e8a0-30ce-4096-829c-8e6ca0fb33cd",
      github: "https://github.com/gokul6350/GNX-CLI",
    },
    {
      title: "EduVid-LLM",
      description: "EduVid-LLM: A Planning-Centric Architecture for Automated Educational Video Generation.",
      tags: ["Python", "LLM", "Planning", "Video Generation", "AI", "Education"],
      status: "Completed",
      stars: 4,
      video: "https://github.com/user-attachments/assets/9c2cba07-9997-4bce-9d6f-346b88fc006e",
      github: "https://github.com/gokul6350/EduVid-LLM",
    },
    {
      title: "Deep shell",
      description: "A intelligent terminal application that combines a chat interface with a command-line interface, It helps users execute terminal commands through natural language conversations.",
      tags: ["Python", "CLI", "System Programming", "Shell", "Ai", "Software"],
      status: "Completed",
      stars: 27,
      image: "https://github.com/gokul6350/dsh-shell/blob/main/screen_shots/Screenshot%202025-01-11%20010517.png?raw=true",
      github: "https://github.com/gokul6350/dsh-shell",
    },
    {
      title: "Robotics Arm Assistance",
      description:
        "An advanced robotics project utilizing computer vision and LLms for precise arm control.",
      tags: ["Python", "OpenCV", "flask", "Arduino", "Robotics", "AI", "cobot "],
      status: "Completed",
      stars: 13,
      image: "https://img.youtube.com/vi/qv3bFhHoA5s/0.jpg",
      github: "https://github.com/gokul6350/ARMv6",
    },
    {
      title: "ROS2-Arduino Servo Control",
      description: "Controlling servos using ROS2 and Rviz with Arduino integration for precise robotic motion.",
      tags: ["ROS2", "Arduino", "Rviz", "Robotics", "C++", "Simulation"],
      status: "Completed",
      video: "/ros2-arduino-servo.mp4",
      github: "https://github.com/gokul6350/ros2-arduino-servo",
    },
    {
      title: "Interactive-2DOF-Arm-Sim",
      description: "An interactive simulation of a 2-degree-of-freedom robotic arm allowing users to control and visualize movements.",
      tags: ["Python", "Robotics", "Simulation", "Control Systems", "Physics"],
      status: "Completed",
      image: "https://github.com/gokul6350/Interactive-2DOF-Arm-Sim/blob/94a67eacf617863e3f9b1441c0295aca09967644/controls.png?raw=true",
      github: "https://github.com/gokul6350/Interactive-2DOF-Arm-Sim",
    },
    {
      title: "Portfolio-next",
      description: "A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "personal website"],
      status: "In Progress",
      stars: 4,
      github: "https://github.com/gokul6350/portfolio-next",
    },
    {
      title: "ArduinoSerial2",
      description:
        "A Python library for seamless serial communication with Arduino boards, featuring auto-detection and multithreading support.",
      tags: ["Python", "Arduino", "Serial Communication", "PyPI", "Python Package"],
      status: "Completed",
      stars: 3,
      github: "https://github.com/gokul6350/ArduinoSerial2",
    },
    {
      title: "Snake AI",
      description: "An AI-powered Snake game implementation using reinforcement learning and neural networks to train an agent to play the classic Snake game autonomously.",
      tags: ["Python", "PyTorch", "Reinforcement Learning", "Neural Networks", "AI", "Game Development"],
      status: "Completed",
      github: "https://github.com/gokul6350/SNAKE-AI",
    },
  ]

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        {/* Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary/10 p-3 text-center text-sm"
        >
          <span className="animate-pulse">🚀</span>
          {" Currently working on "}
          <a href="https://github.com/gokul6350/gnx-cli" className="text-primary font-medium hover:underline">
            gnx-cli
          </a>{" "}
          <span className="animate-pulse">🚀</span>
        </motion.div>

        {/* Navigation */}
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <div className="flex gap-6">
              <a href="#" className="font-medium hover:text-primary">
                Home
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary">
                Projects
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary">
                Contact
              </a>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-8">
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                src="https://avatars.githubusercontent.com/u/64578167?v=4"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/10"
              />
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl font-bold mb-4"
              >
                Hi 👋, I'm <span className="text-primary">Gokulbarath</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                A passionate Robotics, AI, and ML developer building the future of automation and intelligent systems.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
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


          </motion.div>
        </section>

        {/* GitHub Stats Section */}
        <section className="border-t bg-muted/40">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>GitHub Statistics</CardTitle>
                  <CardDescription>My open source contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Stars</p>
                      <p className="text-2xl font-bold">64</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Repositories</p>
                      <p className="text-2xl font-bold">36</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Commits</p>
                      <p className="text-2xl font-bold">1241</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Pull Requests</p>
                      <p className="text-2xl font-bold">12</p>
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
                        🤖 The Next-Gen AI Agent. Unlike normal agents, it goes beyond text and can control your Desktop & Android.
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
            </motion.div>
          </div>
        </section>

        {/* GitHub Contribution Graph */}
        <section className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">GitHub Contributions</h2>
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

        {/* Tech Stack Section */}
        <section className="border-t bg-muted/40" id="skills">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Technical Expertise</h2>
              <Tabs defaultValue="Languages" className="w-full">
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
                                staggerChildren: 0.07,
                              },
                            },
                          }}
                        >
                          {skills.map((skill, index) => (
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

        {/* Projects Section */}
        <section className="border-t" id="projects">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Featured Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <Card className="h-full flex flex-col overflow-hidden group">
                      {project.video ? (
                        <div
                          className="aspect-video relative overflow-hidden bg-muted cursor-pointer"
                          onClick={() => setSelectedVideo(project.video)}
                        >
                          <video
                            src={project.video}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            muted
                            loop
                            playsInline
                            key={project.video}
                            onMouseEnter={(e) => {
                              const playPromise = e.currentTarget.play();
                              if (playPromise !== undefined) {
                                playPromise.catch(() => {
                                  // Auto-play was prevented
                                });
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
                      <CardHeader className={(project.video || project.image) ? "p-4" : ""}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            {project.stars && (
                              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-[10px] flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-600" />
                                {project.stars}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={project.status === "In Progress" ? "default" : "secondary"}
                              className={`${project.status === "In Progress"
                                ? "bg-amber-100/80 text-amber-800 hover:bg-amber-100"
                                : "bg-green-100/80 text-green-800 hover:bg-green-100"
                                } border-0 text-[10px]`}
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                        <div className="flex gap-2 mt-2">
                          {project.github ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => window.open(project.github, "_blank")}
                            >
                              <Github className="h-3 w-3 mr-1" />
                              GitHub
                            </Button>
                          ) : (
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t bg-muted/40" id="contact">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out for collaborations or just a friendly hello
              </p>
              <div className="flex justify-center gap-4">
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
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 Gokul. Built with Next.js and Tailwind CSS.
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
          className="fixed bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>


      </div>
    </div>
  )
}

