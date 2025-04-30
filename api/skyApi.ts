import type { MoonPhase, Constellation } from "../types"
import SunCalc from "suncalc"

// Get real moon phase data using SunCalc library
export async function fetchMoonPhase(): Promise<MoonPhase> {
  try {
    // Default coordinates (Chiang Rai, Thailand)
    const latitude = 19.9105
    const longitude = 99.8406

    const now = new Date()
    const moonInfo = SunCalc.getMoonIllumination(now)
    const moonTimes = SunCalc.getMoonTimes(now, latitude, longitude)

    // Format the date
    const formattedDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Determine moon phase name based on the phase value
    let phaseName: string
    if (moonInfo.phase < 0.05 || moonInfo.phase > 0.95) phaseName = "New Moon"
    else if (moonInfo.phase < 0.2) phaseName = "Waxing Crescent"
    else if (moonInfo.phase < 0.3) phaseName = "First Quarter"
    else if (moonInfo.phase < 0.45) phaseName = "Waxing Gibbous"
    else if (moonInfo.phase < 0.55) phaseName = "Full Moon"
    else if (moonInfo.phase < 0.7) phaseName = "Waning Gibbous"
    else if (moonInfo.phase < 0.8) phaseName = "Last Quarter"
    else phaseName = "Waning Crescent"

    // Format moonrise and moonset times
    const formatTime = (date: Date | undefined) => {
      if (!date) return "Not visible"
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Generate suggestions based on the moon phase
    const suggestions = getMockSuggestions(phaseName)

    return {
      name: phaseName,
      date: formattedDate,
      illumination: moonInfo.fraction, // Illuminated fraction of the moon
      moonrise: formatTime(moonTimes.rise),
      moonset: formatTime(moonTimes.set),
      description: getMoonPhaseDescription(phaseName),
      suggestions: suggestions,
    }
  } catch (error) {
    console.error("Error fetching moon phase:", error)

    // Fallback to mock data if there's an error
    return fallbackMoonPhase()
  }
}

// Fallback function to return mock data if the real data fetch fails
function fallbackMoonPhase(): MoonPhase {
  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const dayOfMonth = today.getDate()
  let phaseName: string
  let illumination: number

  if (dayOfMonth <= 3) {
    phaseName = "New Moon"
    illumination = 0.05
  } else if (dayOfMonth <= 7) {
    phaseName = "Waxing Crescent"
    illumination = 0.25
  } else if (dayOfMonth <= 10) {
    phaseName = "First Quarter"
    illumination = 0.5
  } else if (dayOfMonth <= 14) {
    phaseName = "Waxing Gibbous"
    illumination = 0.75
  } else if (dayOfMonth <= 17) {
    phaseName = "Full Moon"
    illumination = 0.95
  } else if (dayOfMonth <= 21) {
    phaseName = "Waning Gibbous"
    illumination = 0.75
  } else if (dayOfMonth <= 24) {
    phaseName = "Last Quarter"
    illumination = 0.5
  } else {
    phaseName = "Waning Crescent"
    illumination = 0.25
  }

  return {
    name: phaseName,
    date: formattedDate,
    illumination: illumination,
    moonrise: "7:15 PM",
    moonset: "5:42 AM",
    description: getMoonPhaseDescription(phaseName),
    suggestions: getMockSuggestions(phaseName),
  }
}

// Calculate moon phases for an entire month
export function calculateMonthMoonPhases(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const moonPhases = []

  // Default coordinates (can be replaced with user's location)
  const latitude = 40.7128
  const longitude = -74.006

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const moonInfo = SunCalc.getMoonIllumination(date)
    const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude)

    // Determine moon phase name
    let phaseName: string
    if (moonInfo.phase < 0.05 || moonInfo.phase > 0.95) phaseName = "New Moon"
    else if (moonInfo.phase < 0.2) phaseName = "Waxing Crescent"
    else if (moonInfo.phase < 0.3) phaseName = "First Quarter"
    else if (moonInfo.phase < 0.45) phaseName = "Waxing Gibbous"
    else if (moonInfo.phase < 0.55) phaseName = "Full Moon"
    else if (moonInfo.phase < 0.7) phaseName = "Waning Gibbous"
    else if (moonInfo.phase < 0.8) phaseName = "Last Quarter"
    else phaseName = "Waning Crescent"

    moonPhases.push({
      day,
      phase: phaseName,
      illumination: moonInfo.fraction,
      isSpecial: phaseName === "Full Moon" || phaseName === "New Moon",
    })
  }

  return moonPhases
}

// Rest of the file remains the same...
export async function fetchConstellations(): Promise<Constellation[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // For demo purposes, we'll return mock data
  // In a real app, you would fetch this from a night sky API

  // Mock data for constellations
  return [
    {
      name: "Orion",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Orion_constellation_map.svg/800px-Orion_constellation_map.svg.png",
      visibility: 0.9,
      direction: "South-East",
      bestViewingTime: "9:00 PM - 11:00 PM",
      description:
        "Orion is one of the most recognizable constellations in the night sky, named after a hunter in Greek mythology. It contains many bright stars and is visible throughout the world.",
      mainStars: ["Betelgeuse", "Rigel", "Bellatrix", "Mintaka", "Alnilam", "Alnitak"],
      mythology:
        "In Greek mythology, Orion was a giant huntsman whom Zeus placed among the stars as the constellation of Orion. Ancient sources tell several different stories about Orion.",
    },
    {
      name: "Ursa Major",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Ursa_Major_constellation_map.svg/800px-Ursa_Major_constellation_map.svg.png",
      visibility: 0.8,
      direction: "North",
      bestViewingTime: "8:00 PM - 12:00 AM",
      description:
        "Ursa Major, also known as the Great Bear, is one of the most recognizable constellations in the northern sky. It contains the asterism known as the Big Dipper.",
      mainStars: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
      mythology:
        "In Greek mythology, Zeus transformed his lover Callisto and their son Arcas into bears and then into the constellations Ursa Major and Ursa Minor to protect them from his wife Hera.",
    },
    {
      name: "Cassiopeia",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Cassiopeia_constellation_map.svg/800px-Cassiopeia_constellation_map.svg.png",
      visibility: 0.7,
      direction: "North-East",
      bestViewingTime: "7:30 PM - 10:30 PM",
      description:
        'Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology. It is easily recognizable due to its distinctive "W" or "M" shape.',
      mainStars: ["Schedar", "Caph", "Gamma Cassiopeiae", "Ruchbah", "Segin"],
      mythology:
        "Cassiopeia was the wife of King Cepheus and the mother of Princess Andromeda. She boasted that she and her daughter were more beautiful than the Nereids, which angered Poseidon.",
    },
  ]
}

// Helper function to get moon phase descriptions
function getMoonPhaseDescription(phaseName: string): string {
  switch (phaseName) {
    case "New Moon":
      return "The New Moon occurs when the Moon is positioned between the Earth and the Sun, making the lunar disk invisible to us. This phase represents new beginnings and is ideal for setting intentions."
    case "Waxing Crescent":
      return "The Waxing Crescent appears as the Moon begins to illuminate, showing a small crescent shape. This phase is associated with growth and manifestation of goals."
    case "First Quarter":
      return "The First Quarter Moon appears as a half-circle, representing a time of decision-making and action. This is a good time to overcome obstacles and make progress on projects."
    case "Waxing Gibbous":
      return "The Waxing Gibbous phase shows a nearly full Moon, symbolizing refinement and fine-tuning. This is a time to perfect details and prepare for culmination."
    case "Full Moon":
      return "The Full Moon occurs when the Moon is on the opposite side of the Earth from the Sun, fully illuminated. This phase represents completion, clarity, and heightened intuition."
    case "Waning Gibbous":
      return "The Waning Gibbous phase shows a still-bright but decreasing Moon, symbolizing gratitude and sharing. This is a time for reflection and giving back."
    case "Last Quarter":
      return "The Last Quarter appears as a half-circle, representing release and letting go. This is a good time to clear away what no longer serves you."
    case "Waning Crescent":
      return "The Waning Crescent, also known as the Balsamic Moon, appears as a thin crescent. This phase represents rest, healing, and preparation for the next cycle."
    default:
      return "The Moon cycles through eight phases approximately every 29.5 days, each with its own unique energy and significance."
  }
}

// Helper function to get mock suggestions based on moon phase
function getMockSuggestions(phaseName: string): Array<{ title: string; description: string; category: string }> {
  switch (phaseName) {
    case "New Moon":
      return [
        {
          title: "Set New Intentions",
          description:
            "Write down your goals and intentions for the coming lunar cycle. The new moon is perfect for planting seeds of intention.",
          category: "spiritual",
        },
        {
          title: "Meditation",
          description: "Practice a grounding meditation to connect with your inner wisdom and clarify your desires.",
          category: "spiritual",
        },
        {
          title: "Start a Project",
          description: "Begin a new project or habit that you want to develop over the coming month.",
          category: "practical",
        },
      ]
    case "Waxing Crescent":
      return [
        {
          title: "Take First Steps",
          description: "Take the first actionable steps toward the goals you set during the new moon.",
          category: "practical",
        },
        {
          title: "Visualization",
          description: "Practice visualizing your goals as already accomplished to strengthen your manifestation.",
          category: "spiritual",
        },
        {
          title: "Learn Something New",
          description: "Start learning a new skill related to your goals. The growing moon energy supports expansion.",
          category: "educational",
        },
      ]
    case "First Quarter":
      return [
        {
          title: "Overcome Obstacles",
          description: "Identify and address any challenges or obstacles that have arisen in your projects.",
          category: "practical",
        },
        {
          title: "Make Decisions",
          description: "This is an excellent time for decision-making. Trust your intuition and take decisive action.",
          category: "practical",
        },
        {
          title: "Physical Activity",
          description: "Channel the building energy with physical exercise or outdoor activities.",
          category: "health",
        },
      ]
    case "Waxing Gibbous":
      return [
        {
          title: "Refine Your Work",
          description: "Review and refine the projects you've been working on, paying attention to details.",
          category: "practical",
        },
        {
          title: "Collaborate",
          description: "Seek feedback and collaborate with others to improve your projects.",
          category: "practical",
        },
        {
          title: "Prepare for Completion",
          description: "Organize and prepare for the culmination of your projects as the full moon approaches.",
          category: "practical",
        },
      ]
    case "Full Moon":
      return [
        {
          title: "Celebrate Achievements",
          description: "Acknowledge and celebrate what you've accomplished during this lunar cycle.",
          category: "spiritual",
        },
        {
          title: "Moon Bathing",
          description: "Spend time outdoors under the full moon, absorbing its energy and light.",
          category: "spiritual",
        },
        {
          title: "Release Ritual",
          description:
            "Write down what you want to release or let go of, then safely burn the paper as a symbolic act.",
          category: "spiritual",
        },
      ]
    case "Waning Gibbous":
      return [
        {
          title: "Express Gratitude",
          description: "Practice gratitude for the blessings in your life and the progress you've made.",
          category: "spiritual",
        },
        {
          title: "Share Knowledge",
          description: "Share what you've learned or created with others. Teaching reinforces your own understanding.",
          category: "educational",
        },
        {
          title: "Reflect on Results",
          description: "Evaluate the results of your efforts and consider what worked well and what didn't.",
          category: "practical",
        },
      ]
    case "Last Quarter":
      return [
        {
          title: "Let Go",
          description: "Release habits, beliefs, or situations that no longer serve your highest good.",
          category: "spiritual",
        },
        {
          title: "Forgiveness Practice",
          description: "Practice forgiveness toward yourself and others to clear emotional space.",
          category: "spiritual",
        },
        {
          title: "Clear Your Space",
          description: "Declutter and clean your physical space to create room for new energy in the next cycle.",
          category: "practical",
        },
      ]
    case "Waning Crescent":
      return [
        {
          title: "Rest & Recuperate",
          description: "Focus on rest and self-care to recharge before the next new moon.",
          category: "health",
        },
        {
          title: "Reflection",
          description: "Reflect on the entire lunar cycle and what you've learned from your experiences.",
          category: "spiritual",
        },
        {
          title: "Plan Ahead",
          description: "Gently consider what you might want to focus on in the coming lunar cycle.",
          category: "practical",
        },
      ]
    default:
      return [
        {
          title: "Observe the Moon",
          description: "Take time to observe the current phase of the moon and note how it makes you feel.",
          category: "spiritual",
        },
        {
          title: "Journal",
          description: "Write in your journal about your current state and aspirations.",
          category: "practical",
        },
        {
          title: "Connect with Nature",
          description: "Spend time outdoors connecting with the natural world and its rhythms.",
          category: "health",
        },
      ]
  }
}
