/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroShowProps {
  onComplete: () => void;
}

export default function IntroShow({ onComplete }: IntroShowProps) {
  const [countdown, setCountdown] = useState(6);
  const [isHovered, setIsHovered] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  // Auto transition timer - visual countdown only, no automatic onComplete call
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Let the interactive buttons appear after line drawing finishes (around 2.5 seconds)
    const buttonDelay = setTimeout(() => {
      setAnimationFinished(true);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(buttonDelay);
    };
  }, []);

  // Global scroll/swipe down detector to transition to Hero
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        onComplete();
      }
    };

    let startTouchY = 0;
    const handleGlobalTouchStart = (e: TouchEvent) => {
      startTouchY = e.touches[0].clientY;
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      const currentTouchY = e.touches[0].clientY;
      const diffY = startTouchY - currentTouchY; // Positive = user swiped up (scrolling down to read more)
      if (diffY > 45) {
        onComplete();
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true });
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('touchstart', handleGlobalTouchStart);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [onComplete]);

  // Framer Motion variants for staggered elegant text reveals
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8
      }
    }
  };

  const titleItemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between items-center p-6 select-none overflow-hidden font-sans">
      
      {/* 1. Subtle, luxury atmospheric glow backdrops */}
      <div className="absolute inset-x-0 top-0 h-96 bg-[gradient(to_bottom,rgba(150,20,20,0.15),transparent)] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.04)_0%,transparent_60%)] pointer-events-none" />
      
      {/* Absolute top-right ultra-thin digital countdown indicator and skip trigger */}
      <div className="w-full max-w-7xl flex justify-between items-center z-20 pt-4 px-2 md:px-6">
        <div>
          {/* Top-left is now elegantly clean & empty as requested */}
        </div>
        
        <button 
          onClick={onComplete}
          className="group px-4 py-1.5 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-full flex items-center gap-2 transition duration-300 pointer-events-auto"
        >
          <span className="font-mono text-[9px] text-zinc-400 tracking-[0.2em]">
            {countdown > 0 ? `SKIP / 跳过 (${countdown}s)` : 'ENTER / 探索专场'}
          </span>
          <ArrowRight className="w-3 h-3 text-zinc-550 group-hover:text-stone-300 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* 2. CENTER STAGE: Precision, minimalist alignment pattern and Text */}
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center my-auto z-15 min-h-[400px]">
        
        {/* THE MINIMALIST LINE GROWING SYSTEM */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full max-w-[500px] h-96 opacity-60" viewBox="0 0 200 160" fill="none">
            {/* Horizontal symmetry datum line (Very light warm bronze - subtle guideline) */}
            <motion.line 
              x1="20" 
              y1="80" 
              x2="180" 
              y2="80" 
              stroke="#8c7853" 
              strokeWidth="0.4" 
              strokeDasharray="2, 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 2.0, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Pattern corner brackets (Craftsman draft guidelines in refined bronze) */}
            <motion.path 
              d="M 35,45 L 35,35 L 45,35" 
              stroke="#8c7853" 
              strokeWidth="0.5" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.0 }}
            />
            <motion.path 
              d="M 165,45 L 165,35 L 155,35" 
              stroke="#8c7853" 
              strokeWidth="0.5" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.0 }}
            />
            <motion.path 
              d="M 35,115 L 35,125 L 45,125" 
              stroke="#8c7853" 
              strokeWidth="0.5" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.0 }}
            />
            <motion.path 
              d="M 165,115 L 165,125 L 155,125" 
              stroke="#8c7853" 
              strokeWidth="0.5" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 1.0 }}
            />
          </svg>
        </div>

        {/* ELEGANT TYPOGRAPHY FLOAT-UP */}
        <motion.div 
          variants={titleContainerVariants}
          initial="hidden"
          animate="show"
          className="text-center space-y-6 z-10 px-4"
        >
          {/* Top category track */}
          <motion.div 
            variants={titleItemVariants}
            className="flex items-center justify-center gap-3.5"
          >
            <span className="text-[10px] font-mono tracking-[0.55em] text-zinc-550 uppercase">
              FENDI ESSENTIALS
            </span>
            <span className="w-1.5 h-[1px] bg-zinc-800" />
            <span className="text-[10px] font-mono tracking-[0.55em] text-[#d4af37] uppercase font-semibold">
              HAND IN HAND
            </span>
          </motion.div>

          {/* Major Title: FENDI */}
          <motion.h1 
            variants={titleItemVariants}
            className="font-serif text-5xl sm:text-7xl font-extralight tracking-[0.35em] pl-[0.35em] text-stone-100 uppercase"
          >
            FENDI
          </motion.h1>

          {/* Chinese poetic subtitle */}
          <motion.div 
            variants={titleItemVariants}
            className="space-y-4 py-2"
          >
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8c7853] to-transparent mx-auto" />
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-200 tracking-[0.3em] pl-[0.3em] font-light leading-relaxed">
              中国凉山非遗专场展
            </h2>
            <p className="font-serif text-[#d4af37]/90 text-xs sm:text-sm tracking-[0.4em] pl-[0.4em] uppercase font-light">
              彝韵匠心 • 当意式风华邂逅传承誓言
            </p>
          </motion.div>

          {/* Abstract runway specs summary */}
          <motion.p 
            variants={titleItemVariants}
            className="font-mono text-[9px] text-[#8c7853] uppercase tracking-[0.3em] max-w-md mx-auto leading-relaxed opacity-80"
          >
            Liangshan Mountain Altitude Spec // 15 Days Sewing // 350,000 Pure Silk Stitches
          </motion.p>
        </motion.div>
      </div>

      {/* 3. INTERACTIVE BUTTON & FOOTER DATA METERS */}
      <div className="w-full max-w-4xl flex flex-col items-center space-y-8 z-20 pb-8 px-4">
        
        {/* Elegant action button triggered when lines complete drafting */}
        <AnimatePresence>
          {animationFinished && (
            <div className="flex flex-col items-center gap-3.5">
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                onClick={onComplete}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-8 py-3.5 bg-neutral-950/90 hover:bg-neutral-900 border border-stone-800 hover:border-[#d4af37] rounded transition duration-500 text-stone-200 text-xs tracking-[0.25em] font-serif flex items-center gap-3 overflow-hidden"
              >
                {/* Sliding button shimmer reflection */}
                <div className="absolute inset-0 w-1/2 h-full bg-[#d4af37]/5 skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                <span>开启专场展 / ENTER THE SHOW</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                </motion.div>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="text-[9px] sm:text-[10px] font-mono text-zinc-500 tracking-[0.25em] pl-[0.25em] text-center uppercase"
              >
                SCROLL DOWN TO ENTER • 或向下滑动开启
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Architectural Bottom Track Details */}
        <div className="w-full max-w-7xl flex justify-between items-center border-t border-zinc-900/50 pt-4 text-[9px] font-mono text-zinc-500">
          <span>LAT 39.9° N / BEIJING DONGJINGYUAN</span>
          <span>CURATED BY FENDI & LIANGSHAN ARTISANS</span>
          <span>© 2026 COUTURE SHOW ALL RIGHTS RESERVED</span>
        </div>
      </div>

    </div>
  );
}
