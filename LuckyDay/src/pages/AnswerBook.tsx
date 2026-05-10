import { useState, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getRandomAnswer, type Answer } from '../data/answers'
import html2canvas from 'html2canvas'

const PAGE_COUNT = 5

export default function AnswerBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setPages] = useState<(Answer | null)[]>(() =>
    Array(PAGE_COUNT).fill(null).map(() => getRandomAnswer())
  )
  const [isFlipping, setIsFlipping] = useState(false)
  const [history, setHistory] = useState<Answer[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)

  const handleFlip = () => {
    if (isFlipping || currentPage >= PAGE_COUNT - 1) return

    setIsFlipping(true)
    setTimeout(() => {
      const prevAnswer = pages[currentPage]
      if (prevAnswer) {
        setHistory(h => [prevAnswer, ...h].slice(0, 10))
      }
      setCurrentPage(prev => prev + 1)
      setIsFlipping(false)
    }, 800)
  }

  const handleReset = () => {
    setCurrentPage(0)
    setPages(Array(PAGE_COUNT).fill(null).map(() => getRandomAnswer()))
    setHistory([])
  }

  const handleNewAnswer = () => {
    if (isFlipping || currentPage >= PAGE_COUNT - 1) return

    setIsFlipping(true)
    const newAnswer = getRandomAnswer()
    setPages(prev => prev.map((p, i) => i === currentPage ? newAnswer : p))

    setTimeout(() => {
      setIsFlipping(false)
    }, 800)
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
              className="flipbook mx-auto"
              style={{ width: '300px', height: '400px' }}
            >
              <div
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #d4a574 0%, #c49a6c 10%, #f5e6c8 10.5%, #f5e6c8 100%)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                }}
              >
                <div
                  className="absolute top-0 left-0 w-4 h-full"
                  style={{
                    background: 'linear-gradient(90deg, #8b7355 0%, #a08060 50%, #c4a882 100%)'
                  }}
                />
              </div>

              {pages.map((page, index) => {
                const isFlipped = index < currentPage

                return (
                  <div
                    key={index}
                    className={`leaf ${isFlipping && index === currentPage ? 'flipping' : ''}`}
                    style={{
                      transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0)',
                      zIndex: pages.length - index
                    }}
                  >
                    <div
                      className="page back"
                      style={{
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(180deg, #1a365d 0%, #0f2744 100%)'
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
                      className="page front"
                      style={{
                        transform: 'rotateY(0deg)',
                        background: 'linear-gradient(180deg, #fef9e7 0%, #f5e6c8 100%)'
                      }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-6">
                        {page ? (
                          <>
                            <p className="text-base text-gray-700 leading-relaxed font-light tracking-wide text-center px-4">
                              {page.text}
                            </p>
                            <div className="absolute bottom-4 right-6 flex items-center gap-2">
                              <span className="text-xs text-gray-400/60">{page.id}</span>
                              {index === currentPage && (
                                <button
                                  onClick={handleNewAnswer}
                                  className="text-xs text-amber-500 hover:text-amber-600"
                                >
                                  换答案
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="text-center text-gray-400">
                            <p className="text-sm">点击下方按钮翻开</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-gradient-to-t from-gray-400/30 to-transparent rounded-full blur-md"
            />
          </div>

          <div className="flex gap-3 mb-8">
            {currentPage > 0 && (
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                重新开始
              </button>
            )}
            {currentPage > 0 && (
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
            {currentPage < PAGE_COUNT && (
              <button
                onClick={handleFlip}
                disabled={isFlipping}
                className="flex-1 py-3 rounded-xl bg-amber-500 text-white text-sm font-medium hover:bg-amber-600 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isFlipping ? '翻页中...' : (currentPage === 0 ? '翻开' : '再翻一页')}
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

      <style>{`
        .flipbook {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .leaf {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s ease-in-out;
          transform-origin: left center;
        }

        .leaf.flipping {
          transition: none;
        }

        .page {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0 8px 8px 0;
          overflow: hidden;
        }

        .page.front {
          transform: rotateY(0deg);
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .page.back {
          transform: rotateY(180deg);
          box-shadow: -2px 0 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </PageWrapper>
  )
}
