import { useEffect, useRef, useState } from 'react'

interface LetterCardProps {
  letter: string
  isHidden: boolean
  userInput: string
  isActive: boolean
  isCorrect?: boolean
  isIncorrect?: boolean
  showCorrectAnswer?: boolean
}

export function LetterCard({ 
  letter, 
  isHidden, 
  userInput, 
  isActive, 
  isCorrect,
  isIncorrect,
  showCorrectAnswer
}: LetterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [showGreen, setShowGreen] = useState(false)

  useEffect(() => {
    if (isIncorrect && cardRef.current) {
      cardRef.current.classList.add('animate-headShake')
      const timer = setTimeout(() => {
        cardRef.current?.classList.remove('animate-headShake')
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [isIncorrect])

  useEffect(() => {
    if (showCorrectAnswer && isHidden && isIncorrect) {
      const timer = setTimeout(() => {
        setShowGreen(true)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setShowGreen(false)
    }
  }, [showCorrectAnswer, isHidden, isIncorrect])

  const isWrongLetter = isIncorrect && isHidden && userInput && userInput !== letter
  const displayLetter = isHidden ? (showCorrectAnswer ? letter : (userInput || '')) : letter
  const showSpace = letter === ' '

  if (showSpace) {
    return <div className="w-4 md:w-6" />
  }

  let cardClasses = 'letter-card w-20 h-24 md:w-28 md:h-32 flex items-center justify-center rounded-xl font-bold text-5xl md:text-7xl shadow-xl border-4 transition-all duration-1000'
  
  if (isCorrect) {
    cardClasses += ' bg-green-500 border-green-400 scale-110'
  } else if (showGreen) {
    cardClasses += ' bg-green-500 border-green-400 scale-105'
  } else if (isWrongLetter) {
    cardClasses += ' bg-destructive border-destructive text-destructive-foreground'
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
