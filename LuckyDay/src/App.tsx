import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Fortune from './pages/Fortune'
import FortunePreview from './pages/FortunePreview'
import Horoscope from './pages/Horoscope'
import HolyCup from './pages/HolyCup'
import FortuneStick from './pages/FortuneStick'
import AnswerBook from './pages/AnswerBook'
import Tarot from './pages/Tarot'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fortune" element={<Fortune />} />
      <Route path="/fortune-preview" element={<FortunePreview />} />
      <Route path="/horoscope" element={<Horoscope />} />
      <Route path="/holy-cup" element={<HolyCup />} />
      <Route path="/fortune-stick" element={<FortuneStick />} />
      <Route path="/answer-book" element={<AnswerBook />} />
      <Route path="/tarot" element={<Tarot />} />
    </Routes>
  )
}

export default App
