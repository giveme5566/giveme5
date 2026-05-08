import { useState, useRef } from 'react'
import PageWrapper from '../components/PageWrapper'
import { getRandomAnswer, getAnswerTypeLabel, getAnswerTypeColor, type Answer } from '../data/answers'

export default function AnswerBook() {
  const [question, setQuestion] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [history, setHistory] = useState<Answer[]>([])

  const handleFlip = () => {
    if (isFlipping) return
    
    setIsFlipping(true)
    setShowAnswer(false)
    
    // 翻书动画持续时间
    setTimeout(() => {
      const answer = getRandomAnswer()
      setCurrentAnswer(answer)
      setShowAnswer(true)
      setHistory(prev => [answer, ...prev].slice(0, 10))
      setIsFlipping(false)
    }, 800)
  }

  const handleNewQuestion = () => {
    setQuestion('')
    setCurrentAnswer(null)
    setShowAnswer(false)
  }

  return (
    <PageWrapper title="答案之书">
      <div className="px-5 py-6">
        <div className="max-w-md mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-gray-800 tracking-tight mb-2">
              答案之书
            </h2>
            <p className="text-sm text-gray-400 tracking-wide">
              在心中默念你的问题，然后翻开书页
            </p>
          </div>

          {/* 问题输入 */}
          {!currentAnswer && (
            <div className="mb-8">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在这里写下你的问题..."
                className="w-full h-24 p-4 rounded-2xl border border-gray-200 bg-white/80 
                  text-sm text-gray-700 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300
                  resize-none transition-all duration-300"
              />
            </div>
          )}

          {/* 书本区域 */}
          <div className="relative mb-8">
            {/* 书本容器 */}
            <div 
              className={`relative w-full aspect-[3/4] max-w-[280px] mx-auto cursor-pointer
                transition-transform duration-700 ease-out transform-gpu
                ${isFlipping ? 'scale-[0.98]' : 'hover:scale-[1.02]'}`}
              onClick={!currentAnswer ? handleFlip : undefined}
            >
              {/* 书本封面/页面 */}
              <div 
                className={`absolute inset-0 rounded-r-2xl rounded-l-sm shadow-2xl
                  transition-all duration-700 ease-out transform-gpu origin-left
                  ${isFlipping ? 'rotate-y-180' : ''}
                  ${showAnswer && currentAnswer 
                    ? getAnswerTypeColor(currentAnswer.type).split(' ')[1] 
                    : 'bg-indigo-900'}`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* 封面内容 */}
                {!showAnswer && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    {/* 书本纹理 */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="h-full w-full bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                    
                    {/* 封面标题 */}
                    <div className="relative text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400/60 
                        flex items-center justify-center">
                        <span className="text-2xl text-amber-400/80">?</span>
                      </div>
                      <h3 className="text-2xl font-light text-amber-100/90 tracking-widest mb-2">
                        答案之书
                      </h3>
                      <p className="text-xs text-amber-200/60 tracking-wider uppercase">
                        The Book of Answers
                      </p>
                    </div>

                    {/* 点击提示 */}
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <span className="text-xs text-amber-200/50 tracking-wide">
                        点击翻开
                      </span>
                    </div>
                  </div>
                )}

                {/* 答案内容 */}
                {showAnswer && currentAnswer && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 
                    bg-gradient-to-br from-white/90 to-white/70">
                    {/* 类型标签 */}
                    <div className={`mb-6 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider
                      ${getAnswerTypeColor(currentAnswer.type)}`}>
                      {getAnswerTypeLabel(currentAnswer.type)}
                    </div>

                    {/* 答案文字 */}
                    <div className="text-center">
                      <p className="text-lg text-gray-800 leading-relaxed font-light tracking-wide">
                        {currentAnswer.text}
                      </p>
                    </div>

                    {/* 页码 */}
                    <div className="absolute bottom-6 right-8">
                      <span className="text-xs text-gray-400">
                        {currentAnswer.id}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 书脊效果 */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r 
                from-gray-800 via-gray-700 to-gray-600 rounded-l-sm" />

              {/* 翻页动画的背面 */}
              <div 
                className={`absolute inset-0 rounded-r-2xl rounded-l-sm bg-amber-50
                  transition-all duration-700 ease-out transform-gpu origin-left
                  ${isFlipping ? '' : 'rotate-y-180'}`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transform: isFlipping ? 'rotateY(0deg)' : 'rotateY(-180deg)'
                }}
              >
                {/* 书页纹理 */}
                <div className="absolute inset-0 opacity-30">
                  <div className="h-full w-full bg-gradient-to-br from-amber-100/50 to-transparent" />
                </div>
                
                {/* 翻页中的提示 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-indigo-300/30 border-t-indigo-400 
                    rounded-full animate-spin" />
                </div>
              </div>
            </div>

            {/* 阴影效果 */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 
              bg-gradient-to-t from-gray-200/50 to-transparent rounded-full blur-md" />
          </div>

          {/* 操作按钮 */}
          {currentAnswer && (
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleFlip}
                disabled={isFlipping}
                className="flex-1 py-3 rounded-xl bg-indigo-500 text-white text-sm font-medium
                  hover:bg-indigo-600 active:scale-[0.98] transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                再翻一次
              </button>
              <button
                onClick={handleNewQuestion}
                className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium
                  hover:bg-gray-50 active:scale-[0.98] transition-all duration-300"
              >
                新问题
              </button>
            </div>
          )}

          {/* 历史记录 */}
          {history.length > 0 && (
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                最近的答案
              </h4>
              <div className="space-y-2">
                {history.map((answer, index) => (
                  <div 
                    key={`${answer.id}-${index}`}
                    className={`p-3 rounded-xl text-sm ${getAnswerTypeColor(answer.type).split(' ')[1]} 
                      border ${getAnswerTypeColor(answer.type).split(' ')[2]}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] uppercase tracking-wider
                        ${getAnswerTypeColor(answer.type).split(' ')[0]}`}>
                        {getAnswerTypeLabel(answer.type)}
                      </span>
                    </div>
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
