import { fetchFromApi } from './api'
import { getRandomLocalStick } from './local'
import type { FortuneStick, Scene, StickOption, StickType, FetchMode, StickConfig } from './types'
export * from './types'

const fetchModes: Record<StickType, FetchMode> = {
  guanyin: 'api',
  guandi: 'api',
  yuelao: 'api',
  zhuge: 'api',
  huangdaxian: 'local',
}

export function getFetchMode(type: StickType): FetchMode {
  return fetchModes[type]
}

export async function fetchFortuneStick(type: StickType): Promise<FortuneStick | null> {
  const mode = fetchModes[type]
  
  if (mode === 'local') {
    return getRandomLocalStick(type)
  }
  
  try {
    return await fetchFromApi(type)
  } catch (error) {
    console.error(`API 获取 ${type} 签失败，尝试本地数据:`, error)
    return getRandomLocalStick(type)
  }
}

export const scenes: Scene[] = [
  {
    id: 'love',
    name: '感情·姻缘',
    desc: '为单身、恋爱、婚姻等情感问题提供指引',
    sticks: [
      { type: 'yuelao', name: '月老灵签', desc: '专管世间姻缘，为单身、恋爱、婚姻等情感问题提供指引。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲普度，也可询问感情缘分与婚姻走向。' },
    ],
  },
  {
    id: 'career',
    name: '事业·求职',
    desc: '为事业晋升、求职方向提供决断',
    sticks: [
      { type: 'guandi', name: '关帝灵签', desc: '武财神兼忠义化身，为事业晋升、求职方向提供决断。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲护佑，可询问事业发展中的顺逆。' },
      { type: 'zhuge', name: '诸葛神签', desc: '智谋深邃，384签，为复杂职场问题提供思路启发。' },
    ],
  },
  {
    id: 'wealth',
    name: '财运·生意',
    desc: '为财运、生意，投资等财务相关',
    sticks: [
      { type: 'guandi', name: '关帝灵签', desc: '武财神信仰，专问财运、生意，投资等财务相关。' },
      { type: 'guanyin', name: '观音灵签', desc: '普度众生，也可询问财运起伏与求财时机。' },
    ],
  },
  {
    id: 'study',
    name: '学业·考试',
    desc: '为考试升学、学业进步提供兆示',
    sticks: [
      { type: 'guandi', name: '关帝灵签', desc: '关帝亦主文昌，为考试升学、学业进步提供兆示。' },
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
      { type: 'guandi', name: '关帝灵签', desc: '关帝祛病除灾的传说，也可询问身体状况。' },
    ],
  },
  {
    id: 'home',
    name: '家宅·平安',
    desc: '为家宅安宁、全家平安顺遂',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '保佑家宅安宁、全家平安顺遂。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '黄大仙以治病驱邪著称，也可保佑家宅平安。' },
    ],
  },
  {
    id: 'travel',
    name: '出行·旅途',
    desc: '为旅行、出差、搬家等',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '护佑路途平安，适合询问旅行、出差、搬家等。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '黄大仙有求必应，出行前求签保平安。' },
    ],
  },
  {
    id: 'confused',
    name: '迷茫·抉择',
    desc: '为人生岔路、决策犹豫提供启发',
    sticks: [
      { type: 'zhuge', name: '诸葛神签', desc: '智谋深远，384签，为人生岔路、决策犹豫提供启发。' },
      { type: 'guanyin', name: '观音灵签', desc: '慈悲开示，也能在迷茫时给予心灵慰藉。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '黄大仙灵签以准确著称，为迷茫者指点迷津。' },
    ],
  },
  {
    id: 'lawsuit',
    name: '诉讼·是非',
    desc: '为官司纠纷、是非对错给出明确凶吉',
    sticks: [
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
    ],
  },
  {
    id: 'random',
    name: '综合·随缘',
    desc: '无特定方向、随缘求签',
    sticks: [
      { type: 'guanyin', name: '观音灵签', desc: '普度众生，也适用于日常随喜、求个心安。' },
      { type: 'guandi', name: '关帝灵签', desc: '武财神信仰，问事广泛，灵验度高。' },
      { type: 'zhuge', name: '诸葛神签', desc: '智谋深邃，384签，启迪智慧。' },
      { type: 'huangdaxian', name: '黄大仙灵签', desc: '黄大仙灵签100签，有求必应。' },
    ],
  },
]
