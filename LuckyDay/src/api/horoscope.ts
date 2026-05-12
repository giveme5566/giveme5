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
  luckyNumber: string
  luckyColor: string
  luckyStar: string
  scores: FortuneScores
}

const API_KEY = '43bf776bd9aa457b8183f3e38b9af778'
const API_BASE = 'https://apis.tianapi.com/star/index'

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

function parseIndex(content: string): number {
  const match = content.match(/(\d+)/)
  return match ? parseInt(match[1]) : 60
}

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

    const scores = {
      all: parseIndex(extractFromList(list, '综合指数')),
      love: parseIndex(extractFromList(list, '爱情指数')),
      wealth: parseIndex(extractFromList(list, '财运指数')),
      work: parseIndex(extractFromList(list, '工作指数')),
      health: parseIndex(extractFromList(list, '健康指数'))
    }

    return {
      summary: extractFromList(list, '今日概述'),
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
