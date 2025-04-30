import type React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

interface ThemeToggleProps {
  compact?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false }) => {
  const { theme, toggleTheme, isNightMode, toggleNightMode } = useTheme()

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <TouchableOpacity style={[styles.compactButton, { backgroundColor: theme.colors.card }]} onPress={toggleTheme}>
          <Ionicons name={theme.dark ? "sunny-outline" : "moon-outline"} size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.compactButton, { backgroundColor: theme.colors.card, marginLeft: 8 }]}
          onPress={toggleNightMode}
        >
          <Ionicons
            name="eye-outline"
            size={20}
            color={isNightMode ? theme.colors.primary : theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.card }]} onPress={toggleTheme}>
        <Ionicons name={theme.dark ? "sunny-outline" : "moon-outline"} size={24} color={theme.colors.text} />
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>{theme.dark ? "Light Mode" : "Dark Mode"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.card, marginTop: 8 }]}
        onPress={toggleNightMode}
      >
        <Ionicons
          name="eye-outline"
          size={24}
          color={isNightMode ? theme.colors.primary : theme.colors.textSecondary}
        />
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          {isNightMode ? "Disable Night Mode" : "Enable Night Mode"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  compactContainer: {
    flexDirection: "row",
  },
  compactButton: {
    padding: 8,
    borderRadius: 8,
  },
})
