import { motion } from 'framer-motion'

interface SpaceProgressProps {
  progress: number
  totalWords: number
  currentPlanetIndex: number
}

const planets = [
  { 
    name: 'Terre', 
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="oklch(0.45 0.15 200)" />
        <circle cx="30" cy="30" r="24" fill="oklch(0.55 0.18 160)" />
        <circle cx="30" cy="30" r="18" fill="oklch(0.60 0.20 140)" />
        <circle cx="25" cy="25" r="6" fill="oklch(0.70 0.15 120)" opacity="0.6" />
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

export function SpaceProgress({ progress, totalWords, currentPlanetIndex }: SpaceProgressProps) {
  const progressPercent = (progress / totalWords) * 100
  const fromPlanet = planets[currentPlanetIndex] || planets[0]
  const toPlanet = planets[Math.min(currentPlanetIndex + 1, planets.length - 1)]

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
              animate={{ left: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ marginLeft: '-30px' }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-45deg)' }}>
                <defs>
                  <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.98 0 0)" />
                    <stop offset="100%" stopColor="oklch(0.90 0 0)" />
                  </linearGradient>
                  <linearGradient id="reactorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.70 0.25 25)" />
                    <stop offset="50%" stopColor="oklch(0.75 0.22 35)" />
                    <stop offset="100%" stopColor="oklch(0.80 0.20 45)" />
                  </linearGradient>
                </defs>
                
                <path
                  d="M25 10 L25 35 L20 40 L25 40 L30 45 L35 40 L40 40 L35 35 L35 10 Q30 5 25 10 Z"
                  fill="url(#rocketBodyGrad)"
                  stroke="oklch(0.80 0 0)"
                  strokeWidth="1.5"
                />
                
                <circle cx="30" cy="20" r="4.5" fill="oklch(0.60 0.25 15)" />
                <circle cx="30" cy="20" r="3" fill="oklch(0.55 0.22 15)" />
                
                <ellipse cx="30" cy="45" rx="4" ry="2.5" fill="oklch(0.75 0 0)" opacity="0.3" />
                
                <path
                  d="M26 40 L24 50 L26 48 L26 40 Z"
                  fill="url(#reactorGrad)"
                  opacity="0.9"
                />
                <path
                  d="M34 40 L36 50 L34 48 L34 40 Z"
                  fill="url(#reactorGrad)"
                  opacity="0.9"
                />
                <path
                  d="M30 42 L28 52 L32 52 L30 42 Z"
                  fill="url(#reactorGrad)"
                  opacity="0.95"
                />
                
                <ellipse cx="30" cy="25" rx="6" ry="1.5" fill="oklch(0.85 0 0)" opacity="0.4" />
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
