import type { Constellation } from "../types"

// Color palette for constellations based on their type
const COLOR_SCHEMES = {
  zodiac: {
    primary: "#8e44ad", // Purple
    secondary: "#9b59b6", // Light Purple
    text: "#f5f5f5", // Light Gray
  },
  northern: {
    primary: "#2980b9", // Blue
    secondary: "#3498db", // Light Blue
    text: "#f5f5f5", // Light Gray
  },
  southern: {
    primary: "#c0392b", // Red
    secondary: "#e74c3c", // Light Red
    text: "#f5f5f5", // Light Gray
  },
  equatorial: {
    primary: "#27ae60", // Green
    secondary: "#2ecc71", // Light Green
    text: "#f5f5f5", // Light Gray
  },
}

// Function to determine constellation type
function getConstellationType(declination: number, isZodiac: boolean): string {
  if (isZodiac) return "zodiac"
  if (declination > 30) return "northern"
  if (declination < -30) return "southern"
  return "equatorial"
}

// Function to fetch constellation data from API
export async function fetchConstellationsFromApi(): Promise<Constellation[]> {
  try {

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulated API response
    const apiData = [
      {
        id: "ori",
        name: "Orion",
        declination: 5.0, // Near equator
        isZodiac: false,
        stars: ["Betelgeuse", "Rigel", "Bellatrix", "Mintaka", "Alnilam", "Alnitak"],
        description:
          "Orion is one of the most recognizable constellations in the night sky, named after a hunter in Greek mythology.",
        mythology:
          "In Greek mythology, Orion was a giant huntsman whom Zeus placed among the stars as the constellation of Orion.",
        visibility: 0.9,
        direction: "South-East",
        bestViewingTime: "9:00 PM - 11:00 PM",
      },
      {
        id: "uma",
        name: "Ursa Major",
        declination: 56.0, // Northern
        isZodiac: false,
        stars: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
        description:
          "Ursa Major, also known as the Great Bear, is one of the most recognizable constellations in the northern sky.",
        mythology:
          "In Greek mythology, Zeus transformed his lover Callisto and their son Arcas into bears and then into the constellations Ursa Major and Ursa Minor.",
        visibility: 0.8,
        direction: "North",
        bestViewingTime: "8:00 PM - 12:00 AM",
      },
      {
        id: "cas",
        name: "Cassiopeia",
        declination: 60.0, // Northern
        isZodiac: false,
        stars: ["Schedar", "Caph", "Gamma Cassiopeiae", "Ruchbah", "Segin"],
        description:
          "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology.",
        mythology: "Cassiopeia was the wife of King Cepheus and the mother of Princess Andromeda.",
        visibility: 0.7,
        direction: "North-East",
        bestViewingTime: "7:30 PM - 10:30 PM",
      },
      {
        id: "leo",
        name: "Leo",
        declination: 15.0, // Near equator
        isZodiac: true,
        stars: ["Regulus", "Denebola", "Algieba", "Zosma", "Epsilon Leonis"],
        description: "Leo is one of the constellations of the zodiac. Its name is Latin for lion.",
        mythology:
          "In Greek mythology, Leo represents the Nemean Lion, which was killed by Heracles during his twelve labors.",
        visibility: 0.75,
        direction: "South",
        bestViewingTime: "8:00 PM - 10:00 PM",
      },
      {
        id: "crux",
        name: "Crux (Southern Cross)",
        declination: -60.0, // Southern
        isZodiac: false,
        stars: ["Acrux", "Mimosa", "Gacrux", "Delta Crucis", "Epsilon Crucis"],
        description: "Crux is the smallest of the 88 modern constellations, but one of the most distinctive.",
        mythology: "Crux was first described by the Italian explorer Andreas Corsali in 1516.",
        visibility: 0.6,
        direction: "South",
        bestViewingTime: "9:00 PM - 11:00 PM",
      },
    ]

    // Transform API data to match our Constellation interface
    return apiData.map((item) => {
      // Determine the color scheme based on constellation type
      const type = getConstellationType(item.declination, item.isZodiac)
      const colorScheme = COLOR_SCHEMES[type]

      // Generate a star map image URL (in a real app, this would come from the API)
      // For now, we'll use placeholder images
      const imageUrl = `https://starregistration.net/media/wysiwyg/Constellations/${item.name.replace(/\s/g, "_")}.png`

      return {
        name: item.name,
        imageUrl: imageUrl,
        visibility: item.visibility,
        direction: item.direction,
        bestViewingTime: item.bestViewingTime,
        description: item.description,
        mainStars: item.stars,
        mythology: item.mythology,
        color: colorScheme.primary,
        colorScheme: colorScheme,
      }
    })
  } catch (error) {
    console.error("Error fetching constellation data:", error)
    return []
  }
}
