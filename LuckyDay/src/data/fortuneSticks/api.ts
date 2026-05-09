import type { FortuneStick, StickType } from './types'

const API_ID = '10016472'
const API_KEY = 'd1f7bef7893ec5dfc39e86d5879a19a0'
const API_BASE = 'https://cn.apihz.cn/api/mingli'

export async function fetchFromApi(type: StickType): Promise<FortuneStick | null> {
  const randomNumber = Math.floor(Math.random() * 100) + 1
  const url = type === 'zhuge'
    ? `${API_BASE}/zhuge.php?id=${API_ID}&key=${API_KEY}&number=${randomNumber}`
    : `${API_BASE}/${type}.php?id=${API_ID}&key=${API_KEY}&number=${randomNumber}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.code === 200) {
    const stick = parseApiResponse(type, data.data || data)
    if (stick.xuhao && stick.qianwen) {
      return stick
    }
  }

  throw new Error(data.msg || '获取签文失败')
}

function parseApiResponse(type: StickType, apiData: Record<string, unknown>): FortuneStick {
  switch (type) {
    case 'guanyin':
      return {
        xuhao: String(apiData.xuhao || apiData.res1 || ''),
        qianming: String(apiData.qianming || '').split('。')[0],
        qianwen: String(apiData.qianwen || apiData.res3 || '').replace(/\|/g, ''),
        jieyue: String(apiData.jieyue || apiData.qianyu || '').replace(/\|/g, ''),
        xianji: String(apiData.xianji || '').replace(/\|/g, ''),
        diangu: String(apiData.diangu || '').replace(/\|/g, ''),
      }
    case 'guandi':
      return {
        xuhao: String(apiData.res1 || ''),
        qianming: String(apiData.res2 || '').replace(/第.*签\s*/, '').replace(/\s*[\u4e00-\u9fa5]+签$/, ''),
        qianwen: String(apiData.res3 || '').replace(/\|/g, '\n'),
        jieyue: String(apiData.res6 || apiData.res4 || ''),
        xianji: String(apiData.res5 || '').replace(/\|/g, ''),
        diangu: '',
      }
    case 'yuelao':
      return {
        xuhao: String(apiData.res1 || ''),
        qianming: String(apiData.res2 || '').replace(/月老灵签/, '').split(' ')[0],
        qianwen: String(apiData.res3 || '').replace(/\|/g, ''),
        jieyue: String(apiData.res4 || '').replace(/\|/g, ''),
        xianji: '',
        diangu: '',
      }
    case 'zhuge':
      return {
        xuhao: String(apiData.res1 || ''),
        qianming: String(apiData.res2 || '').split('|')[1] || String(apiData.res1 || ''),
        qianwen: String(apiData.res2 || '').split('|')[0] || '',
        jieyue: String(apiData.res3 || '').replace(/\|/g, ''),
        xianji: '',
        diangu: '',
      }
    default:
      throw new Error(`不支持的类型: ${type}`)
  }
}
