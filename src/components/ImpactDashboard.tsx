/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { IMPACT_METRICS, CHART_DATA } from '../data';
import { Users, Briefcase, TrendingUp, Globe, Play, X, Heart, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ImpactDashboard() {
  const [selectedYearIdx, setSelectedYearIdx] = useState<number>(4); // Default to latest 2025
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Helper to map Lucide icon names dynamically
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-stone-300" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-stone-300" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#eedbb2]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-stone-300" />;
      default:
        return <Users className="w-5 h-5 text-zinc-400" />;
    }
  };

  // SVG Chart Dimensions & Computations
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 25;

  const minYear = CHART_DATA[0].year;
  const maxYear = CHART_DATA[CHART_DATA.length - 1].year;
  const minVal = 0;
  const maxVal = 120;

  // Linear projections to SVG plane
  const getX = (year: number) => {
    return paddingX + ((year - minYear) / (maxYear - minYear)) * (width - 2 * paddingX);
  };

  const getY = (val: number) => {
    return height - paddingY - (val / maxVal) * (height - 2 * paddingY);
  };

  // Generate SVG Path coordinates
  const pointsString = CHART_DATA.map(d => `${getX(d.year)},${getY(d.index)}`).join(' ');
  const areaPathString = `
    M ${getX(minYear)},${height - paddingY}
    ${CHART_DATA.map(d => `L ${getX(d.year)},${getY(d.index)}`).join(' ')}
    L ${getX(maxYear)},${height - paddingY}
    Z
  `;

  return (
    <section id="impact-analytics" className="py-24 bg-zinc-950 text-[#f5f5f5] border-t border-zinc-900 relative">
      {/* Decorative linear line in background representing warp threads */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-100 tracking-wider font-semibold">
            让传统，走向世界
          </h2>
          <div className="w-16 h-[2px] bg-stone-700 mx-auto my-6" />
          <p className="max-w-2xl mx-auto text-zinc-400 font-sans text-sm md:text-base leading-relaxed">
            国际高定品质加持，让深藏于凉山高寒山地的绝妙手艺完美融入现代奢华语境，<br/>
            真正带动非遗工艺群体的商业回血，赋予凉山妇女自信、自强、自立的尊严根基。
          </p>
        </ScrollReveal>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Column 1: Film Preview */}
          <ScrollReveal direction="left" className="flex flex-col">
            <div className="bg-[#101010] border border-zinc-900 rounded-2xl overflow-hidden p-6 h-full flex flex-col justify-between hover:border-zinc-800 transition">
              <div>
                <h3 className="font-serif text-lg tracking-wider text-rose-100 mb-1">
                  FENDI <span className="font-sans text-xs tracking-widest text-zinc-500 block lg:inline ml-0 lg:ml-1 text-zinc-400">hand in hand</span>
                </h3>
                <p className="text-xs text-zinc-500 font-mono mb-4 uppercase tracking-wider">
                  彝族非遗合作故事纪录片
                </p>
              </div>

              {/* Video Mockup Frame */}
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-xl bg-neutral-950 border border-zinc-900 overflow-hidden group">
                {/* Real photo acting as beautiful video poster art */}
                <img 
                  src="/src/assets/images/legusahari_sc6_1780107832663.png" 
                  alt="Traditional fireside craftsmanship documentary cover" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700 filter saturate-[0.8]"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/40 to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-stone-900/80 border border-stone-800 text-stone-400 text-[10px] font-mono font-bold rounded">
                      4K UHD LIVE
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      时长: 02:36
                    </span>
                  </div>

                  {/* Play Button Spark */}
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="self-center p-4 bg-amber-550/90 hover:bg-amber-450 bg-white hover:bg-amber-400 text-black rounded-full shadow-lg shadow-black/50 hover:shadow-amber-500/30 active:scale-90 transition duration-300 cursor-pointer"
                    aria-label="Play documentary video"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  <div className="flex justify-between items-end border-t border-zinc-800/40 pt-2 backdrop-blur-[2px]">
                    <p className="text-[11px] text-zinc-300 font-sans truncate pr-2">
                      寻找针尖上的温度：走进大凉山非遗合作社
                    </p>
                    <p className="text-[10px] text-stone-450 font-mono whitespace-nowrap">
                      00:18 / 02:36
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center text-xs border-t border-zinc-900 pt-4">
                <span className="text-zinc-550 text-zinc-500">
                  © Fendi hand in hand 项目官方记录
                </span>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1.5 transition ${isLiked ? 'text-[#eedbb2] font-bold' : 'text-zinc-400 hover:text-rose-450'}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-[#eedbb2]' : ''}`} />
                  {isLiked ? '已喜欢' : '点赞纪录片'}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Metrics Bento Box (Stacked) */}
          <ScrollReveal direction="up" className="flex flex-col gap-4 justify-between">
            <div className="flex flex-col justify-between h-full bg-transparent gap-4">
              {IMPACT_METRICS.map((metric, idx) => (
                <div key={idx} className="bg-[#101010] border border-zinc-900/90 hover:border-zinc-800 rounded-xl p-4 transition flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-serif text-zinc-400 font-medium">
                      {metric.label}
                    </span>
                    <span className="p-1 px-1.5 bg-zinc-950 border border-zinc-900 rounded-md">
                      {getIconComponent(metric.icon)}
                    </span>
                  </div>
                  <div className="text-xl md:text-2xl font-serif text-[#eedbb2] font-semibold tracking-tight">
                    {metric.value}
                  </div>
                  <p className="text-[11px] text-zinc-550 block mt-0.5 leading-relaxed text-zinc-500">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Column 3: Live Custom SVG Chart */}
          <ScrollReveal direction="right" className="flex flex-col">
            <div className="bg-[#101010] border border-zinc-900 rounded-2xl p-5 md:p-6 flex flex-col justify-between h-full hover:border-zinc-800 transition">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-3 border-b border-zinc-900">
                <div>
                  <h4 className="text-sm font-sans font-semibold tracking-wider text-rose-100 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-stone-400 animate-pulse" />
                    项目年度影响指数 (API)
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">
                    Annual Project Impact Score
                  </p>
                </div>
                {/* Year Selectors tabs */}
                <div className="flex gap-1 bg-black p-1 rounded-lg border border-zinc-900 self-start sm:self-auto">
                  {CHART_DATA.map((d, index) => (
                    <button
                      key={d.year}
                      onClick={() => setSelectedYearIdx(index)}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded transition ${
                        selectedYearIdx === index
                          ? 'bg-stone-800 border border-stone-700 text-[#eedbb2] font-bold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {d.year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive custom SVG plot area */}
              <div className="relative w-full overflow-x-auto select-none py-1">
                <svg className="w-full h-auto min-w-[280px]" viewBox={`0 0 ${width} ${height}`} fill="none">
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#737373" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="line-color-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e5e5e5" />
                      <stop offset="60%" stopColor="#c5a880" />
                      <stop offset="100%" stopColor="#eedbb2" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal dotted gridlines */}
                  <line x1={paddingX} y1={getY(0)} x2={width - paddingX} y2={getY(0)} stroke="#1c1c1f" strokeWidth="0.8" />
                  <line x1={paddingX} y1={getY(30)} x2={width - paddingX} y2={getY(30)} stroke="#1c1c1f" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1={paddingX} y1={getY(60)} x2={width - paddingX} y2={getY(60)} stroke="#1c1c1f" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1={paddingX} y1={getY(90)} x2={width - paddingX} y2={getY(90)} stroke="#1c1c1f" strokeWidth="0.8" strokeDasharray="3,3" />
                  <line x1={paddingX} y1={getY(120)} x2={width - paddingX} y2={getY(120)} stroke="#1c1c1f" strokeWidth="0.8" />

                  {/* Solid bottom axis line */}
                  <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#323238" strokeWidth="1" />

                  {/* Gradient Area Fill Under the Line */}
                  <path d={areaPathString} fill="url(#chart-area-grad)" />

                  {/* Glowing Trend Line Path */}
                  <path d={`M ${pointsString}`} stroke="url(#line-color-grad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Interactive Dot Checkpoints */}
                  {CHART_DATA.map((d, index) => {
                    const cx = getX(d.year);
                    const cy = getY(d.index);
                    const isSelected = selectedYearIdx === index;
                    return (
                      <g key={d.year} className="cursor-pointer" onClick={() => setSelectedYearIdx(index)}>
                        <circle cx={cx} cy={cy} r={isSelected ? "11" : "7"} className="fill-transparent stroke-stone-500/20 hover:stroke-stone-500/40 transition-all" strokeWidth={isSelected ? "3" : "0"} />
                        <circle cx={cx} cy={cy} r={isSelected ? "5" : "3.5"} fill={isSelected ? "#eedbb2" : "#101010"} stroke={isSelected ? "#111827" : "#a1a1aa"} strokeWidth={isSelected ? "1.5" : "1.5"} />
                        
                        <text x={cx} y={height - 8} textAnchor="middle" className="fill-zinc-500 font-mono text-[9px] font-bold">
                          {d.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* Active Tooltip bubble */}
                  {selectedYearIdx !== null && (
                    <g transform={`translate(${getX(CHART_DATA[selectedYearIdx].year) - 50}, ${getY(CHART_DATA[selectedYearIdx].index) - 34})`}>
                      <rect width="100" height="24" rx="5" className="fill-black/95 stroke-stone-700" strokeWidth="0.8" />
                      <text x="50" y="15" textAnchor="middle" className="text-[10px] font-mono fill-[#eedbb2] font-bold">
                        影响指数: {CHART_DATA[selectedYearIdx].index}%
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Description explanation */}
              <div className="mt-4 p-3 bg-black rounded-xl border border-zinc-900/80 flex items-start gap-2.5">
                <span className="p-1 px-1.5 bg-stone-900 border border-stone-850 text-stone-300 text-[10px] font-mono font-bold rounded mt-0.5 flex-shrink-0">
                  指标核实
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans mt-0.5">
                  指标说明：影响指数加权综合了<strong>“手艺人经济总量、女性技能持证、国际高端大刊专篇曝光”</strong>。自2023年非遗包登船（56%）至2025年最新核查（110%），数据增长近两倍。
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Embedded Cinema Modal for Project Video */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setIsVideoModalOpen(false)} />
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl w-full max-w-4xl p-6 relative z-10 overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition"
              aria-label="Close video player modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-2 py-0.5 bg-stone-900 text-stone-400 font-mono text-xs rounded">
                手艺共生纪实
              </span>
              <h4 className="text-lg font-serif text-stone-100 mt-2">
                当意式风华邂逅彝韵匠心 — 4K 超精自然纪录片
              </h4>
            </div>

            {/* Immersive cinematic visualization loop on open */}
            <div className="aspect-video bg-black rounded-lg border border-zinc-800 relative flex flex-col justify-center items-center overflow-hidden">
              {/* Complex concentric dynamic circles to mimic premium player loading loop */}
              <div className="absolute w-72 h-72 rounded-full border border-zinc-800/40 animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-56 h-56 rounded-full border border-stone-800/30 animate-[spin_6s_linear_infinite_reverse]" />
              <div className="absolute w-36 h-36 rounded-full border border-stone-800/20 animate-[spin_15s_linear_infinite]" />
              
              <div className="z-10 text-center px-8 relative max-w-lg">
                <SpinnerOrnament />
                <p className="text-zinc-300 font-serif text-lg tracking-wider font-semibold mb-2">
                  在大凉山深处守护一抹温柔
                </p>
                <p className="text-zinc-500 text-xs font-mono tracking-widest leading-relaxed">
                  [正在连入4K超精流媒体缓存包 —— 已就绪]<br />
                  “针尖上的彩虹，锤击下的月光：当意式高定与凉山古艺碰撞”
                </p>
              </div>

              {/* Progress panel simulation */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 bg-black/90 p-3 rounded border border-zinc-800/80">
                <button className="text-[#eedbb2] hover:text-[#ebd5ab]">
                  <Play className="w-4 h-4 fill-current" />
                </button>
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-[#eedbb2] rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  00:18 / 02:36
                </span>
              </div>
            </div>

            <div className="mt-4 text-xs text-zinc-400 flex flex-wrap justify-between gap-4">
              <p>拍摄地点：四川省凉山彝族自治州甘洛县、布拖县</p>
              <button 
                onClick={() => {
                  setIsLiked(true);
                  setIsVideoModalOpen(false);
                }} 
                className="text-[#eedbb2] hover:underline"
              >
                点个赞并返回首页
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

// Minimal aesthetic spinner icon to look high end inside our loading video frame
function SpinnerOrnament() {
  return (
    <svg className="w-16 h-16 text-stone-400 tracking-normal mx-auto mb-4 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="50" cy="50" r="40" strokeDasharray="1,6" />
      <circle cx="50" cy="50" r="30" strokeDasharray="3,3" />
      <circle cx="50" cy="50" r="18" strokeDasharray="1,1" />
    </svg>
  );
}
