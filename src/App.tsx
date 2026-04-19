import { useState, useEffect, useCallback, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { SpaceBackground } from '@/components/SpaceBackground'
import { LetterCard } from '@/components/LetterCard'
import { SpaceProgress, getPlanetCount } from '@/components/SpaceProgress'
import { PlanetDisplay } from '@/components/PlanetDisplay'
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
  isFromArticle: boolean
}

function App() {
  const [wordList, setWordList] = useKV<WordEntry[]>('word-list', [])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [letterStates, setLetterStates] = useState<LetterState[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showSetup, setShowSetup] = useState(false)
  const [showingCorrectAnswer, setShowingCorrectAnswer] = useState(false)
  const [newInput, setNewInput] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [successCount, setSuccessCount] = useState(0)
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0)
  const [cycleNumber, setCycleNumber] = useState(1)
  const [errorProgress, setErrorProgress] = useState<number | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  const safeWordList = wordList || []
  const totalPlanets = getPlanetCount()

  const decomposeLigatures = (text: string) => {
    return text
      .replace(/œ/g, 'oeu')
      .replace(/Œ/g, 'OEU')
      .replace(/æ/g, 'ae')
      .replace(/Æ/g, 'AE')
  }

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  const calculateHiddenCount = useCallback((wordIndex: number, totalWords: number, cycle: number) => {
    if (totalWords === 0) return 0
    const word = safeWordList[wordIndex]?.word || ''
    const wordLength = word.replace(/\s/g, '').length
    
    return Math.max(1, Math.min(wordLength - 1, cycle))
  }, [safeWordList])

  const initializeWord = useCallback(() => {
    if (safeWordList.length === 0 || currentWordIndex >= safeWordList.length) {
      setLetterStates([])
      return
    }

    const entry = safeWordList[currentWordIndex]
    const article = decomposeLigatures((entry.article || '').trim())
    const word = decomposeLigatures(entry.word || '')
    
    const fullText = article ? `${article} ${word}` : word
    const letters = fullText.split('')
    
    const hiddenCount = calculateHiddenCount(currentWordIndex, safeWordList.length, cycleNumber)
    const wordLetters = word.replace(/\s/g, '').split('')
    const indices = wordLetters.map((_, i) => i)
    
    const shuffled = indices.sort(() => Math.random() - 0.5)
    const hiddenIndices = new Set(shuffled.slice(0, hiddenCount))
    
    let wordLetterIndex = 0
    let articleEnded = false
    
    const states: LetterState[] = letters.map((letter) => {
      const isSpace = letter === ' '
      
      if (isSpace && !articleEnded && article) {
        articleEnded = true
      }
      
      const isFromArticle = !articleEnded && article.length > 0
      const shouldHide = !isSpace && !isFromArticle && hiddenIndices.has(wordLetterIndex)
      
      if (!isSpace && !isFromArticle) {
        wordLetterIndex++
      }
      
      return {
        letter,
        isHidden: shouldHide,
        userInput: '',
        isFromArticle
      }
    })

    setLetterStates(states)
    setActiveIndex(states.findIndex(s => s.isHidden))
    setIsCorrect(null)
  }, [safeWordList, currentWordIndex, calculateHiddenCount, cycleNumber])

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
    if (!gameStarted || isCorrect !== null || letterStates.length === 0 || showingCorrectAnswer) return

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
    const userWord = states
      .filter(s => !s.isFromArticle)
      .map(s => s.isHidden ? s.userInput : s.letter)
      .join('')
    
    const correctWord = states
      .filter(s => !s.isFromArticle)
      .map(s => s.letter)
      .join('')
    
    const normalizedUserWord = normalizeText(userWord)
    const normalizedCorrectWord = normalizeText(correctWord)
    
    const isExactMatch = normalizedUserWord === normalizedCorrectWord
    
    const isInWordList = safeWordList.some(entry => 
      normalizeText(decomposeLigatures(entry.word)) === normalizedUserWord
    )
    
    const isAnswerCorrect = isExactMatch || isInWordList
    
    setIsCorrect(isAnswerCorrect)
    
    if (isAnswerCorrect) {
      toast.success('Bravo ! 🚀')
      setSuccessCount(prev => Math.min(prev + 1, safeWordList.length))
      
      setTimeout(() => {
        if (currentWordIndex < safeWordList.length - 1) {
          setCurrentWordIndex(prev => prev + 1)
        } else {
          if (currentPlanetIndex < totalPlanets - 1) {
            toast.success(`Planète atteinte ! Direction la prochaine planète ! 🌟`, { duration: 3000 })
            setCurrentPlanetIndex(prev => prev + 1)
            setCycleNumber(prev => prev + 1)
            setCurrentWordIndex(0)
            setSuccessCount(0)
          } else {
            toast.success('Félicitations ! Tu as exploré toute la galaxie ! 🌌', { duration: 5000 })
          }
        }
      }, 1500)
    } else {
      toast.error('Oups ! Essaie encore')
      setShowingCorrectAnswer(true)
      
      setErrorProgress(0)
      setSuccessCount(0)
      
      setTimeout(() => {
        setShowingCorrectAnswer(false)
        setErrorProgress(undefined)
        
        if (currentWordIndex < safeWordList.length - 1) {
          setCurrentWordIndex(prev => prev + 1)
        } else {
          setCurrentWordIndex(0)
        }
      }, 5000)
    }
  }

  const addWord = () => {
    const trimmedInput = newInput.trim()
    if (trimmedInput) {
      const words = trimmedInput.split(/\s+/)
      let article = ''
      let word = ''
      
      if (words.length === 1) {
        word = words[0]
      } else if (words.length === 2) {
        article = words[0]
        word = words[1]
      } else if (words.length === 3) {
        const sortedByLength = [...words].sort((a, b) => b.length - a.length)
        const longest = sortedByLength[0]
        const secondLongest = sortedByLength[1]
        
        const longestIndex = words.indexOf(longest)
        const secondIndex = words.indexOf(secondLongest)
        
        if (longestIndex > secondIndex) {
          article = words.slice(0, secondIndex).join(' ')
          word = `${words[secondIndex]} ${words[longestIndex]}`
        } else {
          article = words.slice(0, longestIndex).join(' ')
          word = words.slice(longestIndex).join(' ')
        }
      } else {
        const sortedByLength = [...words].sort((a, b) => b.length - a.length)
        const wordsToVerify = sortedByLength.slice(0, words.length - 1)
        
        const firstWordToVerifyIndex = words.indexOf(wordsToVerify[0])
        article = words.slice(0, firstWordToVerifyIndex).join(' ')
        word = words.slice(firstWordToVerifyIndex).join(' ')
      }
      
      setWordList(current => [...(current || []), { article, word }])
      setNewInput('')
      toast.success('Mot ajouté !')
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
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
      setCurrentPlanetIndex(0)
      setCycleNumber(1)
      setShowSetup(false)
    } else {
      toast.error('Ajoute au moins un mot pour commencer')
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentWordIndex(0)
    setSuccessCount(0)
    setCurrentPlanetIndex(0)
    setCycleNumber(1)
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
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 flex items-center justify-center gap-3 flex-wrap">
              <Sparkle size={48} weight="fill" />
              Voyage Spatial dans la Galaxie des Mots
            </h1>
            <p className="text-lg text-foreground/80">
              Explore le système solaire en complétant les mots !
            </p>
          </motion.div>

          <Dialog open={showSetup} onOpenChange={setShowSetup}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Configuration des mots</DialogTitle>
                <DialogDescription>
                  Ajoute les mots que l'élève doit apprendre. L'article est optionnel.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    placeholder="Mot ou phrase (ex: la sœur, le petit cœur)"
                    value={newInput}
                    onChange={(e) => setNewInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addWord()
                      }
                    }}
                    className="flex-1"
                    autoFocus
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
                          {entry.article && <>{entry.article} </>}
                          <strong>{entry.word}</strong>
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

  const hasFinished = currentPlanetIndex >= totalPlanets - 1 && currentWordIndex >= safeWordList.length

  return (
    <SpaceBackground>
      <div className="container mx-auto px-4 py-4 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-3xl font-bold text-primary flex items-center gap-2">
            <Sparkle size={32} weight="fill" />
            <span className="hidden sm:inline">Voyage Spatial dans la Galaxie des Mots</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Voyage {cycleNumber} • {cycleNumber} lettre{cycleNumber > 1 ? 's' : ''} manquante{cycleNumber > 1 ? 's' : ''}
            </span>
            <Button variant="outline" size="icon" onClick={resetGame}>
              <Gear size={20} />
            </Button>
          </div>
        </div>

        <SpaceProgress 
          progress={successCount} 
          totalWords={safeWordList.length}
          currentPlanetIndex={currentPlanetIndex}
          errorProgress={errorProgress}
        />

        {hasFinished ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              🌌 Félicitations ! 🌌
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Tu as exploré toute la galaxie !
            </p>
            <PlanetDisplay planetIndex={totalPlanets - 1} />
            <Button onClick={resetGame} size="lg" className="mt-8">
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
                className="w-full px-2 mb-8"
              >
                <div className="flex flex-col items-center gap-4">
                  {letterStates.some(s => s.isFromArticle) ? (
                    <>
                      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        {letterStates
                          .filter(state => state.isFromArticle)
                          .map((state, index) => (
                            <LetterCard
                              key={`article-${index}`}
                              letter={state.letter}
                              isHidden={state.isHidden}
                              userInput={state.userInput}
                              isActive={letterStates.indexOf(state) === activeIndex}
                              isCorrect={isCorrect === true && state.isHidden}
                              isIncorrect={isCorrect === false}
                              showCorrectAnswer={showingCorrectAnswer}
                            />
                          ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-[95vw]">
                        {letterStates
                          .filter(state => !state.isFromArticle)
                          .map((state, index) => (
                            <LetterCard
                              key={`word-${index}`}
                              letter={state.letter}
                              isHidden={state.isHidden}
                              userInput={state.userInput}
                              isActive={letterStates.indexOf(state) === activeIndex}
                              isCorrect={isCorrect === true && state.isHidden}
                              isIncorrect={isCorrect === false}
                              showCorrectAnswer={showingCorrectAnswer}
                            />
                          ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-[95vw]">
                      {letterStates.map((state, index) => (
                        <LetterCard
                          key={index}
                          letter={state.letter}
                          isHidden={state.isHidden}
                          userInput={state.userInput}
                          isActive={letterStates.indexOf(state) === activeIndex}
                          isCorrect={isCorrect === true && state.isHidden}
                          isIncorrect={isCorrect === false}
                          showCorrectAnswer={showingCorrectAnswer}
                        />
                      ))}
                    </div>
                  )}
                </div>
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
