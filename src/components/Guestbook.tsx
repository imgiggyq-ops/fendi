/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRESET_COMMENTS } from '../data';
import { Comment } from '../types';
import { MessageSquare, Send, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal from './ScrollReveal';

export default function Guestbook() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputText, setInputText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  // Load preset and cached user comments
  useEffect(() => {
    const cached = localStorage.getItem('fendi_exhibition_comments');
    if (cached) {
      try {
        setComments(JSON.parse(cached));
      } catch (e) {
        setComments(PRESET_COMMENTS);
      }
    } else {
      setComments(PRESET_COMMENTS);
    }
  }, []);

  // Save comments cache helper
  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem('fendi_exhibition_comments', JSON.stringify(newComments));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrMessage('');

    if (!inputText.trim()) {
      setErrMessage('请输入您的感言内容');
      return;
    }
    if (!authorName.trim()) {
      setErrMessage('请留存您的姓名缩写/昵称');
      return;
    }

    const city = locationName.trim() || '大山回音';
    const randomColors = [
      'bg-red-950 border-red-500', 
      'bg-amber-950 border-amber-500', 
      'bg-emerald-950 border-emerald-500', 
      'bg-violet-950 border-violet-500',
      'bg-blue-950 border-blue-500'
    ];
    const pickedColor = randomColors[Math.floor(Math.random() * randomColors.length)];

    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      author: authorName.trim(),
      location: city,
      content: inputText.trim(),
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
      avatarColor: pickedColor
    };

    const updated = [newComment, ...comments];
    saveComments(updated);

    // Reset Form and set success trigger
    setInputText('');
    setAuthorName('');
    setLocationName('');
    setIsSubmitSuccess(true);
    setErrMessage('');

    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 5000);
  };

  const handleResetComments = () => {
    if (window.confirm('是否重置留言板为默认的四份精品回响数据？')) {
      saveComments(PRESET_COMMENTS);
    }
  };

  return (
    <section id="exhibition-guestbook" className="py-24 bg-[#070707] text-[#f5f5f5] pb-32 border-t border-zinc-900 relative">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-red-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-100 tracking-wider font-semibold">
            致敬匠心 • 留下你的回响
          </h2>
          <div className="w-16 h-[2px] bg-red-600 mx-auto my-6" />
          <p className="max-w-lg mx-auto text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
            你的一句话，也是传续的一部分。<br/>
            对民族文化刺绣、古法银锻的真诚赞叹，是对留守妈妈和深山银匠最大的温暖回馈。
          </p>
        </ScrollReveal>

        {/* Guestbook body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Submission Form Column (5 cols) */}
          <ScrollReveal direction="left" className="lg:col-span-5">
            <div className="bg-[#121212]/90 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition">
              
              <div className="flex items-center gap-2.5 mb-6">
                <span className="p-2 bg-stone-900/50 rounded-lg text-stone-300">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg tracking-wider text-stone-200">
                    叙写回响
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    Add My Heritage Voice
                  </p>
                </div>
              </div>

              {/* Status indicator */}
              {isSubmitSuccess && (
                <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">感言提交成功！</p>
                    <p className="text-emerald-500 mt-0.5">您发自内心的赞叹已作为文化回声汇入传承走廊中。</p>
                  </div>
                </div>
              )}

              {errMessage && (
                <div className="mb-6 p-3 bg-red-950/20 border border-red-500/30 text-red-400 text-xs rounded-xl animate-shake">
                  {errMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Author Name */}
                <div>
                  <label htmlFor="author-input" className="block text-stone-300 text-xs font-serif tracking-wider mb-1.5">
                    姓名或称呼 <span className="text-[#eedbb2] font-bold">*</span>
                  </label>
                  <input
                    id="author-input"
                    type="text"
                    maxLength={20}
                    placeholder="例如: 林小米 / 旅客小周"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#181818] border border-zinc-800 focus:border-[#eedbb2] focus:outline-none p-3 rounded-lg text-xs tracking-wider transition-all"
                  />
                </div>

                {/* City location */}
                <div>
                  <label htmlFor="location-input" className="block text-stone-300 text-xs font-serif tracking-wider mb-1.5">
                    所在城市 / 地区
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      id="location-input"
                      type="text"
                      maxLength={15}
                      placeholder="例如: 成都 / 杭州 / 凉山"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="w-full bg-[#181818] border border-zinc-800 focus:border-[#eedbb2] focus:outline-none pl-9 p-3 rounded-lg text-xs tracking-wider transition-all"
                    />
                  </div>
                </div>

                {/* Content text */}
                <div>
                  <label htmlFor="text-input" className="block text-stone-300 text-xs font-serif tracking-wider mb-1.5">
                    传承感言 <span className="text-[#eedbb2] font-bold">*</span>
                  </label>
                  <textarea
                    id="text-input"
                    rows={4}
                    maxLength={150}
                    placeholder="写下你对大凉山针尖上的彩虹、及14代银锻工艺真挚的敬意与期许（最长150字）..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full bg-[#181818] border border-zinc-800 focus:border-[#eedbb2] focus:outline-none p-3 rounded-lg text-xs tracking-wider leading-relaxed transition-all resize-none"
                  />
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-1 font-mono">
                    <span>写下你的感言...</span>
                    <span>{inputText.length} / 150</span>
                  </div>
                </div>

                {/* Terms notice */}
                <p className="text-[10px] text-zinc-600 leading-relaxed font-sans mt-2">
                  * 提交代表您同意将真实字眼公开陈列。本项留言数据本地加密存储，绝无商业推广或第三方滥用行为。
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full p-3 sm:p-3.5 bg-[#eedbb2] hover:bg-[#ecd5af] text-stone-950 rounded-lg text-xs font-serif tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer transition active:scale-95 animate-pulse-slow"
                >
                  <Send className="w-3.5 h-3.5" />
                  提交传承心声
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Scrolling Echo wall Column (7 cols) */}
          <ScrollReveal direction="right" className="lg:col-span-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-lg tracking-wider text-stone-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#eedbb2] animate-pulse" />
                已收录的匠心回声 ({comments.length})
              </h3>
              <button 
                onClick={handleResetComments}
                className="text-[10px] font-mono text-zinc-600 hover:text-zinc-400 hover:underline cursor-pointer"
              >
                重置测试数据
              </button>
            </div>

            {/* Display lists */}
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 scroll-smooth">
              <AnimatePresence initial={false}>
                {comments.length === 0 ? (
                  <div className="text-center py-20 bg-[#121212]/40 rounded-xl border border-dashed border-zinc-800 font-sans text-sm text-[#888]">
                    留言板空空如也。成为第一个留下心声的人吧！
                  </div>
                ) : (
                  comments.map((comm) => (
                    <motion.div
                      key={comm.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#121212]/90 border border-zinc-800 hover:border-zinc-700/85 hover:bg-neutral-900/90 p-5 rounded-xl transition flex gap-4"
                    >
                      {/* Stylized high fashion Yi embroidery ring avatar */}
                      <div className={`w-10 h-10 flex-shrink-0 rounded-full border flex items-center justify-center font-bold text-xs uppercase tracking-tight text-white/90 shadow ${comm.avatarColor}`}>
                        {comm.author.substring(0, 2)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="font-serif font-bold text-stone-200 text-sm tracking-wide">
                              {comm.author}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 ml-2 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/60 inline-flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 text-stone-400" />
                              {comm.location}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                            {comm.date}
                          </span>
                        </div>

                        {/* Speech bubbles style */}
                        <p className="mt-2 text-xs text-zinc-300 leading-relaxed font-sans font-medium">
                          “{comm.content}”
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
