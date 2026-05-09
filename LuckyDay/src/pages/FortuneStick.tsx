import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import {
  scenes,
  fetchFortuneStick,
  stickTypeNames,
} from '../data/fortuneSticks'
import type { FortuneStick, Scene, StickOption } from '../data/fortuneSticks'

type Step = 'scene' | 'stick' | 'result'

const sceneIcons: Record<string, string> = {
  love: '💕',
  career: '💼',
  wealth: '💰',
  study: '📚',
  health: '💊',
  home: '🏠',
  travel: '✈️',
  confused: '🌫️',
  lawsuit: '⚖️',
  child: '👶',
  random: '✨',
}

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
    return poem.split('|').filter(Boolean).map(line => line.trim())
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
                    <div className="text-3xl mb-3">{sceneIcons[scene.id] || '🔮'}</div>
                    <div className="font-medium text-gray-800 mb-1 text-base">
                      {scene.name}
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {scene.desc}
                    </div>
                    <div className="mt-3 text-xs text-amber-600 font-medium">
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
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                      {stick.type === 'guanyin' && '🪷'}
                      {stick.type === 'guandi' && '⚔️'}
                      {stick.type === 'yuelao' && '🌹'}
                      {stick.type === 'zhuge' && '📜'}
                      {stick.type === 'huangdaxian' && '🧧'}
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
              <div className="absolute inset-2 flex items-center justify-center">
                <span className="text-2xl">🍀</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">诚心祈求中...</p>
            <p className="text-xs text-gray-400">请稍候</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
            <div className="text-5xl mb-4">😔</div>
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
                <span className="text-lg">
                  {selectedStick.type === 'guanyin' && '🪷'}
                  {selectedStick.type === 'guandi' && '⚔️'}
                  {selectedStick.type === 'yuelao' && '🌹'}
                  {selectedStick.type === 'zhuge' && '📜'}
                  {selectedStick.type === 'huangdaxian' && '🧧'}
                </span>
                <span className="text-amber-700 font-medium">{selectedStick.name}</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-200/50 to-orange-200/50 blur-xl rounded-3xl" />
              <div className="relative bg-gradient-to-b from-amber-50 via-orange-50/50 to-amber-100/50 rounded-3xl p-6 shadow-xl border border-amber-200/50">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 text-white font-bold text-lg mb-3 shadow-lg">
                    {currentStick.xuhao.replace(/[^0-9]/g, '')}
                  </div>
                  <div className="text-2xl font-serif text-gray-800 mb-1">
                    {currentStick.qianming}
                  </div>
                  <div className="text-xs text-amber-600 tracking-widest">第 {currentStick.xuhao}</div>
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
                    <p className="text-gray-700 text-sm leading-relaxed text-center">
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
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {currentStick.xianji.split(/[。；]/).filter(Boolean).slice(0, 8).map((item, idx) => (
                        <div key={idx} className="text-gray-600 bg-white/40 rounded-lg px-2 py-1 text-center">
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
                  <span>🔄</span>
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
