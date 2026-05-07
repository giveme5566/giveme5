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
    }, 1500)
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
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        {!hasQuestion ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-8 px-8">
              在心中默念你的问题<br />
              然后点击下方按钮掷出圣杯
            </p>
            <button
              onClick={handleQuestionClick}
              className="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
            >
              我已默念问题
            </button>
          </motion.div>
        ) : (
          <div className="text-center">
            <div className="relative w-48 h-48 mb-8">
              <AnimatePresence mode="wait">
                {isThrowing ? (
                  <motion.div
                    key="throwing"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ rotate: 0 }}
                    animate={{
                      rotate: [0, -20, 20, -20, 20, 0],
                      y: [0, -30, 0, -20, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      ease: "easeInOut"
                    }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <ellipse cx="50" cy="70" rx="35" ry="8" fill="#e5e5e5" />
                      <path
                        d="M20 35 Q20 20, 50 20 Q80 20, 80 35 L80 65 Q80 75, 50 75 Q20 75, 20 65 Z"
                        fill="#d4a574"
                        stroke="#c49464"
                        strokeWidth="2"
                      />
                      <ellipse cx="50" cy="35" rx="30" ry="12" fill="#e8d4b8" />
                      <text x="50" y="55" textAnchor="middle" fontSize="24" fill="#8b7355">杯</text>
                    </svg>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="result"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <ResultDisplay result={result} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <ellipse cx="50" cy="70" rx="35" ry="8" fill="#e5e5e5" />
                      <path
                        d="M20 35 Q20 20, 50 20 Q80 20, 80 35 L80 65 Q80 75, 50 75 Q20 75, 20 65 Z"
                        fill="#d4a574"
                        stroke="#c49464"
                        strokeWidth="2"
                      />
                      <ellipse cx="50" cy="35" rx="30" ry="12" fill="#e8d4b8" />
                      <text x="50" y="55" textAnchor="middle" fontSize="24" fill="#8b7355">杯</text>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!result && (
              <button
                onClick={handleThrow}
                disabled={isThrowing}
                className="px-8 py-4 bg-primary-500 text-white rounded-full text-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isThrowing ? '掷杯中...' : '掷圣杯'}
              </button>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <button
                  onClick={handleThrow}
                  className="px-6 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  再掷一次
                </button>
                <button
                  onClick={handleReset}
                  className="block mx-auto px-6 py-2 text-gray-500 hover:text-gray-700"
                >
                  重新提问
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

function ResultDisplay({ result }: { result: CupResultInfo }) {
  const isShengbei = result.type === 'shengbei'
  const isNegative = result.type === 'xiaobei-yin'

  return (
    <div className="text-center">
      <svg viewBox="0 0 120 80" className="w-32 h-24 mx-auto mb-4">
        <ellipse cx="60" cy="70" rx="50" ry="8" fill="#e5e5e5" />
        <path
          d="M15 30 Q15 15, 60 15 Q105 15, 105 30 L105 55 Q105 65, 60 65 Q15 65, 15 55 Z"
          fill={isShengbei ? '#4CAF50' : isNegative ? '#f44336' : '#FFC107'}
          stroke={isShengbei ? '#388E3C' : isNegative ? '#D32F2F' : '#FFA000'}
          strokeWidth="2"
        />
        <ellipse cx="60" cy="30" rx="45" ry="12" fill={isShengbei ? '#81C784' : isNegative ? '#E57373' : '#FFD54F'} />
        {result.type === 'shengbei' && (
          <>
            <circle cx="45" cy="35" r="8" fill="#FFFFFF" />
            <circle cx="75" cy="35" r="8" fill="#333" />
          </>
        )}
        {result.type === 'xiaobei-yin' && (
          <>
            <circle cx="45" cy="35" r="8" fill="#333" />
            <circle cx="75" cy="35" r="8" fill="#333" />
          </>
        )}
        {result.type === 'xiaobei-yang' && (
          <>
            <circle cx="45" cy="35" r="8" fill="#FFFFFF" />
            <circle cx="75" cy="35" r="8" fill="#FFFFFF" />
          </>
        )}
      </svg>
      <h2 className="text-2xl font-bold mb-2" style={{ color: isShengbei ? '#4CAF50' : isNegative ? '#f44336' : '#FFC107' }}>
        {result.name}
      </h2>
      <p className="text-gray-500 mb-2">{result.description}</p>
      <p className="text-gray-700 font-medium">{result.meaning}</p>
    </div>
  )
}
