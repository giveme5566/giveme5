import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
  onClick?: () => void
}

export default function BackButton({ className = '', onClick }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${className}`}
    >
      <ArrowLeft size={24} />
    </button>
  )
}
