import type { ZodiacSign } from '../data/zodiac'

export interface FortuneScores {
  all: number
  love: number
  wealth: number
  work: number
  health: number
}

export interface HoroscopeData {
  summary: string
  love: string
  wealth: string
  work: string
  health: string
  luckyNumber: string
  luckyColor: string
  luckyStar: string
  scores: FortuneScores
}

const API_KEY = '43bf776bd9aa457b8183f3e38b9af778'
const API_BASE = 'https://apis.tianapi.com/star/index'

// 星座名称映射（从天行API用的中文名）
const zodiacNameMap: Record<string, string> = {
  'aries': '白羊座',
  'taurus': '金牛座',
  'gemini': '双子座',
  'cancer': '巨蟹座',
  'leo': '狮子座',
  'virgo': '处女座',
  'libra': '天秤座',
  'scorpio': '天蝎座',
  'sagittarius': '射手座',
  'capricorn': '摩羯座',
  'aquarius': '水瓶座',
  'pisces': '双鱼座'
}

// 解析指数（如"85%" -> 85）
function parseIndex(content: string): number {
  const match = content.match(/(\d+)/)
  return match ? parseInt(match[1]) : 60
}

// 从list中提取内容
function extractFromList(list: Array<{ type: string; content: string }>, typeName: string): string {
  const item = list.find((i: { type: string; content: string }) => i.type === typeName)
  return item?.content || ''
}

export async function fetchHoroscope(zodiacId: string): Promise<HoroscopeData | null> {
  const starName = zodiacNameMap[zodiacId]
  if (!starName) {
    console.error('Unknown zodiac:', zodiacId)
    throw new Error(`Unknown zodiac: ${zodiacId}`)
  }

  // 添加超时控制
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(`${API_BASE}?key=${API_KEY}&astro=${encodeURIComponent(starName)}`, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API response error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.code !== 200) {
      throw new Error(`API error: ${data.msg || 'Unknown error'} (code: ${data.code})`)
    }

    if (!data.result || !data.result.list) {
      throw new Error('API returned empty data')
    }

    const list = data.result.list

    // 解析各项数据
    const scores = {
      all: parseIndex(extractFromList(list, '综合指数')),
      love: parseIndex(extractFromList(list, '爱情指数')),
      wealth: parseIndex(extractFromList(list, '财运指数')),
      work: parseIndex(extractFromList(list, '工作指数')),
      health: parseIndex(extractFromList(list, '健康指数'))
    }

    // 解析今日概述文本
    const summaryText = extractFromList(list, '今日概述')

    return {
      summary: summaryText,
      love: scores.love >= 80 ? '爱情运势不错，把握机会' : scores.love >= 60 ? '爱情平稳，顺其自然' : '爱情运势一般，保持耐心',
      wealth: scores.wealth >= 80 ? '财运不错，适合理财' : scores.wealth >= 60 ? '财运平稳，量入为出' : '财运一般，谨慎投资',
      work: scores.work >= 80 ? '工作顺利，积极进取' : scores.work >= 60 ? '工作平稳，按部就班' : '工作有挑战，保持专注',
      health: scores.health >= 80 ? '健康状况良好' : scores.health >= 60 ? '健康状况平稳' : '注意休息，保持健康',
      luckyNumber: extractFromList(list, '幸运数字'),
      luckyColor: extractFromList(list, '幸运颜色'),
      luckyStar: extractFromList(list, '贵人星座'),
      scores
    }
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('Fetch horoscope error:', error)
    throw error
  }
}
