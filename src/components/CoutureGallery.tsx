/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, X, BookOpen, Sparkles, SlidersHorizontal, Copy, Check } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: 'photoshoot' | 'people' | 'crafts' | 'exhibition';
  categoryLabel: string;
  desc: string;
  location: string;
  photographer: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "img_fendi_1",
    src: "/src/assets/images/fendi_bag_sc1_1780107746711.png",
    title: "山石凝语 • 旷野对歌",
    category: "photoshoot",
    categoryLabel: "产品意境",
    location: "四川大凉山 • 美姑县黑色页岩巨石",
    photographer: "包包 (Couture Shoot)",
    desc: "将精制手袋置于大凉山蔚蓝苍穹和重嶂山脊交界之下。包面黑丝绒细腻柔滑的质地，与温润足银流苏挂饰在漫天风起中泠泠作响，在自然光影的轻拂下极致高亮，展现意式几何裁剪美学与凉山高寒生命色彩的绝妙碰撞。"
  },
  {
    id: "img_fendi_3",
    src: "/src/assets/images/fendi_bag_sc3_1780107780327.png",
    title: "索玛盛放 • 丽人回眸",
    category: "photoshoot",
    categoryLabel: "产品意境",
    location: "凉山布拖县 • 传统彩裙生活采风",
    photographer: "包包 (Couture Shoot)",
    desc: "身着华贵重磅彝装、戴上了全套非遗银饰头冠的大山丽人回眸执包。黑色手袋与层层堆卷的百褶彩裙相互衬托，犹如高寒山原上在晨雾里徐徐绽放的野生索玛花，将自然风骨与现代高级皮具手袋完美交融。"
  },
  {
    id: "img_fendi_4",
    src: "/src/assets/images/dongjingyuan_sc4_1780107796089.png",
    title: "深山大川 • 绝壁回响",
    category: "photoshoot",
    categoryLabel: "产品意境",
    location: "四川大凉山 • 海拔2800米峭壁边缘",
    photographer: "包包 (Couture Shoot)",
    desc: "将精制手袋绳挂悬空于凉山幽深千仞的群山峡谷和高寒云海之间。底边纯手工精錾的足银流苏挂件在猎猎山风中泠泠作响，在漫天山岚暮色和重嶂叠峦的冷冽黑页岩背景下，奏响一曲自然风物与意式高定交织的生命之歌。"
  },
  {
    id: "img_embroidery_detail",
    src: "/src/assets/images/taohuaxiu_sc7_1780107849392.png",
    title: "经纬交替 • 敷线走针",
    category: "crafts",
    categoryLabel: "淬火针尖",
    location: "甘洛县 • 彝针彝线合作社",
    photographer: "包包 (Couture Shoot)",
    desc: "非遗传承人与绣娘指尖在红、蓝、绿天然蚕丝线中游走，历经400小时、35万针的纯手工艺磨炼。密集挑线形成的几何对称索玛花，让凉山千年的文化血脉与品牌典雅的工艺轮廓在此凝结新生。"
  },
  {
    id: "img_silver_melt",
    src: "/src/assets/images/silver_forge_sc7_1780107867151.png",
    title: "红炉烈火 • 熔化银骨",
    category: "crafts",
    categoryLabel: "淬火针尖",
    location: "美姑县 • 勒古第14代古法作坊",
    photographer: "包包 (Couture Shoot)",
    desc: "白银纯手工锤打锻造的核心工序。在接近1000℃的高温煤炭红火中，坩埚里的足银熔化成红亮波动的液态。正是这般原始淬火，赋予包底边缘那上百根银饰流苏坚韧挺拔、不可磨灭的灵动之躯。"
  },
  {
    id: "img_hands_craft",
    src: "/src/assets/images/artisan_hands_sc1_1780107764327.png",
    title: "匠心指尖 • 精工细作",
    category: "crafts",
    categoryLabel: "淬火针尖",
    location: "凉山非遗中心 • 展厅微距",
    photographer: "包包 (Couture Shoot)",
    desc: "老匠人双手捧持联名包体银龙挂饰部件。每一个精小的盘蛇流苏，都要在烛影下经过千次极细的捶锤雕錾，才得以呈现内敛而含蓄的东方温润宝光。手工艺里的力道，重一分则损，轻一分则涩。"
  },
  {
    id: "img_artisan_portrait",
    src: "/src/assets/images/axiya_sc5_1780107819311.png",
    title: "大山女儿 • 绣娘风采",
    category: "people",
    categoryLabel: "人文风华",
    location: "四川大凉山 • 非遗传习基地",
    photographer: "包包 (Couture Shoot)",
    desc: "凉山大山深处的资深绣娘特写。她一针一线缝制祖辈流传下来的百褶彩裙，眼神专注深沉。刺绣是高寒山脉女性从未间断过的古老生活哲学，不仅在节庆盛会，更活在日升日落的火塘凡俗烟火中。"
  },
  {
    id: "img_fireside",
    src: "/src/assets/images/legusahari_sc6_1780107832663.png",
    title: "火塘暖阳 • 勒古秘境",
    category: "people",
    categoryLabel: "人文风华",
    location: "布拖县特木里镇 • 古民居火塘",
    photographer: "包包 (Couture Shoot)",
    desc: "在阳光透过天窗、斜射尘埃的传统木质瓦板房内，老手艺人围于暖烘烘 of 火炉旁，共同錾刻包扣饰牌。几代人都在这一室微弱烟气与融融红火中对歌劳作，将古老的家族非遗图腾融入每一次富有回响的叮叮锤锤。"
  }
];

export default function CoutureGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyCitation = (img: GalleryImage) => {
    const textToCopy = `作品: 《${img.title}》\n摄影作者: ${img.photographer}\n创作地点: ${img.location}\n影像长文鉴赏: ${img.desc}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy citation: ', err);
    });
  };

  const categories = [
    { value: 'all', label: '全部大片 / ALL' },
    { value: 'photoshoot', label: '产品意境' },
    { value: 'people', label: '人文风华' },
    { value: 'crafts', label: '淬火针尖' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === selectedCategory);

  return (
    <div id="couture-gallery" className="bg-black border border-zinc-900 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl mb-16 select-none">
      {/* Absolute top elegant glowing particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#eedbb2]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-8 mb-8 w-full gap-4">
        <div>
          <span className="px-2.5 py-1 bg-stone-900/40 border border-stone-850 text-[#eedbb2] text-[10px] font-mono rounded font-bold uppercase tracking-widest mb-3 inline-block">
            COUTURE PHOTOSHOOT & CULTURAL ALBUM • SLIDE 07.5
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-100 tracking-wider font-semibold">
            「凉山风骨 • 意境大片」非遗摄影图志
          </h2>
          <p className="text-zinc-500 font-sans text-xs md:text-sm mt-2 max-w-2xl leading-relaxed">
            深入大凉山高寒极地，由团队和非遗同仁精心采风拍摄。从耶稣光洒进的古老火塘传承，到炭火千度熔炼的白银。在此全息记录大山深处的纯粹人文底色。
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 bg-stone-950 px-3 py-1.5 rounded border border-zinc-900 self-start md:self-end">
          <Camera className="w-3.5 h-3.5 text-[#eedbb2] animate-pulse" />
          <span>IMAGERY CAPTURED: 8 HIGH-END PICTURES EXPOSING</span>
        </div>
      </div>

      {/* Elegant Filter Category Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-zinc-950">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-2 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3 text-[#eedbb2]" />
          筛选分类 / CHOOSE:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 border rounded text-xs font-sans tracking-wider transition-all duration-300 active:scale-95 cursor-pointer ${
              selectedCategory === cat.value
                ? 'bg-[#eedbb2] text-black border-[#eedbb2] font-semibold shadow-md shadow-[#eedbb2]/5'
                : 'bg-stone-950/40 border-stone-900 text-zinc-400 hover:text-stone-100 hover:border-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Visual Photoshoot Grid Block */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[3/4] bg-stone-950 border border-zinc-900 rounded-xl overflow-hidden cursor-pointer hover:border-[#eedbb2]/35 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-xl hover:shadow-[#eedbb2]/5 transition-all duration-300 ease-out flex flex-col justify-between p-4"
              onClick={() => setActiveImage(img)}
            >
              {/* Background cover image with no-referrer constraint */}
              <img
                src={img.src}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 pointer-events-none" />

              {/* Upper category handle */}
              <div className="z-10 self-start">
                <span className="px-2 py-0.5 bg-black/85 border border-zinc-800 text-[9px] font-mono text-[#eedbb2] font-bold tracking-widest rounded-md backdrop-blur-xs uppercase">
                  {img.categoryLabel}
                </span>
              </div>

              {/* Bottom detail text */}
              <div className="z-10 border-t border-zinc-900/50 pt-3 relative backdrop-blur-[1px] group-hover:translate-y-[-2px] transition-transform duration-300">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">{img.photographer}</span>
                <h4 className="font-serif text-xs font-semibold text-stone-100 tracking-wide truncate group-hover:text-[#eedbb2] transition-colors">
                  {img.title}
                </h4>
                <div className="flex items-center gap-1 text-[8px] font-mono text-zinc-500 mt-1 uppercase tracking-wider justify-between">
                  <span className="truncate max-w-[120px]">{img.location.split('•')[0]}</span>
                  <span className="flex items-center gap-0.5 text-[#eedbb2] font-semibold text-[9px]">
                    <Eye className="w-2.5 h-2.5" /> 赏析
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Massive Immersive Cinematic Lightbox Dialog */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md pointer-events-auto select-text"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#080808] border border-zinc-850 rounded-2xl max-w-5xl w-full h-[90vh] md:h-[80vh] grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl shadow-black relative"
            >
              {/* Abs Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black hover:bg-stone-900 border border-zinc-805 text-zinc-400 hover:text-white rounded-full transition active:scale-90"
                aria-label="Close photo details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left 7 Columns: Giant Image Frame */}
              <div className="md:col-span-7 bg-black relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-zinc-900">
                <img
                  src={activeImage.src}
                  alt={activeImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[40vh] md:max-h-full"
                />
                
                {/* Floating caption overlay */}
                <div className="absolute bottom-3 left-4 right-4 bg-black/85 border border-zinc-900 rounded p-2.5 backdrop-blur-xs hidden md:flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>CAMERA COUTURE PREVIEW MODEL</span>
                  <span>LAT: 27°48'N LONG: 102°15'E</span>
                </div>
              </div>

              {/* Right 5 Columns: Curatorial Text */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#0a0a0c] text-left">
                <div className="space-y-6">
                  {/* Title & category */}
                  <div className="pb-4 border-b border-zinc-900 w-full">
                    <span className="px-2.5 py-0.5 bg-stone-900 border border-zinc-850 text-stone-300 text-[9px] font-mono font-bold rounded tracking-widest uppercase inline-block mb-3">
                      {activeImage.categoryLabel} SPECIAL EXHIBIT
                    </span>
                    <h3 className="font-serif text-2xl text-stone-100 font-bold tracking-wide">
                      {activeImage.title}
                    </h3>
                  </div>

                  {/* Technical Meta info */}
                  <div className="space-y-2.5 text-xs font-sans text-zinc-400">
                    <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                      <span className="text-zinc-500 font-mono text-[10px] uppercase">采集地点 / FIELD LOCATION</span>
                      <span className="font-semibold text-stone-300">{activeImage.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                      <span className="text-zinc-500 font-mono text-[10px] uppercase">摄影作者 / CAPTURED BY</span>
                      <span className="font-semibold text-[#eedbb2]">{activeImage.photographer}</span>
                    </div>
                  </div>

                  {/* Deep Curatorial Description */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#eedbb2] uppercase font-mono tracking-widest font-bold">
                      <BookOpen className="w-4 h-4" />
                      <span>影像长文鉴赏 / EXQUISITE CRITIQUE</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mt-2 whitespace-pre-line text-left">
                      {activeImage.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom action trigger */}
                <div className="border-t border-zinc-900 pt-6 mt-8 flex flex-col gap-3">
                  <div className="flex gap-2 items-center text-[10px] font-mono text-zinc-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#eedbb2] animate-bounce" />
                    <span>本大片照片属于 Fendi Hand in Hand 官方图志集</span>
                  </div>
                  
                  <button
                    onClick={() => handleCopyCitation(activeImage)}
                    className={`w-full py-2.5 flex items-center justify-center gap-2 rounded text-xs font-semibold tracking-wider font-sans border transition-all duration-200 active:scale-98 cursor-pointer ${
                      copied 
                        ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-400 font-bold" 
                        : "bg-zinc-900/60 hover:bg-zinc-800/80 border-zinc-850 hover:border-zinc-700/60 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>已复制文献引用 / CITATION COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#eedbb2]" />
                        <span>复制作品文献引用 / COPY CITATION</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveImage(null)}
                    className="w-full py-2.5 bg-[#eedbb2] text-black hover:bg-[#e4cea2] transition rounded text-xs font-bold tracking-wider font-sans cursor-pointer active:scale-98"
                  >
                    返回影像大片图志 / CLOSE VIEW
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
