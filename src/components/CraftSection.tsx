/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { EMBROIDERY_CRAFTS, SILVER_CRAFTS } from '../data';
import { Sparkles, Hammer, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CraftSection() {
  const [activeEmbroideryIndex, setActiveEmbroideryIndex] = useState(0);
  const [activeSilverIndex, setActiveSilverIndex] = useState(0);

  const activeEmbroidery = EMBROIDERY_CRAFTS[activeEmbroideryIndex];
  const activeSilver = SILVER_CRAFTS[activeSilverIndex];

  // Helper selectors to pair active carousel tabs with real high-contrast uploaded images
  const getEmbroideryImage = (idx: number) => {
    switch (idx) {
      case 0: return "/src/assets/images/taohuaxiu_sc7_1780107849392.png"; // 桃花绣: 绣娘行针在黑色底绒
      case 1: return "/src/assets/images/artisan_hands_sc1_1780107764327.png"; // 锁线绣/密集锁边: 索玛绣面与银饰微距
      case 2: return "/src/assets/images/fendi_bag_sc3_1780107780327.png"; // 盘花绣/褶锦: 传统艳丽服饰褶摆
      default: return "/src/assets/images/taohuaxiu_sc7_1780107849392.png";
    }
  };

  const getSilverImage = (idx: number) => {
    switch (idx) {
      case 0: return "/src/assets/images/silver_forge_sc7_1780107867151.png"; // 熔熔锻打: 1000℃火炉坩埚熔化液银
      case 1: return "/src/assets/images/fendi_bag_sc1_1780107746711.png"; // 纹雕浮雕: 精錾银质龙纹
      case 2: return "/src/assets/images/legusahari_sc6_1780107832663.png"; // 镂空錾刻: 勒古大师围拢传统瓦房火塘
      case 3: return "/src/assets/images/artisan_hands_sc1_1780107764327.png"; // 抛光打磨: 流苏银铃微距高光质感
      default: return "/src/assets/images/silver_forge_sc7_1780107867151.png";
    }
  };

  // Simple carousel helper for embroidery
  const scaleEmbroidery = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      setActiveEmbroideryIndex((prev) => (prev === 0 ? EMBROIDERY_CRAFTS.length - 1 : prev - 1));
    } else {
      setActiveEmbroideryIndex((prev) => (prev === EMBROIDERY_CRAFTS.length - 1 ? 0 : prev + 1));
    }
  };

  // Simple carousel helper for silver
  const scaleSilver = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      setActiveSilverIndex((prev) => (prev === 0 ? SILVER_CRAFTS.length - 1 : prev - 1));
    } else {
      setActiveSilverIndex((prev) => (prev === SILVER_CRAFTS.length - 1 ? 0 : prev + 1));
    }
  };

  // Predefined decorative SVG designs to simulate embroidery stitches and silver metal hammering
  const renderStitchSvg = (id: string) => {
    switch (id) {
      case 'emb_1': // 桃花绣: cross stitch / geometric
        return (
          <svg className="w-full h-full opacity-65 text-rose-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,10 L90,90 M90,10 L10,90" strokeDasharray="3,3" />
            <path d="M50,10 Q90,50 50,90 Q10,50 50,10 Z" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" />
            <path d="M20,50 H80 M50,20 V80" strokeDasharray="4,4" />
          </svg>
        );
      case 'emb_2': // 锁线绣: link chains
        return (
          <svg className="w-full h-full opacity-65 text-emerald-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50,10 C60,20 60,35 50,45 C40,55 40,70 50,80" strokeDasharray="1,1" />
            <circle cx="50" cy="25" r="10" />
            <circle cx="50" cy="50" r="12" />
            <circle cx="50" cy="75" r="10" />
            <path d="M30,50 C40,30 60,30 70,50 C60,70 40,70 30,50 Z" />
          </svg>
        );
      case 'emb_3': // 盘花绣: spiral and thick coils
        return (
          <svg className="w-full h-full opacity-65 text-[#eedbb2]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M50,50 A40,40 0 1,0 49,50 Z" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M50,50 A30,30 0 1,1 49,50 Z" strokeWidth="2" />
            <path d="M50,50 A20,20 0 1,0 49,50 Z" strokeWidth="3" />
            <path d="M50,50 A10,10 0 1,1 49,50 Z" strokeWidth="4" />
            <path d="M50,10 V90 M10,50 H90" strokeWidth="0.5" strokeDasharray="5,5" />
          </svg>
        );
      default: // 锁边
        return (
          <svg className="w-full h-full opacity-65 text-sky-500" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5,50 Q15,35 25,50 T45,50 T65,50 T85,50 T95,50" />
            <path d="M5,60 Q15,45 25,60 T45,60 T65,60 T85,60 T95,60" />
            <path d="M5,40 Q15,25 25,40 T45,40 T65,40 T85,40 T95,40" strokeDasharray="3,2" />
          </svg>
        );
    }
  };

  const renderSilverSvg = (id: string) => {
    switch (id) {
      case 'sil_1': // 锻打 hammer marks
        return (
          <svg className="w-full h-full opacity-50 text-gray-300" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="20" cy="25" r="14" className="fill-gray-800 stroke-gray-600" strokeWidth="1" />
            <circle cx="50" cy="20" r="12" className="fill-gray-700 stroke-gray-500" strokeWidth="1" />
            <circle cx="78" cy="30" r="15" className="fill-gray-800 stroke-gray-600" strokeWidth="1" />
            <circle cx="35" cy="55" r="13" className="fill-gray-900 stroke-gray-700" strokeWidth="1" />
            <circle cx="65" cy="60" r="16" className="fill-gray-700 stroke-gray-500" strokeWidth="1" />
            <circle cx="50" cy="85" r="11" className="fill-gray-800 stroke-gray-600" strokeWidth="1" />
          </svg>
        );
      case 'sil_2': // 浮雕 Relief
        return (
          <svg className="w-full h-full opacity-60 text-gray-200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M50,15 C55,30 75,30 75,50 C75,70 55,70 50,85 C45,70 25,70 25,50 C25,30 45,30 50,15 Z" fill="rgba(255,255,255,0.05)" />
            <path d="M50,30 C53,40 65,40 65,50 C65,60 53,60 50,70 C47,60 35,60 35,50 C35,40 47,40 50,30 Z" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        );
      case 'sil_3': // 镂空 Filigree
        return (
          <svg className="w-full h-full opacity-55 text-zinc-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="40" strokeDasharray="4,4" />
            <path d="M50,10 C40,30 20,40 10,50 C30,60 40,80 50,90 C60,80 80,60 90,50 C80,40 60,30 50,10 Z" />
            <path d="M30,30 L70,70 M70,30 L30,70" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="10" strokeDasharray="2,2" />
          </svg>
        );
      default: // 抛光 Polish
        return (
          <svg className="w-full h-full opacity-70 text-stone-200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="90" x2="90" y2="10" strokeDasharray="30,5,5,5" />
            <line x1="20" y1="95" x2="95" y2="20" strokeDasharray="30,5,5,5" strokeWidth="1" />
            <line x1="5" y1="80" x2="80" y2="5" strokeDasharray="30,5,5,5" strokeWidth="1" />
            <circle cx="65" cy="35" r="8" className="fill-white/10" strokeWidth="0.5" />
            <path d="M60,25 L70,45" strokeWidth="0.5" />
          </svg>
        );
    }
  };

  return (
    <section id="craft-anatomy" className="py-24 bg-[#0a0a0a] text-[#f5f5f5] border-t border-zinc-800 relative overflow-hidden">
      {/* Background soft red/gold particles element */}
      <div className="absolute top-1/4 left-1/12 w-96 h-96 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/12 w-96 h-96 bg-yellow-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header (Scroll Reveal) */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-100 tracking-wider font-semibold">
            工艺解密 — 一针一锤的极致追求
          </h2>
          <div className="w-16 h-[2px] bg-stone-700 mx-auto my-6" />
          <p className="max-w-2xl mx-auto text-zinc-400 font-sans text-sm md:text-base leading-relaxed">
            以微距微观视角，拆解彝绣与彝族银饰最精妙的古法绝技，复刻濒临失传的手工肌理；<br/>
            沉浸式数字博物馆级观感，一针见匠心，一锤见传承，还原高定背后不为人知的工艺真相。
          </p>
        </ScrollReveal>

        {/* Detailed Grid (Scroll Reveal) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Needle craft */}
          <ScrollReveal direction="left" id="embroidery-side">
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-stone-900/40 rounded-lg text-stone-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-stone-100 tracking-wide">
                  针尖上的凉山 (彝族刺绣)
                </h3>
              </div>

              <p className="text-xs text-zinc-500 mb-6 font-mono leading-relaxed">
                彝族刺绣传承千年针法体系，技法繁复、自成一派。本款 Fendi 高定舞绣包身，精心挑选桃花绣、密集弧线锁边绣、加环锁绣、盘花绣四大濒临失传的古典手法。
              </p>

              {/* Large graphic/visual display */}
              <div className="h-64 rounded-xl bg-[#080808] border border-zinc-900 relative flex items-center justify-center overflow-hidden mb-6 group">
                <img 
                  src={getEmbroideryImage(activeEmbroideryIndex)} 
                  alt="Embroidery technique closeup" 
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />

                {/* Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/90 border border-zinc-800/80 p-4 rounded-lg flex flex-col backdrop-blur-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-[#eedbb2] font-bold uppercase tracking-widest">
                      {activeEmbroidery.name}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      EMBROIDERY SPEC SHEET
                    </span>
                  </div>
                  <h4 className="text-sm font-sans text-stone-200 mt-1 font-semibold">
                    工艺特点: {activeEmbroidery.description}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 max-w-full italic">
                    文化寓意: {activeEmbroidery.culture}
                  </p>
                </div>
              </div>

              {/* Features badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeEmbroidery.features.map((feat, i) => (
                  <span key={i} className="px-3 py-1 bg-stone-900/20 border border-stone-800/40 text-stone-300 text-xs rounded-full flex items-center gap-1.5 font-sans">
                    <Check className="w-3.5 h-3.5" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Thumbnails Selection Carousel */}
              <div className="relative">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                  <span>选择针法探索细节 ({activeEmbroideryIndex + 1}/{EMBROIDERY_CRAFTS.length})</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => scaleEmbroidery('prev')}
                      className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition active:scale-95"
                      aria-label="Previous embroidery stitch"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scaleEmbroidery('next')}
                      className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition active:scale-95"
                      aria-label="Next embroidery stitch"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {EMBROIDERY_CRAFTS.map((craft, idx) => (
                    <button
                      key={craft.id}
                      onClick={() => setActiveEmbroideryIndex(idx)}
                      className={`relative aspect-square rounded-lg bg-zinc-900 border overflow-hidden p-2 flex flex-col justify-between text-left transition duration-300 active:scale-95 ${
                        activeEmbroideryIndex === idx
                          ? 'border-[#eedbb2] ring-1 ring-[#eedbb2]/30'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {/* Thumbnail tiny preview */}
                      <div className="flex-1 opacity-40 hover:opacity-100 transition-opacity">
                        {renderStitchSvg(craft.id)}
                      </div>
                      <span className="text-[10px] font-sans truncate text-zinc-300 font-bold block pt-1 border-t border-zinc-800/50">
                        {craft.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Silver craft */}
          <ScrollReveal direction="right" id="silver-side">
            <div className="bg-[#121212] rounded-2xl border border-zinc-800 p-6 md:p-8 hover:border-zinc-700 transition duration-300">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-stone-900/40 rounded-lg text-[#eedbb2]">
                  <Hammer className="w-5 h-5 animate-pulse" />
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-stone-100 tracking-wide">
                  锤声里的古艺 (手工银饰)
                </h3>
              </div>

              <p className="text-xs text-zinc-500 mb-6 font-mono leading-relaxed">
                彝族银饰以千锤百炼为魂，不靠机器模压，全凭匠人手艺、火候与力道把控。本款高定配件，完整沿用熔银、手工锻打、镂空錾刻、理抛光等多道工艺。
              </p>

              {/* Large graphic/visual display */}
              <div className="h-64 rounded-xl bg-[#080808] border border-zinc-900 relative flex items-center justify-center overflow-hidden mb-6 group">
                <img 
                  src={getSilverImage(activeSilverIndex)} 
                  alt="Silver technique closeup" 
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />

                {/* Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/90 border border-zinc-800/80 p-4 rounded-lg flex flex-col backdrop-blur-md">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-[#eedbb2] font-bold uppercase tracking-widest">
                      {activeSilver.name}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      SILVER CRAFT SPEC SHEET
                    </span>
                  </div>
                  <h4 className="text-sm font-sans text-stone-200 mt-1 font-semibold">
                    工艺特点: {activeSilver.description}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 max-w-full italic">
                    文化寓意: {activeSilver.culture}
                  </p>
                </div>
              </div>

              {/* Features badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeSilver.features.map((feat, i) => (
                  <span key={i} className="px-3 py-1 bg-stone-900/20 border border-stone-800/40 text-stone-300 text-xs rounded-full flex items-center gap-1.5 font-sans">
                    <Check className="w-3.5 h-3.5" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Thumbnails Selection Carousel */}
              <div className="relative">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2 flex justify-between items-center">
                  <span>选择银艺探索细节 ({activeSilverIndex + 1}/{SILVER_CRAFTS.length})</span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => scaleSilver('prev')}
                      className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition active:scale-95"
                      aria-label="Previous silver technique"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => scaleSilver('next')}
                      className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition active:scale-95"
                      aria-label="Next silver technique"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {SILVER_CRAFTS.map((craft, idx) => (
                    <button
                      key={craft.id}
                      onClick={() => setActiveSilverIndex(idx)}
                      className={`relative aspect-square rounded-lg bg-zinc-900 border overflow-hidden p-2 flex flex-col justify-between text-left transition duration-300 active:scale-95 ${
                        activeSilverIndex === idx
                          ? 'border-[#eedbb2] ring-1 ring-[#eedbb2]/30'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {/* Thumbnail tiny preview */}
                      <div className="flex-1 opacity-40 hover:opacity-100 transition-opacity">
                        {renderSilverSvg(craft.id)}
                      </div>
                      <span className="text-[10px] font-sans truncate text-zinc-300 font-bold block pt-1 border-t border-zinc-800/50">
                        {craft.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
