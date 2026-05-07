import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
    >
      <ArrowLeft size={24} />
    </button>
  )
}
