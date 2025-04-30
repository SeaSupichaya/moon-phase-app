export interface MoonPhase {
  name: string
  date: string
  illumination: number
  moonrise: string
  moonset: string
  description: string
  suggestions: Suggestion[]
}

export interface Suggestion {
  title: string
  description: string
  category: string
}

export interface Constellation {
  name: string
  imageUrl: string
  visibility: number
  direction: string
  bestViewingTime: string
  description: string
  mainStars: string[]
  mythology: string
}
