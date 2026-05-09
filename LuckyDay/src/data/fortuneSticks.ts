export interface FortuneStick {
  xuhao: string
  qianming: string
  qianwen: string
  jieyue: string
  xianji: string
  diangu: string
}

export interface Scene {
  id: string
  name: string
  desc: string
  sticks: StickOption[]
}

export interface StickOption {
  type: 'guanyin' | 'guandi' | 'yuelao' | 'zhuge' | 'huangdaxian'
  name: string
  desc: string
  priority?: number
}

export const fortuneSticks: Record<string, FortuneStick[]> = {
  guanyin: [],
  guandi: [],
  yuelao: [],
  zhuge: [],
  huangdaxian: [],
}

export const scenes: Scene[] = [
  {
    id: 'love',
    name: '感情·姻缘',
    desc: '为单身、恋爱、婚姻等情感问题提供指引',
    sticks: [
      { type: 'yuelao', name: '月老灵签', desc: '专管世间姻缘，为单身、恋爱、婚姻等情感问题提供指引。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲普度，也可询问感情缘分与婚姻走向。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，灵验迅速，涵盖情感困惑。' },
    ],
  },
  {
    id: 'career',
    name: '事业·求职',
    desc: '为事业晋升、求职方向提供决断',
    sticks: [
      { type: 'guandi', name: '关帝灵签', desc: '武财神兼忠义化身，为事业晋升、求职方向提供决断。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，对职场抉择、工作变动给出明确提示。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲护佑，可询问事业发展中的顺逆。' },
      { type: 'zhuge', name: '诸葛神签', desc: '智谋深邃，384签，为复杂职场问题提供思路启发。' },
    ],
  },
  {
    id: 'wealth',
    name: '财运·生意',
    desc: '为财运、生意、投资等财务相关',
    sticks: [
      { type: 'guandi', name: '关帝灵签', desc: '武财神信仰，专问财运、生意、投资等财务相关。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，可指点经商得失与财富波动。' },
      { type: 'guanyin', name: '观音灵签', desc: '普度众生，也可询问财运起伏与求财时机。' },
    ],
  },
  {
    id: 'study',
    name: '学业·考试',
    desc: '为考试升学、学业进步提供兆示',
    sticks: [
      { type: 'guandi', name: '关帝灵签', desc: '关帝亦主文昌，为考试升学、学业进步提供兆示。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，适合询问学业成绩与备考方向。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲护念，可祈求考试顺利、学业精进。' },
      { type: 'zhuge', name: '诸葛神签', desc: '智慧象征，384签，为学习方法、答题策略带来灵感。' },
    ],
  },
  {
    id: 'health',
    name: '健康·康复',
    desc: '为疾病康复、身体安康',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '救苦救难，最常用于询问疾病康复、身体安康。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，对健康问题给予吉凶提示。' },
      { type: 'guandi', name: '关帝灵签', desc: '关帝祛病除灾的传说，也可询问身体状况。' },
    ],
  },
  {
    id: 'home',
    name: '家宅·平安',
    desc: '为家宅安宁、全家平安顺遂',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '保佑家宅安宁、全家平安顺遂。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，可询问家居风水、家族和谐。' },
    ],
  },
  {
    id: 'travel',
    name: '出行·旅途',
    desc: '为旅行、出差、搬家等',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '护佑路途平安，适合询问旅行、出差、搬家等。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，对出行安全与旅途顺利给出指引。' },
    ],
  },
  {
    id: 'confused',
    name: '迷茫·抉择',
    desc: '为人生岔路、决策犹豫提供启发',
    sticks: [
      { type: 'zhuge', name: '诸葛神签', desc: '智谋深远，384签，为人生岔路、决策犹豫提供启发。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，可帮助理清思路、指明方向。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲开示，也能在迷茫时给予心灵慰藉。' },
    ],
  },
  {
    id: 'lawsuit',
    name: '诉讼·是非',
    desc: '为官司纠纷、是非对错给出明确凶吉',
    sticks: [
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，对官司纠纷、是非对错给出明确凶吉。' },
      { type: 'guandi', name: '关帝灵签', desc: '关帝正义化身，可询问诉讼成败与公正。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲化解，也能为口舌是非提供指引。' },
    ],
  },
  {
    id: 'child',
    name: '求子·育儿',
    desc: '为求子、怀孕、子女养育',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '"观音送子"信仰，专问求子、怀孕、子女养育。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，也可询问生育时机与孩子成长。' },
    ],
  },
  {
    id: 'random',
    name: '综合·随缘',
    desc: '无特定方向、随缘求签',
    sticks: [
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '有求必应，适合无特定方向、随缘求签。' },
      { type: 'guanyin', name: '观音灵签', desc: '普度众生，也适用于日常随喜、求个心安。' },
      { type: 'guandi', name: '关帝灵签', desc: '武财神信仰，问事广泛，灵验度高。' },
      { type: 'zhuge', name: '诸葛神签', desc: '智谋深邃，384签，启迪智慧。' },
    ],
  },
]

export async function fetchFortuneStick(
  type: 'guanyin' | 'guandi' | 'yuelao' | 'zhuge' | 'huangdaxian',
  id: string = '10016472',
  key: string = 'd1f7bef7893ec5dfc39e86d5879a19a0'
): Promise<FortuneStick | null> {
  try {
    let randomNumber: number
    let url: string

    if (type === 'zhuge') {
      randomNumber = Math.floor(Math.random() * 384) + 1
      url = `https://cn.apihz.cn/api/mingli/zhuge.php?id=${id}&key=${key}&number=${randomNumber}`
    } else {
      randomNumber = Math.floor(Math.random() * 100) + 1
      url = `https://cn.apihz.cn/api/mingli/${type}.php?id=${id}&key=${key}&number=${randomNumber}`
    }

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

export const stickCounts: Record<string, number> = {
  guanyin: 100,
  guandi: 100,
  yuelao: 100,
  zhuge: 384,
  huangdaxian: 100,
}
