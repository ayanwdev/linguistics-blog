"use client"
import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

interface ThemeTogglerProps {
  size?: "sm" | "default"
  className?: string
}

export const ThemeToggler = ({
  size = "sm",
  className = "",
}: ThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [displayDark, setDisplayDark] = React.useState(
    () => resolvedTheme === "dark",
  )
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleToggle = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const next = !displayDark
      setDisplayDark(next)
      setTheme(next ? "dark" : "light")
      setTimeout(() => setIsAnimating(false), 150)
    }, 150)
  }

  return (
    <Button
      variant="ghost"
      size={size}
      type="button"
      aria-label="Toggle theme"
      onClick={handleToggle}
      className={`p-3 ${className}`}
    >
      <span
        key={String(displayDark)}
        className={isAnimating ? "icon-spin-out" : "icon-spin-in"}
        style={{ display: "flex" }}
      >
        {displayDark ? (
          <SunIcon className="h-4.5 w-4.5" />
        ) : (
          <MoonIcon className="h-4.5 w-4.5" />
        )}
      </span>
    </Button>
  )
}
