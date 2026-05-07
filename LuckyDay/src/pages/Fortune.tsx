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
      <div className="px-5 py-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 mb-4">
            <div className="text-center mb-4">
              <div className="text-7xl font-thin text-gray-800 tracking-tighter leading-none mb-3">
                {day}
              </div>
              <div className="text-xs text-gray-400 tracking-widest">
                {year}.{String(month).padStart(2, '0')} · 星期{weekday}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-500 rounded-full">
                {lunarInfo.zodiac}年
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-400">{lunarInfo.lunarDate}</span>
              {lunarInfo.节气 && (
                <>
                  <span className="text-gray-300">·</span>
                  <span className="text-gray-400">{lunarInfo.节气}</span>
                </>
              )}
            </div>
            
            {lunarInfo.节日.length > 0 && (
              <div className="flex justify-center gap-2 mt-2">
                {lunarInfo.节日.map((festival) => (
                  <span key={festival} className="text-xs text-rose-400">
                    {festival}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-500 text-xs">宜</span>
                </div>
                <span className="text-sm font-medium text-gray-700">今日宜做</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {lunarInfo.yi.map((item) => (
                  <div
                    key={item}
                    className="bg-emerald-50 rounded-xl py-2 px-1 text-center"
                  >
                    <span className="text-xs text-emerald-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-rose-500 text-xs">忌</span>
                </div>
                <span className="text-sm font-medium text-gray-700">今日不宜</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {lunarInfo.ji.map((item) => (
                  <div
                    key={item}
                    className="bg-rose-50 rounded-xl py-2 px-1 text-center"
                  >
                    <span className="text-xs text-rose-600">{item}</span>
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
