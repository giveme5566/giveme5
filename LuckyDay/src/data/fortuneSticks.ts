export interface FortuneStick {
  xuhao: string
  qianming: string
  qianwen: string
  jieyue: string
  xianji: string
  diangu: string
}

export const fortuneSticks: Record<string, FortuneStick[]> = {
  guanyin: [],
  guandi: [],
  yuelao: [],
  zhuge: [],
  huangdaxian: [],
}

export async function fetchFortuneStick(
  type: 'guanyin' | 'guandi' | 'yuelao' | 'zhuge' | 'huangdaxian',
  id: string = '10016472',
  key: string = 'd1f7bef7893ec5dfc39e86d5879a19a0'
): Promise<FortuneStick | null> {
  try {
    const randomNumber = Math.floor(Math.random() * 100) + 1
    const url = `https://cn.apihz.cn/api/mingli/${type}.php?id=${id}&key=${key}&number=${randomNumber}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.code === 200 && data.data) {
      const stick: FortuneStick = {
        xuhao: data.data.xuhao,
        qianming: data.data.qianming,
        qianwen: data.data.qianwen,
        jieyue: data.data.jieyue,
        xianji: data.data.xianji,
        diangu: data.data.diangu,
      }

      const existing = fortuneSticks[type].find(s => s.xuhao === stick.xuhao)
      if (!existing) {
        fortuneSticks[type].push(stick)
      }

      return stick
    }

    throw new Error(data.message || '获取签文失败')
  } catch (error) {
    console.error(`获取${type}签失败:`, error)
    return null
  }
}

export function getRandomStick(type: string): FortuneStick | null {
  const sticks = fortuneSticks[type]
  if (sticks.length === 0) return null
  const randomIndex = Math.floor(Math.random() * sticks.length)
  return sticks[randomIndex]
}

export const stickTypeNames: Record<string, string> = {
  guanyin: '观音灵签',
  guandi: '关帝灵签',
  yuelao: '月老灵签',
  zhuge: '诸葛神签',
  huangdaxian: '黄大仙签',
}

export const stickTypeDescs: Record<string, string> = {
  guanyin: '普陀山观音菩萨灵签',
  guandi: '关帝庙关圣帝君灵签',
  yuelao: '月下老人姻缘灵签',
  zhuge: '诸葛亮诸葛神签',
  huangdaxian: '黄大仙祠灵签',
}
