export type CupResult = 'shengbei' | 'xiaobei-yin' | 'xiaobei-yang'

export interface CupResultInfo {
  type: CupResult
  name: string
  description: string
  meaning: string
}

export const CUP_RESULTS: Record<CupResult, CupResultInfo> = {
  'shengbei': {
    type: 'shengbei',
    name: '圣杯',
    description: '一阴一阳',
    meaning: '神明许诺，愿望可行'
  },
  'xiaobei-yin': {
    type: 'xiaobei-yin',
    name: '笑杯',
    description: '二阴面',
    meaning: '神明笑拒，事不宜行'
  },
  'xiaobei-yang': {
    type: 'xiaobei-yang',
    name: '笑杯',
    description: '二阳面',
    meaning: '神明犹豫，需要再掷'
  }
}
