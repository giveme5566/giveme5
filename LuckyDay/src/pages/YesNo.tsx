import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { getYesNoResult, type FullResult, type YesNoResult } from '../data/yesNo'

type Phase = 'idle' | 'thinking' | 'result'

export default function YesNo() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [result, setResult] = useState<FullResult | null>(null)

  const handleAsk = () => {
    if (phase === 'thinking') return
    setPhase('thinking')
    setResult(null)

    setTimeout(() => {
      setResult(getYesNoResult())
      setPhase('result')
    }, 1400)
  }

  const resultConfig: Record<YesNoResult, { label: string; gradient: string; text: string; bg: string }> = {
    yes: {
      label: 'YES',
      gradient: 'from-emerald-400 to-teal-500',
      text: 'text-emerald-600',
      bg: 'from-emerald-50 to-teal-50'
    },
    no: {
      label: 'NO',
      gradient: 'from-rose-400 to-pink-500',
      text: 'text-rose-600',
      bg: 'from-rose-50 to-pink-50'
    }
  }

  return (
    <PageWrapper title="Yes or No">
      <div className="min-h-[80vh] px-5 py-6 flex flex-col">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">

          <div className="text-center mb-10">
            <h2 className="text-xl font-medium text-gray-800 tracking-tight mb-2">是与否</h2>
            <p className="text-sm text-gray-400 tracking-wide">犹豫不决时，听一听答案</p>
          </div>

          {/* 主区域 */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.button
                    onClick={handleAsk}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-1">🪙</div>
                      <div className="text-white text-base font-light tracking-widest">点击</div>
                    </div>
                  </motion.button>
                  <p className="mt-6 text-xs text-gray-400 text-center">
                    默念你的是与否问题
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
                  <motion.div
                    className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-purple-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <p className="mt-5 text-sm text-gray-500 tracking-wider">解读中...</p>
                </motion.div>
              )}

              {phase === 'result' && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full"
                >
                  <div className={`bg-gradient-to-br ${resultConfig[result.result].bg} rounded-3xl p-8 border border-white shadow-lg`}>
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.15 }}
                        className={`inline-block bg-gradient-to-r ${resultConfig[result.result].gradient} bg-clip-text text-transparent text-6xl font-bold tracking-tight mb-4`}
                      >
                        {resultConfig[result.result].label}
                      </motion.div>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {result.card.text}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={handleAsk}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-6 py-3 rounded-2xl bg-gradient-to-r ${resultConfig[result.result].gradient} text-white text-sm font-medium shadow-lg`}
                  >
                    再问一次
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </PageWrapper>
  )
}
