import { useEffect, useRef } from 'react'

interface LetterCardProps {
  letter: string
  isHidden: boolean
  userInput: string
  isActive: boolean
  isCorrect?: boolean
  isIncorrect?: boolean
}

export function LetterCard({ 
  letter, 
  isHidden, 
  userInput, 
  isActive, 
  isCorrect,
  isIncorrect 
}: LetterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isIncorrect && cardRef.current) {
      cardRef.current.classList.add('animate-headShake')
      const timer = setTimeout(() => {
        cardRef.current?.classList.remove('animate-headShake')
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isIncorrect])

  const displayLetter = isHidden ? (userInput || '') : letter
  const showSpace = letter === ' '

  if (showSpace) {
    return <div className="w-4 md:w-6" />
  }

  let cardClasses = 'letter-card w-20 h-24 md:w-28 md:h-32 flex items-center justify-center rounded-xl font-bold text-5xl md:text-7xl shadow-xl border-4 transition-all duration-300'
  
  if (isCorrect) {
    cardClasses += ' bg-green-500 border-green-400 scale-110'
  } else if (isHidden) {
    cardClasses += ' bg-destructive/20 border-destructive'
    if (isActive) {
      cardClasses += ' letter-card-active'
    }
  } else {
    cardClasses += ' bg-card border-card text-card-foreground'
  }

  return (
    <div ref={cardRef} className={cardClasses}>
      <span className="select-none">
        {displayLetter.toUpperCase()}
      </span>
    </div>
  )
}
