import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { zodiacSigns, getElementBgColor, type ZodiacSign } from '../data/zodiac'
import { fetchHoroscope, type HoroscopeData } from '../api/horoscope'

function ZodiacCard({ sign, onClick }: { sign: ZodiacSign; onClick: () => void }) {
  const bgColorClass = getElementBgColor(sign.element)

  return (
    <button
      onClick={onClick}
      className={`relative p-4 rounded-2xl border ${bgColorClass} transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95`}
    >
      <div className="text-3xl mb-2">{sign.symbol}</div>
      <div className="font-medium text-gray-800">{sign.name}</div>
      <div className="text-xs text-gray-500 mt-1">{sign.dateRange}</div>
      <div className="absolute top-2 right-2 text-xs font-medium text-gray-400">
        {sign.element}
      </div>
    </button>
  )
}

function ZodiacDetail({ sign, onBack }: { sign: ZodiacSign; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today')
  const [horoscopeData, setHoroscopeData] = useState<HoroscopeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchHoroscope(sign.id).then(data => {
      setHoroscopeData(data)
      setLoading(false)
    })
  }, [sign.id])

  const bgColorClass = getElementBgColor(sign.element)

  if (loading) {
    return (
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            选择其他星座
          </button>
          <div className={`rounded-3xl p-6 border ${bgColorClass}`}>
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse text-gray-400">加载运势中...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!horoscopeData) {
    return (
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            选择其他星座
          </button>
          <div className={`rounded-3xl p-6 border ${bgColorClass}`}>
            <div className="text-center text-gray-500 py-8">
              运势数据加载失败，请稍后重试
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 py-4">
      <div className="max-w-md mx-auto">
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          选择其他星座
        </button>

        {/* 星座卡片 */}
        <div className={`rounded-3xl p-6 border ${bgColorClass} mb-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{sign.symbol}</div>
            <div>
              <h2 className="text-2xl font-medium text-gray-800">{sign.name}</h2>
              <p className="text-sm text-gray-500">{sign.dateRange}</p>
            </div>
          </div>

          {/* 标签切换 */}
          <div className="flex gap-2 mb-4">
            {(['today', 'week', 'month'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm rounded-xl transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'today' ? '今日' : tab === 'week' ? '本周' : '本月'}
              </button>
            ))}
          </div>

          {/* 运势内容 */}
          {activeTab === 'today' && <TodayFortune data={horoscopeData.today} />}
          {activeTab === 'week' && <WeekFortune data={horoscopeData.week} />}
          {activeTab === 'month' && <MonthFortune data={horoscopeData.month} />}
        </div>

        {/* 幸运信息 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="text-xs text-gray-400 mb-1">幸运数字</div>
            <div className="flex gap-2">
              {sign.luckyNumbers.map(num => (
                <span key={num} className="text-lg font-medium text-indigo-500">{num}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="text-xs text-gray-400 mb-1">幸运颜色</div>
            <div className="flex gap-2">
              {sign.luckyColors.map(color => (
                <span key={color} className="text-sm text-gray-700">{color}</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 col-span-2">
            <div className="text-xs text-gray-400 mb-1">速配星座</div>
            <div className="flex gap-3">
              {sign.compatible.map(zodiac => (
                <span key={zodiac} className="text-sm px-3 py-1 bg-pink-50 text-pink-600 rounded-full">
                  {zodiac}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TodayFortune({ data }: { data: HoroscopeData['today'] }) {
  return (
    <div className="space-y-4">
      {/* 概述 */}
      <div className="bg-white/60 rounded-xl p-4">
        <div className="text-xs text-gray-400 mb-2">今日概述</div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* 各项运势 */}
      <div className="space-y-3">
        {data.love && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-pink-500 mb-1">💕 爱情运势</div>
            <p className="text-sm text-gray-700">{data.love}</p>
          </div>
        )}
        {data.work && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-blue-500 mb-1">💼 事业运势</div>
            <p className="text-sm text-gray-700">{data.work}</p>
          </div>
        )}
        {data.wealth && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-amber-500 mb-1">💰 财富运势</div>
            <p className="text-sm text-gray-700">{data.wealth}</p>
          </div>
        )}
      </div>

      {/* 幸运信息 */}
      <div className="pt-4 border-t border-gray-200/50">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.luckyNumber && (
            <div className="text-gray-600">
              <span className="text-gray-400">幸运数字：</span>{data.luckyNumber}
            </div>
          )}
          {data.luckyColor && (
            <div className="text-gray-600">
              <span className="text-gray-400">幸运颜色：</span>{data.luckyColor}
            </div>
          )}
          {data.luckyTime && (
            <div className="text-gray-600">
              <span className="text-gray-400">幸运时间：</span>{data.luckyTime}
            </div>
          )}
          {data.luckyStar && (
            <div className="text-gray-600">
              <span className="text-gray-400">贵人星座：</span>{data.luckyStar}
            </div>
          )}
        </div>
      </div>

      {/* 注意事项 */}
      {data.notice && (
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
          <div className="text-xs text-amber-600 mb-1">⚠️ 今日提醒</div>
          <p className="text-sm text-gray-700">{data.notice}</p>
        </div>
      )}
    </div>
  )
}

function WeekFortune({ data }: { data: HoroscopeData['week'] }) {
  return (
    <div className="space-y-4">
      {/* 概述 */}
      <div className="bg-white/60 rounded-xl p-4">
        <div className="text-xs text-gray-400 mb-2">本周概述</div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* 各项运势 */}
      <div className="space-y-3">
        {data.love && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-pink-500 mb-1">💕 爱情运势</div>
            <p className="text-sm text-gray-700">{data.love}</p>
          </div>
        )}
        {data.work && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-blue-500 mb-1">💼 事业运势</div>
            <p className="text-sm text-gray-700">{data.work}</p>
          </div>
        )}
        {data.wealth && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-amber-500 mb-1">💰 财富运势</div>
            <p className="text-sm text-gray-700">{data.wealth}</p>
          </div>
        )}
        {data.health && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-green-500 mb-1">🌿 健康运势</div>
            <p className="text-sm text-gray-700">{data.health}</p>
          </div>
        )}
      </div>

      {/* 幸运信息 */}
      <div className="pt-4 border-t border-gray-200/50">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.luckyNumber && (
            <div className="text-gray-600">
              <span className="text-gray-400">幸运数字：</span>{data.luckyNumber}
            </div>
          )}
          {data.luckyColor && (
            <div className="text-gray-600">
              <span className="text-gray-400">幸运颜色：</span>{data.luckyColor}
            </div>
          )}
          {data.luckyDay && (
            <div className="text-gray-600">
              <span className="text-gray-400">幸运日期：</span>{data.luckyDay}
            </div>
          )}
          {data.luckyStar && (
            <div className="text-gray-600">
              <span className="text-gray-400">贵人星座：</span>{data.luckyStar}
            </div>
          )}
          {data.unluckyStar && (
            <div className="text-gray-600 col-span-2">
              <span className="text-gray-400">小人星座：</span>{data.unluckyStar}
            </div>
          )}
        </div>
      </div>

      {/* 注意事项 */}
      {data.notice && (
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
          <div className="text-xs text-amber-600 mb-1">⚠️ 本周提醒</div>
          <p className="text-sm text-gray-700">{data.notice}</p>
        </div>
      )}
    </div>
  )
}

function MonthFortune({ data }: { data: HoroscopeData['month'] }) {
  return (
    <div className="space-y-4">
      {/* 概述 */}
      <div className="bg-white/60 rounded-xl p-4">
        <div className="text-xs text-gray-400 mb-2">本月概述</div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* 各项运势 */}
      <div className="space-y-3">
        {data.love && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-pink-500 mb-1">💕 爱情运势</div>
            <p className="text-sm text-gray-700">{data.love}</p>
          </div>
        )}
        {data.work && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-blue-500 mb-1">💼 事业运势</div>
            <p className="text-sm text-gray-700">{data.work}</p>
          </div>
        )}
        {data.wealth && (
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-xs text-amber-500 mb-1">💰 财富运势</div>
            <p className="text-sm text-gray-700">{data.wealth}</p>
          </div>
        )}
      </div>

      {/* 优势与弱势 */}
      {(data.advantage || data.weakness) && (
        <div className="grid grid-cols-2 gap-3">
          {data.advantage && (
            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
              <div className="text-xs text-green-600 mb-1">✨ 本月优势</div>
              <p className="text-sm text-gray-700">{data.advantage}</p>
            </div>
          )}
          {data.weakness && (
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <div className="text-xs text-red-600 mb-1">⚠️ 本月注意</div>
              <p className="text-sm text-gray-700">{data.weakness}</p>
            </div>
          )}
        </div>
      )}

      {/* 星座关系 */}
      <div className="pt-4 border-t border-gray-200/50">
        <div className="flex flex-wrap gap-2 text-xs">
          {data.fateStar && (
            <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full">
              缘份星座：{data.fateStar}
            </span>
          )}
          {data.luckyStar && (
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
              贵人星座：{data.luckyStar}
            </span>
          )}
          {data.unluckyStar && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
              小人星座：{data.unluckyStar}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Horoscope() {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null)

  if (selectedZodiac) {
    return (
      <PageWrapper title="星座运势">
        <ZodiacDetail sign={selectedZodiac} onBack={() => setSelectedZodiac(null)} />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="星座物语">
      <div className="px-5 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-sm text-gray-500 text-center mb-6">选择你的星座，查看今日运势</p>

          <div className="grid grid-cols-3 gap-3">
            {zodiacSigns.map(sign => (
              <ZodiacCard
                key={sign.id}
                sign={sign}
                onClick={() => setSelectedZodiac(sign)}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
