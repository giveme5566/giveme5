import { ReactNode } from 'react'
import BackButton from './BackButton'

interface PageWrapperProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  onBack?: () => void
}

export default function PageWrapper({ children, title, showBack = true, onBack }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="sticky top-0 bg-[#faf8f5]/95 backdrop-blur-sm z-10">
        <div className="flex items-center h-14 px-4">
          {showBack && <BackButton onClick={onBack} />}
          {title && (
            <h1 className="flex-1 text-lg font-medium text-center pr-8">
              {title}
            </h1>
          )}
        </div>
      </header>
      <main className="px-4 pb-8">
        {children}
      </main>
    </div>
  )
}
