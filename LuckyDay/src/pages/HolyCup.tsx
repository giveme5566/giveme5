import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { CUP_RESULTS } from '../types/holyCup'
import type { CupResult, CupResultInfo } from '../types/holyCup'

function getRandomResult(): CupResult {
  const results: CupResult[] = ['shengbei', 'xiaobei-yin', 'xiaobei-yang']
  return results[Math.floor(Math.random() * results.length)]
}

export default function HolyCup() {
  const [isThrowing, setIsThrowing] = useState(false)
  const [result, setResult] = useState<CupResultInfo | null>(null)
  const [hasQuestion, setHasQuestion] = useState(false)

  const handleThrow = () => {
    if (isThrowing) return
    setIsThrowing(true)
    setResult(null)

    setTimeout(() => {
      const randomResult = getRandomResult()
      setResult(CUP_RESULTS[randomResult])
      setIsThrowing(false)
    }, 1800)
  }

  const handleReset = () => {
    setResult(null)
    setHasQuestion(false)
  }

  const handleQuestionClick = () => {
    setHasQuestion(true)
  }

  return (
    <PageWrapper title="掷圣杯">
      <div className="min-h-[70vh] px-4">
        {!hasQuestion ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-[70vh]"
          >
            <div className="relative mb-8">
              <svg viewBox="0 0 200 120" className="w-40 h-24">
                <ellipse cx="100" cy="100" rx="80" ry="12" fill="#f5f5f5" />
                <path
                  d="M30 50 Q30 20, 100 10 Q170 20, 170 50 L170 80 Q170 95, 100 100 Q30 95, 30 80 Z"
                  fill="url(#woodGradient)"
                  stroke="#d4a574"
                  strokeWidth="1"
                  rx="8"
                />
                <ellipse cx="100" cy="50" rx="65" ry="18" fill="#e8d4b8" />
                <defs>
                  <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a574" />
                    <stop offset="50%" stopColor="#c49464" />
                    <stop offset="100%" stopColor="#b48454" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-gray-600 text-center mb-8 px-4 text-lg">
              在心中默念你的问题
            </p>
            <motion.button
              onClick={handleQuestionClick}
              className="px-8 py-3 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              开始掷杯
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-[300px] h-[200px] flex items-center justify-center mb-6">
              <AnimatePresence mode="wait">
                {isThrowing ? (
                  <motion.div
                    key="throwing"
                    className="flex gap-6"
                    initial={{ y: -50, rotate: 0 }}
                    animate={{
                      y: [0, -60, 0, -50, 0],
                      rotate: [0, -15, 15, -10, 0],
                      transition: {
                        duration: 1.5,
                        times: [0, 0.3, 0.5, 0.7, 1],
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <CupIcon className="w-16 h-16" />
                    <CupIcon className="w-16 h-16" />
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.6 }}
                  >
                    <ResultDisplay result={result} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    className="flex gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <CupIcon className="w-16 h-16" />
                    <CupIcon className="w-16 h-16" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!result && (
              <motion.button
                onClick={handleThrow}
                disabled={isThrowing}
                className="px-10 py-4 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full shadow-lg text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isThrowing ? 1 : 1.05 }}
                whileTap={{ scale: isThrowing ? 1 : 0.95 }}
              >
                {isThrowing ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      🎲
                    </motion.span>
                    掷杯中...
                  </span>
                ) : (
                  '掷圣杯'
                )}
              </motion.button>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <motion.button
                  onClick={handleThrow}
                  className="px-8 py-3 bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  再掷一次
                </motion.button>
                <button
                  onClick={handleReset}
                  className="block mx-auto px-6 py-2 text-gray-500 hover:text-gray-700 text-sm"
                >
                  重新提问
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </PageWrapper>
  )
}

function CupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 50" className={className}>
      <ellipse cx="40" cy="45" rx="30" ry="4" fill="#f0f0f0" />
      <path
        d="M15 20 Q15 5, 40 2 Q65 5, 65 20 L65 35 Q65 42, 40 45 Q15 42, 15 35 Z"
        fill="url(#cupGradient)"
        stroke="#c49464"
        strokeWidth="0.5"
      />
      <ellipse cx="40" cy="20" rx="22" ry="6" fill="#e8d4b8" />
      <defs>
        <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="30%" stopColor="#e0b888" />
          <stop offset="70%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#b48454" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ResultDisplay({ result }: { result: CupResultInfo }) {
  const isShengbei = result.type === 'shengbei'
  const isNegative = result.type === 'xiaobei-yin'
  
  const getCupColors = () => {
    if (isShengbei) return { bg: '#e8f5e9', stroke: '#4CAF50', text: '#2e7d32' }
    if (isNegative) return { bg: '#ffebee', stroke: '#f44336', text: '#c62828' }
    return { bg: '#fff8e1', stroke: '#FFC107', text: '#e65100' }
  }
  
  const colors = getCupColors()

  return (
    <div className="flex flex-col items-center">
      <div 
        className="rounded-2xl p-6 mb-4"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="flex gap-4">
          <CupResultIcon 
            className="w-14 h-14" 
            isUp={result.type === 'shengbei' || result.type === 'xiaobei-yang'}
            colors={colors}
          />
          <CupResultIcon 
            className="w-14 h-14" 
            isUp={result.type === 'shengbei' || result.type === 'xiaobei-yin'}
            colors={colors}
          />
        </div>
      </div>
      <motion.h2 
        className="text-2xl font-bold mb-2"
        style={{ color: colors.text }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
      >
        {result.name}
      </motion.h2>
      <p className="text-gray-500 text-sm mb-2">{result.description}</p>
      <p className="text-gray-700 font-medium text-center px-4">{result.meaning}</p>
    </div>
  )
}

function CupResultIcon({ className, isUp, colors }: { 
  className?: string 
  isUp: boolean
  colors: { bg: string; stroke: string; text: string }
}) {
  return (
    <motion.svg 
      viewBox="0 0 80 50" 
      className={className}
      initial={{ rotate: isUp ? 180 : 0 }}
      animate={{ rotate: isUp ? 180 : 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <ellipse cx="40" cy="45" rx="30" ry="4" fill="#f0f0f0" />
      <path
        d="M15 20 Q15 5, 40 2 Q65 5, 65 20 L65 35 Q65 42, 40 45 Q15 42, 15 35 Z"
        fill="#d4a574"
        stroke={colors.stroke}
        strokeWidth="1.5"
      />
      <ellipse cx="40" cy="20" rx="22" ry="6" fill="#e8d4b8" stroke={colors.stroke} strokeWidth="1" />
    </motion.svg>
  )
}
