'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, useScroll } from 'framer-motion';
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
  Sparkles,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import { ProjectCard3D } from '@/components/project-card-3d';
import { AnimatedBackground } from '@/components/animated-background';

const GitHubCalendar = dynamic(() => import('react-github-calendar'), { ssr: false });

function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 18 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function FloatingElement({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4 + delay * 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
}

export function PortfolioPage() {
  const [isDark, setIsDark] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  const techStack = {
    Languages: ['Python', 'C/C++', 'JavaScript', 'TypeScript', 'Bash'],
    Robotics: ['ROS2 (Humble)', 'ROS Noetic', 'MoveIt', 'RViz', 'Gazebo', 'URDF/Xacro', 'tf2', 'Arduino', 'ESP32', 'micro-ROS', '6-DOF & SCARA', 'Inverse Kinematics'],
    'AI & ML': ['LLMs', 'Agentic Workflows', 'PyTorch', 'TensorFlow', 'OpenCV', 'Reinforcement Learning', 'ONNX Runtime', 'Apple MLX', 'MCP', 'NLP', 'Deep Learning', 'Diffusion Models'],
    'Web & Tools': ['Next.js', 'React.js', 'FastAPI', 'Flask', 'Three.js', 'Tailwind CSS', 'Docker', 'Git', 'Gradio', 'Streamlit', 'SQL'],
  };

  const projects = [
    {
      title: 'Real-Time Robotic Arm Control',
      category: 'Robotics',
      description: 'End-to-end ROS2 control pipeline driving a physical robotic arm in real time using MoveIt for motion planning.',
      tags: ['ROS2', 'MoveIt', 'RViz', 'Arduino', 'C++', 'Python'],
      status: 'Completed',
      youtube: 'https://www.youtube.com/shorts/bANZ1SsLCBI',
      image: 'https://img.youtube.com/vi/bANZ1SsLCBI/0.jpg',
    },
    {
      title: 'GNX-CLI',
      category: 'AI',
      description: 'Next-Gen AI Agent that goes beyond text and can autonomously control your Desktop & Android.',
      tags: ['Python', 'Groq', 'LLMs', 'CLI', 'Automation', 'Agentic'],
      status: 'In Progress',
      stars: 4,
      video: 'https://github.com/user-attachments/assets/bec3e8a0-30ce-4096-829c-8e6ca0fb33cd',
      github: 'https://github.com/gokul6350/GNX-CLI',
    },
    {
      title: 'EduVid-LLM',
      category: 'AI',
      description: 'Planning-centric architecture for automated educational video generation using LLMs.',
      tags: ['Python', 'LLM', 'Planning', 'Video Generation', 'AI', 'Education'],
      status: 'Completed',
      stars: 4,
      video: 'https://github.com/user-attachments/assets/9c2cba07-9997-4bce-9d6f-346b88fc006e',
      github: 'https://github.com/gokul6350/EduVid-LLM',
    },
    {
      title: 'Robotics Arm Assistance',
      category: 'Robotics',
      description: 'Vision-guided 6-DOF robotic arm for autonomous pick-and-place with OpenCV and LLM planning.',
      tags: ['ROS2', 'OpenCV', 'Python', 'Arduino', 'LLMs', 'Robotics'],
      status: 'Completed',
      stars: 13,
      image: 'https://img.youtube.com/vi/qv3bFhHoA5s/0.jpg',
      github: 'https://github.com/gokul6350/ARMv6',
      youtube: 'https://youtu.be/qv3bFhHoA5s',
    },
    {
      title: 'Deep Shell',
      category: 'AI',
      description: 'Intelligent terminal using NLP to interpret and execute shell commands via conversational AI.',
      tags: ['Python', 'TypeScript', 'NLP', 'CLI', 'Shell', 'AI'],
      status: 'Completed',
      stars: 27,
      image: 'https://github.com/gokul6350/dsh-shell/blob/main/screen_shots/Screenshot%202025-01-11%20010517.png?raw=true',
      github: 'https://github.com/gokul6350/dsh-shell',
    },
    {
      title: 'SCARA Servo Control',
      category: 'Robotics',
      description: 'ROS2 package mapping RViz commands to Arduino servo actuation on a SCARA manipulator.',
      tags: ['ROS2', 'RViz', 'Arduino', 'URDF', 'robot_state_publisher'],
      status: 'Completed',
      youtube: 'https://www.youtube.com/shorts/nRsmUxpuqEE',
      image: 'https://img.youtube.com/vi/nRsmUxpuqEE/0.jpg',
    },
    {
      title: 'Custom Three.js URDF Visualizer',
      category: 'Robotics',
      description: 'Web-based 3D robot visualizer parsing URDF/Xacro and rendering via Three.js with real-time updates.',
      tags: ['Three.js', 'JavaScript', 'URDF', 'Web Visualization', 'Robotics'],
      status: 'Completed',
      youtube: 'https://www.youtube.com/shorts/n-YctSnH2c4',
      image: 'https://img.youtube.com/vi/n-YctSnH2c4/0.jpg',
    },
    {
      title: 'Portfolio-next',
      category: 'CS',
      description: 'Modern, responsive portfolio website with Next.js, 3D animations, and Tailwind CSS.',
      tags: ['Next.js', 'Tailwind CSS', 'Three.js', 'TypeScript'],
      status: 'In Progress',
      stars: 4,
      github: 'https://github.com/gokul6350/portfolio-next',
    },
  ];

  const categories = ['All', 'Robotics', 'AI', 'CS', 'ROS'];
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : selectedCategory === 'ROS'
      ? projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes('ros')))
      : projects.filter((p) => p.category === selectedCategory);

  const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        <h2 className="text-4xl md:text-5xl font-bold gradient-text">{title}</h2>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mx-auto mt-4 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </motion.div>
  );

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-background text-foreground">
        <AnimatedBackground />

        {/* Navigation */}
        <header className="border-b border-border/30 sticky top-0 z-50 glass">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Gokul</span>
            </motion.div>

            <motion.div className="hidden md:flex gap-8 items-center text-sm">
              {['Home', 'About', 'Projects', 'Contact'].map((item, idx) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Avatar */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                className="mb-8"
              >
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-primary/50 overflow-hidden animate-pulse-ring">
                  <img
                    src="https://avatars.githubusercontent.com/u/64578167?v=4"
                    alt="Gokul"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
              >
                Robotics & AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Building intelligent systems that bridge robotics, AI, and autonomous control
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-4 justify-center flex-wrap"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/50 transition-shadow"
                >
                  Explore Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg border border-primary/50 text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  Get in Touch
                </motion.a>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mt-16"
              >
                <ChevronDown className="w-6 h-6 mx-auto text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="about" className="relative py-24 border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading title="Tech Stack" subtitle="Technologies I work with" icon={Sparkles} />

            <Tabs defaultValue="Languages" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-secondary/50">
                {Object.keys(techStack).map((key) => (
                  <TabsTrigger key={key} value={key} className="glass">
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(techStack).map(([key, techs]) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                  >
                    {techs.map((tech, idx) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <div className="glass p-4 rounded-xl text-center hover:border-primary/50 transition-colors">
                          <Badge variant="secondary">{tech}</Badge>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative py-24 border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              title="Featured Projects"
              subtitle="Cutting-edge work in robotics, AI, and full-stack development"
              icon={Briefcase}
            />

            {/* Category Filter */}
            <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                      : 'glass hover:border-primary/50'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={`${project.title}-${selectedCategory}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.05 }}
                    layout
                  >
                    <ProjectCard3D {...project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative py-24 border-t border-border/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: 'Projects', value: 15, suffix: '+' },
                { label: 'Stars', value: 150, suffix: '+' },
                { label: 'Open Source', value: 5, suffix: '+' },
                { label: 'Years Exp.', value: 3, suffix: '+' },
              ].map((stat, idx) => (
                <TiltCard key={idx} className="glass p-8 rounded-2xl text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.2 }}
                  >
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-24 border-t border-border/30">
          <div className="max-w-4xl mx-auto px-4">
            <SectionHeading
              title="Let's Connect"
              subtitle="Reach out for collaborations or just a friendly hello"
              icon={Mail}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <motion.a
                      href="https://github.com/gokul6350"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      github.com/gokul6350
                    </motion.a>
                    <motion.a
                      href="mailto:gokulbarath6350@gmail.com"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      gokulbarath6350@gmail.com
                    </motion.a>
                    <motion.a
                      href="https://linkedin.com/in/gokulbarath"
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      linkedin.com/in/gokulbarath
                    </motion.a>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📍 Chennai, India</p>
                    <p>🎓 B.E. Mechatronics (Final Year)</p>
                    <p>🚀 Building AI & Robotics Systems</p>
                    <p>💬 Always open to collaborations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              © 2026 Gokulbarath. Crafted with passion and powered by Next.js, Three.js & Framer Motion.
            </motion.p>
          </div>
        </footer>
      </div>
    </div>
  );
}
