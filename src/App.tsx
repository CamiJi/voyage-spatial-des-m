import { useState, useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { SpaceBackground } from '@/components/SpaceBackground'
import { LetterCard } from '@/components/LetterCard'
import { SpaceProgress } from '@/components/SpaceProgress'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus, Trash, Gear, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface WordEntry {
  article: string
  word: string
}

interface LetterState {
  letter: string
  isHidden: boolean
  userInput: string
}

function App() {
  const [wordList, setWordList] = useKV<WordEntry[]>('word-list', [])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [letterStates, setLetterStates] = useState<LetterState[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showSetup, setShowSetup] = useState(false)
  const [newArticle, setNewArticle] = useState('')
  const [newWord, setNewWord] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [successCount, setSuccessCount] = useState(0)

  const safeWordList = wordList || []

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  const calculateHiddenCount = useCallback((wordIndex: number, totalWords: number) => {
    if (totalWords === 0) return 0
    const ratio = wordIndex / totalWords
    const word = safeWordList[wordIndex]?.word || ''
    const wordLength = word.replace(/\s/g, '').length
    return Math.max(1, Math.min(wordLength, Math.ceil(wordLength * ratio)))
  }, [safeWordList])

  const initializeWord = useCallback(() => {
    if (safeWordList.length === 0 || currentWordIndex >= safeWordList.length) {
      setLetterStates([])
      return
    }

    const entry = safeWordList[currentWordIndex]
    const fullText = `${entry.article} ${entry.word}`
    const letters = fullText.split('')
    
    const hiddenCount = calculateHiddenCount(currentWordIndex, safeWordList.length)
    const wordLetters = entry.word.replace(/\s/g, '').split('')
    const indices = wordLetters.map((_, i) => i)
    
    const shuffled = indices.sort(() => Math.random() - 0.5)
    const hiddenIndices = new Set(shuffled.slice(0, hiddenCount))
    
    let wordLetterIndex = 0
    const states: LetterState[] = letters.map((letter) => {
      const isSpace = letter === ' '
      const shouldHide = !isSpace && hiddenIndices.has(wordLetterIndex)
      if (!isSpace) wordLetterIndex++
      
      return {
        letter,
        isHidden: shouldHide,
        userInput: ''
      }
    })

    setLetterStates(states)
    setActiveIndex(states.findIndex(s => s.isHidden))
    setIsCorrect(null)
  }, [safeWordList, currentWordIndex, calculateHiddenCount])

  useEffect(() => {
    if (gameStarted && safeWordList.length > 0) {
      initializeWord()
    }
  }, [gameStarted, currentWordIndex, safeWordList.length, initializeWord])

  useEffect(() => {
    if (safeWordList.length === 0) {
      setShowSetup(true)
      setGameStarted(false)
    }
  }, [safeWordList.length])

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted || isCorrect !== null || letterStates.length === 0) return

    const key = e.key

    if (key === 'Backspace') {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < letterStates.length) {
        setLetterStates(current => {
          const newStates = [...current]
          if (newStates[activeIndex].userInput) {
            newStates[activeIndex].userInput = ''
            return newStates
          } else {
            const prevHiddenStates = current.slice(0, activeIndex).filter(s => s.isHidden)
            const prevIndex = prevHiddenStates.length > 0 ? 
              current.lastIndexOf(prevHiddenStates[prevHiddenStates.length - 1]) : -1
            if (prevIndex >= 0) {
              newStates[prevIndex].userInput = ''
              setActiveIndex(prevIndex)
            }
            return newStates
          }
        })
      }
      return
    }

    if (key.length === 1 && /[a-zàâäéèêëïîôùûüÿçœæ]/i.test(key)) {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < letterStates.length) {
        setLetterStates(current => {
          const newStates = [...current]
          newStates[activeIndex].userInput = key
          
          const nextIndex = current.slice(activeIndex + 1).findIndex(s => s.isHidden)
          if (nextIndex >= 0) {
            setActiveIndex(activeIndex + 1 + nextIndex)
          } else {
            setActiveIndex(-1)
            setTimeout(() => validateAnswer(newStates), 300)
          }
          
          return newStates
        })
      }
    }
  }, [gameStarted, isCorrect, letterStates.length, activeIndex])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const validateAnswer = (states: LetterState[]) => {
    const userAnswer = states.map(s => s.isHidden ? s.userInput : s.letter).join('')
    const correctAnswer = states.map(s => s.letter).join('')
    
    const isAnswerCorrect = normalizeText(userAnswer) === normalizeText(correctAnswer)
    
    setIsCorrect(isAnswerCorrect)
    
    if (isAnswerCorrect) {
      toast.success('Bravo ! 🚀')
      setSuccessCount(prev => Math.min(prev + 1, safeWordList.length))
      
      setTimeout(() => {
        if (currentWordIndex < safeWordList.length - 1) {
          setCurrentWordIndex(prev => prev + 1)
          setSuccessCount(prev => prev)
        } else {
          toast.success('Félicitations ! Tu as atteint la Lune ! 🌙', { duration: 5000 })
        }
      }, 1500)
    } else {
      toast.error('Oups ! Essaie encore')
      setSuccessCount(0)
      
      setTimeout(() => {
        initializeWord()
      }, 1000)
    }
  }

  const addWord = () => {
    if (newArticle.trim() && newWord.trim()) {
      setWordList(current => [...(current || []), { article: newArticle.trim(), word: newWord.trim() }])
      setNewArticle('')
      setNewWord('')
      toast.success('Mot ajouté !')
    }
  }

  const removeWord = (index: number) => {
    setWordList(current => (current || []).filter((_, i) => i !== index))
  }

  const startGame = () => {
    if (safeWordList.length > 0) {
      setGameStarted(true)
      setCurrentWordIndex(0)
      setSuccessCount(0)
      setShowSetup(false)
    } else {
      toast.error('Ajoute au moins un mot pour commencer')
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentWordIndex(0)
    setSuccessCount(0)
    setShowSetup(true)
  }

  if (!gameStarted) {
    return (
      <SpaceBackground>
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <Sparkle size={48} weight="fill" />
              Voyage Spatial des Mots
            </h1>
            <p className="text-lg text-foreground/80">
              Décolle vers la Lune en complétant les mots !
            </p>
          </motion.div>

          <Dialog open={showSetup} onOpenChange={setShowSetup}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Configuration des mots</DialogTitle>
                <DialogDescription>
                  Ajoute les mots que l'élève doit apprendre
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Article (ex: une, le)"
                    value={newArticle}
                    onChange={(e) => setNewArticle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addWord()}
                    className="w-1/3"
                  />
                  <Input
                    placeholder="Mot (ex: sœur, cœur)"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addWord()}
                    className="flex-1"
                  />
                  <Button onClick={addWord} size="icon">
                    <Plus size={20} />
                  </Button>
                </div>

                <div className="space-y-2">
                  {safeWordList.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Aucun mot ajouté
                    </p>
                  ) : (
                    safeWordList.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-card/50 p-3 rounded-lg"
                      >
                        <span className="text-lg">
                          {entry.article} <strong>{entry.word}</strong>
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeWord(index)}
                        >
                          <Trash size={18} />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                <Button onClick={startGame} className="w-full" size="lg">
                  Démarrer le jeu ({safeWordList.length} mot{safeWordList.length > 1 ? 's' : ''})
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {!showSetup && safeWordList.length > 0 && (
            <Button onClick={startGame} size="lg" className="mt-8">
              Démarrer le jeu
            </Button>
          )}

          {!showSetup && safeWordList.length === 0 && (
            <Button onClick={() => setShowSetup(true)} size="lg" className="mt-8">
              Configurer les mots
            </Button>
          )}
        </div>
      </SpaceBackground>
    )
  }

  const currentEntry = safeWordList[currentWordIndex]
  const hasFinished = currentWordIndex >= safeWordList.length

  return (
    <SpaceBackground>
      <div className="container mx-auto px-4 py-4 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
            <Sparkle size={32} weight="fill" />
            Voyage Spatial
          </h1>
          <Button variant="outline" size="icon" onClick={resetGame}>
            <Gear size={20} />
          </Button>
        </div>

        <SpaceProgress progress={successCount} totalWords={safeWordList.length} />

        {hasFinished ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              🌙 Félicitations ! 🌙
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Tu as atteint la Lune !
            </p>
            <Button onClick={resetGame} size="lg">
              Recommencer
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-8 text-center">
              <p className="text-lg text-muted-foreground mb-2">
                Mot {currentWordIndex + 1} sur {safeWordList.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Complète les lettres manquantes
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl"
              >
                {letterStates.map((state, index) => (
                  <LetterCard
                    key={index}
                    letter={state.letter}
                    isHidden={state.isHidden}
                    userInput={state.userInput}
                    isActive={index === activeIndex}
                    isCorrect={isCorrect === true && state.isHidden}
                    isIncorrect={isCorrect === false}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {isCorrect === null && (
              <p className="text-center text-sm text-muted-foreground animate-pulse">
                Tape au clavier pour remplir les cartes rouges
              </p>
            )}
          </div>
        )}
      </div>
    </SpaceBackground>
  )
}

export default App
