import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import {
  scenes,
  fetchFortuneStick,
} from '../data/fortuneSticks'
import type { FortuneStick } from '../data/fortuneSticks'

type Step = 'scene' | 'stick' | 'result'

export default function FortuneStickPage() {
  const [step, setStep] = useState<Step>('scene')
  const [selectedScene, setSelectedScene] = useState<typeof scenes[0] | null>(null)
  const [selectedStick, setSelectedStick] = useState<{
    type: string
    name: string
  } | null>(null)
  const [currentStick, setCurrentStick] = useState<FortuneStick | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step === 'result' && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [step])

  const handleSelectScene = (scene: typeof scenes[0]) => {
    setSelectedScene(scene)
    setStep('stick')
  }

  const handleSelectStick = async (type: string, name: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const stick = await fetchFortuneStick(type as any)
      if (stick) {
        setSelectedStick({ type, name })
        setCurrentStick(stick)
        setStep('result')
      } else {
        setError('获取签文失败，请重试')
      }
    } catch (err) {
      setError('获取签文失败，请检查网络后重试')
    }

    setIsLoading(false)
  }

  const handleBack = () => {
    if (step === 'result') {
      setStep('stick')
      setCurrentStick(null)
      setSelectedStick(null)
    } else if (step === 'stick') {
      setStep('scene')
      setSelectedScene(null)
    }
  }

  const handleReset = () => {
    setStep('scene')
    setSelectedScene(null)
    setSelectedStick(null)
    setCurrentStick(null)
    setError(null)
  }

  const getTitle = () => {
    if (step === 'scene') return '求支签'
    if (step === 'stick' && selectedScene) return selectedScene.name
    if (step === 'result' && selectedStick) return selectedStick.name
    return '求支签'
  }

  return (
    <PageWrapper
      title={getTitle()}
      showBack={step !== 'scene'}
      onBack={handleBack}
    >
      <div className="px-4 py-6">
        {step === 'scene' && (
          <>
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm">
                选择您想询问的事情类型
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleSelectScene(scene)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 text-left"
                >
                  <div className="font-medium text-gray-800 mb-1">
                    {scene.name}
                  </div>
                  <div className="text-xs text-gray-400 line-clamp-2">
                    {scene.desc}
                  </div>
                  <div className="text-xs text-amber-500 mt-2">
                    {scene.sticks.length}种签可问
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'stick' && selectedScene && (
          <>
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm">
                选择想要求教的神明
              </p>
            </div>

            <div className="space-y-3">
              {selectedScene.sticks.map((stick) => (
                <button
                  key={stick.type}
                  onClick={() => handleSelectStick(stick.type, stick.name)}
                  className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 text-left"
                >
                  <div className="font-medium text-gray-800 mb-2">
                    {stick.name}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {stick.desc}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mb-3" />
            <p className="text-gray-500 text-sm">请稍候...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              返回
            </button>
          </div>
        )}

        {step === 'result' && currentStick && selectedStick && (
          <div ref={resultRef} className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full">
                <span className="text-amber-700 text-sm">
                  {selectedStick.name}
                </span>
              </div>
            </div>

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
                <div className="text-xs text-gray-500 mb-2 text-center">签诗</div>
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

              {currentStick.xianji && (
                <div className="bg-white/60 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2 text-center">仙机</div>
                  <p className="text-gray-700 text-center whitespace-pre-line">
                    {currentStick.xianji}
                  </p>
                </div>
              )}
            </div>

            {currentStick.diangu && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-2 text-center">典故</div>
                <p className="text-gray-600 text-sm text-center">
                  {currentStick.diangu}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors"
              >
                换一场景
              </button>
              <button
                onClick={() => handleSelectStick(selectedStick.type, selectedStick.name)}
                className="flex-1 py-3 bg-amber-500 text-white font-medium rounded-xl hover:bg-amber-600 transition-colors"
              >
                再求一签
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
