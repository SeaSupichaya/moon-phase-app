"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"

// Define theme types
export type ThemeType = "light" | "dark" | "system"

// Define theme colors
export interface ThemeColors {
  background: string
  card: string
  text: string
  textSecondary: string
  border: string
  primary: string
  secondary: string
  accent: string
  success: string
  warning: string
  danger: string
  nightSky: string
  starColor: string
}

// Define theme interface
export interface Theme {
  dark: boolean
  colors: ThemeColors
}

// Define light theme
export const lightTheme: Theme = {
  dark: false,
  colors: {
    background: "#f8f9fa",
    card: "#ffffff",
    text: "#1f2937",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    primary: "#6366f1",
    secondary: "#818cf8",
    accent: "#8b5cf6",
    success: "#16a34a",
    warning: "#ca8a04",
    danger: "#dc2626",
    nightSky: "#1a1a2e",
    starColor: "#ffffff",
  },
}

// Define dark theme
export const darkTheme: Theme = {
  dark: true,
  colors: {
    background: "#0f172a",
    card: "#1e293b",
    text: "#f8fafc",
    textSecondary: "#cbd5e1",
    border: "#334155",
    primary: "#818cf8",
    secondary: "#a5b4fc",
    accent: "#a78bfa",
    success: "#22c55e",
    warning: "#eab308",
    danger: "#ef4444",
    nightSky: "#0a0a1a",
    starColor: "#ffffff",
  },
}

// Define night mode theme (red-tinted for preserving night vision)
export const nightModeTheme: Theme = {
  dark: true,
  colors: {
    background: "#0f0505",
    card: "#1e0f0f",
    text: "#ff5555",
    textSecondary: "#cc4444",
    border: "#331515",
    primary: "#ff3333",
    secondary: "#cc2222",
    accent: "#aa1111",
    success: "#661111",
    warning: "#992222",
    danger: "#ff0000",
    nightSky: "#0a0505",
    starColor: "#ff3333",
  },
}

// Define theme context type
interface ThemeContextType {
  theme: Theme
  themeType: ThemeType
  setThemeType: (type: ThemeType) => void
  toggleTheme: () => void
  isNightMode: boolean
  toggleNightMode: () => void
}

// Create theme context
export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: "system",
  setThemeType: () => {},
  toggleTheme: () => {},
  isNightMode: false,
  toggleNightMode: () => {},
})

// Create theme provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<ThemeType>("system")
  const [isNightMode, setIsNightMode] = useState(false)

  // Get current theme based on theme type and system preference
  const getCurrentTheme = (): Theme => {
    if (isNightMode) return nightModeTheme
    
    if (themeType === "system") {
      return colorScheme === "dark" ? darkTheme : lightTheme
    }
    return themeType === "dark" ? darkTheme : lightTheme
  }

  const [theme, setTheme] = useState<Theme>(getCurrentTheme())

  // Update theme when theme type or system preference changes
  useEffect(() => {
    setTheme(getCurrentTheme())
  }, [themeType, colorScheme, isNightMode])

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setThemeType((prevType) => {
      if (prevType === "system") {
        return colorScheme === "dark" ? "light" : "dark"
      } else {
        return prevType === "dark" ? "light" : "dark"
      }
    })
  }

  // Toggle night mode
  const toggleNightMode = () => {
    setIsNightMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        setThemeType,
        toggleTheme,
        isNightMode,
        toggleNightMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// Create hook for using theme
export const useTheme = () => useContext(ThemeContext)
