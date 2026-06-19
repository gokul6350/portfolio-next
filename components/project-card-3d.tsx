'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ProjectCard3DProps {
  title: string;
  description: string;
  tags: string[];
  status: string;
  github?: string;
  youtube?: string;
  image?: string;
  video?: string;
  stars?: number;
}

export function ProjectCard3D({
  title,
  description,
  tags,
  status,
  github,
  youtube,
  image,
  video,
  stars,
}: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x: x * 20, y: y * 20 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <motion.div
        animate={
          isHovered ? { rotateX: mousePosition.y, rotateY: mousePosition.x } : { rotateX: 0, rotateY: 0 }
        }
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        className="h-full"
      >
        <div className="glass rounded-2xl overflow-hidden h-full flex flex-col group">
          {/* Image/Video Section */}
          {(image || video) && (
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <motion.div
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
                {video && !image && (
                  <video
                    src={video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                  />
                )}
              </motion.div>

              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                className="absolute top-3 right-3"
              >
                <Badge
                  variant="outline"
                  className={`${
                    status === 'In Progress'
                      ? 'bg-orange-500/20 text-orange-200 border-orange-500/30'
                      : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30'
                  }`}
                >
                  {status}
                </Badge>
              </motion.div>
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            {/* Stars */}
            {stars && (
              <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                className="flex items-center gap-1 mb-2"
              >
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {stars}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h3
              animate={isHovered ? { color: '#c084fc' } : { color: '#f2f4f8' }}
              className="text-lg font-bold mb-2 line-clamp-2"
            >
              {title}
            </motion.h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map((tag, idx) => (
                <motion.div
                  key={idx}
                  animate={isHovered ? { y: -2 } : { y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Badge variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>

            {/* Links */}
            <motion.div
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 5, opacity: 0 }}
              className="flex gap-2"
            >
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-medium flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-primary/50 transition-shadow"
                  >
                    <Github className="w-3 h-3" />
                    Code
                  </motion.button>
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-3 py-2 rounded-lg border border-accent/50 text-accent text-xs font-medium flex items-center justify-center gap-1 hover:bg-accent/10 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Demo
                  </motion.button>
                </a>
              )}
              {!github && !youtube && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 rounded-lg border border-primary/30 text-primary text-xs font-medium flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Details
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
