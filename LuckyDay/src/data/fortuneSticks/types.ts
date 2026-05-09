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
  type: StickType
  name: string
  desc: string
}

export type StickType = 'guanyin' | 'guandi' | 'yuelao' | 'zhuge' | 'huangdaxian'

export type FetchMode = 'api' | 'local'

export interface StickConfig {
  type: StickType
  name: string
  count: number
  mode: FetchMode
}

export const stickConfigs: StickConfig[] = [
  { type: 'guanyin', name: '观音灵签', count: 100, mode: 'api' },
  { type: 'guandi', name: '关帝灵签', count: 100, mode: 'api' },
  { type: 'yuelao', name: '月老灵签', count: 100, mode: 'api' },
  { type: 'zhuge', name: '诸葛神签', count: 384, mode: 'api' },
  { type: 'huangdaxian', name: '黄大仙灵签', count: 100, mode: 'local' },
]

export const stickTypeNames: Record<StickType, string> = {
  guanyin: '观音灵签',
  guandi: '关帝灵签',
  yuelao: '月老灵签',
  zhuge: '诸葛神签',
  huangdaxian: '黄大仙灵签',
}

export const stickCounts: Record<StickType, number> = {
  guanyin: 100,
  guandi: 100,
  yuelao: 100,
  zhuge: 384,
  huangdaxian: 100,
}
