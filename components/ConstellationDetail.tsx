import type React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { StarMap } from "./StarMap"

// Sample data for Orion constellation
const orionStars = [
  { id: "betelgeuse", name: "Betelgeuse", x: 150, y: 60, magnitude: 0.5 },
  { id: "rigel", name: "Rigel", x: 150, y: 240, magnitude: 0.1 },
  { id: "bellatrix", name: "Bellatrix", x: 100, y: 80, magnitude: 1.6 },
  { id: "mintaka", name: "Mintaka", x: 130, y: 150, magnitude: 2.2 },
  { id: "alnilam", name: "Alnilam", x: 150, y: 150, magnitude: 1.7 },
  { id: "alnitak", name: "Alnitak", x: 170, y: 150, magnitude: 1.8 },
  { id: "saiphOri", name: "Saiph", x: 190, y: 220, magnitude: 2.1 },
]

const orionConnections = [
  { from: "betelgeuse", to: "bellatrix" },
  { from: "bellatrix", to: "mintaka" },
  { from: "mintaka", to: "alnilam" },
  { from: "alnilam", to: "alnitak" },
  { from: "alnitak", to: "saiphOri" },
  { from: "saiphOri", to: "rigel" },
  { from: "rigel", to: "mintaka" },
  { from: "betelgeuse", to: "alnitak" },
]

interface ConstellationDetailProps {
  name: string
  description: string
  mythology: string
  mainStars: string[]
  direction: string
  bestViewingTime: string
  colorScheme?: {
    primary: string
    secondary: string
    text: string
  }
}

export const ConstellationDetail: React.FC<ConstellationDetailProps> = ({
  name,
  description,
  mythology,
  mainStars,
  direction,
  bestViewingTime,
  colorScheme = {
    primary: "#6366f1",
    secondary: "#818cf8",
    text: "#f5f5f5",
  },
}) => {

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: colorScheme.primary }]}>{name}</Text>

      <View style={styles.starMapContainer}>
        <StarMap
          stars={orionStars}
          connections={orionConnections}
          backgroundColor="#0a0a1a"
          starColor="#ffffff"
          lineColor={`${colorScheme.secondary}80`} // 80 is hex for 50% opacity
          showLabels={true}
        />
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons name="compass-outline" size={16} color={colorScheme.secondary} />
          <Text style={styles.infoLabel}>Direction</Text>
          <Text style={styles.infoValue}>{direction}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={16} color={colorScheme.secondary} />
          <Text style={styles.infoLabel}>Best Time</Text>
          <Text style={styles.infoValue}>{bestViewingTime}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Main Stars</Text>
      <View style={styles.starsList}>
        {mainStars.map((star, index) => (
          <View key={index} style={styles.starItem}>
            <Ionicons name="star-outline" size={16} color={colorScheme.secondary} />
            <Text style={styles.starText}>{star}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Mythology</Text>
      <Text style={styles.description}>{mythology}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  starMapContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4b5563",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  starsList: {
    marginBottom: 16,
  },
  starItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  starText: {
    fontSize: 14,
    color: "#4b5563",
    marginLeft: 8,
  },
})
