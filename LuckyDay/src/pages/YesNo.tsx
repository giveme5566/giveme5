import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { getYesNoResult, type FullResult, type YesNoResult } from '../data/yesNo'

type Phase = 'idle' | 'thinking' | 'result'

interface HistoryItem {
  result: YesNoResult
  text: string
  confidence: number
  time: string
}

export default function YesNo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [result, setResult] = useState<FullResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])

  const handleAsk = () => {
    if (phase === 'thinking') return
    setPhase('thinking')
    setResult(null)

    setTimeout(() => {
      const r = getYesNoResult()
      setResult(r)
      setPhase('result')
      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      setHistory(prev => [
        { result: r.result, text: r.card.text, confidence: r.confidence, time: timeStr },
        ...prev
      ].slice(0, 8))
    }, 1600)
  }

  const handleReset = () => {
    setPhase('idle')
    setResult(null)
  }

  const resultConfig = {
    yes: {
      label: 'YES',
      labelZh: '是',
      gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
      glow: 'bg-emerald-400/30',
      text: 'text-emerald-600',
      bg: 'from-emerald-50 to-teal-50',
      bar: 'bg-emerald-500'
    },
    no: {
      label: 'NO',
      labelZh: '否',
      gradient: 'from-rose-400 via-red-400 to-pink-500',
      glow: 'bg-rose-400/30',
      text: 'text-rose-600',
      bg: 'from-rose-50 to-pink-50',
      bar: 'bg-rose-500'
    },
    maybe: {
      label: 'MAYBE',
      labelZh: '看情况',
      gradient: 'from-amber-400 via-orange-400 to-yellow-500',
      glow: 'bg-amber-400/30',
      text: 'text-amber-600',
      bg: 'from-amber-50 to-orange-50',
      bar: 'bg-amber-500'
    }
  }

  return (
    <PageWrapper title="Yes or No">
      <div className="min-h-[80vh] px-5 py-6">
        <div className="max-w-md mx-auto">

          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-gray-800 tracking-tight mb-2">二选一</h2>
            <p className="text-sm text-gray-400 tracking-wide">犹豫不决时，听一听答案</p>
          </div>

          {/* 主区域 */}
          <div className="relative mb-6">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    onClick={handleAsk}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center group"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/40 to-pink-400/40 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="relative text-center">
                      <div className="text-5xl mb-2">🪙</div>
                      <div className="text-white text-lg font-light tracking-widest">点击</div>
                      <div className="text-white/70 text-xs mt-1">获取答案</div>
                    </div>
                  </motion.button>
                  <p className="mt-6 text-xs text-gray-400 text-center max-w-xs leading-relaxed">
                    在心中默念你的是与否问题<br/>然后点击上方按钮
                  </p>
                </motion.div>
              )}

              {phase === 'thinking' && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-56 h-56 flex items-center justify-center">
                    {/* 旋转的环 */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-indigo-500"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-400 border-l-purple-400"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-2 animate-pulse">🪙</div>
                      <div className="text-sm text-gray-500 tracking-wider">解读中...</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {phase === 'result' && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  {/* 结果卡 */}
                  <div className="relative w-full">
                    <div className={`absolute -inset-4 rounded-3xl ${resultConfig[result.result].glow} blur-2xl`} />
                    <div className={`relative bg-gradient-to-br ${resultConfig[result.result].bg} rounded-3xl p-8 border border-white/60 shadow-xl`}>
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          className={`inline-block bg-gradient-to-r ${resultConfig[result.result].gradient} bg-clip-text text-transparent text-6xl font-bold tracking-tight mb-1`}
                        >
                          {resultConfig[result.result].label}
                        </motion.div>
                        <div className={`text-sm ${resultConfig[result.result].text} tracking-widest mb-5`}>
                          {resultConfig[result.result].labelZh}
                        </div>

                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                          {result.card.text}
                        </p>

                        {/* 倾向度 */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                            <span>倾向度</span>
                            <span className={resultConfig[result.result].text}>{result.confidence}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${resultConfig[result.result].bar} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${result.confidence}%` }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-3 mt-6 w-full">
                    <motion.button
                      onClick={handleReset}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 rounded-2xl bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      换个问题
                    </motion.button>
                    <motion.button
                      onClick={handleAsk}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-3 rounded-2xl bg-gradient-to-r ${resultConfig[result.result].gradient} text-white text-sm font-medium shadow-lg`}
                    >
                      再问一次
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 历史记录 */}
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t border-gray-100 pt-5"
            >
              <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-3">最近询问</h3>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-gray-100"
                  >
                    <span className={`flex-shrink-0 w-12 text-center text-sm font-bold ${resultConfig[item.result].text}`}>
                      {item.result === 'yes' ? 'YES' : item.result === 'no' ? 'NO' : '???'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate">{item.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.time} · 倾向 {item.confidence}%</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </PageWrapper>
  )
}
