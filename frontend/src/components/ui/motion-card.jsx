import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

import { cn } from "../../lib/utils"

// Enveloppe une carte avec : apparition progressive au défilement (une seule
// fois) et, à la souris, une légère élévation + inclinaison 3D (effet tilt).
// Désactivé si l'utilisateur préfère moins de mouvement.
const TiltCard = React.forwardRef(({ children, className, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
})
TiltCard.displayName = "TiltCard"

// Apparition progressive au défilement (fondu + léger glissement), sans l'effet
// tilt — pour les cartes qui n'ont pas besoin de l'interaction 3D de TiltCard.
const Reveal = React.forwardRef(({ children, className, delay = 0, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
})
Reveal.displayName = "Reveal"

export { TiltCard, Reveal }
