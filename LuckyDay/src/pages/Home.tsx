import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'

const modules = [
  {
    path: '/fortune',
    title: '今日运势',
    desc: '黄历宜忌，好运每一天',
    icon: '🌅',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    path: '/horoscope',
    title: '星座物语',
    desc: '十二星座今日指引',
    icon: '✨',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    path: '/fortune-stick',
    title: '求支签',
    desc: '观音灵签，答疑解惑',
    icon: '🎋',
    gradient: 'from-red-400 to-rose-500'
  },
  {
    path: '/holy-cup',
    title: '掷圣杯',
    desc: '虔诚掷杯，求问吉凶',
    icon: '🏺',
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    path: '/answer-book',
    title: '答案之书',
    desc: '翻开答案，找到方向',
    icon: '📖',
    gradient: 'from-blue-400 to-indigo-500'
  },
  {
    path: '/tarot',
    title: '塔罗占卜',
    desc: '神秘塔罗，指引迷津',
    icon: '🔮',
    gradient: 'from-violet-400 to-purple-500'
  },
  {
    path: '/yes-no',
    title: '是与否',
    desc: '二选一，犹豫不决时求答案',
    icon: '🪙',
    gradient: 'from-cyan-400 to-blue-500'
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageWrapper showBack={false}>
      <div className="py-8 px-5">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 mb-4 shadow-lg">
              <span className="text-3xl">🌟</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
              LuckyDay
            </h1>
            <p className="text-gray-500 text-sm tracking-wide">每日运势，美好相伴</p>
          </motion.div>

          {/* Module Grid */}
          <div className="grid grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <motion.button
                key={module.path}
                onClick={() => navigate(module.path)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {module.icon}
                  </div>
                  <h2 className="font-semibold text-gray-800 text-base mb-1 group-hover:text-gray-900">
                    {module.title}
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {module.desc}
                  </p>
                </div>
                <div className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${module.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-xs text-gray-400">
              选择一个功能，开启今日运势之旅
            </p>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}
