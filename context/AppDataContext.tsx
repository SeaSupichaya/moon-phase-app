"use client"

import { createContext, useContext } from "react"
import type { MoonPhase, Constellation } from "../types"

interface AppDataContextType {
  moonPhase: MoonPhase | null
  constellations: Constellation[]
  error: string | null
  refreshData: () => Promise<void>
}

const AppDataContext = createContext<AppDataContextType>({
  moonPhase: null,
  constellations: [],
  error: null,
  refreshData: async () => {},
})

export const AppDataProvider = AppDataContext.Provider

export const useAppData = () => useContext(AppDataContext)
