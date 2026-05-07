import { useState, useEffect, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getLunarInfo } from '../utils/lunar'
import type { LunarInfo } from '../utils/lunar'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

export default function Fortune() {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo | null>(null)
  const [currentDate] = useState(new Date())
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

  return (
    <PageWrapper title="今日运势">
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-3xl transform rotate-1 shadow-sm"></div>
            <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-0.5 shadow-sm"></div>
            
            <div 
              ref={cardRef}
              className="relative bg-white rounded-3xl p-6 shadow-sm border border-gray-50"
            >
              <div className="text-center mb-6">
                <div className="text-6xl font-light text-gray-800 mb-2">{day}</div>
                <div className="text-sm text-gray-400">
                  {year}.{String(month).padStart(2, '0')} · 周{weekday}
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <span className="mr-2">{lunarInfo.lunarDate}</span>
                <span className="text-gray-300 mx-1">·</span>
                <span className="mr-2">{ganZhiYear}</span>
                <span className="text-gray-300 mx-1">·</span>
                <span className="mr-2">{lunarInfo.zodiac}肖</span>
                {lunarInfo.节气 && (
                  <>
                    <span className="text-gray-300 mx-1">·</span>
                    <span>{lunarInfo.节气}</span>
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
                <div className="mt-6 pt-4 border-t border-gray-100">
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
