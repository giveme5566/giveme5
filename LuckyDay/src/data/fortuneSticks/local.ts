import huangdaxianData from './local/huangdaxian.json'
import type { FortuneStick, StickType } from './types'

const localData: Record<string, FortuneStick[]> = {
  huangdaxian: huangdaxianData.sticks as FortuneStick[],
}

export function getLocalSticks(type: StickType): FortuneStick[] {
  return localData[type] || []
}

export function getRandomLocalStick(type: StickType): FortuneStick | null {
  const sticks = localData[type]
  if (!sticks || sticks.length === 0) {
    return null
  }
  const randomIndex = Math.floor(Math.random() * sticks.length)
  return sticks[randomIndex]
}
