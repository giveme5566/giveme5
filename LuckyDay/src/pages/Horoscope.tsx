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
  // 基于星座生成本周运势数据
  const seed = sign.id.charCodeAt(0) + 100
  const random = (min: number, max: number) => {
    const x = Math.sin(seed + min) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }

  const weekFortune = {
    overall: random(72, 92),
    love: random(65, 95),
    career: random(68, 93),
    wealth: random(60, 88),
    health: random(72, 94)
  }

  const summaries: Record<string, string[]> = {
    '火': ['本周充满活力，适合推进重要项目', '热情高涨，人际关系将迎来突破', '创意迸发，把握机会展现领导才能'],
    '土': ['稳扎稳打，本周适合处理积累的事务', '脚踏实地，努力将获得回报', '保持耐心，长期计划开始见效'],
    '风': ['思维敏捷，本周适合学习新技能', '社交活跃，可能结识重要伙伴', '灵感涌现，创意项目进展顺利'],
    '水': ['直觉敏锐，相信内心的判断', '情感丰富，适合深化重要关系', '静水流深，内在成长显著']
  }

  const advices: Record<string, string[]> = {
    '火': ['保持热情但注意节奏，避免过度疲劳', '分享你的能量，但留出独处时间', '勇敢追求目标，同时倾听反馈'],
    '土': ['适当放松，给自己一些弹性空间', '享受过程，不要只关注结果', '相信积累，但也要注意变通'],
    '风': ['多倾听他人，平衡表达与吸收', '把创意落实到具体行动', '保持开放，但也要有主见'],
    '水': ['照顾情绪，同时保持理性判断', '与信任的人分享内心感受', '给自己独处充电的时间']
  }

  const summary = summaries[sign.element][random(0, 2)]
  const advice = advices[sign.element][random(0, 2)]

  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="text-4xl font-light text-indigo-500 mb-1">{weekFortune.overall}</div>
        <div className="text-sm text-gray-500">本周综合</div>
      </div>

      <div className="space-y-3">
        <FortuneBar label="爱情" value={weekFortune.love} color="bg-pink-400" />
        <FortuneBar label="事业" value={weekFortune.career} color="bg-blue-400" />
        <FortuneBar label="财运" value={weekFortune.wealth} color="bg-amber-400" />
        <FortuneBar label="健康" value={weekFortune.health} color="bg-green-400" />
      </div>

      <div className="pt-4 border-t border-gray-200/50 space-y-3">
        <div>
          <div className="text-xs text-gray-400 mb-1">本周概述</div>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">建议</div>
          <p className="text-sm text-gray-700 leading-relaxed">{advice}</p>
        </div>
      </div>
    </div>
  )
}

function MonthFortune({ sign }: { sign: ZodiacSign }) {
  // 基于星座生成本月运势数据
  const seed = sign.id.charCodeAt(0) + 200
  const random = (min: number, max: number) => {
    const x = Math.sin(seed + min) * 10000
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min
  }

  const monthFortune = {
    overall: random(75, 93),
    love: random(68, 96),
    career: random(70, 94),
    wealth: random(62, 90),
    health: random(74, 95)
  }

  const summaries: Record<string, string[]> = {
    '火': ['本月充满活力与机遇，是推进计划的好时机', '热情高涨的月份，人际关系和事业都将有突破', '创意与行动力兼具，大胆追求你的目标'],
    '土': ['稳扎稳打的月份，长期努力开始收获成果', '务实前行的时期，适合巩固已有基础', '耐心与坚持将带来意想不到的回报'],
    '风': ['思维活跃的月份，新想法和新机会不断涌现', '社交与学习的好时机，拓展视野与人脉', '变化与成长并存，保持灵活应对'],
    '水': ['情感丰富的月份，内在直觉格外敏锐', '适合深度思考与自我探索的时期', '在宁静中发现力量，情感关系深化']
  }

  const advices: Record<string, string[]> = {
    '火': ['把握机会，但也要注意劳逸结合', '热情待人，同时保持独立思考', '勇往直前，但记得适时调整方向'],
    '土': ['在稳定中寻求适度的变化与创新', '享受成果的同时继续积累', '保持务实，但也不要过于保守'],
    '风': ['广泛收集信息，然后聚焦重点行动', '在变化中保持核心的稳定', '分享你的想法，也倾听他人的声音'],
    '水': ['相信直觉，同时用理性验证', '在关心他人时也照顾好自己', '给自己足够的休息和反思时间']
  }

  const summary = summaries[sign.element][random(0, 2)]
  const advice = advices[sign.element][random(0, 2)]

  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="text-4xl font-light text-indigo-500 mb-1">{monthFortune.overall}</div>
        <div className="text-sm text-gray-500">本月综合</div>
      </div>

      <div className="space-y-3">
        <FortuneBar label="爱情" value={monthFortune.love} color="bg-pink-400" />
        <FortuneBar label="事业" value={monthFortune.career} color="bg-blue-400" />
        <FortuneBar label="财运" value={monthFortune.wealth} color="bg-amber-400" />
        <FortuneBar label="健康" value={monthFortune.health} color="bg-green-400" />
      </div>

      <div className="pt-4 border-t border-gray-200/50 space-y-3">
        <div>
          <div className="text-xs text-gray-400 mb-1">本月概述</div>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">建议</div>
          <p className="text-sm text-gray-700 leading-relaxed">{advice}</p>
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
