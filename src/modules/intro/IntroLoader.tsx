"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { introLogos } from "./introLogosData";
import { logMessage } from "@/src/utils/logger";

interface IntroLoaderProps {
  onDone: () => void;
}

/**
 * Full-screen intro loader: counts 0 -> 100 over ~1.6s, flashing base64 embedded tech stack logos,
 * then wipes upward to reveal the landing page.
 * Uses Base64 Data URIs to force all icons to load synchronously with the site payload.
 */
export function IntroLoader({ onDone }: IntroLoaderProps) {
  const [n, setN] = useState(0);
  const [logo, setLogo] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // Preload all Base64 images in browser memory immediately upon component mount
  useEffect(() => {
    logMessage("INTRO_LOADER", "useEffect", "INFO", `Starting intro animation preloader. Total logos: ${introLogos.length}`);
    
    introLogos.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    logMessage("INTRO_LOADER", "useEffect", "INFO", "All 14 tech stack logos preloaded synchronously via Base64 strings.");
  }, []);

  // Counter 0 -> 100 animation (1600ms duration)
  useEffect(() => {
    const start = performance.now();
    const duration = 1600; // 1.6 seconds
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * 100));

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        logMessage("INTRO_LOADER", "tick", "INFO", "Intro preloader reached 100%. Starting exit slide transition.");
        setTimeout(() => setLeaving(true), 250); // 250ms hold at 100%
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Flash through tech stack icons every 110ms
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => setLogo((i) => (i + 1) % introLogos.length), 110);
    return () => clearInterval(id);
  }, []);

  const current = introLogos[logo];

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) {
          logMessage("INTRO_LOADER", "onAnimationComplete", "INFO", "Intro exit animation completed. Triggering onDone callback.");
          onDone();
        }
      }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary text-primary-foreground"
    >
      {/* Flashing tech-stack logo on a white chip */}
      <div className="mb-8 flex h-24 flex-col items-center justify-center gap-3">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={logo}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.12 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-lg"
          >
            <img src={current.src} alt={current.label} className="h-full w-full object-contain" />
          </motion.div>
        </AnimatePresence>
        <motion.span
          key={`l-${logo}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
        >
          {current.label}
        </motion.span>
      </div>

      <span className="font-display tabular-nums leading-none" style={{ fontSize: "clamp(4rem,14vw,12rem)" }}>
        {n.toString().padStart(3, "0")}
      </span>
      <div className="mt-8 h-px w-40 overflow-hidden bg-primary-foreground/20">
        <motion.div className="h-full bg-primary-foreground" style={{ width: `${n}%` }} />
      </div>
    </motion.div>
  );
}
