import { motion } from 'framer-motion'

interface SpaceProgressProps {
  progress: number
  totalWords: number
  currentPlanetIndex: number
  errorProgress?: number
}

const planets = [
  { 
    name: 'Terre', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <defs>
          <radialGradient id="earthGlow" cx="40%" cy="40%">
            <stop offset="0%" stopColor="oklch(0.60 0.18 220)" />
            <stop offset="100%" stopColor="oklch(0.35 0.20 230)" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#earthGlow)" />
        
        <path d="M 12 18 Q 8 22 8 28 Q 8 32 10 34 L 14 38 Q 16 40 18 38 L 22 34 Q 24 32 24 28 L 24 24 Q 24 20 20 18 Z" 
          fill="oklch(0.45 0.15 140)" opacity="0.9" />
        
        <path d="M 35 12 Q 32 10 28 12 L 24 16 Q 22 18 24 22 L 28 26 Q 30 28 34 26 L 40 22 Q 42 20 42 16 Q 42 12 38 10 Z" 
          fill="oklch(0.48 0.14 135)" opacity="0.85" />
        
        <path d="M 48 24 Q 46 22 44 24 L 40 28 Q 38 30 38 34 L 40 40 Q 42 44 46 44 Q 50 44 52 40 L 52 32 Q 52 26 48 24 Z" 
          fill="oklch(0.46 0.16 138)" opacity="0.88" />
        
        <path d="M 18 44 Q 16 42 14 44 L 12 48 Q 10 50 12 52 L 18 54 Q 22 54 24 50 L 26 46 Q 26 42 22 42 Z" 
          fill="oklch(0.50 0.13 142)" opacity="0.8" />
        
        <path d="M 30 42 Q 28 40 26 42 L 24 46 Q 22 50 26 52 L 34 54 Q 38 54 40 50 L 38 44 Q 36 40 32 40 Z" 
          fill="oklch(0.47 0.15 136)" opacity="0.87" />
        
        <circle cx="30" cy="30" r="28" fill="none" stroke="oklch(0.50 0.10 200)" strokeWidth="1" opacity="0.3" />
        
        <ellipse cx="20" cy="20" rx="3" ry="2" fill="oklch(0.95 0 0)" opacity="0.4" />
      </svg>
    )
  },
  { 
    name: 'Lune', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="oklch(0.70 0.05 60)" />
        <circle cx="20" cy="20" r="8" fill="oklch(0.65 0.03 60)" />
        <circle cx="38" cy="25" r="5" fill="oklch(0.65 0.03 60)" />
        <circle cx="32" cy="38" r="6" fill="oklch(0.65 0.03 60)" />
        <circle cx="18" cy="35" r="4" fill="oklch(0.65 0.03 60)" />
      </svg>
    )
  },
  { 
    name: 'Mars', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="oklch(0.55 0.20 25)" />
        <circle cx="22" cy="22" r="6" fill="oklch(0.50 0.18 20)" />
        <circle cx="38" cy="28" r="4" fill="oklch(0.45 0.16 15)" />
        <circle cx="26" cy="38" r="5" fill="oklch(0.50 0.18 20)" />
      </svg>
    )
  },
  { 
    name: 'Jupiter', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="oklch(0.65 0.15 50)" />
        <ellipse cx="30" cy="22" rx="25" ry="4" fill="oklch(0.60 0.12 45)" />
        <ellipse cx="30" cy="30" rx="25" ry="4" fill="oklch(0.55 0.10 40)" />
        <ellipse cx="30" cy="38" rx="25" ry="4" fill="oklch(0.60 0.12 45)" />
      </svg>
    )
  },
  { 
    name: 'Saturne', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <ellipse cx="30" cy="30" rx="32" ry="8" fill="oklch(0.70 0.10 55)" opacity="0.5" />
        <circle cx="30" cy="30" r="20" fill="oklch(0.75 0.12 60)" />
        <ellipse cx="30" cy="30" rx="32" ry="8" fill="oklch(0.70 0.10 55)" opacity="0.3" />
      </svg>
    )
  },
  { 
    name: 'Uranus', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="oklch(0.65 0.15 200)" />
        <circle cx="30" cy="30" r="22" fill="oklch(0.60 0.12 195)" />
      </svg>
    )
  },
  { 
    name: 'Neptune', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="oklch(0.55 0.18 250)" />
        <circle cx="30" cy="30" r="22" fill="oklch(0.50 0.15 245)" />
        <circle cx="24" cy="24" r="5" fill="oklch(0.60 0.20 255)" opacity="0.5" />
      </svg>
    )
  },
  { 
    name: 'Pluton', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="24" fill="oklch(0.60 0.08 30)" />
        <circle cx="30" cy="30" r="18" fill="oklch(0.55 0.06 25)" />
        <circle cx="25" cy="26" r="4" fill="oklch(0.50 0.05 20)" />
      </svg>
    )
  }
]

export function SpaceProgress({ progress, totalWords, currentPlanetIndex, errorProgress }: SpaceProgressProps) {
  const progressPercent = (progress / totalWords) * 100
  const displayProgress = errorProgress !== undefined ? errorProgress : progressPercent
  const fromPlanet = planets[currentPlanetIndex] || planets[0]
  const toPlanet = planets[Math.min(currentPlanetIndex + 1, planets.length - 1)]

  const angle = 90

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative h-32">
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {fromPlanet.svg}
            </div>
            <span className="text-sm font-medium text-foreground/80">{fromPlanet.name}</span>
          </div>

          <div className="flex-1 relative h-2 mx-8">
            <div className="absolute inset-0 bg-muted rounded-full" />
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 rocket"
              initial={{ left: 0 }}
              animate={{ left: `${displayProgress}%` }}
              transition={{ 
                duration: errorProgress !== undefined ? 5 : 0.8, 
                ease: errorProgress !== undefined ? 'easeInOut' : 'easeOut' 
              }}
              style={{ marginLeft: '-60px' }}
            >
              <svg width="120" height="120" viewBox="0 0 60 60" style={{ transform: `rotate(${angle}deg)` }}>
                <defs>
                  <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.98 0 0)" />
                    <stop offset="100%" stopColor="oklch(0.92 0 0)" />
                  </linearGradient>
                  <linearGradient id="reactorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.70 0.25 25)" />
                    <stop offset="50%" stopColor="oklch(0.75 0.22 35)" />
                    <stop offset="100%" stopColor="oklch(0.80 0.20 45)" />
                  </linearGradient>
                  <radialGradient id="windowGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="oklch(0.85 0.15 220)" />
                    <stop offset="100%" stopColor="oklch(0.60 0.20 230)" />
                  </radialGradient>
                </defs>
                
                <ellipse cx="30" cy="48" rx="6" ry="3" fill="oklch(0.30 0 0)" opacity="0.2" />
                
                <path
                  d="M30 5 Q23 7 23 15 L23 38 Q23 40 25 42 L28 44 L30 46 L32 44 L35 42 Q37 40 37 38 L37 15 Q37 7 30 5 Z"
                  fill="url(#rocketBodyGrad)"
                  stroke="oklch(0.85 0 0)"
                  strokeWidth="1"
                />
                
                <circle cx="30" cy="8" r="4" fill="oklch(0.65 0.28 15)" />
                <circle cx="30" cy="8" r="2.5" fill="oklch(0.60 0.25 15)" />
                
                <circle cx="30" cy="22" r="6" fill="url(#windowGrad)" />
                <circle cx="30" cy="22" r="4.5" fill="oklch(0.75 0.12 220)" opacity="0.4" />
                
                <path
                  d="M25 42 L22 52 L24 48 L25 42 Z"
                  fill="url(#reactorGrad)"
                  opacity="0.85"
                />
                <path
                  d="M35 42 L38 52 L36 48 L35 42 Z"
                  fill="url(#reactorGrad)"
                  opacity="0.85"
                />
                <path
                  d="M30 44 L27 54 L29 51 L30 48 L31 51 L33 54 L30 44 Z"
                  fill="url(#reactorGrad)"
                  opacity="0.9"
                />
                
                <ellipse cx="30" cy="30" rx="7" ry="2" fill="oklch(0.88 0 0)" opacity="0.3" />
                <ellipse cx="30" cy="36" rx="6" ry="1.5" fill="oklch(0.88 0 0)" opacity="0.2" />
                
                <path
                  d="M17 35 Q15 36 15 40 Q15 43 17 44 L23 42 Q23 40 23 38 L17 35 Z"
                  fill="oklch(0.90 0 0)"
                  stroke="oklch(0.82 0 0)"
                  strokeWidth="0.8"
                />
                <path
                  d="M43 35 Q45 36 45 40 Q45 43 43 44 L37 42 Q37 40 37 38 L43 35 Z"
                  fill="oklch(0.90 0 0)"
                  stroke="oklch(0.82 0 0)"
                  strokeWidth="0.8"
                />
              </svg>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2">
              {toPlanet.svg}
            </div>
            <span className="text-sm font-medium text-foreground/80">{toPlanet.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function getPlanetCount(): number {
  return planets.length
}
