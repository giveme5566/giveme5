import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getRandomAnswer, type Answer } from '../data/answers'
import html2canvas from 'html2canvas'

interface PageState {
  id: number
  answer: Answer
  isFlipping: boolean
  flipProgress: number
}

export default function AnswerBook() {
  const [pages, setPages] = useState<PageState[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [history, setHistory] = useState<Answer[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const handleFlip = () => {
    if (isFlipping) return

    const answer = getRandomAnswer()
    setCurrentAnswer(answer)
    setHistory(prev => [answer, ...prev].slice(0, 10))

    const newPage: PageState = {
      id: Date.now(),
      answer,
      isFlipping: true,
      flipProgress: 0
    }

    setPages(prev => [...prev, newPage])
    setIsFlipping(true)

    const startTime = Date.now()
    const duration = 800

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)

      setPages(prev => prev.map((p, i) =>
        i === prev.length - 1 ? { ...p, flipProgress: eased } : p
      ))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setPages(prev => prev.map(p =>
          p.id === newPage.id ? { ...p, isFlipping: false } : p
        ))
        setIsFlipping(false)
      }
    }

    animate()
  }

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setPages([])
    setCurrentAnswer(null)
    setHistory([])
    setIsFlipping(false)
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

  const getFlipStyle = (progress: number) => {
    const rotation = progress * 180
    const shadowIntensity = Math.sin(progress * Math.PI) * 30
    const perspectiveAdjust = progress < 0.5 ? 100 * (1 - progress) : -100 * (progress - 0.5)

    return {
      transform: `rotateY(${rotation}deg) translateX(${perspectiveAdjust}px)`,
      boxShadow: `0 ${shadowIntensity}px ${shadowIntensity * 2}px rgba(0,0,0,0.3)`
    }
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

          <div ref={bookRef} className="relative mb-8 pt-4">
            <div
              className="relative mx-auto"
              style={{
                perspective: '1500px',
                width: '320px',
                height: '420px'
              }}
            >
              <div className="absolute inset-0 rounded-lg overflow-hidden" style={{
                background: 'linear-gradient(180deg, #d4a574 0%, #c49a6c 10%, #f5e6c8 10.5%, #f5e6c8 100%)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
              }}>
                <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 rounded-l-lg" />
              </div>

              {pages.map((page, index) => (
                <div
                  key={page.id}
                  className="absolute top-0 right-0 w-full h-full"
                  style={{
                    ...getFlipStyle(page.flipProgress),
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                    transition: page.isFlipping ? 'none' : 'transform 0.3s ease',
                    zIndex: pages.length - index
                  }}
                >
                  <div className="leaf" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
                    <div className="leaf" style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
                      <div
                        className="page front"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          background: 'linear-gradient(180deg, #1a365d 0%, #0f2744 100%)',
                          borderRadius: '0 8px 8px 0'
                        }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                          <div className="absolute inset-0 opacity-10">
                            <div className="h-full w-full bg-gradient-to-br from-amber-200/20 to-transparent" />
                          </div>
                          <div className="text-center relative z-10">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-amber-400/50 flex items-center justify-center">
                              <span className="text-xl text-amber-400/80">?</span>
                            </div>
                            <h3 className="text-xl font-light text-amber-100/90 tracking-widest">
                              答案之书
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div
                        className="page back"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backfaceVisibility: 'hidden',
                          background: 'linear-gradient(180deg, #fef9e7 0%, #f5e6c8 100%)',
                          borderRadius: '0 8px 8px 0',
                          boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                          <p className="text-base text-gray-700 leading-relaxed font-light tracking-wide text-center px-4">
                            {page.answer.text}
                          </p>
                          <div className="absolute bottom-4 right-6">
                            <span className="text-xs text-gray-400/60">{page.answer.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {!pages.length && (
                <div
                  className="absolute inset-0 rounded-lg cursor-pointer"
                  style={{
                    background: 'linear-gradient(180deg, #1a365d 0%, #0f2744 100%)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                  }}
                  onClick={handleFlip}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    <div className="absolute inset-0 opacity-10">
                      <div className="h-full w-full bg-gradient-to-br from-amber-200/20 to-transparent" />
                    </div>
                    <div className="text-center relative z-10">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400/50 flex items-center justify-center">
                        <span className="text-2xl text-amber-400/80">?</span>
                      </div>
                      <h3 className="text-2xl font-light text-amber-100/90 tracking-widest mb-2">
                        答案之书
                      </h3>
                      <p className="text-xs text-amber-200/50 tracking-wider uppercase">
                        The Book of Answers
                      </p>
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <span className="text-xs text-amber-200/40 tracking-wide">
                        点击翻开
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-gradient-to-t from-gray-400/30 to-transparent rounded-full blur-md" />
          </div>

          <div className="flex gap-3 mb-8">
            {pages.length > 0 && (
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                重新开始
              </button>
            )}
            {currentAnswer && (
              <button
                onClick={handleSaveImage}
                disabled={isSaving}
                className="flex-1 py-3 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
            )}
            <button
              onClick={handleFlip}
              disabled={isFlipping}
              className="flex-1 py-3 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isFlipping ? '翻页中...' : (pages.length ? '再翻一页' : '翻开')}
            </button>
          </div>

          {history.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                最近的答案
              </h4>
              <div className="space-y-2">
                {history.slice(0, 5).map((answer, index) => (
                  <div
                    key={`${answer.id}-${index}`}
                    className="p-3 rounded-xl text-sm bg-gradient-to-r from-amber-50 to-amber-50/50 border border-amber-100/50"
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
