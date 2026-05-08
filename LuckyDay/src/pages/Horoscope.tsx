import { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { zodiacSigns, generateDailyFortune, getElementBgColor, type ZodiacSign, type DailyFortune } from '../data/zodiac'

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

function FortuneBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-12">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 w-10 text-right">{value}</span>
    </div>
  )
}

function ZodiacDetail({ sign, onBack }: { sign: ZodiacSign; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today')
  const fortune = generateDailyFortune(sign.id)
  
  const bgColorClass = getElementBgColor(sign.element)
  
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
              <div className="flex gap-2 mt-2">
                {sign.traits.slice(0, 2).map(trait => (
                  <span key={trait} className="text-xs px-2 py-0.5 bg-white/60 rounded-full text-gray-600">
                    {trait}
                  </span>
                ))}
              </div>
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
          {activeTab === 'today' && <TodayFortune fortune={fortune} />}
          {activeTab === 'week' && <WeekFortune sign={sign} />}
          {activeTab === 'month' && <MonthFortune sign={sign} />}
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

function TodayFortune({ fortune }: { fortune: DailyFortune }) {
  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="text-4xl font-light text-indigo-500 mb-1">{fortune.overall}</div>
        <div className="text-sm text-gray-500">综合运势</div>
      </div>
      
      <div className="space-y-3">
        <FortuneBar label="爱情" value={fortune.love} color="bg-pink-400" />
        <FortuneBar label="事业" value={fortune.career} color="bg-blue-400" />
        <FortuneBar label="财运" value={fortune.wealth} color="bg-amber-400" />
        <FortuneBar label="健康" value={fortune.health} color="bg-green-400" />
      </div>
      
      <div className="pt-4 border-t border-gray-200/50 space-y-3">
        <div>
          <div className="text-xs text-gray-400 mb-1">今日概述</div>
          <p className="text-sm text-gray-700 leading-relaxed">{fortune.summary}</p>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">建议</div>
          <p className="text-sm text-gray-700 leading-relaxed">{fortune.advice}</p>
        </div>
      </div>
    </div>
  )
}

function WeekFortune({ sign }: { sign: ZodiacSign }) {
  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const weekFortunes = [
    { day: '周一', overall: 85, focus: '工作' },
    { day: '周二', overall: 78, focus: '人际' },
    { day: '周三', overall: 92, focus: '财运' },
    { day: '周四', overall: 75, focus: '健康' },
    { day: '周五', overall: 88, focus: '感情' },
    { day: '周六', overall: 95, focus: '休闲' },
    { day: '周日', overall: 82, focus: '家庭' },
  ]
  
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 leading-relaxed">
        本周{sign.name}整体运势平稳，{sign.element === '火' ? '热情高涨适合开展新计划' : sign.element === '土' ? '脚踏实地会有不错收获' : sign.element === '风' ? '思维活跃适合学习交流' : '直觉敏锐相信内心感受'}。
      </div>
      
      <div className="space-y-2">
        {weekFortunes.map((item, idx) => (
          <div key={item.day} className="flex items-center gap-3 py-2">
            <span className="text-xs text-gray-500 w-10">{item.day}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                style={{ width: `${item.overall}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{item.focus}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MonthFortune({ sign }: { sign: ZodiacSign }) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 leading-relaxed">
        本月{sign.name}将迎来{sign.element === '火' ? '充满活力的时期' : sign.element === '土' ? '稳步前进的阶段' : sign.element === '风' ? '思想碰撞的月份' : '情感丰富的时光'}。
        整体运势呈上升趋势，适合{sign.element === '火' ? '大胆尝试新事物' : sign.element === '土' ? '专注长期目标' : sign.element === '风' ? '拓展社交圈子' : '深化人际关系'}。
      </div>
      
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-white/50 rounded-xl p-3">
          <div className="text-xs text-gray-400 mb-1">事业运</div>
          <div className="text-sm font-medium text-gray-700">★★★★☆</div>
          <div className="text-xs text-gray-500 mt-1">稳步上升</div>
        </div>
        <div className="bg-white/50 rounded-xl p-3">
          <div className="text-xs text-gray-400 mb-1">财运</div>
          <div className="text-sm font-medium text-gray-700">★★★☆☆</div>
          <div className="text-xs text-gray-500 mt-1">谨慎理财</div>
        </div>
        <div className="bg-white/50 rounded-xl p-3">
          <div className="text-xs text-gray-400 mb-1">感情运</div>
          <div className="text-sm font-medium text-gray-700">★★★★☆</div>
          <div className="text-xs text-gray-500 mt-1">桃花朵朵</div>
        </div>
        <div className="bg-white/50 rounded-xl p-3">
          <div className="text-xs text-gray-400 mb-1">健康运</div>
          <div className="text-sm font-medium text-gray-700">★★★☆☆</div>
          <div className="text-xs text-gray-500 mt-1">注意休息</div>
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
