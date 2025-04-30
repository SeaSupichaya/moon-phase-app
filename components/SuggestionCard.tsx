import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import type { Suggestion } from "../types"

interface SuggestionCardProps {
  suggestion: Suggestion
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const { theme } = useTheme()

  const getCategoryColors = (category: string) => {
    if (theme.dark) {
      switch (category) {
        case "spiritual":
          return { bg: "#1e3a8a30", text: theme.colors.primary }
        case "practical":
          return { bg: "#14532d30", text: theme.colors.success }
        case "educational":
          return { bg: "#7c2d1230", text: theme.colors.warning }
        case "health":
          return { bg: "#7f1d1d30", text: theme.colors.accent }
        default:
          return { bg: "#1f293730", text: theme.colors.textSecondary }
      }
    } else {
      switch (category) {
        case "spiritual":
          return { bg: "#dbeafe", text: "#1e40af" }
        case "practical":
          return { bg: "#dcfce7", text: "#166534" }
        case "educational":
          return { bg: "#fef3c7", text: "#92400e" }
        case "health":
          return { bg: "#fee2e2", text: "#b91c1c" }
        default:
          return { bg: "#f3f4f6", text: "#4b5563" }
      }
    }
  }

  const categoryColors = getCategoryColors(suggestion.category)

  return (
    <View
      style={[styles.card, { backgroundColor: theme.colors.card, shadowColor: theme.dark ? "transparent" : "#000" }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{suggestion.title}</Text>
        <View style={[styles.tag, { backgroundColor: categoryColors.bg }]}>
          <Text style={[styles.tagText, { color: categoryColors.text }]}>{suggestion.category}</Text>
        </View>
      </View>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{suggestion.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
})
