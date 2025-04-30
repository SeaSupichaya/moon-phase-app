import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { ThemeToggle } from "../components/ThemeToggle"

export default function SettingsScreen() {
  const { theme } = useTheme()

  const openLink = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
          <ThemeToggle />
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>

          <View style={styles.aboutItem}>
            <Text style={[styles.aboutTitle, { color: theme.colors.text }]}>Moon Phase App</Text>
            <Text style={[styles.aboutVersion, { color: theme.colors.textSecondary }]}>Version 1.0.0</Text>
          </View>

          <Text style={[styles.aboutDescription, { color: theme.colors.textSecondary }]}>
            Track moon phases, view celestial events, and explore constellations in the night sky.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resources</Text>

          <TouchableOpacity style={styles.linkItem} onPress={() => openLink("https://www.nasa.gov/moon")}>
            <Ionicons name="globe-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.linkText, { color: theme.colors.text }]}>NASA Moon Resources</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem} onPress={() => openLink("https://stellarium.org/")}>
            <Ionicons name="star-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Stellarium</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem} onPress={() => openLink("https://www.space.com/astronomy")}>
            <Ionicons name="telescope-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Space.com Astronomy</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Support</Text>

          <TouchableOpacity style={styles.linkItem} onPress={() => openLink("mailto:support@moonphaseapp.com")}>
            <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Contact Support</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem} onPress={() => openLink("https://moonphaseapp.com/faq")}>
            <Ionicons name="help-circle-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.linkText, { color: theme.colors.text }]}>FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  aboutItem: {
    marginBottom: 8,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  aboutVersion: {
    fontSize: 14,
    marginTop: 4,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  linkText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
})
