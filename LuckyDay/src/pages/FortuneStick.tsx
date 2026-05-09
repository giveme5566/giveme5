import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import {
  scenes,
  fetchFortuneStick,
} from '../data/fortuneSticks'
import type { FortuneStick, Scene, StickOption } from '../data/fortuneSticks'

type Step = 'scene' | 'stick' | 'result'

export default function FortuneStickPage() {
  const [step, setStep] = useState<Step>('scene')
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null)
  const [selectedStick, setSelectedStick] = useState<StickOption | null>(null)
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

  const handleSelectScene = (scene: Scene) => {
    setSelectedScene(scene)
    setStep('stick')
  }

  const handleSelectStick = async (stick: StickOption) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFortuneStick(stick.type)
      if (result) {
        setSelectedStick(stick)
        setCurrentStick(result)
        setStep('result')
      } else {
        setError('获取签文失败，请重试')
      }
    } catch {
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

  const formatPoem = (poem: string) => {
    if (!poem) return []
    return poem.split(/[。]/).filter(Boolean).map(line => line.trim())
  }

  return (
    <PageWrapper
      title={getTitle()}
      showBack={step !== 'scene'}
      onBack={handleBack}
    >
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
        {step === 'scene' && (
          <div className="px-5 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif text-gray-800 mb-2">心诚则灵</h2>
              <p className="text-sm text-gray-500">选择您想询问的事情类型</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleSelectScene(scene)}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="font-medium text-gray-800 mb-1 text-base text-center">
                      {scene.name}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-2 leading-relaxed text-center">
                      {scene.desc}
                    </div>
                    <div className="mt-3 text-xs text-amber-600 font-medium text-center">
                      {scene.sticks.length} 种签可问
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'stick' && selectedScene && (
          <div className="px-5 py-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-serif text-gray-800 mb-2">{selectedScene.name}</h2>
              <p className="text-sm text-gray-500">选择想要求教的神明</p>
            </div>

            <div className="space-y-4">
              {selectedScene.sticks.map((stick) => (
                <button
                  key={stick.type}
                  onClick={() => handleSelectStick(stick)}
                  className="w-full group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 text-left active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      {stick.type === 'guanyin' && (
                        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L8 6h8l-4-4zM8 6v6l4 4 4-4V6" />
                          <circle cx="12" cy="18" r="3" />
                        </svg>
                      )}
                      {stick.type === 'guandi' && (
                        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m14 0h2M5 5l14 14" />
                          <circle cx="12" cy="12" r="4" />
                        </svg>
                      )}
                      {stick.type === 'yuelao' && (
                        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                      {stick.type === 'zhuge' && (
                        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {stick.type === 'huangdaxian' && (
                        <svg className="w-7 h-7 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-lg mb-1">
                        {stick.name}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {stick.desc}
                      </p>
                    </div>
                    <div className="text-amber-400 group-hover:text-amber-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
            </div>
            <p className="text-gray-500 text-sm mb-1">诚心祈求中...</p>
            <p className="text-xs text-gray-400">请稍候</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-1 text-center">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-8 py-3 bg-amber-500 text-white rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
            >
              返回重试
            </button>
          </div>
        )}

        {step === 'result' && currentStick && selectedStick && (
          <div ref={resultRef} className="px-5 py-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full shadow-sm">
                <span className="text-amber-700 font-medium">{selectedStick.name}</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-200/50 to-orange-200/50 blur-xl rounded-3xl" />
              <div className="relative bg-gradient-to-b from-amber-50 via-orange-50/50 to-amber-100/50 rounded-3xl p-6 shadow-xl border border-amber-200/50">
                <div className="text-center mb-6">
                  <div className="text-2xl font-serif text-gray-800">
                    {currentStick.qianming}
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-4 shadow-inner border border-amber-100/50">
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs text-amber-700 font-medium tracking-wider">
                      签 诗
                    </span>
                  </div>
                  <div className="space-y-3">
                    {formatPoem(currentStick.qianwen).map((line, idx) => (
                      <div key={idx} className="text-center">
                        <span className="text-gray-600 text-lg leading-relaxed">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {currentStick.jieyue && (
                  <div className="bg-gradient-to-r from-amber-100/60 to-orange-100/60 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-amber-200/40">
                    <div className="text-center mb-3">
                      <span className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs text-gray-600 font-medium tracking-wider">
                        解 曰
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {currentStick.jieyue}
                    </p>
                  </div>
                )}

                {currentStick.xianji && (
                  <div className="bg-gradient-to-r from-orange-100/60 to-amber-100/60 backdrop-blur-sm rounded-2xl p-5 border border-orange-200/40">
                    <div className="text-center mb-3">
                      <span className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs text-orange-700 font-medium tracking-wider">
                        仙 机
                      </span>
                    </div>
                    <div className="space-y-2">
                      {currentStick.xianji.split(/[。；]/).filter(Boolean).map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600 leading-relaxed">
                          {item.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleReset}
                className="flex-1 py-4 bg-white/70 backdrop-blur-sm text-gray-600 font-medium rounded-2xl shadow-sm border border-gray-200 hover:bg-white hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 019-9m0 0l6-6m-6 6l-6 6" />
                  </svg>
                  换场景
                </span>
              </button>
              <button
                onClick={() => selectedStick && handleSelectStick(selectedStick)}
                className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-2xl shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  再求一签
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
