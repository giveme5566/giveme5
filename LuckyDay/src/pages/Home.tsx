import { useNavigate } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

const modules = [
  { path: '/fortune', title: '今日运势', desc: '黄历宜忌，好运每一天' },
  { path: '/horoscope', title: '星座物语', desc: '十二星座今日指引' },
  { path: '/holy-cup', title: '掷圣杯', desc: '一掷即答，心想事成' },
  { path: '/fortune-stick', title: '求支签', desc: '观音灵签，答疑解惑' },
  { path: '/answer-book', title: '答案之书', desc: '翻开答案，找到方向' },
  { path: '/tarot', title: '塔罗占卜', desc: '78张牌的智慧指引' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageWrapper showBack={false}>
      <div className="py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">LuckyDay</h1>
          <p className="text-gray-500 text-sm">每日运势，美好相伴</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => (
            <button
              key={module.path}
              onClick={() => navigate(module.path)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <h2 className="font-medium text-gray-800 mb-1">{module.title}</h2>
              <p className="text-xs text-gray-400">{module.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
