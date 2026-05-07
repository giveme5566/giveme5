import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getLunarInfo } from '../utils/lunar'
import type { LunarInfo } from '../utils/lunar'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

function toChineseMonth(month: number): string {
  const months = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
  return months[month - 1] + '月'
}

function toChineseDay(day: number): string {
  const days = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
  return days[day - 1] || String(day)
}

function getGanZhiYear(year: number): string {
  const cycle = (year - 4) % 60
  const idx = Math.abs(cycle)
  return TIANGAN[idx % 10] + DIZHI[idx % 12]
}

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

  const lunarMonth = lunarInfo.lunarDate.split('年')[1].split('月')[0]
  const lunarDay = lunarInfo.lunarDate.split('月')[1]
  const ganZhiYear = getGanZhiYear(year)

  return (
    <PageWrapper title="今日运势">
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-3xl transform rotate-1 shadow-sm"></div>
            <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-0.5 shadow-sm"></div>
            
            <div className="relative bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {WEEKDAYS.map((w, index) => (
                  <div 
                    key={w} 
                    className={`text-center py-1 text-xs rounded-lg ${
                      index === currentDate.getDay() 
                        ? 'bg-gray-100 font-medium text-gray-800' 
                        : 'text-gray-400'
                    }`}
                  >
                    {w}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="flex-1 text-center pb-4 border-b border-gray-100">
                  <div className="text-5xl font-light text-gray-800 mb-1">{day}</div>
                  <div className="text-xs text-gray-400 tracking-wide">{year}.{String(month).padStart(2, '0')}</div>
                </div>

                <div className="w-px bg-gray-100"></div>

                <div className="flex-1 text-center pb-4 border-b border-gray-100">
                  <div className="text-lg text-gray-700 mb-1">
                    {toChineseMonth(parseInt(lunarMonth))}
                  </div>
                  <div className="text-xs text-gray-400">{toChineseDay(parseInt(lunarDay))}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-center gap-4 text-xs text-gray-400 mb-4">
                  <span>{ganZhiYear}年</span>
                  <span className="text-gray-300">|</span>
                  <span>{lunarInfo.zodiac}肖</span>
                  {lunarInfo.节气 && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span>{lunarInfo.节气}</span>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">宜</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lunarInfo.yi.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 bg-gray-50 rounded-full text-xs text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">忌</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lunarInfo.ji.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 bg-gray-50 rounded-full text-xs text-gray-600"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {lunarInfo.节日.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-center gap-2">
                      {lunarInfo.节日.map((festival) => (
                        <span key={festival} className="text-xs text-gray-500">
                          {festival}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
