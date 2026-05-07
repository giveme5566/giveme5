import { useState, useEffect, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getLunarInfo } from '../utils/lunar'
import type { LunarInfo } from '../utils/lunar'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

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

export default function Fortune() {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo | null>(null)
  const dragonBoatDate = new Date(2026, 4, 31)
  const [currentDate] = useState(dragonBoatDate)
  const [isSharing, setIsSharing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getLunarInfo().then(info => {
      setLunarInfo(info)
    })
  }, [])

  const handleShare = async () => {
    if (!cardRef.current) return
    setIsSharing(true)

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      })

      const link = document.createElement('a')
      link.download = `今日运势_${new Date().toISOString().split('T')[0]}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('分享失败:', error)
    } finally {
      setIsSharing(false)
    }
  }

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
  const ganZhiYear = lunarInfo.ganZhiYear

  const isHoliday = lunarInfo.节日.length > 0
  const lunarMonth = lunarInfo.lunarDate.includes('年') ? lunarInfo.lunarDate.split('年')[1].split('月')[0] : '正'
  const lunarDay = lunarInfo.lunarDate.includes('月') ? lunarInfo.lunarDate.split('月')[1].replace('日', '') : '初一'

  const toArabicNumber = (num: string): number => {
    const chineseNums: Record<string, number> = {
      '正': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
      '冬': 11, '腊': 12, '初': 0, '十': 10, '廿': 20, '三十': 30
    }
    return chineseNums[num] || parseInt(num) || 1
  }

  const lunarMonthStr = toChineseMonth(toArabicNumber(lunarMonth))
  const lunarDayStr = toChineseDay(toArabicNumber(lunarDay))

  return (
    <PageWrapper title="今日运势">
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-3xl transform rotate-1 shadow-sm"></div>
            <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-0.5 shadow-sm"></div>
            
            <div 
              ref={cardRef}
              className={`relative rounded-3xl p-6 shadow-sm border ${
                isHoliday ? 'bg-rose-50 border-rose-100' : 'bg-white border-gray-50'
              }`}
            >
              <div className="text-center mb-6">
                <div className="text-6xl font-light text-gray-800 mb-2">{day}</div>
                <div className={`text-sm ${isHoliday ? 'text-rose-500' : 'text-gray-400'}`}>
                  {year}.{String(month).padStart(2, '0')} · 周{weekday}
                </div>
              </div>

              <div className={`text-center mb-6 pb-6 border-b ${isHoliday ? 'border-rose-100' : 'border-gray-100'}`}>
                <span className={`mr-2 ${isHoliday ? 'text-rose-600' : 'text-gray-500'}`}>
                  {lunarMonthStr}{lunarDayStr}
                </span>
                <span className={`mx-1 ${isHoliday ? 'text-rose-300' : 'text-gray-300'}`}>·</span>
                <span className={`mr-2 ${isHoliday ? 'text-rose-600' : 'text-gray-500'}`}>{ganZhiYear}</span>
                <span className={`mx-1 ${isHoliday ? 'text-rose-300' : 'text-gray-300'}`}>·</span>
                <span className={`mr-2 ${isHoliday ? 'text-rose-600' : 'text-gray-500'}`}>{lunarInfo.zodiac}肖</span>
                {lunarInfo.节气 && (
                  <>
                    <span className={`mx-1 ${isHoliday ? 'text-rose-300' : 'text-gray-300'}`}>·</span>
                    <span className={isHoliday ? 'text-rose-600' : ''}>{lunarInfo.节气}</span>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">宜</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lunarInfo.yi.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 rounded-full text-xs ${
                          isHoliday ? 'bg-white text-rose-600' : 'bg-gray-50 text-gray-600'
                        }`}
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
                        className={`px-2.5 py-1 rounded-full text-xs ${
                          isHoliday ? 'bg-white text-rose-600' : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {lunarInfo.节日.length > 0 && (
                <div className="mt-6 pt-4 border-t border-rose-200">
                  <div className="flex justify-center gap-2">
                    {lunarInfo.节日.map((festival) => (
                      <span key={festival} className="text-sm text-rose-500 font-medium">
                        {festival}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full mt-4 py-3 bg-gray-800 text-white rounded-2xl text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isSharing ? '生成中...' : '保存图片'}
          </button>
        </div>
      </div>
    </PageWrapper>
  )
}
