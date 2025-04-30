import { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppData } from "../context/AppDataContext"
import { useTheme } from "../context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { calculateMonthMoonPhases } from "../api/skyApi"

export default function CalendarScreen() {
  const { moonPhase } = useAppData()
  const { theme } = useTheme()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [monthData, setMonthData] = useState([])

  useEffect(() => {
    // Calculate moon phases for the selected month
    const moonPhases = calculateMonthMoonPhases(selectedYear, selectedMonth)

    // Generate calendar data with moon phases
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", phase: "", illumination: 0 })
    }

    // Add days of the month with moon phases
    for (let day = 1; day <= daysInMonth; day++) {
      const moonPhaseData = moonPhases.find((mp) => mp.day === day)
      days.push({
        day,
        phase: moonPhaseData ? moonPhaseData.phase : "",
        illumination: moonPhaseData ? moonPhaseData.illumination : 0,
        isSpecial: moonPhaseData ? moonPhaseData.isSpecial : false,
      })
    }

    setMonthData(days)
  }, [selectedMonth, selectedYear])

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const navigateMonth = (direction) => {
    let newMonth = selectedMonth + direction
    let newYear = selectedYear

    if (newMonth > 11) {
      newMonth = 0
      newYear += 1
    } else if (newMonth < 0) {
      newMonth = 11
      newYear -= 1
    }

    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  const getMoonPhaseIcon = (phase, illumination) => {
    if (!phase) return null

    if (phase === "New Moon") return "moon-outline"
    if (phase === "Full Moon") return "moon"
    if (phase.includes("Waxing Crescent")) return "moon-outline"
    if (phase.includes("First Quarter")) return "moon-outline"
    if (phase.includes("Waxing Gibbous")) return "moon-outline"
    if (phase.includes("Waning Gibbous")) return "moon-outline"
    if (phase.includes("Last Quarter")) return "moon-outline"
    if (phase.includes("Waning Crescent")) return "moon-outline"

    return "moon-outline"
  }

  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && selectedMonth === today.getMonth() && selectedYear === today.getFullYear()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
      <View style={[styles.calendarHeader, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.monthYearText, { color: theme.colors.text }]}>
          {`${monthNames[selectedMonth]} ${selectedYear}`}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdayHeader}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <Text key={index} style={[styles.weekdayText, { color: theme.colors.textSecondary }]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {monthData.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayCell,
              { borderColor: theme.colors.border },
              isToday(day.day) && [
                styles.todayCell,
                { borderColor: theme.colors.primary, backgroundColor: `${theme.colors.primary}20` },
              ],
              !day.day && styles.emptyCell,
            ]}
          >
            {day.day ? (
              <>
                <Text
                  style={[
                    styles.dayText,
                    { color: theme.colors.text },
                    isToday(day.day) && [styles.todayText, { color: theme.colors.primary }],
                  ]}
                >
                  {day.day}
                </Text>
                <View style={styles.moonIconContainer}>
                  <Ionicons
                    name={getMoonPhaseIcon(day.phase, day.illumination)}
                    size={16}
                    color={theme.colors.textSecondary}
                  />
                </View>
                {day.isSpecial ? (
                  <Text style={[styles.specialPhaseText, { color: theme.colors.textSecondary }]}>{day.phase}</Text>
                ) : null}
              </>
            ) : null}
          </View>
        ))}
      </View>

      <View style={[styles.legendContainer, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.legendTitle, { color: theme.colors.text }]}>Moon Phases Legend:</Text>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>New Moon</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Waxing Crescent</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>First Quarter</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Waxing Gibbous</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Full Moon</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Waning Gibbous</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Last Quarter</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="moon-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Waning Crescent</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:50,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  navButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekdayHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    padding: 4,
    borderWidth: 0.5,
    alignItems: "center",
  },
  emptyCell: {
    borderColor: "transparent",
  },
  todayCell: {
    borderWidth: 1,
  },
  dayText: {
    fontSize: 14,
  },
  todayText: {
    fontWeight: "bold",
  },
  moonIconContainer: {
    marginTop: 4,
  },
  specialPhaseText: {
    fontSize: 8,
    textAlign: "center",
    marginTop: 2,
  },
  legendContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  legendText: {
    marginLeft: 8,
    fontSize: 14,
  },
})
