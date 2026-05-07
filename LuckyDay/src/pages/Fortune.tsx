import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
      <div className="px-4 py-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-br from-primary-400 to-primary-500 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
            
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <div className="text-4xl font-bold">{day}</div>
                  <div className="text-sm opacity-80">周{weekday}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-lg font-medium opacity-90">
                    {year}年{month}月
                  </div>
                  <div className="text-sm opacity-80">
                    {lunarInfo.zodiac}年 · {lunarInfo.lunarDate}
                  </div>
                  {lunarInfo.节气 && (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="inline-block bg-white bg-opacity-20 px-3 py-0.5 rounded-full text-sm"
                    >
                      {lunarInfo.节气}
                    </motion.div>
                  )}
                  {lunarInfo.节日.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {lunarInfo.节日.map((festival) => (
                        <span 
                          key={festival}
                          className="bg-pink-400 bg-opacity-30 px-2 py-0.5 rounded-full text-xs"
                        >
                          {festival}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="text-sm opacity-80">干支</div>
                <div className="text-sm font-medium">{lunarInfo.ganZhiYear}</div>
                <div className="text-xs opacity-70">{lunarInfo.ganZhiMonth}</div>
                <div className="text-xs opacity-70">{lunarInfo.ganZhiDay}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">宜</h3>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              今日宜做
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lunarInfo.yi.map((item, idx) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">忌</h3>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              今日不宜
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lunarInfo.ji.map((item, idx) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-5"
        >
          <h3 className="font-semibold text-gray-800 mb-4">今日提示</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600">冲</span>
              </div>
              <div>
                <div className="text-xs text-gray-500">冲煞</div>
                <div className="text-gray-800 font-medium">{lunarInfo.chongSha} · {lunarInfo.sha方位}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">忌</span>
              </div>
              <div>
                <div className="text-xs text-gray-500">彭祖百忌</div>
                <div className="text-gray-800 font-medium">{lunarInfo.彭祖百忌}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
