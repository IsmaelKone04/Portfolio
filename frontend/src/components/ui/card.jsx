import * as React from "react"

import { cn } from "../../lib/utils"
import { useContent } from "../../contexts/ContentContext"

// Style "verre" façon iOS, activable pour tout le site depuis /admin > Sections
// (réglage `uiSettings.glassCards`, voir Card.jsx + /api/settings).
const GLASS_CLASSES =
  "border border-white/30 bg-card/55 shadow-[0_8px_32px_-8px_rgba(29,78,216,0.25)] backdrop-blur-xl dark:border-sky-400/25 dark:bg-card/45"
const SOLID_CLASSES =
  "border bg-card shadow dark:border-sky-400/20 dark:bg-card/80 dark:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.15)] dark:backdrop-blur-md"

const Card = React.forwardRef(({ className, ...props }, ref) => {
  const { uiSettings } = useContent()
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl text-card-foreground",
        uiSettings?.glassCards ? GLASS_CLASSES : SOLID_CLASSES,
        className
      )}
      {...props} />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
