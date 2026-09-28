// Yes or No 模块语料
// 每个结果包含：核心答案 + 倾向度 + 解释文本

export type YesNoResult = 'yes' | 'no' | 'maybe'

export interface YesNoCard {
  type: YesNoResult
  text: string
}

// YES 的解释语料
export const yesCards: YesNoCard[] = [
  { type: 'yes', text: '答案是肯定的，放手去做吧' },
  { type: 'yes', text: '是的，现在正是好时机' },
  { type: 'yes', text: '毫无疑问，跟随内心的指引' },
  { type: 'yes', text: '去吧，你不会后悔的' },
  { type: 'yes', text: '这是对的选择，勇敢迈出第一步' },
  { type: 'yes', text: '星星都在为你点头，大胆行动' },
  { type: 'yes', text: '是的，你的直觉没有错' },
  { type: 'yes', text: '答案藏在"是"里，相信自己' },
  { type: 'yes', text: '可以的，这件事值得你投入' },
  { type: 'yes', text: '没错，继续向前，结果会令你惊喜' },
]

// NO 的解释语料
export const noCards: YesNoCard[] = [
  { type: 'no', text: '现在还不是时候，再等等看' },
  { type: 'no', text: '答案是否定的，三思而后行' },
  { type: 'no', text: '这条路暂时走不通，换个方向' },
  { type: 'no', text: '别急，这件事需要更多准备' },
  { type: 'no', text: '不建议现在做决定，先观察一段时间' },
  { type: 'no', text: '这件事背后有你没看到的风险' },
  { type: 'no', text: '答案是"不"，但不代表永远不行' },
  { type: 'no', text: '再等等，时机尚未成熟' },
  { type: 'no', text: '这件事可能会让你失望，谨慎为好' },
  { type: 'no', text: '不，现在放下会比坚持更轻松' },
]

// MAYBE 的解释语料（中间态，增加趣味）
export const maybeCards: YesNoCard[] = [
  { type: 'maybe', text: '模棱两可，答案取决于你的选择' },
  { type: 'maybe', text: '不确定，多问问身边信任的人' },
  { type: 'maybe', text: '这不是简单的是或非，需要你自己权衡' },
  { type: 'maybe', text: '答案在你心里，静下心来听听' },
  { type: 'maybe', text: '说不准，再给自己一点时间考虑' },
  { type: 'maybe', text: '看情况，关键在于你有多想要' },
  { type: 'maybe', text: '这个问题没有标准答案，跟随直觉' },
  { type: 'maybe', text: '硬币在空中翻转，决定权在你' },
]

interface FullResult {
  result: YesNoResult
  card: YesNoCard
  confidence: number // 0-100 倾向度
}

// 生成结果：60% yes / 30% no / 10% maybe（可调整概率）
export function getYesNoResult(): FullResult {
  const rand = Math.random()
  let result: YesNoResult
  let pool: YesNoCard[]

  if (rand < 0.6) {
    result = 'yes'
    pool = yesCards
  } else if (rand < 0.9) {
    result = 'no'
    pool = noCards
  } else {
    result = 'maybe'
    pool = maybeCards
  }

  const card = pool[Math.floor(Math.random() * pool.length)]
  // 倾向度 60-99
  const confidence = Math.floor(Math.random() * 40) + 60

  return { result, card, confidence }
}
