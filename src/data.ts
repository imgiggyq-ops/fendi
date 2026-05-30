/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Comment, CraftDetail, ChartDataPoint, ImpactMetric } from './types';

export const HERO_DATA = {
  titleEn: "Hand in Hand:",
  titleZh: "当意式风华邂逅彝韵匠心",
  subtitle: "千年彝绣承匠心 · 意式高定启新程",
  introTitle: "一场跨越万里的匠心邂逅",
  introParagraphs: [
    "2023 Fendi Hand in Hand 首度携手中国彝族非遗",
    "以一针一线、一锤一锻，让千年技艺在高定舞台新生"
  ]
};

export const HIGHLIGHT_DATA = {
  title: "一针一锤 • 18.8万的匠心孤品",
  embroidery: {
    title: "彝绣非遗针法 x 128道工序",
    details: "0.1mm丝线层叠绣制。以针为笔，绣出彝族千年纹样的生命力。图腾、花卉、云雷，每一针皆有寓意，为包体注入独一无二的东方灵魂。"
  },
  silver: {
    title: "手工银饰锻造 x 72道工序",
    details: "999足银手工锤打。千次捶击，形成自然肌理与温润光泽。流苏、银珠、云纹牌扣，每一处皆可传承。以锤为骨，锻造包体的贵重与力量。"
  }
};

export const POETRY_DATA = {
  title: "彝绣 · 大大地与山川的诗意",
  highlightHour: "400小时",
  highlightStitch: "35万针",
  points: [
    {
      title: "传承指导",
      desc: "由彝族彝绣非遗传承人阿西亚之莫亲自指导，每一针都遵循千年彝绣古法技艺，坚守非遗本真。"
    },
    {
      title: "色彩哲学",
      desc: "包面选用细腻黑丝绒，承载彝族先民对大地的敬畏与热爱；蓝绿渐变丝线，还原凉山山川草木的自然肌理，每一种配色都蕴含彝族文化底蕴。"
    },
    {
      title: "图腾寓意",
      desc: "主纹样选用彝族象征符号——索玛花（高山杜鹃），针脚细密饱满，将索玛花的柔美与坚韧绣于包面，既是自然之美，也是彝族女性精神的具象化表达。"
    },
    {
      title: "工艺价值",
      desc: "400小时匠心打磨，历经35万针精细绣制，无一针敷衍。每一个包面绣纹都独一无二，是手工技艺与艺术美学的完美融合。"
    }
  ]
};

export const CHRONICLE_DATA = {
  title: "匠心无界，一脉相承",
  description: [
    "Fendi Hand in Hand 全球手工艺合作项目，自启动以来，先后携手意大利、日本的传统手工艺人，以时尚为桥梁，守护千年匠心。",
    "2023年，该项目首度来到中国，走进四川大凉山深处，在海拔2800米险峻而纯净的天然山险之下，开启与中国彝族非遗的深度对话。",
    "这并非一次简单的品牌联名，而是一场跨越山海的文化共生——Fendi以国际高定视野，赋能彝族千年彝绣、银饰技艺，让深藏于大山的非遗手艺，走出凉山、走向世界，实现传统技艺的活态传承与新生。"
  ],
  templeName: "凉山海拔2800米悬崖"
};

export const MASTERS_DATA = {
  title: "匠人坚守 • 让非遗活在当下",
  masters: [
    {
      id: "master_1",
      name: "阿西亚之莫",
      role: "彝族彝绣非遗传承人 | 彝针彝线合作社负责人",
      achievements: "10岁习绣 | 培训5300+绣娘 | 坚守非遗40余年",
      bio: "生于凉山甘洛县，阿西亚之莫自10岁便跟随家中长辈学习彝绣，一针一线铭记千年技艺。为了让彝绣走出大山，她创办“彝针彝线”合作社，手把手培训5300余名留守妇女，让她们凭借一双巧手实现居家就业，将千年彝绣技艺融入日常，让非遗在坚守中焕发新生。"
    },
    {
      id: "master_2",
      name: "勒古沙日",
      role: "彝族银饰非遗传承人 | 勒古家族第14代银匠",
      achievements: "14代传承 | 作品馆藏国家级博物馆 | 古法银艺守护者",
      bio: "来自“银饰之乡”布拖县，“勒古”二字在彝语中便是“工匠”的代名词。作为家族第14代银匠，勒古沙日坚守古法，以锤为笔、以银为纸，将熔炼、捶打、镂刻等古法技艺代代相传。其作品因兼具文化底蕴与工艺价值，被国家级博物馆收藏，让千年银饰技艺在时光中熠熠生辉。"
    }
  ]
};

export const EMBROIDERY_CRAFTS: CraftDetail[] = [
  {
    id: "emb_1",
    name: "桃花绣",
    description: "以挑线为基础，形成镂空纹样，针脚细密，层次分明。桃花绣展现出高度的几何对称美。",
    culture: "象征着彝族人民对自然万物的敬畏与神灵的守护，寓意吉祥安康。",
    features: ["双面交叉立体感", "几何对称", "镂空底纹"]
  },
  {
    id: "emb_2",
    name: "锁线绣",
    description: "通过锁链式的针脚将图案轮廓牢牢锁住，针线厚实，能够极好地防止丝线磨损脱落。",
    culture: "代表了家族联结与世代相传的决心，生命力的顽强延续。",
    features: ["结实耐磨", "锁链边缘", "立体浮雕质感"]
  },
  {
    id: "emb_3",
    name: "盘花绣",
    description: "将彩色线绳层层盘旋绣于布料之上，形成宛如花盘、云雷般的厚实颗粒图案，极具浮雕感。",
    culture: "盘绕的纹路象征生命的循环、山川的环抱与对丰收和幸福的祝愿。",
    features: ["彩绳盘覆", "颗粒感强", "渐变云气纹"]
  },
  {
    id: "emb_4",
    name: "密集弧线锁边绣",
    description: "在折边及受力部位施以极其紧密的孤线锁针，既保护面料边缘，又自带精美的波浪形边饰。",
    culture: "象征水波与大地的边界，是对守护家园与自然的古老隐喻。",
    features: ["高抗拉强度", "自然波动感", "精细微米排布"]
  }
];

export const SILVER_CRAFTS: CraftDetail[] = [
  {
    id: "sil_1",
    name: "手工锻打",
    description: "九九九足银经过千百次捶打，反复烧红退火，消除材料内应力，令银体紧致坚韧，表面留下温润的手工锤印。",
    culture: "蕴含不屈不挠、千锤百炼的匠人风骨，寓意坚不可摧的精神力量。",
    features: ["手工微坑肌理", "纳米级韧化", "恒温红退火"]
  },
  {
    id: "sil_2",
    name: "纹式浮雕",
    description: "用特制錾子在银片正面敲击，压出立体感极强的动植物及图腾纹样，使纹饰微微隆起，立体生动。",
    culture: "生动复刻古老的图腾故事与大自然的草木，承载历史记忆。",
    features: ["三维浮特立体", "暗纹对比", "精准力道控制"]
  },
  {
    id: "sil_3",
    name: "镂空錾刻",
    description: "镂空雕刻工艺。去除多余的金属部分，只留下繁复如蛛网、如蕾丝般精致的镂空花纹，极度考验腕力精密度。",
    culture: "虚实相生的哲学，体现了彝族先民对太空、轻盈与呼吸感之美的追求。",
    features: ["高空贯通镂刻", "边缘圆滑处理", "复杂几何网格"]
  },
  {
    id: "sil_4",
    name: "肌理抛光",
    description: "不依赖任何机器，纯手工使用玛瑙刀、皮革对银饰表面反复推亮抹平，形成深邃而含蓄的奢华宝光。",
    culture: "内敛而不张扬的东方审美，让悠长岁月的温润留在饰物表面。",
    features: ["古法玛瑙抛光", "非镜面油润光泽", "抗氧化保护层"]
  }
];

export const EXPLORE_CARDS = [
  {
    id: "explore_1",
    title: "作品收藏",
    subtitle: "每一只「彝韵·云栖」手袋，均由彝族非遗匠人限量制作，仅以编号形式发行。全球限量 108 只，每一只皆有专属身份编号及收藏证书，承载的不仅是手艺与美学，更是一段正在被世界看见的文化记忆。",
    linkText: "了解收藏信息及编号规则"
  },
  {
    id: "explore_2",
    title: "非遗溯源",
    subtitle: "跨越千年的彝族文明，孕育出独树一帜的服饰图腾与银饰传说。深入探索大凉山针尖上的彩虹、锤击下的月光，理解那些镌刻在指尖工艺深处的历史血脉与族群故事。",
    linkText: "解锁非遗深度历史文献"
  },
  {
    id: "explore_3",
    title: "文化共创",
    subtitle: "Fendi携手中国美术学院及公益伙伴，启动针对大凉山留守手工艺群体的长期共创行动。通过设计工作坊、艺术交流和扶贫基地援建，以可持续的时尚力量，携手守护、活化中国非物质文化遗产。",
    linkText: "了解文化共创计划及成果"
  }
];

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    label: "赋能匠人",
    value: "2,860+",
    description: "通过专业技术培训、物料赞助及设计方向指导，让深山百名绣娘、银匠成为现代时尚链条上的核心合作手工艺人。",
    icon: "Users"
  },
  {
    label: "女性就业",
    value: "1,370+",
    description: "在大凉山建立合作社，帮助超过一千位留守妇女在家乡通过刺绣获得稳定劳动和经济收益，实现居家安心增收。",
    icon: "Briefcase"
  },
  {
    label: "年收入增长",
    value: "186% ↗",
    description: "直接提升贫困地区非遗传承从业者订单价格。项目开展以来，当地深度合作绣娘年平均家庭手工折合收入增长近两倍。",
    icon: "TrendingUp"
  },
  {
    label: "国际曝光",
    value: "98+ 国家",
    description: "该限量版手袋先后在米兰、巴黎、东京、伦敦等核心时尚大都市的高级旗舰会所、艺术画廊巡展，广泛获得国际声誉。",
    icon: "Globe"
  }
];

export const CHART_DATA: ChartDataPoint[] = [
  { year: 2021, index: 15 },
  { year: 2022, index: 32 },
  { year: 2023, index: 56 },
  { year: 2024, index: 88 },
  { year: 2025, index: 110 }
];

export const PRESET_COMMENTS: Comment[] = [
  {
    id: "preset_1",
    author: "林小米",
    location: "成都",
    content: "每一针每一线，都藏着彝族的智慧与温度，感谢你们让它被更多人看见。",
    date: "2026.05.20",
    avatarColor: "bg-red-900 border-yellow-500"
  },
  {
    id: "preset_2",
    author: "阿布达比的小旅人",
    location: "上海",
    content: "这不仅是时尚，更是文化的传递与共鸣，为匠心与坚持点赞！",
    date: "2026.05.18",
    avatarColor: "bg-amber-900 border-amber-500"
  },
  {
    id: "preset_3",
    author: "Sunset山河",
    location: "杭州",
    content: "在快节奏的世界里，看到你们对传统的坚守，内心充满感动与敬意。",
    date: "2026.05.15",
    avatarColor: "bg-emerald-900 border-emerald-500"
  },
  {
    id: "preset_4",
    author: "Suzy_qiqi",
    location: "深圳",
    content: "彝绣的美，是时间沉淀的艺术，愿这份美好一直延续下去，期待更多精彩。",
    date: "2026.05.12",
    avatarColor: "bg-violet-900 border-violet-500"
  }
];
