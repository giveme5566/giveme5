// Yes or No 模块语料 - 简化版，只有 YES 和 NO

export type YesNoResult = 'yes' | 'no'

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

interface FullResult {
  result: YesNoResult
  card: YesNoCard
}

// 生成结果：50% yes / 50% no
export function getYesNoResult(): FullResult {
  const result: YesNoResult = Math.random() < 0.5 ? 'yes' : 'no'
  const pool = result === 'yes' ? yesCards : noCards
  const card = pool[Math.floor(Math.random() * pool.length)]
  return { result, card }
}
