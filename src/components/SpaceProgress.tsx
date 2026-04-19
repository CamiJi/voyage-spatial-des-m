import { motion } from 'framer-motion'

interface SpaceProgressProps {
  progress: number
  totalWords: number
}

export function SpaceProgress({ progress, totalWords }: SpaceProgressProps) {
  const progressPercent = (progress / totalWords) * 100

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative h-32">
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="flex flex-col items-center">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mb-2">
              <circle cx="30" cy="30" r="28" fill="oklch(0.45 0.15 200)" />
              <circle cx="30" cy="30" r="24" fill="oklch(0.55 0.18 160)" />
              <circle cx="30" cy="30" r="18" fill="oklch(0.60 0.20 140)" />
              <circle cx="25" cy="25" r="6" fill="oklch(0.70 0.15 120)" opacity="0.6" />
            </svg>
            <span className="text-sm font-medium text-foreground/80">Terre</span>
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
              <svg width="60" height="60" viewBox="0 0 60 60">
                <defs>
                  <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.75 0.20 45)" />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 35)" />
                  </linearGradient>
                </defs>
                <path
                  d="M30 5 L35 25 L40 30 L35 35 L30 55 L25 35 L20 30 L25 25 Z"
                  fill="url(#rocketGrad)"
                  stroke="oklch(0.85 0.22 50)"
                  strokeWidth="2"
                />
                <circle cx="30" cy="22" r="4" fill="oklch(0.45 0.15 280)" />
                <ellipse cx="28" cy="40" rx="3" ry="8" fill="oklch(0.70 0.25 25)" opacity="0.8" />
                <ellipse cx="32" cy="40" rx="3" ry="8" fill="oklch(0.70 0.25 15)" opacity="0.8" />
              </svg>
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <svg width="60" height="60" viewBox="0 0 60 60" className="mb-2">
              <circle cx="30" cy="30" r="28" fill="oklch(0.70 0.05 60)" />
              <circle cx="20" cy="20" r="8" fill="oklch(0.65 0.03 60)" />
              <circle cx="38" cy="25" r="5" fill="oklch(0.65 0.03 60)" />
              <circle cx="32" cy="38" r="6" fill="oklch(0.65 0.03 60)" />
              <circle cx="18" cy="35" r="4" fill="oklch(0.65 0.03 60)" />
            </svg>
            <span className="text-sm font-medium text-foreground/80">Lune</span>
          </div>
        </div>
      </div>
    </div>
  )
}
