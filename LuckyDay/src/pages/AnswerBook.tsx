import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getRandomAnswer, type Answer } from '../data/answers'
import html2canvas from 'html2canvas'

export default function AnswerBook() {
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipProgress, setFlipProgress] = useState(0)
  const [showCover, setShowCover] = useState(true)
  const [showNewAnswer, setShowNewAnswer] = useState(false)
  const [history, setHistory] = useState<Answer[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const animateFlip = () => {
    const startTime = Date.now()
    const duration = 1000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const eased = 1 - Math.pow(1 - progress, 3)
      setFlipProgress(eased)

      if (progress < 0.5) {
        setShowCover(true)
        setShowNewAnswer(false)
      } else if (progress >= 0.5 && progress < 0.6) {
        const answer = getRandomAnswer()
        setCurrentAnswer(answer)
        setHistory(prev => [answer, ...prev].slice(0, 10))
        setShowNewAnswer(true)
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsFlipping(false)
        setFlipProgress(0)
        setShowCover(false)
      }
    }

    animate()
  }

  const handleFlip = () => {
    if (isFlipping) return

    setIsFlipping(true)
    animateFlip()
  }

  const handleSaveImage = async () => {
    if (!bookRef.current || isSaving) return

    setIsSaving(true)
    try {
      const canvas = await html2canvas(bookRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true
      })

      const link = document.createElement('a')
      link.download = `答案之书-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Save image error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const getPageTransform = () => {
    const rotation = flipProgress * 180
    return `rotateY(${rotation}deg)`
  }

  const getShadowOpacity = () => {
    if (flipProgress < 0.5) {
      return flipProgress * 0.6
    }
    return (1 - flipProgress) * 0.6
  }

  const getPageBackTransform = () => {
    const rotation = flipProgress * 180
    return `rotateY(${rotation - 180}deg)`
  }

  return (
    <PageWrapper title="答案之书">
      <div className="px-5 py-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-gray-800 tracking-tight mb-2">
              答案之书
            </h2>
            <p className="text-sm text-gray-400 tracking-wide">
              在心中默念你的问题，点击书页获取答案
            </p>
          </div>

          <div ref={bookRef} className="relative mb-8 p-4 bg-gradient-to-b from-transparent via-transparent to-gray-50/30 rounded-3xl">
            <div
              className="relative w-full aspect-[3/4] max-w-[280px] mx-auto cursor-pointer"
              onClick={handleFlip}
              style={{ perspective: '1200px' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute w-full h-full rounded-r-2xl rounded-l-sm shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
                    transformStyle: 'preserve-3d',
                    transform: getPageBackTransform(),
                    backfaceVisibility: 'hidden',
                    transition: flipProgress > 0 ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-gradient-to-br from-white/30 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400/60 flex items-center justify-center">
                        <span className="text-2xl text-amber-400/80">?</span>
                      </div>
                      <h3 className="text-2xl font-light text-amber-100/90 tracking-widest mb-2">
                        答案之书
                      </h3>
                      <p className="text-xs text-amber-200/60 tracking-wider uppercase">
                        The Book of Answers
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <span className="text-xs text-amber-200/50 tracking-wide">
                      点击翻开
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="relative w-full h-full rounded-r-2xl rounded-l-sm shadow-2xl cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: getPageTransform(),
                  transformOrigin: 'left center',
                  transition: flipProgress > 0 ? 'none' : 'transform 0.3s ease'
                }}
                onClick={handleFlip}
              >
                <div
                  className="absolute inset-0 rounded-r-2xl rounded-l-sm"
                  style={{
                    background: showCover || flipProgress > 0
                      ? 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)'
                      : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {showCover && flipProgress === 0 && (
                    <>
                      <div className="absolute inset-0 opacity-20">
                        <div className="h-full w-full bg-gradient-to-br from-white/30 to-transparent" />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400/60 flex items-center justify-center">
                            <span className="text-2xl text-amber-400/80">?</span>
                          </div>
                          <h3 className="text-2xl font-light text-amber-100/90 tracking-widest mb-2">
                            答案之书
                          </h3>
                          <p className="text-xs text-amber-200/60 tracking-wider uppercase">
                            The Book of Answers
                          </p>
                        </div>
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                          <span className="text-xs text-amber-200/50 tracking-wide">
                            点击翻开
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {showNewAnswer && currentAnswer && (
                    <>
                      <div className="absolute inset-0 opacity-30">
                        <div className="h-full w-full bg-gradient-to-br from-amber-200/50 to-transparent" />
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <p className="text-lg text-gray-700 leading-relaxed font-light tracking-wide text-center">
                          {currentAnswer.text}
                        </p>
                        <div className="absolute bottom-6 right-8">
                          <span className="text-xs text-gray-400">
                            {currentAnswer.id}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div
                  className="absolute inset-0 rounded-r-2xl rounded-l-sm"
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                />
              </div>

              <div
                className="absolute top-0 left-0 w-3 h-full rounded-l-sm"
                style={{
                  background: 'linear-gradient(90deg, #0f2744 0%, #1e3a5f 50%, #2d4a6f 100%)',
                  transform: 'translateZ(1px)'
                }}
              />

              <div
                className="absolute top-1/2 left-0 w-full h-1 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,${getShadowOpacity()}) 50%, transparent 100%)`,
                  transform: 'translateY(-50%)'
                }}
              />
            </div>

            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-t from-gray-200/50 to-transparent rounded-full blur-md"
              style={{
                opacity: 1 - flipProgress * 0.5
              }}
            />
          </div>

          {currentAnswer && (
            <div className="mb-8">
              <button
                onClick={handleSaveImage}
                disabled={isSaving}
                className="w-full py-3 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    保存图片
                  </>
                )}
              </button>
            </div>
          )}

          {history.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                最近的答案
              </h4>
              <div className="space-y-2">
                {history.map((answer, index) => (
                  <div
                    key={`${answer.id}-${index}`}
                    className="p-3 rounded-xl text-sm bg-amber-50 border border-amber-100"
                  >
                    <p className="text-gray-700">{answer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
