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

// 本地备用运势数据生成
function generateFallbackHoroscope(zodiacId: string): HoroscopeData {
  const zodiacNames: Record<string, string> = {
    'aries': '白羊座', 'taurus': '金牛座', 'gemini': '双子座', 'cancer': '巨蟹座',
    'leo': '狮子座', 'virgo': '处女座', 'libra': '天秤座', 'scorpio': '天蝎座',
    'sagittarius': '射手座', 'capricorn': '摩羯座', 'aquarius': '水瓶座', 'pisces': '双鱼座'
  }
  
  const zodiacName = zodiacNames[zodiacId] || '星座'
  const today = new Date()
  const seed = today.getDate() + today.getMonth() * 31 + zodiacId.charCodeAt(0)
  
  const random = (min: number, max: number) => {
    const x = Math.sin(seed + min) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }
  
  const luckyNumbers = ['3', '7', '9', '12', '18', '21', '25', '28']
  const luckyColors = ['红色', '橙色', '黄色', '绿色', '蓝色', '紫色', '粉色', '白色']
  const luckyStars = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
  
  return {
    today: {
      summary: `${zodiacName}今日整体运势平稳，适合处理日常事务。保持积极心态，会有不错的收获。`,
      love: '感情方面需要多沟通，单身者有机会遇到心仪对象，有伴侣者感情稳定。',
      wealth: '财运尚可，正财稳定，偏财方面不宜冒险投资，保守理财为佳。',
      work: '工作进展顺利，与同事合作愉快，适合推进重要项目。',
      notice: '注意劳逸结合，避免过度疲劳。',
      luckyNumber: luckyNumbers[random(0, luckyNumbers.length - 1)],
      luckyTime: `${random(9, 11)}:00-${random(14, 16)}:00`,
      luckyColor: luckyColors[random(0, luckyColors.length - 1)],
      luckyStar: luckyStars[random(0, luckyStars.length - 1)]
    },
    week: {
      summary: `本周${zodiacName}运势整体向好，工作上有新的机会出现，感情方面需要用心经营。`,
      love: '本周感情运势不错，单身者桃花运旺，有伴侣者关系更进一步。',
      wealth: '财运平稳，有小幅进账，但支出也有所增加，注意控制预算。',
      work: '事业运佳，工作表现出色，可能获得上司认可，有升职加薪机会。',
      health: '健康状况良好，注意保持规律作息，适当运动。',
      notice: '本周注意与同事的沟通方式，避免误会。',
      luckyNumber: luckyNumbers[random(0, luckyNumbers.length - 1)],
      luckyDay: '周三、周五',
      luckyColor: luckyColors[random(0, luckyColors.length - 1)],
      luckyStar: luckyStars[random(0, luckyStars.length - 1)],
      unluckyStar: luckyStars[random(0, luckyStars.length - 1)]
    },
    month: {
      summary: `本月${zodiacName}将迎来一个充满机遇的月份，事业和感情都有不错的发展空间。`,
      love: '本月感情运势较好，单身者有望脱单，有伴侣者感情甜蜜。',
      wealth: '财运呈上升趋势，正财稳定增长，可适当进行理财规划。',
      work: '事业运势强劲，工作表现突出，有机会承担更重要的职责。',
      advantage: '思维敏捷，执行力强，人际关系和谐。',
      weakness: '有时过于急躁，需要学会耐心等待。',
      luckyStar: luckyStars[random(0, luckyStars.length - 1)],
      unluckyStar: luckyStars[random(0, luckyStars.length - 1)],
      fateStar: luckyStars[random(0, luckyStars.length - 1)]
    }
  }
}

export async function fetchHoroscope(zodiacId: string): Promise<HoroscopeData | null> {
  try {
    const starName = zodiacMapping[zodiacId]
    if (!starName) {
      console.error('Unknown zodiac:', zodiacId)
      return generateFallbackHoroscope(zodiacId)
    }

    // 添加超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`${API_BASE}?key=${API_KEY}&star=${starName}&type=today`, {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn('API response not ok, using fallback:', response.status)
      return generateFallbackHoroscope(zodiacId)
    }

    const data = await response.json()

    if (data.code !== 200 || !data.data) {
      console.warn('API Error, using fallback:', data.msg)
      return generateFallbackHoroscope(zodiacId)
    }

    const zodiacData = data.data[zodiacId.charAt(0).toUpperCase() + zodiacId.slice(1)]
    if (!zodiacData || !zodiacData.detail) {
      console.warn('No data for zodiac, using fallback:', zodiacId)
      return generateFallbackHoroscope(zodiacId)
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
    console.warn('Fetch horoscope error, using fallback:', error)
    return generateFallbackHoroscope(zodiacId)
  }
}
