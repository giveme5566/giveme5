import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import {
  stickTypeNames,
  stickTypeDescs,
  fetchFortuneStick,
  FortuneStick,
} from '../data/fortuneSticks'
import { ArrowLeft } from 'lucide-react'

const stickTypes = [
  { type: 'guanyin', name: '观音灵签', desc: '答疑解惑', count: 100 },
  { type: 'guandi', name: '关帝灵签', desc: '事业财运', count: 100 },
  { type: 'yuelao', name: '月老灵签', desc: '姻缘感情', count: 100 },
  { type: 'zhuge', name: '诸葛神签', desc: '趋吉避凶', count: 384 },
  { type: 'huangdaxian', name: '黄大仙签', desc: '福禄寿喜', count: 100 },
]

export default function FortuneStickPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [currentStick, setCurrentStick] = useState<FortuneStick | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const shakeIntervalRef = useRef<number | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (shakeIntervalRef.current) {
        clearInterval(shakeIntervalRef.current)
      }
    }
  }, [])

  const handleSelectType = (type: string) => {
    setSelectedType(type)
    setCurrentStick(null)
    setShowResult(false)
    setError(null)
  }

  const handleBack = () => {
    if (shakeIntervalRef.current) {
      clearInterval(shakeIntervalRef.current)
      setIsShaking(false)
    }
    if (selectedType) {
      setSelectedType(null)
      setCurrentStick(null)
      setShowResult(false)
      setError(null)
    }
  }

  const handleShake = async () => {
    if (isShaking) return

    setIsShaking(true)
    setIsLoading(true)
    setError(null)

    let shakeCount = 0
    const maxShakes = 10

    shakeIntervalRef.current = window.setInterval(() => {
      shakeCount++
    }, 100)

    setTimeout(async () => {
      if (shakeIntervalRef.current) {
        clearInterval(shakeIntervalRef.current)
      }
      setIsShaking(false)

      if (selectedType) {
        const stick = await fetchFortuneStick(selectedType as any)
        if (stick) {
          setCurrentStick(stick)
          setShowResult(true)
        } else {
          setError('获取签文失败，请重试')
        }
      }
      setIsLoading(false)
    }, maxShakes * 100 + 500)
  }

  useEffect(() => {
    if (showResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [showResult])

  if (!selectedType) {
    return (
      <PageWrapper title="求支签" showBack={false}>
        <div className="px-4 py-8">
          <h2 className="text-lg font-medium text-gray-700 mb-6 text-center">
            选择签筒
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {stickTypes.map((item) => (
              <button
                key={item.type}
                onClick={() => handleSelectType(item.type)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
              >
                <div className="text-xl mb-2">{item.type === 'yuelao' ? '🌙' : item.type === 'guanyin' ? '🙏' : item.type === 'guandi' ? '⚔️' : item.type === 'zhuge' ? '📜' : '✨'}</div>
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
                <div className="text-xs text-gray-300 mt-1">{item.count}支签</div>
              </button>
            ))}
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title={stickTypeNames[selectedType]} showBack onBack={handleBack}>
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <div className="text-sm text-gray-500 mb-1">
            {stickTypeNames[selectedType]}
          </div>
          <div className="text-xs text-gray-400">
            {stickTypeDescs[selectedType]}
          </div>
        </div>

        {!showResult && (
          <>
            <div className="flex justify-center mb-8">
              <button
                onClick={handleShake}
                disabled={isShaking}
                className={`relative w-40 h-40 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 shadow-lg flex items-center justify-center transition-transform ${
                  isShaking ? 'animate-bounce' : 'hover:scale-105'
                }`}
              >
                <div className="absolute inset-2 rounded-full bg-gradient-to-b from-amber-200 to-amber-300" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-b from-amber-300 to-amber-400 flex items-center justify-center">
                  <span className="text-amber-700 text-5xl font-bold">
                    {isLoading ? '?' : '签'}
                  </span>
                </div>
                {isShaking && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xl animate-pulse">
                    !
                  </div>
                )}
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">
                心中默念所求之事<br />
                然后点击签筒求签
              </p>
              <button
                onClick={handleShake}
                disabled={isShaking}
                className="px-8 py-3 bg-amber-500 text-white rounded-full font-medium shadow-md hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isShaking ? '求签中...' : '开始求签'}
              </button>
            </div>
          </>
        )}

        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}

        {showResult && currentStick && (
          <div ref={resultRef} className="space-y-4">
            <div className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
              <div className="text-center mb-4">
                <div className="text-amber-600 text-sm mb-1">
                  第 {currentStick.xuhao} 签
                </div>
                <div className="text-xl font-bold text-gray-800">
                  {currentStick.qianming}
                </div>
              </div>

              <div className="bg-white/60 rounded-xl p-4 mb-4">
                <div className="text-xs text-gray-500 mb-2 text-center">签文</div>
                <p className="text-gray-700 text-center leading-relaxed whitespace-pre-line">
                  {currentStick.qianwen}
                </p>
              </div>

              <div className="bg-white/60 rounded-xl p-4 mb-4">
                <div className="text-xs text-gray-500 mb-2 text-center">解曰</div>
                <p className="text-gray-700 text-center">
                  {currentStick.jieyue}
                </p>
              </div>

              <div className="bg-white/60 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-2 text-center">仙机</div>
                <p className="text-gray-700 text-center whitespace-pre-line">
                  {currentStick.xianji}
                </p>
              </div>
            </div>

            {currentStick.diangu && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-2 text-center">典故</div>
                <p className="text-gray-600 text-sm text-center">
                  {currentStick.diangu}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setShowResult(false)
                setCurrentStick(null)
              }}
              className="w-full py-3 text-amber-600 font-medium hover:bg-amber-50 rounded-xl transition-colors"
            >
              再求一签
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
