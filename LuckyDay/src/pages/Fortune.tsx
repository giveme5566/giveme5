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
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="text-[100px] font-extralight text-gray-800 leading-none mb-2 tracking-tighter">
              {day}
            </div>
            <div className="text-sm text-gray-400 tracking-widest">
              {year}.{String(month).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-300 mt-1 tracking-wider">
              星期{weekday}
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-block px-3 py-1 bg-orange-50 text-orange-500 text-xs rounded-full">
              {lunarInfo.zodiac}年 · {lunarInfo.lunarDate}
            </div>
            {lunarInfo.节气 && (
              <div className="text-xs text-gray-400 mt-2">{lunarInfo.节气}</div>
            )}
            {lunarInfo.节日.length > 0 && (
              <div className="flex justify-center gap-2 mt-1">
                {lunarInfo.节日.map((festival) => (
                  <span key={festival} className="text-xs text-pink-500">
                    {festival}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-lg">宜</span>
              </div>
              <div className="space-y-1.5">
                {lunarInfo.yi.map((item, idx) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-4">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-lg">忌</span>
              </div>
              <div className="space-y-1.5">
                {lunarInfo.ji.map((item, idx) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
