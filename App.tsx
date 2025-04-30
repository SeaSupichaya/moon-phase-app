"use client"

import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, ActivityIndicator } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import HomeScreen from "./screens/HomeScreen"
import CalendarScreen from "./screens/CalendarScreen"
import ConstellationsScreen from "./screens/ConstellationsScreen"
import SettingsScreen from "./screens/SettingsScreen"
import { fetchMoonPhase, fetchConstellations } from "./api/skyApi"
import { AppDataProvider } from "./context/AppDataContext"
import { ThemeProvider, useTheme } from "./context/ThemeContext"

const Tab = createBottomTabNavigator()

function MainApp() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [appData, setAppData] = useState({
    moonPhase: null,
    constellations: [],
    error: null,
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const moonData = await fetchMoonPhase()
      const constellationData = await fetchConstellations()

      setAppData({
        moonPhase: moonData,
        constellations: constellationData,
        error: null,
      })
    } catch (err) {
      setAppData({
        ...appData,
        error: "Failed to fetch data. Please try again later.",
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    // Set up interval to refresh data every 30 minutes
    const intervalId = setInterval(fetchData, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Create custom theme for React Navigation
  const navigationTheme = {
    ...(theme.dark ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme.dark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  }

  if (loading && !appData.moonPhase) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10, fontSize: 16, color: theme.colors.textSecondary }}>
          Loading celestial data...
        </Text>
      </View>
    )
  }

  if (appData.error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ fontSize: 16, color: theme.colors.danger, marginBottom: 10, textAlign: "center" }}>
          {appData.error}
        </Text>
        <Text
          style={{ fontSize: 16, color: theme.colors.primary, textDecorationLine: "underline" }}
          onPress={fetchData}
        >
          Tap to retry
        </Text>
      </View>
    )
  }

  return (
    <AppDataProvider value={{ ...appData, refreshData: fetchData }}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style={theme.dark ? "light" : "dark"} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: "moon" | "moon-outline" | "calendar" | "calendar-outline" | "star" | "star-outline" | "settings" | "settings-outline" = "moon-outline"

              if (route.name === "Home") {
                iconName = focused ? "moon" : "moon-outline"
              } else if (route.name === "Calendar") {
                iconName = focused ? "calendar" : "calendar-outline"
              } else if (route.name === "Constellations") {
                iconName = focused ? "star" : "star-outline"
              } else if (route.name === "Settings") {
                iconName = focused ? "settings" : "settings-outline"
              }

              return <Ionicons name={iconName} size={size} color={color ?? theme.colors.primary} />
            },
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: "#6366f1",
            tabBarInactiveTintColor: "#6b7280",
            tabBarStyle: {
              backgroundColor: theme.colors.card,
              borderTopColor: theme.colors.border,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Moon Phase" }} />
          <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: "Moon Calendar" }} />
          <Tab.Screen name="Constellations" component={ConstellationsScreen} options={{ title: "Night Sky" }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppDataProvider>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
