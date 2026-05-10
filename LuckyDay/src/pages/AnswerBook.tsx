import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getRandomAnswer, type Answer } from '../data/answers'
import html2canvas from 'html2canvas'

interface PageState {
  id: number
  answer: Answer | null
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
  const animationRef = useRef<{ [key: number]: number }>({})

  const handleFlip = () => {
    if (isFlipping || pages.length >= 10) return

    setIsFlipping(true)

    const newPage: PageState = {
      id: Date.now(),
      answer: null,
      isFlipping: true,
      flipProgress: 0
    }

    setPages(prev => [...prev, newPage])

    const startTime = Date.now()
    const duration = 800
    const pageId = newPage.id

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setPages(prev => prev.map(p =>
        p.id === pageId ? { ...p, flipProgress: eased } : p
      ))

      if (progress >= 0.5 && progress < 0.55) {
        const answer = getRandomAnswer()
        setCurrentAnswer(answer)
        setHistory(prev => [answer, ...prev].slice(0, 10))
        setPages(prev => prev.map(p =>
          p.id === pageId ? { ...p, answer } : p
        ))
      }

      if (progress < 1) {
        animationRef.current[pageId] = requestAnimationFrame(animate)
      } else {
        setPages(prev => prev.map(p =>
          p.id === pageId ? { ...p, isFlipping: false, flipProgress: 1 } : p
        ))
        setIsFlipping(false)
      }
    }

    animate()
  }

  const handleReset = () => {
    Object.values(animationRef.current).forEach(id => cancelAnimationFrame(id))
    animationRef.current = {}
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
      Object.values(animationRef.current).forEach(id => cancelAnimationFrame(id))
    }
  }, [])

  const getPageTransform = (progress: number) => {
    const rotation = progress * 180
    return `rotateY(${rotation - 180}deg)`
  }

  const getPageShadow = (progress: number) => {
    return `rgba(0, 0, 0, ${0.3 * Math.sin(progress * Math.PI)})`
  }

  const getCurvedShadow = (progress: number) => {
    if (progress < 0.5) {
      return `linear-gradient(to left, rgba(0,0,0,${progress * 0.4}), transparent)`
    }
    return `linear-gradient(to left, rgba(0,0,0,${(1 - progress) * 0.4}), transparent)`
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

          <div ref={bookRef} className="relative mb-8 py-8">
            <div
              className="relative mx-auto"
              style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}
            >
              <div
                className="relative w-full max-w-[320px] aspect-[3/4] mx-auto"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 rounded-lg shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #fef9e7 0%, #f5e6c8 50%, #e8d4a8 100%)',
                    transform: 'translateZ(-2px)',
                    boxShadow: 'inset 0 0 30px rgba(139, 119, 89, 0.15), 0 8px 32px rgba(0,0,0,0.15)'
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                  }} />
                </div>

                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className="absolute inset-0"
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center',
                      zIndex: pages.length - index
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: page.flipProgress > 0.5
                          ? 'linear-gradient(135deg, #fef9e7 0%, #f5e6c8 100%)'
                          : 'linear-gradient(135deg, #1a365d 0%, #0f2744 100%)',
                        transform: getPageTransform(page.flipProgress),
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        transition: page.isFlipping ? 'none' : 'transform 0.1s ease-out',
                        boxShadow: page.flipProgress > 0 && page.flipProgress < 1
                          ? `-2px 0 ${getPageShadow(page.flipProgress)}`
                          : 'none'
                      }}
                    >
                      {page.flipProgress <= 0.5 ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                          <div className="text-center mb-4">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-amber-400/50 flex items-center justify-center">
                              <span className="text-xl text-amber-400/80">?</span>
                            </div>
                            <h3 className="text-xl font-light text-amber-100/90 tracking-widest">
                              答案之书
                            </h3>
                            <p className="text-xs text-amber-200/50 tracking-wider mt-1">
                              The Book of Answers
                            </p>
                          </div>
                          <div className="absolute bottom-4 left-0 right-0 text-center">
                            <span className="text-xs text-amber-200/40">点击翻开</span>
                          </div>
                        </div>
                      ) : page.answer ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                          <div className="text-center">
                            <p className="text-base text-gray-700 leading-relaxed font-light tracking-wide px-2">
                              {page.answer.text}
                            </p>
                          </div>
                          <div className="absolute bottom-4 right-6">
                            <span className="text-xs text-gray-400/60">{page.answer.id}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                        </div>
                      )}

                      <div
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: page.flipProgress > 0.5
                            ? 'linear-gradient(135deg, #1a365d 0%, #0f2744 100%)'
                            : 'linear-gradient(135deg, #fef9e7 0%, #f5e6c8 100%)',
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          {page.flipProgress <= 0.5 && (
                            <div className="text-center">
                              <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-amber-400/50 flex items-center justify-center">
                                <span className="text-xl text-amber-400/80">?</span>
                              </div>
                              <h3 className="text-xl font-light text-amber-100/90 tracking-widest">
                                答案之书
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {page.flipProgress > 0.3 && page.flipProgress < 1 && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: getCurvedShadow(page.flipProgress),
                          transform: 'translateX(-100%)'
                        }}
                      />
                    )}
                  </div>
                ))}

                {!pages.length && (
                  <div
                    className="absolute inset-0 rounded-lg shadow-2xl cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #1a365d 0%, #0f2744 100%)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 60px rgba(0,0,0,0.2)'
                    }}
                    onClick={handleFlip}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                      <div className="absolute inset-0 opacity-10">
                        <div className="h-full w-full bg-gradient-to-br from-amber-200/20 to-transparent" />
                      </div>
                      <div className="text-center relative">
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

              {pages.length > 0 && (
                <div
                  className="absolute -left-1 top-0 bottom-0 w-1 rounded-l"
                  style={{
                    background: 'linear-gradient(90deg, #8b7355 0%, #a08060 50%, #c4a882 100%)',
                    transform: 'translateZ(1px)',
                    boxShadow: '-2px 0 8px rgba(0,0,0,0.2)'
                  }}
                />
              )}
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-3 bg-gradient-to-t from-gray-300/40 to-transparent rounded-full blur-sm" />
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
            {pages.length > 0 && pages.length < 10 && (
              <button
                onClick={handleFlip}
                disabled={isFlipping}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isFlipping ? '翻页中...' : '再翻一页'}
              </button>
            )}
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
