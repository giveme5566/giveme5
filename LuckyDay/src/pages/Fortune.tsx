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
          <div className="text-center mb-8">
            <div className="text-8xl font-light text-gray-800 leading-none mb-2">
              {day}
            </div>
            <div className="text-sm text-gray-400 tracking-widest uppercase">
              {year}.{String(month).padStart(2, '0')}
            </div>
            <div className="text-xs text-gray-300 mt-1">
              星期{weekday}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-6">
            <div className="text-center">
              <div className="inline-block px-4 py-1 bg-orange-50 text-orange-600 text-xs rounded-full mb-4">
                {lunarInfo.zodiac}年 · 农历{lunarInfo.lunarDate}
              </div>
              {lunarInfo.节气 && (
                <div className="text-xs text-gray-400">
                  {lunarInfo.节气}
                </div>
              )}
              {lunarInfo.节日.length > 0 && (
                <div className="flex justify-center gap-2 mt-2">
                  {lunarInfo.节日.map((festival) => (
                    <span 
                      key={festival}
                      className="text-xs text-pink-500"
                    >
                      {festival}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium tracking-wide">宜</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {lunarInfo.yi.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                <span className="text-xs text-red-600 font-medium tracking-wide">忌</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {lunarInfo.ji.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                <span className="text-xs text-amber-600 font-medium tracking-wide">冲煞</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 text-center p-3 bg-white rounded-xl">
                  <div className="text-2xl text-gray-800 mb-1">{lunarInfo.chongSha.slice(1)}</div>
                  <div className="text-xs text-gray-400">冲</div>
                </div>
                <div className="flex-1 text-center p-3 bg-white rounded-xl">
                  <div className="text-2xl text-gray-800 mb-1">{lunarInfo.sha方位.slice(1)}</div>
                  <div className="text-xs text-gray-400">煞</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                <span className="text-xs text-indigo-600 font-medium tracking-wide">干支</span>
              </div>
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-lg text-gray-700 font-medium">{lunarInfo.ganZhiYear.slice(0, 1)}</div>
                  <div className="text-xs text-gray-400">年</div>
                </div>
                <div className="text-gray-200">·</div>
                <div>
                  <div className="text-lg text-gray-700 font-medium">{lunarInfo.ganZhiMonth}</div>
                  <div className="text-xs text-gray-400">月</div>
                </div>
                <div className="text-gray-200">·</div>
                <div>
                  <div className="text-lg text-gray-700 font-medium">{lunarInfo.ganZhiDay}</div>
                  <div className="text-xs text-gray-400">日</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
