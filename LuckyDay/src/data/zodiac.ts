export interface ZodiacSign {
  id: string
  name: string
  dateRange: string
  element: '火' | '土' | '风' | '水'
  symbol: string
  traits: string[]
  luckyNumbers: number[]
  luckyColors: string[]
  compatible: string[]
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 'aries',
    name: '白羊座',
    dateRange: '3.21 - 4.19',
    element: '火',
    symbol: '♈',
    traits: ['热情', '冲动', '勇敢', '自信'],
    luckyNumbers: [1, 9, 17],
    luckyColors: ['红色', '橙色'],
    compatible: ['狮子座', '射手座', '双子座']
  },
  {
    id: 'taurus',
    name: '金牛座',
    dateRange: '4.20 - 5.20',
    element: '土',
    symbol: '♉',
    traits: ['稳重', '务实', '耐心', '可靠'],
    luckyNumbers: [2, 6, 15],
    luckyColors: ['绿色', '粉色'],
    compatible: ['处女座', '摩羯座', '巨蟹座']
  },
  {
    id: 'gemini',
    name: '双子座',
    dateRange: '5.21 - 6.21',
    element: '风',
    symbol: '♊',
    traits: ['机智', '好奇', '善变', '健谈'],
    luckyNumbers: [3, 12, 21],
    luckyColors: ['黄色', '蓝色'],
    compatible: ['天秤座', '水瓶座', '白羊座']
  },
  {
    id: 'cancer',
    name: '巨蟹座',
    dateRange: '6.22 - 7.22',
    element: '水',
    symbol: '♋',
    traits: ['温柔', '敏感', '顾家', '直觉强'],
    luckyNumbers: [4, 13, 22],
    luckyColors: ['银色', '白色'],
    compatible: ['天蝎座', '双鱼座', '金牛座']
  },
  {
    id: 'leo',
    name: '狮子座',
    dateRange: '7.23 - 8.22',
    element: '火',
    symbol: '♌',
    traits: ['自信', '慷慨', '领导力', '创造力'],
    luckyNumbers: [5, 14, 23],
    luckyColors: ['金色', '橙色'],
    compatible: ['白羊座', '射手座', '天秤座']
  },
  {
    id: 'virgo',
    name: '处女座',
    dateRange: '8.23 - 9.22',
    element: '土',
    symbol: '♍',
    traits: ['完美主义', '细心', '理性', '务实'],
    luckyNumbers: [6, 15, 24],
    luckyColors: ['棕色', '米色'],
    compatible: ['金牛座', '摩羯座', '巨蟹座']
  },
  {
    id: 'libra',
    name: '天秤座',
    dateRange: '9.23 - 10.23',
    element: '风',
    symbol: '♎',
    traits: ['优雅', '公正', '社交', '追求和谐'],
    luckyNumbers: [7, 16, 25],
    luckyColors: ['粉色', '蓝色'],
    compatible: ['双子座', '水瓶座', '狮子座']
  },
  {
    id: 'scorpio',
    name: '天蝎座',
    dateRange: '10.24 - 11.22',
    element: '水',
    symbol: '♏',
    traits: ['神秘', '专注', '洞察力强', '意志坚定'],
    luckyNumbers: [8, 17, 26],
    luckyColors: ['深红', '黑色'],
    compatible: ['巨蟹座', '双鱼座', '处女座']
  },
  {
    id: 'sagittarius',
    name: '射手座',
    dateRange: '11.23 - 12.21',
    element: '火',
    symbol: '♐',
    traits: ['自由', '乐观', '冒险', '诚实'],
    luckyNumbers: [9, 18, 27],
    luckyColors: ['紫色', '蓝色'],
    compatible: ['白羊座', '狮子座', '天秤座']
  },
  {
    id: 'capricorn',
    name: '摩羯座',
    dateRange: '12.22 - 1.19',
    element: '土',
    symbol: '♑',
    traits: ['自律', '有野心', '责任感', '实际'],
    luckyNumbers: [10, 19, 28],
    luckyColors: ['黑色', '深灰'],
    compatible: ['金牛座', '处女座', '天蝎座']
  },
  {
    id: 'aquarius',
    name: '水瓶座',
    dateRange: '1.20 - 2.18',
    element: '风',
    symbol: '♒',
    traits: ['独立', '创新', '人道主义', '理性'],
    luckyNumbers: [11, 20, 29],
    luckyColors: ['蓝色', '银色'],
    compatible: ['双子座', '天秤座', '射手座']
  },
  {
    id: 'pisces',
    name: '双鱼座',
    dateRange: '2.19 - 3.20',
    element: '水',
    symbol: '♓',
    traits: ['浪漫', '直觉', '同情心', '艺术感'],
    luckyNumbers: [12, 21, 30],
    luckyColors: ['海蓝', '紫色'],
    compatible: ['巨蟹座', '天蝎座', '摩羯座']
  }
]

export interface DailyFortune {
  overall: number
  love: number
  career: number
  wealth: number
  health: number
  summary: string
  advice: string
}

export function generateDailyFortune(zodiacId: string): DailyFortune {
  // 基于日期和星座ID生成伪随机运势
  const today = new Date()
  const seed = today.getDate() + today.getMonth() * 31 + zodiacId.charCodeAt(0)
  
  const random = (min: number, max: number) => {
    const x = Math.sin(seed + min) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }
  
  const summaries: Record<string, string[]> = {
    fire: ['今日充满活力，适合开展新计划', '热情高涨，人际关系顺利', '创意迸发，把握机会展现自我'],
    earth: ['稳扎稳打，今日适合处理细节工作', '脚踏实地，收获在望', '保持耐心，好事多磨'],
    air: ['思维敏捷，适合学习交流', '社交活跃，结识新朋友', '灵感涌现，记录你的想法'],
    water: ['直觉敏锐，相信内心的声音', '情感丰富，适合深度交流', '静水流深，享受独处时光']
  }
  
  const advices: Record<string, string[]> = {
    fire: ['保持热情但避免冲动', '分享你的能量给他人', '勇敢追求你的目标'],
    earth: ['适当放松，不要太过紧绷', '享受当下的美好', '相信积累的力量'],
    air: ['多倾听他人的想法', '把创意付诸行动', '保持开放的心态'],
    water: ['照顾好自己的情绪', '与信任的人分享感受', '给自己一些独处时间']
  }
  
  const zodiac = zodiacSigns.find(z => z.id === zodiacId)
  const element = zodiac?.element || 'fire'
  
  return {
    overall: random(70, 95),
    love: random(60, 98),
    career: random(65, 95),
    wealth: random(55, 90),
    health: random(70, 95),
    summary: summaries[element][random(0, 2)],
    advice: advices[element][random(0, 2)]
  }
}

export function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    '火': 'from-orange-400 to-red-500',
    '土': 'from-amber-600 to-yellow-700',
    '风': 'from-sky-400 to-blue-500',
    '水': 'from-indigo-400 to-purple-500'
  }
  return colors[element] || 'from-gray-400 to-gray-500'
}

export function getElementBgColor(element: string): string {
  const colors: Record<string, string> = {
    '火': 'bg-orange-50 border-orange-100',
    '土': 'bg-amber-50 border-amber-100',
    '风': 'bg-sky-50 border-sky-100',
    '水': 'bg-indigo-50 border-indigo-100'
  }
  return colors[element] || 'bg-gray-50 border-gray-100'
}
