import { ScrollView, StyleSheet, Text, View, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { MoonPhaseInfo } from "../components/MoonPhaseInfo"
import { SuggestionCard } from "../components/SuggestionCard"
import { useAppData } from "../context/AppDataContext"
import { useTheme } from "../context/ThemeContext"
import { ThemeToggle } from "../components/ThemeToggle"

export default function HomeScreen() {
  const { moonPhase, refreshData } = useAppData()
  const { theme } = useTheme()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refreshData()
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Current Phase</Text>
          <ThemeToggle compact />
        </View>

        {moonPhase && <MoonPhaseInfo moonPhase={moonPhase} />}

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Suggested Activities</Text>
        {moonPhase && (
          <View style={styles.suggestionsContainer}>
            {moonPhase.suggestions.map((suggestion, index) => (
              <SuggestionCard key={index} suggestion={suggestion} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
  },
  scrollContent: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  suggestionsContainer: {
    gap: 12,
  },
})
