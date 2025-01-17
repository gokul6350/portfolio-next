'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Github, Twitter, Linkedin, Mail, ChevronDown, Youtube, Instagram, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from 'next/dynamic'

const GitHubCalendar = dynamic(() => import('react-github-calendar'), { ssr: false })

export function PortfolioPage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // No controls.start needed here anymore
  }, [])

  const techStack = {
    'Languages': ['C/C++', 'Python', 'JavaScript'],
    'Frameworks': ['FastAPI', 'TensorFlow', 'Keras', 'NumPy', 'OpenCV','Flask'],
    'Hardware': ['Arduino', 'Raspberry Pi', 'Robotics', 'Sensors'],
    'Tools': ['Git', 'Docker', 'Linux', 'VS Code', 'Jupyter', 'Claude', 'Perplexity', 'Cursor', 'OpenInterpreter', 'o1 & gpt4.x']
  }

  const projects = [
    {
      title: "Robotics Arm Assistance",
      description: "An advanced robotics project utilizing computer vision and machine learning for precise arm control.",
      tags: ["Python", "OpenCV", "TensorFlow", "Arduino"],
      status: "In Progress"
    },
    {
      title: "ArduinoSerial2",
      description: "A Python library for seamless serial communication with Arduino boards, featuring auto-detection and multithreading support.",
      tags: ["Python", "Arduino", "Serial Communication", "PyPI"],
      status: "Completed"
    },
    {
      title: "Smart Home Automation",
      description: "IoT-based home automation system with voice control and machine learning capabilities.",
      tags: ["Python", "Raspberry Pi", "TensorFlow", "FastAPI"],
      status: "Completed"
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        {/* Announcement Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary/10 p-3 text-center text-sm"
        >
          <span className="animate-pulse">🤖</span>
          {' Currently working on '}
          <a href="#" className="text-primary font-medium hover:underline">Robotics Arm Assistance</a>
          {' '}
          <span className="animate-pulse">🤖</span>
        </motion.div>

        {/* Navigation */}
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
          <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <div className="flex gap-6">
              <a href="#" className="font-medium hover:text-primary">Home</a>
              <a href="#projects" className="text-muted-foreground hover:text-primary">Projects</a>
              <a href="#about" className="text-muted-foreground hover:text-primary">About</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary">Contact</a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
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
                Hi 👋, I'm <span className="text-primary">Gokul</span>
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
                <a href="#" target="_blank" rel="noopener noreferrer">
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
                      <p className="text-2xl font-bold">17</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Repositories</p>
                      <p className="text-2xl font-bold">29</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Commits</p>
                      <p className="text-2xl font-bold">201</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Pull Requests</p>
                      <p className="text-2xl font-bold">4</p>
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
                        <h3 className="font-semibold">Robotics Arm Assistance</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Developing an intelligent robotic arm system using computer vision and machine learning
                        for precise control and automation.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Computer Vision</Badge>
                      <Badge variant="secondary">Machine Learning</Badge>
                      <Badge variant="secondary">Robotics</Badge>
                      <Badge variant="secondary">Python</Badge>
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
                <div className="overflow-x-auto">
                  <GitHubCalendar 
                    username="gokul6350" 
                    theme={{
                      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                    }}
                    labels={{
                      totalCount: '{{count}} contributions in the last year'
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
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                    custom={index}
                  >
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">
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
              transition={{ duration: 0.5  }}
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
              © 2024 Gokul. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </footer>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </div>
  )
}