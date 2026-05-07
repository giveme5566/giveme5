import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getLunarInfo } from '../utils/lunar'
import type { LunarInfo } from '../utils/lunar'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default function Fortune() {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo | null>(null)
  const [currentDate] = useState(new Date())

  useEffect(() => {
    getLunarInfo().then(info => {
      setLunarInfo(info)
    })
  }, [])

  if (!lunarInfo) {
    return (
      <PageWrapper title="今日运势">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">加载中...</div>
        </div>
      </PageWrapper>
    )
  }

  const day = currentDate.getDate()
  const weekday = WEEKDAYS[currentDate.getDay()]
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  return (
    <PageWrapper title="今日运势">
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-400">
              {lunarInfo.zodiac}年 · {lunarInfo.lunarDate}
            </div>
            <div className="text-xs text-gray-400">
              {lunarInfo.节气 || (lunarInfo.节日.length > 0 ? lunarInfo.节日.join(' ') : '')}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">宜</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {lunarInfo.yi.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 bg-slate-50 rounded-full text-xs text-gray-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">忌</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {lunarInfo.ji.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 bg-slate-50 rounded-full text-xs text-gray-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center text-xs text-gray-400">
            <span className="font-medium">{year}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')}</span>
            <span className="mx-2">·</span>
            <span>星期{weekday}</span>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
