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

  return (
    <Button
      variant="ghost"
      size={size}
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        setDisplayDark((prev) => !prev)
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }}
      className={`p-3 ${className}`}
    >
      <span key={String(displayDark)} style={{ display: "flex" }}>
        {displayDark ? (
          <SunIcon className="h-4.5 w-4.5" />
        ) : (
          <MoonIcon className="h-4.5 w-4.5" />
        )}
      </span>
    </Button>
  )
}
