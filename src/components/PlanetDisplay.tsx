import { motion } from 'framer-motion'

interface PlanetDisplayProps {
  planetIndex: number
}

const planets = [
  { 
    name: 'Terre', 
    colors: ['oklch(0.45 0.15 200)', 'oklch(0.55 0.18 160)', 'oklch(0.60 0.20 140)'],
    emoji: '🌍'
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
