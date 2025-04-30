"use client"

import { View, Text, StyleSheet, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"
import type { MoonPhase } from "../types"

interface MoonPhaseInfoProps {
  moonPhase: MoonPhase
}

export function MoonPhaseInfo({ moonPhase }: MoonPhaseInfoProps) {
  const { theme } = useTheme()

  const getMoonPhaseImage = (phase: string): string => {
    // Using NASA's public domain moon phase images
    switch (phase.toLowerCase()) {
      case "new moon":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0000.jpg"
      case "waxing crescent":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0037.jpg"
      case "first quarter":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0074.jpg"
      case "waxing gibbous":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0111.jpg"
      case "full moon":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0149.jpg"
      case "waning gibbous":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0186.jpg"
      case "last quarter":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0223.jpg"
      case "waning crescent":
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0260.jpg"
      default:
        return "https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/frames/730x730_1x1_30p/moon.0149.jpg"
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.card, { backgroundColor: theme.colors.card, shadowColor: theme.dark ? "transparent" : "#000" }]}
      >
        <View style={styles.header}>
          <Image source={{ uri: getMoonPhaseImage(moonPhase.name) }} style={styles.moonImage} resizeMode="contain" />
          <View style={styles.phaseInfo}>
            <Text style={[styles.phaseName, { color: theme.colors.text }]}>{moonPhase.name}</Text>
            <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{moonPhase.date}</Text>
            <Text style={[styles.illumination, { color: theme.colors.textSecondary }]}>
              {`${Math.round(moonPhase.illumination * 100)}% Illuminated`}
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.description}>
          <Text style={[styles.descriptionTitle, { color: theme.colors.text }]}>About this phase:</Text>
          <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>{moonPhase.description}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Moonrise</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{moonPhase.moonrise}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Moonset</Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>{moonPhase.moonset}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  moonImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 40, // Make the moon image circular
    backgroundColor: "#000", // Black background for the moon
  },
  phaseInfo: {
    flex: 1,
  },
  phaseName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    marginBottom: 4,
  },
  illumination: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  description: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
})
