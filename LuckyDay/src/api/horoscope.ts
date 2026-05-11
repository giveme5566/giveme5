import type { ZodiacSign } from '../data/zodiac'

export interface FortuneScores {
  all: number
  love: number
  wealth: number
  work: number
  health?: number
}

export interface HoroscopeData {
  today: {
    summary: string
    love: string
    wealth: string
    work: string
    notice: string
    luckyNumber: string
    luckyTime: string
    luckyColor: string
    luckyStar: string
    scores: FortuneScores
    hasText: boolean
  }
  week: {
    summary: string
    love: string
    wealth: string
    work: string
    health: string
    notice: string
    luckyNumber: string
    luckyDay: string
    luckyColor: string
    luckyStar: string
    unluckyStar: string
    scores: FortuneScores
    hasText: boolean
  }
  month: {
    summary: string
    love: string
    wealth: string
    work: string
    advantage: string
    weakness: string
    luckyStar: string
    unluckyStar: string
    fateStar: string
    scores: FortuneScores
    hasText: boolean
  }
}

const API_KEY = 'q6U9OaObcReJxJGyVyn4E1T4bB'
const API_BASE = 'https://www.52api.cn/api/constellation'

// 星座ID映射（从英文到API用的拼音）
const zodiacMapping: Record<string, string> = {
  'aries': 'baiyang',
  'taurus': 'jinniu',
  'gemini': 'shuangzi',
  'cancer': 'juxie',
  'leo': 'shizi',
  'virgo': 'chunv',
  'libra': 'tiancheng',
  'scorpio': 'tianxie',
  'sagittarius': 'sheshou',
  'capricorn': 'mojie',
  'aquarius': 'shuiping',
  'pisces': 'shuangyu'
}

// 根据评分生成运势描述
function generateFortuneDesc(score: number, type: string): string {
  const descMap: Record<number, string[]> = {
    100: [`${type}极佳，是展现自我的好时机`, `${type}非常顺利，把握机会`, `${type}满分，尽情享受`],
    80: [`${type}良好，保持积极心态`, `${type}不错，稳步推进`, `${type}较好，继续努力`],
    60: [`${type}平稳，稳中求进`, `${type}一般，保持耐心`, `${type}平淡，调整状态`],
    40: [`${type}欠佳，需要谨慎`, `${type}低迷，保持低调`, `${type}不顺，静待时机`],
    20: [`${type}较差，多加小心`, `${type}低迷，避免冲动`, `${type}困难，坚持度过`]
  }
  
  // 找到最接近的评分档位
  const scores = [100, 80, 60, 40, 20]
  const closestScore = scores.find(s => score >= s - 10) || 20
  const descs = descMap[closestScore]
  return descs[Math.floor(Math.random() * descs.length)]
}

// 解析评分
function parseScore(info: string[], keyword: string): number {
  const item = info.find((i: string) => i.includes(keyword))
  if (!item) return 60
  const match = item.match(/(\d+)/)
  return match ? parseInt(match[1]) : 60
}

// 解析info字段
function parseInfoItem(info: string[], keyword: string): string {
  const item = info.find((i: string) => i.includes(keyword))
  return item ? item.replace(`${keyword}：`, '').trim() : ''
}

// 检查是否有实际文本描述
function hasActualText(list: Array<{ title: string; desc: string }>): boolean {
  if (!list || list.length === 0) return false
  return list.some(item => item.desc && item.desc.trim().length > 0)
}

// 从list中提取文本描述
function extractTextFromList(list: Array<{ title: string; desc: string }>, keyword: string): string {
  if (!list) return ''
  const item = list.find((i: { title: string; desc: string }) => i.title.includes(keyword))
  return item?.desc?.trim() || ''
}

export async function fetchHoroscope(zodiacId: string): Promise<HoroscopeData | null> {
  const starName = zodiacMapping[zodiacId]
  if (!starName) {
    console.error('Unknown zodiac:', zodiacId)
    throw new Error(`Unknown zodiac: ${zodiacId}`)
  }

  // 添加超时控制
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(`${API_BASE}?key=${API_KEY}&star=${starName}&type=today`, {
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

    if (!data.data) {
      throw new Error('API returned empty data')
    }

    const zodiacData = data.data[zodiacId.charAt(0).toUpperCase() + zodiacId.slice(1)]
    if (!zodiacData || !zodiacData.detail) {
      throw new Error(`No detail data for zodiac: ${zodiacId}`)
    }

    const detail = zodiacData.detail

    // 解析今日运势
    const todayInfo = detail.today?.info || []
    const todayList = detail.today?.list || []
    const todayScores = {
      all: parseScore(todayInfo, '综合运势'),
      love: parseScore(todayInfo, '爱情运势'),
      wealth: parseScore(todayInfo, '财富运势'),
      work: parseScore(todayInfo, '工作运势')
    }
    const todayHasText = hasActualText(todayList)

    // 解析本周运势
    const weekInfo = detail.weeks?.info || []
    const weekList = detail.weeks?.list || []
    const weekScores = {
      all: parseScore(weekInfo, '综合运势'),
      love: parseScore(weekInfo, '爱情运势'),
      wealth: parseScore(weekInfo, '财富运势'),
      work: parseScore(weekInfo, '工作运势'),
      health: parseScore(weekInfo, '健康运势')
    }
    const weekHasText = hasActualText(weekList)

    // 解析本月运势
    const monthInfo = detail.month?.info || []
    const monthList = detail.month?.list || []
    const monthScores = {
      all: parseScore(monthInfo, '综合运势'),
      love: parseScore(monthInfo, '爱情运势'),
      wealth: parseScore(monthInfo, '财富运势'),
      work: parseScore(monthInfo, '工作运势')
    }
    const monthHasText = hasActualText(monthList)

    return {
      today: {
        summary: extractTextFromList(todayList, '概述'),
        love: extractTextFromList(todayList, '爱情'),
        wealth: extractTextFromList(todayList, '财富'),
        work: extractTextFromList(todayList, '事业'),
        notice: todayScores.all >= 80 ? '今日运势不错，把握机会' : todayScores.all >= 60 ? '保持平常心，稳中求进' : '今日需谨慎，避免冲动',
        luckyNumber: parseInfoItem(todayInfo, '幸运数字'),
        luckyTime: parseInfoItem(todayInfo, '幸运时间'),
        luckyColor: parseInfoItem(todayInfo, '幸运颜色'),
        luckyStar: parseInfoItem(todayInfo, '贵人星座'),
        scores: todayScores,
        hasText: todayHasText
      },
      week: {
        summary: extractTextFromList(weekList, '概述'),
        love: extractTextFromList(weekList, '爱情'),
        wealth: extractTextFromList(weekList, '财富'),
        work: extractTextFromList(weekList, '事业'),
        health: extractTextFromList(weekList, '健康'),
        notice: weekScores.all >= 80 ? '本周运势较好，积极行动' : weekScores.all >= 60 ? '本周平稳，按部就班' : '本周需谨慎，稳扎稳打',
        luckyNumber: parseInfoItem(weekInfo, '幸运数字'),
        luckyDay: parseInfoItem(weekInfo, '幸运时间'),
        luckyColor: parseInfoItem(weekInfo, '幸运颜色'),
        luckyStar: parseInfoItem(weekInfo, '贵人星座'),
        unluckyStar: parseInfoItem(weekInfo, '小人星座'),
        scores: weekScores,
        hasText: weekHasText
      },
      month: {
        summary: extractTextFromList(monthList, '概述'),
        love: extractTextFromList(monthList, '爱情'),
        wealth: extractTextFromList(monthList, '财富'),
        work: extractTextFromList(monthList, '事业'),
        advantage: monthScores.all >= 80 ? '运势强劲，把握机遇' : monthScores.all >= 60 ? '稳中有进，持续努力' : '需要耐心，厚积薄发',
        weakness: monthScores.all >= 80 ? '避免骄傲，保持谦逊' : monthScores.all >= 60 ? '注意细节，防范风险' : '谨慎行事，避免冲动',
        luckyStar: parseInfoItem(monthInfo, '贵人星座'),
        unluckyStar: parseInfoItem(monthInfo, '小人星座'),
        fateStar: parseInfoItem(monthInfo, '缘份星座'),
        scores: monthScores,
        hasText: monthHasText
      }
    }
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('Fetch horoscope error:', error)
    throw error
  }
}
