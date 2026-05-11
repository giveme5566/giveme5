import { useState, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getRandomAnswer, type Answer } from '../data/answers'
import html2canvas from 'html2canvas'

const PAGE_COUNT = 5

export default function AnswerBook() {
  const [currentPage, setCurrentPage] = useState(-1)
  const [pages, setPages] = useState<(Answer | null)[]>(() =>
    Array(PAGE_COUNT).fill(null)
  )
  const [history, setHistory] = useState<Answer[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const bookRef = useRef<HTMLDivElement>(null)
  const [flippingPage, setFlippingPage] = useState(-1)

  const handleFlip = () => {
    const nextPage = currentPage + 1
    if (nextPage >= PAGE_COUNT) return
    if (flippingPage >= 0) return

    // 生成新答案
    const newAnswer = getRandomAnswer()
    setPages(prev => {
      const newPages = [...prev]
      newPages[nextPage] = newAnswer
      return newPages
    })

    // 将当前答案加入历史
    if (currentPage >= 0) {
      const prevAnswer = pages[currentPage]
      if (prevAnswer) {
        setHistory(h => [prevAnswer, ...h].slice(0, 10))
      }
    }

    setFlippingPage(nextPage)

    setTimeout(() => {
      setCurrentPage(nextPage)
      setFlippingPage(-1)
    }, 1000)
  }

  const handleReset = () => {
    setCurrentPage(-1)
    setPages(Array(PAGE_COUNT).fill(null))
    setHistory([])
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

  // 封面组件
  const CoverPage = () => (
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
  )

  // 空白内页组件（用于已翻过的页面背面）
  const BlankInnerPage = () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-gradient-to-br from-amber-800/10 to-transparent" />
      </div>
    </div>
  )

  // 答案内页组件
  const AnswerPage = ({ answer }: { answer: Answer }) => (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <p className="text-base text-gray-700 leading-relaxed font-light tracking-wide text-center px-4">
        {answer.text}
      </p>
      <div className="absolute bottom-4 right-6">
        <span className="text-xs text-gray-400/60">{answer.id}</span>
      </div>
    </div>
  )

  // 判断是否可以翻页
  const canFlip = currentPage < PAGE_COUNT - 1 && flippingPage < 0

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
              className={`flipbook mx-auto ${canFlip ? 'cursor-pointer' : 'cursor-default'}`}
              style={{ width: '300px', height: '400px' }}
              onClick={canFlip ? handleFlip : undefined}
            >
              {/* 书底座（左侧已翻页区域） */}
              <div
                className="book-base absolute inset-0 rounded-r-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #e8dcc8 0%, #f0e6d3 50%, #f5e6c8 100%)',
                  boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.15)'
                }}
              >
                {/* 书脊 */}
                <div
                  className="absolute top-0 left-0 w-3 h-full"
                  style={{
                    background: 'linear-gradient(90deg, #c4a882 0%, #d4b896 30%, #e0c9a8 60%, #c4a882 100%)'
                  }}
                />
                {/* 纸张纹理 */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(139, 115, 85, 0.03) 2px,
                      rgba(139, 115, 85, 0.03) 4px
                    )`
                  }}
                />
              </div>

              {/* 封面（第 -1 层，初始可见） */}
              <div
                className={`leaf cover-leaf ${flippingPage === 0 ? 'flipping' : ''}`}
                style={{
                  transform: currentPage >= 0 ? 'rotateY(-160deg)' : 'rotateY(0deg)',
                  zIndex: PAGE_COUNT + 1
                }}
              >
                {/* 封面正面（深蓝色封面） */}
                <div
                  className="page front cover-front"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 50%, #1a365d 100%)'
                  }}
                >
                  {/* 封面纹理 */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
                    }}
                  />
                  <CoverPage />
                </div>
                {/* 封面背面（空白内页） */}
                <div
                  className="page back"
                  style={{
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(180deg, #fefcf8 0%, #f9f5eb 100%)'
                  }}
                >
                  {/* 纸张纹理 */}
                  <div 
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(139, 115, 85, 0.02) 2px,
                        rgba(139, 115, 85, 0.02) 4px
                      )`
                    }}
                  />
                  <BlankInnerPage />
                </div>
              </div>

              {/* 内页（第 0 到 PAGE_COUNT-1） */}
              {pages.map((page, index) => {
                const isFlipped = index < currentPage
                const isFlipping = index === flippingPage

                return (
                  <div
                    key={index}
                    className={`leaf page-leaf ${isFlipping ? 'flipping' : ''}`}
                    style={{
                      transform: isFlipped ? 'rotateY(-160deg)' : 'rotateY(0deg)',
                      zIndex: PAGE_COUNT - index
                    }}
                  >
                    {/* 内页正面（显示答案） */}
                    <div
                      className="page front"
                      style={{
                        background: 'linear-gradient(180deg, #fefcf8 0%, #f9f5eb 100%)'
                      }}
                    >
                      {/* 纸张纹理 */}
                      <div 
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(139, 115, 85, 0.02) 2px,
                            rgba(139, 115, 85, 0.02) 4px
                          )`
                        }}
                      />
                      {/* 页面边缘阴影 */}
                      <div 
                        className="absolute inset-y-0 right-0 w-8"
                        style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(139, 115, 85, 0.05) 100%)'
                        }}
                      />
                      {page ? (
                        <AnswerPage answer={page} />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6">
                          <p className="text-sm text-gray-400">点击书页翻开</p>
                        </div>
                      )}
                    </div>
                    {/* 内页背面（空白） */}
                    <div
                      className="page back"
                      style={{
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(180deg, #fefcf8 0%, #f9f5eb 100%)'
                      }}
                    >
                      {/* 纸张纹理 */}
                      <div 
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(139, 115, 85, 0.02) 2px,
                            rgba(139, 115, 85, 0.02) 4px
                          )`
                        }}
                      />
                      <BlankInnerPage />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 书本阴影 */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[280px] h-8 bg-gradient-to-t from-gray-400/20 to-transparent rounded-full blur-xl"
            />
          </div>

          <div className="flex gap-3 mb-8">
            {currentPage >= 0 && (
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                重新开始
              </button>
            )}
            {currentPage >= 0 && (
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
          perspective: 1500px;
        }

        .book-base {
          transform: translateZ(-2px);
        }

        .leaf {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform-origin: left center;
          transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .leaf.flipping {
          transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .page {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0 6px 6px 0;
          overflow: hidden;
        }

        .page.front {
          box-shadow: 
            1px 0 3px rgba(0,0,0,0.08),
            3px 0 8px rgba(0,0,0,0.05);
        }

        .page.back {
          box-shadow: 
            -1px 0 3px rgba(0,0,0,0.08),
            -3px 0 8px rgba(0,0,0,0.05);
        }

        .cover-front {
          box-shadow: 
            2px 0 5px rgba(0,0,0,0.15),
            5px 0 15px rgba(0,0,0,0.1);
          border-radius: 0 8px 8px 0;
        }

        /* 翻页时的弯曲效果 */
        .page-leaf.flipping .page.front {
          background: linear-gradient(90deg, #f0ebe0 0%, #fefcf8 5%, #f9f5eb 100%) !important;
        }

        .cover-leaf.flipping .cover-front {
          background: linear-gradient(90deg, #0f2744 0%, #1e3a5f 5%, #1a365d 100%) !important;
        }
      `}</style>
    </PageWrapper>
  )
}
