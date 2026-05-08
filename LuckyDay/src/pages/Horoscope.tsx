import { useState, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { zodiacSigns, getElementBgColor, type ZodiacSign } from '../data/zodiac'
import { fetchHoroscope, type HoroscopeData } from '../api/horoscope'

function ZodiacCard({ sign, onClick }: { sign: ZodiacSign; onClick: () => void }) {
  const bgColorClass = getElementBgColor(sign.element)

  return (
    <button
      onClick={onClick}
      className={`group relative p-5 rounded-2xl border ${bgColorClass} 
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1
        active:scale-[0.98] active:translate-y-0`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="text-4xl mb-3 font-light tracking-tight text-gray-800/90">
          {sign.symbol}
        </div>
        <div className="font-medium text-gray-800 text-[15px] tracking-wide">
          {sign.name}
        </div>
        <div className="text-[11px] text-gray-500 mt-1.5 font-normal tracking-wide">
          {sign.dateRange}
        </div>
        <div className="absolute top-0 right-0">
          <span className="text-[10px] font-medium text-gray-400/80 tracking-wider uppercase">
            {sign.element}
          </span>
        </div>
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
      <div className="px-5 py-6">
        <div className="max-w-md mx-auto">
          <BackButton onBack={onBack} />
          <div className={`rounded-3xl p-8 border ${bgColorClass} min-h-[400px] flex items-center justify-center`}>
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-gray-300/50 border-t-gray-500 rounded-full animate-spin" />
              <span className="text-sm text-gray-400 tracking-wide">加载运势中</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!horoscopeData) {
    return (
      <div className="px-5 py-6">
        <div className="max-w-md mx-auto">
          <BackButton onBack={onBack} />
          <div className={`rounded-3xl p-8 border ${bgColorClass}`}>
            <div className="text-center text-gray-500 py-12">
              <p className="text-sm tracking-wide">运势数据加载失败，请稍后重试</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 py-6">
      <div className="max-w-md mx-auto">
        <BackButton onBack={onBack} />

        <div className={`rounded-3xl p-6 border ${bgColorClass} mb-5`}>
          <div className="flex items-center gap-5 mb-6">
            <div className="text-5xl font-light text-gray-800/90">{sign.symbol}</div>
            <div>
              <h2 className="text-2xl font-medium text-gray-800 tracking-tight">{sign.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5 tracking-wide">{sign.dateRange}</p>
            </div>
          </div>

          <div className="flex gap-1 p-1 bg-white/50 rounded-2xl mb-6">
            {(['today', 'week', 'month'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm rounded-xl transition-all duration-300 tracking-wide
                  ${activeTab === tab
                    ? 'bg-white text-gray-800 shadow-sm font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab === 'today' ? '今日' : tab === 'week' ? '本周' : '本月'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeTab === 'today' && <TodayFortune data={horoscopeData.today} />}
            {activeTab === 'week' && <WeekFortune data={horoscopeData.week} />}
            {activeTab === 'month' && <MonthFortune data={horoscopeData.month} />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InfoCard label="幸运数字" value={sign.luckyNumbers.join(' · ')} />
          <InfoCard label="幸运颜色" value={sign.luckyColors.join(' · ')} />
          <div className="col-span-2">
            <InfoCard label="速配星座" value={sign.compatible.join(' · ')} />
          </div>
        </div>
      </div>
    </div>
  )
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="mb-5 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors duration-300 tracking-wide"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
      </svg>
      <span>返回星座列表</span>
    </button>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100/80">
      <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1.5">{label}</div>
      <div className="text-sm text-gray-700 font-medium tracking-wide">{value}</div>
    </div>
  )
}

function FortuneSection({ title, content, color }: { title: string; content: string; color: string }) {
  const colorClasses: Record<string, string> = {
    pink: 'border-l-pink-300/60',
    blue: 'border-l-blue-300/60',
    amber: 'border-l-amber-300/60',
    green: 'border-l-green-300/60',
    purple: 'border-l-purple-300/60'
  }

  return (
    <div className={`bg-white/60 rounded-xl p-4 border-l-2 ${colorClasses[color] || colorClasses.blue}`}>
      <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">{title}</div>
      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
    </div>
  )
}

function LuckyInfo({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="pt-4 border-t border-gray-200/40">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map((item, idx) => (
          item.value && (
            <div key={idx} className="text-xs">
              <span className="text-gray-400 tracking-wide">{item.label}</span>
              <span className="text-gray-600 ml-1.5">{item.value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

function TodayFortune({ data }: { data: HoroscopeData['today'] }) {
  return (
    <div className="space-y-3">
      <div className="bg-white/70 rounded-xl p-4 border border-white/50">
        <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">今日概述</div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {data.love && <FortuneSection title="爱情运势" content={data.love} color="pink" />}
      {data.work && <FortuneSection title="事业运势" content={data.work} color="blue" />}
      {data.wealth && <FortuneSection title="财富运势" content={data.wealth} color="amber" />}

      <LuckyInfo items={[
        { label: '幸运数字', value: data.luckyNumber },
        { label: '幸运颜色', value: data.luckyColor },
        { label: '幸运时间', value: data.luckyTime },
        { label: '贵人星座', value: data.luckyStar }
      ]} />

      {data.notice && (
        <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-100/50 mt-3">
          <div className="text-[11px] text-amber-600/80 uppercase tracking-wider mb-1.5">今日提醒</div>
          <p className="text-sm text-gray-700">{data.notice}</p>
        </div>
      )}
    </div>
  )
}

function WeekFortune({ data }: { data: HoroscopeData['week'] }) {
  return (
    <div className="space-y-3">
      <div className="bg-white/70 rounded-xl p-4 border border-white/50">
        <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">本周概述</div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {data.love && <FortuneSection title="爱情运势" content={data.love} color="pink" />}
      {data.work && <FortuneSection title="事业运势" content={data.work} color="blue" />}
      {data.wealth && <FortuneSection title="财富运势" content={data.wealth} color="amber" />}
      {data.health && <FortuneSection title="健康运势" content={data.health} color="green" />}

      <LuckyInfo items={[
        { label: '幸运数字', value: data.luckyNumber },
        { label: '幸运颜色', value: data.luckyColor },
        { label: '幸运日期', value: data.luckyDay },
        { label: '贵人星座', value: data.luckyStar }
      ]} />
      
      {data.unluckyStar && (
        <div className="text-xs pt-1">
          <span className="text-gray-400 tracking-wide">小人星座</span>
          <span className="text-gray-500 ml-1.5">{data.unluckyStar}</span>
        </div>
      )}

      {data.notice && (
        <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-100/50 mt-3">
          <div className="text-[11px] text-amber-600/80 uppercase tracking-wider mb-1.5">本周提醒</div>
          <p className="text-sm text-gray-700">{data.notice}</p>
        </div>
      )}
    </div>
  )
}

function MonthFortune({ data }: { data: HoroscopeData['month'] }) {
  return (
    <div className="space-y-3">
      <div className="bg-white/70 rounded-xl p-4 border border-white/50">
        <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">本月概述</div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {data.love && <FortuneSection title="爱情运势" content={data.love} color="pink" />}
      {data.work && <FortuneSection title="事业运势" content={data.work} color="blue" />}
      {data.wealth && <FortuneSection title="财富运势" content={data.wealth} color="amber" />}

      {(data.advantage || data.weakness) && (
        <div className="grid grid-cols-2 gap-3">
          {data.advantage && (
            <div className="bg-green-50/70 rounded-xl p-4 border border-green-100/50">
              <div className="text-[11px] text-green-600/80 uppercase tracking-wider mb-1.5">本月优势</div>
              <p className="text-sm text-gray-700">{data.advantage}</p>
            </div>
          )}
          {data.weakness && (
            <div className="bg-red-50/70 rounded-xl p-4 border border-red-100/50">
              <div className="text-[11px] text-red-600/80 uppercase tracking-wider mb-1.5">本月注意</div>
              <p className="text-sm text-gray-700">{data.weakness}</p>
            </div>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-gray-200/40">
        <div className="flex flex-wrap gap-2">
          {data.fateStar && (
            <span className="px-3 py-1.5 bg-pink-50/80 text-pink-600/90 rounded-full text-xs tracking-wide">
              缘份 · {data.fateStar}
            </span>
          )}
          {data.luckyStar && (
            <span className="px-3 py-1.5 bg-green-50/80 text-green-600/90 rounded-full text-xs tracking-wide">
              贵人 · {data.luckyStar}
            </span>
          )}
          {data.unluckyStar && (
            <span className="px-3 py-1.5 bg-gray-100/80 text-gray-500/90 rounded-full text-xs tracking-wide">
              小人 · {data.unluckyStar}
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
      <div className="px-5 py-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-800 tracking-tight mb-2">探索你的星座</h2>
            <p className="text-sm text-gray-400 tracking-wide">选择星座，查看今日运势指引</p>
          </div>

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
