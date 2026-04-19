import { motion } from 'framer-motion'

interface PlanetDisplayProps {
  planetIndex: number
}

const planets = [
  { 
    name: 'Terre', 
    colors: ['oklch(0.45 0.15 200)', 'oklch(0.55 0.18 160)', 'oklch(0.60 0.20 140)'],
    emoji: (
      <svg width="64" height="64" viewBox="0 0 60 60" style={{ display: 'inline-block' }}>
        <defs>
          <radialGradient id="earthGlowLarge" cx="40%" cy="40%">
            <stop offset="0%" stopColor="oklch(0.60 0.18 220)" />
            <stop offset="100%" stopColor="oklch(0.35 0.20 230)" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#earthGlowLarge)" />
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
    colors: ['oklch(0.70 0.05 60)', 'oklch(0.65 0.03 60)'],
    emoji: '🌙'
  },
  { 
    name: 'Mars', 
    colors: ['oklch(0.55 0.20 25)', 'oklch(0.50 0.18 20)', 'oklch(0.45 0.16 15)'],
    emoji: '🔴'
  },
  { 
    name: 'Jupiter', 
    colors: ['oklch(0.65 0.15 50)', 'oklch(0.60 0.12 45)', 'oklch(0.55 0.10 40)'],
    emoji: '🪐'
  },
  { 
    name: 'Saturne', 
    colors: ['oklch(0.75 0.12 60)', 'oklch(0.70 0.10 55)'],
    emoji: '🪐'
  },
  { 
    name: 'Uranus', 
    colors: ['oklch(0.65 0.15 200)', 'oklch(0.60 0.12 195)'],
    emoji: '💎'
  },
  { 
    name: 'Neptune', 
    colors: ['oklch(0.55 0.18 250)', 'oklch(0.50 0.15 245)'],
    emoji: '🔵'
  },
  { 
    name: 'Pluton', 
    colors: ['oklch(0.60 0.08 30)', 'oklch(0.55 0.06 25)'],
    emoji: '🌑'
  }
]

export function PlanetDisplay({ planetIndex }: PlanetDisplayProps) {
  const currentPlanet = planets[Math.min(planetIndex, planets.length - 1)]
  
  return (
    <motion.div
      key={planetIndex}
      initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="flex flex-col items-center gap-4"
    >
      <div className="text-6xl animate-float">
        {currentPlanet.emoji}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-primary">
        {currentPlanet.name}
      </h2>
    </motion.div>
  )
}

export function getPlanetName(index: number): string {
  return planets[Math.min(index, planets.length - 1)].name
}

export function getTotalPlanets(): number {
  return planets.length
}
