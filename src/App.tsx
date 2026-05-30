/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HERO_DATA, 
  HIGHLIGHT_DATA, 
  POETRY_DATA, 
  CHRONICLE_DATA, 
  MASTERS_DATA, 
  EXPLORE_CARDS 
} from './data';
import { 
  ArrowDown, 
  Sparkles, 
  Check, 
  Bookmark, 
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';
import ScrollReveal from './components/ScrollReveal';
import CraftSection from './components/CraftSection';
import ImpactDashboard from './components/ImpactDashboard';
import Guestbook from './components/Guestbook';
import IntroShow from './components/IntroShow';
import CoutureGallery from './components/CoutureGallery';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isCopiedId, setIsCopiedId] = useState<string | null>(null);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  // Monitor scroll/wheel/touch interaction to return to Opening Intro on scrolling back up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Mark as scrolled down once they explore past 30px
      if (currentScrollY > 30) {
        setHasScrolledDown(true);
      }
      
      // If the scroll returns to absolute top, and we have fully explored lower first, display the intro again
      if (!showIntro && currentScrollY <= 1 && hasScrolledDown) {
        setShowIntro(true);
        setHasScrolledDown(false); // Reset tracker
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // If they are at the top and try to scroll up further, instantly show the intro animation
      if (!showIntro && window.scrollY <= 1 && e.deltaY < 0) {
        setShowIntro(true);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!showIntro && window.scrollY <= 2) {
        const touchEndY = e.touches[0].clientY;
        const diffY = touchEndY - touchStartY; // pull down
        if (diffY > 50) {
          setShowIntro(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [showIntro, hasScrolledDown]);

  // Simple clipboard mock for limited edition numbers
  const handleCopyCode = (id: string) => {
    setIsCopiedId(id);
    setTimeout(() => setIsCopiedId(null), 2500);
  };

  return (
    <div className="bg-[#030303] min-h-screen text-[#e5e5e5] font-sans antialiased selection:bg-red-900 selection:text-white scroll-smooth pb-16">
      
      {/* Elegant Fashion Show Opening Intro Screening overlay */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro-premiere-screen"
            initial={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: 'blur(12px)',
              transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <IntroShow onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ────────────────────────────────────────────────────────
          SLIDE 1: HERO COVER (TITLE, COUTURE ABSTRACT, BRANDING)
          ──────────────────────────────────────────────────────── */}
      <header className="relative min-h-screen flex items-center justify-center px-4 md:px-8 overflow-hidden bg-black">
        {/* Absolute luxury ambient lighting radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(140,120,80,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

        {/* Framing border box mimicking presentation cards */}
        <ScrollReveal className="w-full max-w-7xl min-h-[85vh] lg:min-h-[80vh] border border-stone-900/60 rounded p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          
          {/* Slide Top Branding Track */}
          <div className="flex justify-between items-center w-full z-10 pb-6 border-b border-stone-900/40">
            <div className="font-serif text-xs md:text-sm tracking-[0.4em] text-stone-300 font-light uppercase">
              FENDI <span className="font-sans font-extralight tracking-[0.2em] text-[10px] text-[#d4af37] uppercase">HAND IN HAND</span>
            </div>
            <div className="font-serif text-[10px] tracking-[0.25em] text-[#d4af37]/90 uppercase">
              中国凉山非遗专场展 // SLIDE 01
            </div>
          </div>

          {/* Grid Split Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto py-8 z-10">
            
            {/* Copywriting Left Column (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-[10px] font-mono tracking-[0.45em] text-zinc-550 uppercase block">
                {HERO_DATA.titleEn}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-[0.1em] font-light leading-tight">
                当意式风华 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-[#eedbb2] to-[#b3955d]">邂逅彝韵匠心</span>
              </h1>
              
              <div className="w-10 h-[1px] bg-[#d4af37]/35" />
              
              <p className="font-serif text-sm md:text-base tracking-[0.25em] text-[#d4af37] font-light">
                {HERO_DATA.subtitle}
              </p>
 
               <div className="space-y-4 pt-4 border-t border-stone-900/60">
                <p className="text-[#eedbb2] font-serif text-xs tracking-[0.25em] uppercase font-light">
                  {HERO_DATA.introTitle}
                </p>
                {HERO_DATA.introParagraphs.map((para, idx) => (
                  <p key={idx} className="text-stone-300 font-serif text-xs sm:text-sm tracking-[0.12em] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Baguette Premium Photo Display Right Column (5 cols) */}
            <div className="lg:col-span-12 xl:col-span-5 flex items-center justify-center relative">
              <div className="w-full max-w-[380px] aspect-[4/3] relative group overflow-hidden border border-stone-900 rounded shadow-2xl">
                <img 
                  src="/src/assets/images/fendi_bag_sc1_1780107746711.png" 
                  alt="Fendi Baguette Yi Embroidery Bag" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] opacity-80"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                {/* Float technical label with soft glowing pulse */}
                <div className="absolute bottom-3 left-4 right-4 font-mono text-[9px] text-[#d4af37] uppercase tracking-[0.2em] flex items-center justify-between bg-black/95 px-3 py-2 rounded border border-stone-900/80 backdrop-blur-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-pulse" />
                    COUTURE EXCLUSIVE: BAGUETTE
                  </div>
                  <span className="text-[10px] text-zinc-500">EXHIBITION 01</span>
                </div>
              </div>
            </div>
 
           </div>
 
           {/* Slide Footer */}
          <div className="flex justify-between items-center w-full z-10 pt-4 border-t border-stone-900/40 text-[9px] font-mono text-[#8c7853]">
            <span>SCROLL DOWN TO ENTER THE EXHIBITION // 向下滑动进入专场</span>
            <span>2026 COUTURE SHOWROOM</span>
          </div>
 
        </ScrollReveal>
      </header>


      {/* MAIN STORYTELLING CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* ────────────────────────────────────────────────────────
            SLIDE 2: ONE STITCH ONE HAMMER (THE COUTURE PIECE SUMMARY)
            ──────────────────────────────────────────────────────── */}
        <section id="section-finest" className="py-12">
          <ScrollReveal>
            <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl min-h-[80vh] flex flex-col justify-between">
              
              {/* Back ambient glows */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-950/15 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-900/20 rounded-full blur-[100px] pointer-events-none" />

              {/* Upper Section Header: Centered exactly like reference sketch */}
              <div className="text-center max-w-3xl mx-auto mb-10 pb-6 border-b border-zinc-900/60 w-full relative z-10">
                <span className="px-2.5 py-1 bg-stone-900/40 border border-stone-800 text-stone-400 text-[10px] font-mono rounded font-bold uppercase tracking-widest mb-3 inline-block">
                  LIMITED EDITION COUTURE • SLIDE 02
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-zinc-100 tracking-wider font-light flex flex-wrap items-center justify-center gap-x-2 mt-1">
                  <span>一针一锤</span>
                  <span className="text-zinc-600 font-sans font-light text-2xl md:text-3xl mx-1">•</span>
                  <span className="text-[#eedbb2] font-serif font-bold text-4xl md:text-5xl lg:text-6xl tracking-normal">18.8万</span>
                  <span>的匠心孤品</span>
                </h2>
              </div>

              {/* Split elements: Left & Right Column matching the layout in image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-stretch my-auto relative z-10">
                
                {/* Left panel: Stitch craft */}
                <div className="bg-transparent rounded-2xl p-2 transition duration-500 group flex flex-col justify-between relative">
                  <div>
                    {/* Big high quality and clear image of Embroidery to let users place images stably */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-zinc-800/80 group-hover:border-stone-700/60 transition duration-700 shadow-2xl">
                      <img 
                        src="/src/assets/images/taohuaxiu_sc7_1780107849392.png" 
                        alt="彝绣非遗针法细节" 
                        className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl tracking-wider text-stone-100 mb-4 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse" />
                      {HIGHLIGHT_DATA.embroidery.title}
                    </h3>

                    {/* Multiline clean aligned text exactly like the drawing detail */}
                    <div className="space-y-3 text-zinc-300 font-serif text-xs sm:text-sm tracking-wide leading-relaxed pl-3.5 border-l-2 border-stone-800">
                      <p className="text-[#eedbb2]/95 font-mono text-[11px] font-bold uppercase tracking-widest">
                        0.1mm丝线层叠绣制
                      </p>
                      <p>以针为笔，绣出彝族千年纹样的生命力</p>
                      <p>图腾、花卉、云雷，每一针皆有寓意</p>
                      <p>为包体注入独一无二的东方灵魂</p>
                    </div>
                  </div>
                </div>

                {/* Right panel: Silver craft */}
                <div className="bg-transparent rounded-2xl p-2 transition duration-500 group flex flex-col justify-between relative">
                  <div>
                    {/* Big high quality and clear image of Silver craft stably aligned */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 border border-zinc-800/80 group-hover:border-stone-700/60 transition duration-700 shadow-2xl">
                      <img 
                        src="/src/assets/images/silver_forge_sc7_1780107867151.png" 
                        alt="手工银饰锻造细节" 
                        className="w-full h-full object-cover opacity-95 group-hover:scale-102 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl tracking-wider text-stone-100 mb-4 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse" />
                      {HIGHLIGHT_DATA.silver.title}
                    </h3>

                    {/* Multiline clean aligned text exactly like the drawing detail */}
                    <div className="space-y-3 text-zinc-300 font-serif text-xs sm:text-sm tracking-wide leading-relaxed pl-3.5 border-l-2 border-stone-800">
                      <p className="text-[#eedbb2]/95 font-mono text-[11px] font-bold uppercase tracking-widest">
                        999足银手工锤打
                      </p>
                      <p>千次捶击，形成自然肌理与温润光泽</p>
                      <p>流苏、银珠、云纹牌扣，每一处皆可传承</p>
                      <p>以锤为骨，锻造包体的贵重与力量</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Lower Section footer */}
              <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-12 w-full text-[10px] font-mono text-zinc-500">
                <span>PROJECT: FENDI BAGUETTE LAB</span>
                <span>AUTHENTICITY GUARANTEED • 100% HANDMADE</span>
              </div>

            </div>
          </ScrollReveal>
        </section>


        {/* ────────────────────────────────────────────────────────
            SLIDE 3: POETRY OF MOUNTAINS (THE STITCH METRICS)
            ──────────────────────────────────────────────────────── */}
        <section id="section-poetry" className="py-12">
          <ScrollReveal>
            <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl min-h-[85vh] flex flex-col justify-between">
              
              {/* Radial gradient background blur */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-teal-950/10 rounded-full blur-[110px] pointer-events-none" />

              {/* Slide header */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-6 mb-8 w-full">
                <div>
                  <span className="px-2 py-0.5 bg-teal-950/60 border border-teal-900/30 text-teal-400 text-[10px] font-mono rounded tracking-wider uppercase inline-block mb-3">
                    CRAFT VISUAL SPECS • SLIDE 03
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-200 tracking-wider font-semibold">
                    2. {POETRY_DATA.title}
                  </h2>
                </div>
                <div className="font-mono text-zinc-400 text-xs hidden lg:block uppercase tracking-widest">
                  Mountain-Thread Ecology Map
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
                
                {/* Left side: Visual indicators & massive numeric stats */}
                <div className="lg:col-span-5 bg-black rounded-2xl border border-zinc-900/80 p-6 flex flex-col justify-between h-full min-h-[410px] relative overflow-hidden group">
                  
                  {/* Real luxury high fashion bag closeup on velvet - High clarity (opacity 85) */}
                  <img 
                    src="/src/assets/images/fendi_bag_sc3_1780107780327.png" 
                    alt="Fendi Baguette on fine velvet" 
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-[1500ms] pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gentle gradient that keeps texture extremely bright but text contrast high */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/60 to-black/20 pointer-events-none" />
                  
                  {/* Top category label with frosted glass backdrop for perfect contrast */}
                  <div className="relative z-10 bg-black/60 backdrop-blur-[4px] p-3 rounded-xl border border-zinc-800/40">
                    <h3 className="font-serif text-sm sm:text-base text-teal-300 font-bold mb-1 tracking-wider">
                      高定刺绣规格参数
                    </h3>
                    <p className="text-[9px] text-zinc-300 font-mono uppercase tracking-widest">
                      Baguette Stitch Assessment
                    </p>
                  </div>
                  
                  {/* Highlight statistics metrics - CLEAR TEXT contrast on translucent smokey background */}
                  <div className="space-y-5 my-auto relative z-10 bg-black/75 backdrop-blur-[6px] p-5 rounded-xl border border-zinc-800/50 mt-4 shadow-xl">
                    <div>
                      <span className="text-zinc-300 font-sans text-xs uppercase tracking-wider block">手工打磨耗时 / HOURS DURATION</span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-3xl sm:text-4xl font-serif text-[#eedbb2] font-extrabold tracking-tight">
                          {POETRY_DATA.highlightHour}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase ml-1">15+ Days Continuous</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-zinc-800/60 pt-4">
                      <span className="text-zinc-300 font-sans text-xs uppercase tracking-wider block">整幅丝绣针数 / TOTAL STITCHES</span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-3xl sm:text-4xl font-serif text-stone-100 font-extrabold tracking-tight">
                          {POETRY_DATA.highlightStitch}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase ml-1">350,000+ Loops</span>
                      </div>
                    </div>
                  </div>

                  {/* Indicator bottom message - with a glass layer for 100% clarity */}
                  <div className="text-[11px] text-zinc-100 font-mono border-t border-zinc-800/50 pt-3 mt-4 flex items-center gap-2 relative z-10 bg-black/60 backdrop-blur-[4px] px-3 py-2 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                    <span>通过35万针极细丝线微叠缝制，复刻大凉山之姿</span>
                  </div>
                </div>

                {/* Right side: Bullet lists showing full text matching slides layout */}
                <div className="lg:col-span-7 space-y-4">
                  {POETRY_DATA.points.map((pt, idx) => (
                    <div 
                      key={idx}
                      className="border border-zinc-900/80 rounded-xl p-5 bg-black/50 text-left transition hover:border-zinc-800"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-teal-950 text-teal-300 text-xs font-mono font-bold">
                          0{idx + 1}
                        </div>
                        <h4 className="text-sm sm:text-base font-serif font-bold tracking-wider text-teal-100">
                          {pt.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pl-9">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Slide footer */}
              <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-8 w-full text-[10px] font-mono text-zinc-500">
                <span>THEORETICAL ANALYSIS</span>
                <span>AUTHENTIC METRICS PRESERVED</span>
              </div>

            </div>
          </ScrollReveal>
        </section>


        {/* ────────────────────────────────────────────────────────
            SLIDE 4: CHRONICLES OF HERITAGE (GLOBAL STORY & BLUEPRINT)
            ──────────────────────────────────────────────────────── */}
        <section id="section-chronicle" className="py-12">
          <ScrollReveal>
            <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl min-h-[85vh] flex flex-col justify-between">
              
              {/* Backdrop ambient gold spotlight wrapper */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-950/5 rounded-full blur-[110px] pointer-events-none" />

              {/* Upper slider banner */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-6 mb-8 w-full">
                <div>
                  <span className="px-2.5 py-1 bg-stone-900/40 border border-stone-800 text-stone-400 text-[10px] font-mono rounded tracking-wider uppercase inline-block mb-3">
                    FENDI GLOBAL DESIGN STORY • SLIDE 04
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-200 tracking-wide font-semibold">
                    3. {CHRONICLE_DATA.title}
                  </h2>
                </div>
                <div className="font-mono text-zinc-500 text-xs hidden lg:block uppercase tracking-widest">
                  Mountain Wilderness Release
                </div>
              </div>

              {/* Content body split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
                
                {/* Left Column paragraphs (7 columns) */}
                <div className="lg:col-span-7 text-left space-y-6">
                  <div className="space-y-4 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {CHRONICLE_DATA.description.map((p, i) => (
                      <p key={i}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Highlighted text quote */}
                  <div className="border-l-2 border-stone-700 pl-4 py-1 italic text-zinc-500 text-xs font-serif">
                    “时尚并非追逐速成，而是一项横跨地域与民族的传承誓言。通过回归大凉山2800米峭壁绝顶，让大山瑰宝与自然交响，展现生命之力。”
                  </div>
                </div>

                {/* Right Column: Mountain Release Info & Real Photo */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-2xl bg-[#0a0a0c] border border-zinc-900 overflow-hidden min-h-[290px] group flex flex-col justify-between p-6">
                    {/* Real photo of release in Liangshan nature */}
                    <img 
                      src="/src/assets/images/fendi_bag_sc1_1780107746711.png" 
                      alt="Fendi Hand in Hand Exhibition at Liangshan Mountain Peak" 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1200ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                    
                    {/* Upper title details */}
                    <div className="z-10 flex justify-between items-center pb-2 border-b border-zinc-900/50">
                      <div className="font-mono text-[9px] text-[#eedbb2] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#eedbb2] rounded-full animate-pulse" />
                        EVENT PREVIEW: MOUNTAIN WILDERNESS CO-EXISTENCE
                      </div>
                      <span className="font-mono text-[8px] text-zinc-500">2800M ALTITUDE</span>
                    </div>

                    {/* Metadata indicators */}
                    <div className="z-10 mt-auto pt-6 border-t border-zinc-900/50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-serif font-bold text-stone-100">
                          {CHRONICLE_DATA.templeName} 首秀现场
                        </span>
                        <span className="text-[9px] text-[#eedbb2] font-mono uppercase tracking-wider">
                          NATURAL BACKDROP
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-350 mt-2 text-left font-sans leading-relaxed bg-black/50 p-2 rounded backdrop-blur-xs">
                        大凉山巨石与索玛野花相伴的手袋意境大片：黑色页岩绝壁间，黑金流苏联名手袋在长空风过中灵动回响，在蔚蓝高寒苍穹衬托下展现奢华风华。
                      </p>
                    </div>
                  </div>

                  {/* Elegant Explanation Callout answering why natural release was chosen */}
                  <div className="p-5 bg-stone-950/80 border border-zinc-850/80 rounded-2xl relative overflow-hidden text-left">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#eedbb2]" />
                    <h4 className="text-xs font-mono font-bold text-[#eedbb2] tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      为什么将发布会回归到「大凉山天然山岭」？
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      回归大自然的旷野，是一场关于寻找根源（Return to Source）的时空行旅。没有人工雕琢的舞台，而是以风声、苍山、浮云与数万年形成的巍峨页岩为大背景。Fendi极致高定的意式利落裁剪，与凉山粗粝的黑色山脊、古老热烈的火塘及绣娘指尖交织，形成最震撼、最具生命力的反差美感。在这里，自然万物即是最高级别的展厅。
                    </p>
                  </div>
                </div>

              </div>

              {/* Slide bottom tracker */}
              <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-8 w-full text-[10px] font-mono text-zinc-500">
                <span>MOUNTAINS ENVIRONMENT RECORD</span>
                <span>BLUEPRINT REF: LIANGSHAN-ALTITUDE-A2</span>
              </div>

            </div>
          </ScrollReveal>
        </section>


        {/* ────────────────────────────────────────────────────────
            SLIDE 5: MEET THE MASTERS - PART I: EMBROIDERY LEADER
            ──────────────────────────────────────────────────────── */}
        <section id="section-masters-i" className="py-12">
          <ScrollReveal>
            <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl min-h-[85vh] flex flex-col justify-between">
              
              {/* Soft red background radial decoration */}
              <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-red-950/15 rounded-full blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-6 mb-8 w-full">
                <div>
                  <span className="px-2.5 py-1 bg-stone-900/40 border border-stone-800 text-stone-400 text-[10px] font-mono rounded tracking-wider uppercase inline-block mb-3">
                    HUMAN BEHIND THE HERITAGE • PART I • SLIDE 05
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-200 tracking-wider font-semibold">
                    4. 匠人坚守 —— 山川彩虹绘于针尖
                  </h2>
                </div>
                <div className="font-mono text-zinc-500 text-xs hidden lg:block uppercase tracking-widest">
                  绣娘合作社领头人
                </div>
              </div>

              {/* Main content body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
                
                {/* Left side: Biography detail & accomplishments list */}
                <div className="lg:col-span-7 text-left space-y-6">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide text-zinc-100 italic">
                      阿西亚之莫
                    </h3>
                    <p className="text-xs text-[#eedbb2] font-mono uppercase tracking-widest mt-1.5 font-bold">
                      {MASTERS_DATA.masters[0].role}
                    </p>
                  </div>

                  {/* Large visual cards of statistics details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-black border border-zinc-900 rounded-xl flex flex-col justify-between text-center">
                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider block">习绣年龄 / STARTED AGE</span>
                      <span className="text-xl sm:text-2xl font-serif text-[#eedbb2] font-bold mt-1">10岁</span>
                    </div>
                    <div className="p-3 bg-black border border-zinc-900 rounded-xl flex flex-col justify-between text-center">
                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider block">培训绣娘 / COMMUNITY TRAINED</span>
                      <span className="text-xl sm:text-2xl font-serif text-[#eedbb2] font-bold mt-1">5300+</span>
                    </div>
                    <div className="p-3 bg-black border border-zinc-900 rounded-xl flex flex-col justify-between text-center">
                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider block">守护岁月 / CAREER SPAN</span>
                      <span className="text-xl sm:text-2xl font-serif text-[#eedbb2] font-bold mt-1">40余年</span>
                    </div>
                  </div>

                  {/* Achievement medal list */}
                  <div className="p-3 bg-stone-900/40 border border-stone-800 text-stone-300 rounded-xl text-xs font-sans font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-400 flex-shrink-0 animate-pulse" />
                    <span>荣誉认可：生于凉山甘洛县，凉山刺绣技术培训非遗第一档代表、乡村创收领航者</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                    {MASTERS_DATA.masters[0].bio}
                  </p>
                </div>

                {/* Right side: Real Master Portrait Backdrop Card (5 columns) */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full max-w-[290px] aspect-[4/5] bg-[#0c0c0e] rounded-xl border border-zinc-900 flex flex-col justify-between p-5 relative overflow-hidden group shadow-xl">
                    <img 
                      src="/src/assets/images/axiya_sc5_1780107819311.png" 
                      alt="Portrait of Artisan A'XiYa ZhiMo" 
                      className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[1200ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

                    <div className="flex justify-between items-start z-10">
                      <span className="px-2 py-0.5 bg-stone-900/90 border border-stone-800 text-stone-300 font-mono text-[9px] font-bold rounded">
                        MASTER PROFILE
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono bg-black/60 px-1.5 py-0.5 rounded">
                        SLIDE 05
                      </span>
                    </div>

                    <div className="z-10 border-t border-zinc-800/60 pt-3 text-left backdrop-blur-[2px]">
                      <p className="text-[12px] text-[#f5f5f5] font-serif font-bold tracking-wider uppercase mb-0.5">
                        阿西亚之莫传承 • 索玛盛放
                      </p>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        “一针一线即是祖辈传下来的生命”
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Slide bottom banner */}
              <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-8 w-full text-[10px] font-mono text-zinc-500">
                <span>PORTRAIT REF: MASTER_ASIYA_MOR</span>
                <span>甘洛乡村合作社 • DIRECT PARTNER</span>
              </div>

            </div>
          </ScrollReveal>
        </section>


        {/* ────────────────────────────────────────────────────────
            SLIDE 6: MEET THE MASTERS - PART II: SILVER MASTER
            ──────────────────────────────────────────────────────── */}
        <section id="section-masters-ii" className="py-12">
          <ScrollReveal>
            <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl min-h-[85vh] flex flex-col justify-between">
              
              {/* Ambient silver spot wrapping */}
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-6 mb-8 w-full">
                <div>
                  <span className="px-2.5 py-1 bg-stone-900/40 border border-stone-800 text-stone-400 text-[10px] font-mono rounded tracking-wider uppercase inline-block mb-3">
                    HUMAN BEHIND THE HERITAGE • PART II • SLIDE 06
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-200 tracking-wider font-semibold">
                    5. 匠人坚守 —— 锤击之声形于器宇
                  </h2>
                </div>
                <div className="font-mono text-zinc-500 text-xs hidden lg:block uppercase tracking-widest">
                  勒古第14代古法银匠
                </div>
              </div>

              {/* Alternating Layout: Silver Drawing on Left, Biography Content on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
                
                {/* Left Column: Real Silver Master Portrait Backdrop Card (5 columns) */}
                <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1">
                  <div className="w-full max-w-[290px] aspect-[4/5] bg-[#0c0c0e] rounded-xl border border-zinc-900 flex flex-col justify-between p-5 relative overflow-hidden group shadow-xl">
                    <img 
                      src="/src/assets/images/legusahari_sc6_1780107832663.png" 
                      alt="Portrait of Master LeGu ShaRi" 
                      className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[1200ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

                    <div className="flex justify-between items-start z-10">
                      <span className="px-2 py-0.5 bg-stone-900/90 border border-stone-800 text-stone-300 font-mono text-[9px] font-bold rounded">
                        MASTER PROFILE
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono bg-black/60 px-1.5 py-0.5 rounded">
                        SLIDE 06
                      </span>
                    </div>

                    <div className="z-10 border-t border-zinc-800/60 pt-3 text-left backdrop-blur-[2px]">
                      <p className="text-[12px] text-[#f5f5f5] font-serif font-bold tracking-wider uppercase mb-0.5">
                        勒古家族 • 深山古法金银匠
                      </p>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        “勒古金银雕錾第14代传人，锤击心声，凝练银骨。”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Biography Content (7 columns) - Order 1 on mobile, 2 on desktop */}
                <div className="lg:col-span-7 text-left space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide text-zinc-100 italic">
                      勒古沙日
                    </h3>
                    <p className="text-xs text-[#eedbb2] font-mono uppercase tracking-widest mt-1.5 font-bold">
                      {MASTERS_DATA.masters[1].role}
                    </p>
                  </div>

                  {/* Quantitative measurements badges */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-black border border-zinc-900 rounded-xl flex flex-col justify-between text-center">
                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider block">家学传承 / FAMILY HEIRLOOMS</span>
                      <span className="text-xl sm:text-2xl font-serif text-[#eedbb2] font-bold mt-1">14代</span>
                    </div>
                    <div className="p-3 bg-black border border-zinc-900 rounded-xl flex flex-col justify-between text-center">
                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider block">大器珍藏 / MUSEUM COLLECTED</span>
                      <span className="text-xl sm:text-2xl font-serif text-zinc-300 font-bold mt-1">国家级</span>
                    </div>
                    <div className="p-3 bg-black border border-zinc-900 rounded-xl flex flex-col justify-between text-center">
                      <span className="text-[9px] text-zinc-550 font-mono uppercase tracking-wider block">熔炼火温 / RETORT TEMPERATURE</span>
                      <span className="text-xl sm:text-2xl font-serif text-[#eedbb2] font-bold mt-1">1000℃+</span>
                    </div>
                  </div>

                  {/* Silver plaque details */}
                  <div className="p-3 bg-zinc-900 border border-zinc-800 text-stone-200 rounded-xl text-xs font-sans font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-400 flex-shrink-0 animate-pulse" strokeWidth="2" />
                    <span>荣誉认可：来自大山深处的“工匠世家”布拖县，以锤为骨，其古法银饰锻制工艺被评为博物馆国家珍藏级精品</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                    {MASTERS_DATA.masters[1].bio}
                  </p>
                </div>

              </div>

              {/* Slide bottom tracking info */}
              <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-8 w-full text-[10px] font-mono text-zinc-500">
                <span>PORTRAIT REF: MASTER_LEGU_SHARI</span>
                <span>布拖古银锻造坊 • NATIONAL TREASURY PRESERVED</span>
              </div>

            </div>
          </ScrollReveal>
        </section>


        {/* ────────────────────────────────────────────────────────
            SLIDE 7: CRAFT ANATOMY (RENDER COMPONENT INTERACTIVE)
            ──────────────────────────────────────────────────────── */}
        <CraftSection />

        {/* ────────────────────────────────────────────────────────
            SLIDE 7.5: COUTURE PHOTO GALLERY (非遗影像大片与自然人文图志)
            ──────────────────────────────────────────────────────── */}
        <ScrollReveal id="section-gallery">
          <CoutureGallery />
        </ScrollReveal>


        {/* ────────────────────────────────────────────────────────
            SLIDE 8: PURCHASE & EXPLORATION (COUTURE ACQUISITION CARDS)
            ──────────────────────────────────────────────────────── */}
        <section id="section-explore" className="py-12">
          <ScrollReveal>
            <div className="bg-[#090909] border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl min-h-[80vh] flex flex-col justify-between">
              
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-950/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Upper headers */}
              <div className="flex items-center justify-between border-b border-zinc-900/60 pb-6 mb-8 w-full">
                <div>
                  <span className="px-2.5 py-1 bg-stone-900/40 border border-stone-800 text-stone-400 text-[10px] font-mono rounded font-bold uppercase tracking-widest mr-2 inline-block mb-3">
                    ACQUISITION & EXPLORATION • SLIDE 08
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl text-gray-200 tracking-wider font-semibold">
                    7. 购买方式 & 延伸探索
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mt-1">
                    不止于包，更是一次文化典藏
                  </p>
                </div>
                <div className="font-mono text-zinc-500 text-xs hidden lg:block uppercase tracking-widest">
                  Official Channels & Co-Creation
                </div>
              </div>

              {/* 3 cards grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch my-auto py-4">
                {EXPLORE_CARDS.map((card, i) => (
                  <div key={card.id} className="bg-neutral-950 border border-zinc-900/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-zinc-800 hover:bg-[#070707] transition duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-stone-900 to-transparent" />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2.5 border-b border-zinc-900/60">
                        <span className="font-mono text-[10px] text-zinc-650 font-bold">PART 0{i + 1}</span>
                        <h3 className="font-serif text-base tracking-wider text-amber-200 font-bold">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-sans text-orange-100/70">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-zinc-900/60">
                      <button 
                        onClick={() => handleCopyCode(card.id)}
                        className="text-xs text-[#eedbb2] hover:text-[#f8ecda] font-mono tracking-wide flex items-center gap-1.5 cursor-pointer hover:underline transition font-bold"
                      >
                        <span>{card.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {isCopiedId === card.id && (
                        <span className="text-[9px] text-green-500 block mt-2 font-mono animate-fadeIn font-semibold bg-green-950/20 px-2 py-1 rounded inline-block">
                          ✓ 温馨提示：文献申请编码已生成，可在艺术终端调阅
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Down border info */}
              <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-8 w-full text-[10px] font-mono text-zinc-500">
                <span>COLLECTION INDEX: 1/108 WORLDWIDE LIMITED</span>
                <span>FENDI VIP SERVICES APP</span>
              </div>

            </div>
          </ScrollReveal>
        </section>


        {/* ────────────────────────────────────────────────────────
            SLIDE 9: SOCIAL RESPONSIBILITY & IMPACT DASHBOARD (RENDERED SYSTEM)
            ──────────────────────────────────────────────────────── */}
        <ImpactDashboard />


        {/* ────────────────────────────────────────────────────────
            SLIDE 10: ECHO BOARD & COMMENT BOARD GUESTBOOK (RENDERED SYSTEM)
            ──────────────────────────────────────────────────────── */}
        <Guestbook />

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-zinc-950 bg-black text-center py-16 relative z-10 px-6">
        <ScrollReveal className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="text-left space-y-2">
            <div className="font-serif text-sm md:text-base tracking-widest text-[#f0f0f0] font-bold">
              中国大凉山 • 非物质文化遗产保护工程
            </div>
            <p className="text-[10px] sm:text-xs text-zinc-505 max-w-xl font-sans leading-relaxed">
              以一针一线之韧度，一锤一锻之淬火，融汇意式臻品极致高定优雅，活化非遗传统。让尘封山峦间之指尖心声，终得在世巡回，绽放不息之华彩。
            </p>
          </div>
          <div className="text-right text-[10px] text-zinc-500 font-mono space-y-1.5 border-t sm:border-t-0 border-zinc-900 pt-4 sm:pt-0">
            <p>鸣谢各方机构深山实地保护指导 | 凉山州非遗工作站技术支持</p>
            <p>Digital Core v1.5 • Executed under standard layout constraints</p>
          </div>
        </ScrollReveal>
      </footer>

    </div>
  );
}
