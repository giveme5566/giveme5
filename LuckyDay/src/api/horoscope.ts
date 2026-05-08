import type { ZodiacSign } from '../data/zodiac'

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

    return {
      today: {
        summary: detail.today?.list?.find((item: any) => item.title?.includes('概述'))?.desc || '',
        love: detail.today?.list?.find((item: any) => item.title?.includes('爱情'))?.desc || '',
        wealth: detail.today?.list?.find((item: any) => item.title?.includes('财富'))?.desc || '',
        work: detail.today?.list?.find((item: any) => item.title?.includes('事业'))?.desc || '',
        notice: detail.today?.list?.find((item: any) => item.title?.includes('注意事项'))?.desc || '',
        luckyNumber: detail.today?.info?.find((item: string) => item.includes('幸运数字'))?.replace('幸运数字：', '') || '',
        luckyTime: detail.today?.info?.find((item: string) => item.includes('幸运时间'))?.replace('幸运时间：', '') || '',
        luckyColor: detail.today?.info?.find((item: string) => item.includes('幸运颜色'))?.replace('幸运颜色：', '') || '',
        luckyStar: detail.today?.info?.find((item: string) => item.includes('贵人星座'))?.replace('贵人星座：', '') || ''
      },
      week: {
        summary: detail.weeks?.list?.find((item: any) => item.title?.includes('概述'))?.desc || '',
        love: detail.weeks?.list?.find((item: any) => item.title?.includes('爱情'))?.desc || '',
        wealth: detail.weeks?.list?.find((item: any) => item.title?.includes('财富'))?.desc || '',
        work: detail.weeks?.list?.find((item: any) => item.title?.includes('事业'))?.desc || '',
        health: detail.weeks?.list?.find((item: any) => item.title?.includes('健康'))?.desc || '',
        notice: detail.weeks?.list?.find((item: any) => item.title?.includes('注意事项'))?.desc || '',
        luckyNumber: detail.weeks?.info?.find((item: string) => item.includes('幸运数字'))?.replace('幸运数字：', '') || '',
        luckyDay: detail.weeks?.info?.find((item: string) => item.includes('幸运时间'))?.replace('幸运时间：', '') || '',
        luckyColor: detail.weeks?.info?.find((item: string) => item.includes('幸运颜色'))?.replace('幸运颜色：', '') || '',
        luckyStar: detail.weeks?.info?.find((item: string) => item.includes('贵人星座'))?.replace('贵人星座：', '') || '',
        unluckyStar: detail.weeks?.info?.find((item: string) => item.includes('小人星座'))?.replace('小人星座：', '') || ''
      },
      month: {
        summary: detail.month?.list?.find((item: any) => item.title?.includes('概述'))?.desc || '',
        love: detail.month?.list?.find((item: any) => item.title?.includes('爱情'))?.desc || '',
        wealth: detail.month?.list?.find((item: any) => item.title?.includes('财富'))?.desc || '',
        work: detail.month?.list?.find((item: any) => item.title?.includes('事业'))?.desc || '',
        advantage: detail.month?.list?.find((item: any) => item.title?.includes('优势'))?.desc || '',
        weakness: detail.month?.list?.find((item: any) => item.title?.includes('弱势'))?.desc || '',
        luckyStar: detail.month?.info?.find((item: string) => item.includes('贵人星座'))?.replace('贵人星座：', '') || '',
        unluckyStar: detail.month?.info?.find((item: string) => item.includes('小人星座'))?.replace('小人星座：', '') || '',
        fateStar: detail.month?.info?.find((item: string) => item.includes('缘份星座'))?.replace('缘份星座：', '') || ''
      }
    }
  } catch (error) {
    clearTimeout(timeoutId)
    console.error('Fetch horoscope error:', error)
    throw error
  }
}
