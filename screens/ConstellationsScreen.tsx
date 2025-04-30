import { useState, useEffect } from "react"
import {StyleSheet,Text,View,FlatList,Image,TouchableOpacity,Modal,ScrollView,RefreshControl,} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { fetchConstellationsFromApi } from "../api/constellationApi"
import { useTheme } from "../context/ThemeContext"
import type { Constellation } from "../types"

export default function ConstellationsScreen() {
  const { theme } = useTheme()
  const [constellations, setConstellations] = useState<Constellation[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null)
  const [viewMode, setViewMode] = useState("grid") // "grid" or "list"

  const loadConstellations = async () => {
    setLoading(true)
    try {
      const data = await fetchConstellationsFromApi()
      setConstellations(data)
    } catch (error) {
      console.error("Failed to load constellations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadConstellations()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await loadConstellations()
    setRefreshing(false)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  const renderGridItem = ({ item }: { item: Constellation }) => (
    <TouchableOpacity
      style={[
        styles.gridItem,
        {
          borderLeftColor: item.color || theme.colors.primary,
          borderLeftWidth: 4,
          backgroundColor: theme.colors.card,
        },
      ]}
      onPress={() => setSelectedConstellation(item)}
    >
      <View style={[styles.starMapPreview, { backgroundColor: theme.colors.nightSky }]}>
        <Image source={{ uri: item.imageUrl }} style={styles.gridImage} resizeMode="contain" />
        <View style={[styles.constellationType, { backgroundColor: item.color || theme.colors.primary }]}>
          <Text style={styles.constellationTypeText}>
            {item.colorScheme?.primary === "#8e44ad"
              ? "Zodiac"
              : item.colorScheme?.primary === "#2980b9"
                ? "Northern"
                : item.colorScheme?.primary === "#c0392b"
                  ? "Southern"
                  : "Equatorial"}
          </Text>
        </View>
      </View>
      <Text style={[styles.gridName, { color: theme.colors.text }]}>{item.name}</Text>
      <View style={styles.visibilityContainer}>
        <Ionicons
          name="eye-outline"
          size={12}
          color={
            item.visibility > 0.7
              ? theme.colors.success
              : item.visibility > 0.4
                ? theme.colors.warning
                : theme.colors.danger
          }
        />
        <Text
          style={[
            styles.visibilityText,
            {
              color:
                item.visibility > 0.7
                  ? theme.colors.success
                  : item.visibility > 0.4
                    ? theme.colors.warning
                    : theme.colors.danger,
            },
          ]}
        >
          {item.visibility > 0.7 ? "High" : item.visibility > 0.4 ? "Medium" : "Low"}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const renderListItem = ({ item }: { item: Constellation }) => (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          borderLeftColor: item.color || theme.colors.primary,
          borderLeftWidth: 4,
          backgroundColor: theme.colors.card,
        },
      ]}
      onPress={() => setSelectedConstellation(item)}
    >
      <View style={[styles.listImageContainer, { backgroundColor: theme.colors.nightSky }]}>
        <Image source={{ uri: item.imageUrl }} style={styles.listImage} resizeMode="contain" />
      </View>
      <View style={styles.listContent}>
        <Text style={[styles.listName, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.listDirection, { color: theme.colors.textSecondary }]}>
          {item.direction} • {item.bestViewingTime}
        </Text>
        <View style={styles.visibilityContainer}>
          <Ionicons
            name="eye-outline"
            size={12}
            color={
              item.visibility > 0.7
                ? theme.colors.success
                : item.visibility > 0.4
                  ? theme.colors.warning
                  : theme.colors.danger
            }
          />
          <Text
            style={[
              styles.visibilityText,
              {
                color:
                  item.visibility > 0.7
                    ? theme.colors.success
                    : item.visibility > 0.4
                      ? theme.colors.warning
                      : theme.colors.danger,
              },
            ]}
          >
            {item.visibility > 0.7 ? "Highly Visible" : item.visibility > 0.4 ? "Moderately Visible" : "Barely Visible"}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
    </TouchableOpacity>
  )

  if (loading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Ionicons name="star-outline" size={40} color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading constellations...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["bottom"]}>
      <View style={[styles.header]}>
        <Text style={[styles.title, { color: theme.colors.textSecondary }]}>Night Sky Explorer</Text>
        <TouchableOpacity onPress={toggleViewMode} style={styles.viewModeButton}>
          <Ionicons
            name={viewMode === "grid" ? "list-outline" : "grid-outline"}
            size={24}
            color={theme.colors.starColor}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={constellations}
        renderItem={viewMode === "grid" ? renderGridItem : renderListItem}
        keyExtractor={(item) => item.name}
        numColumns={viewMode === "grid" ? 2 : 1}
        key={viewMode} 
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
        }
      />

      <Modal
        visible={selectedConstellation !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedConstellation(null)}
      >
        {selectedConstellation && (
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                {
                  borderTopColor: selectedConstellation.color || theme.colors.primary,
                  borderTopWidth: 4,
                  backgroundColor: theme.colors.card,
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: theme.dark ? theme.colors.border : "#f3f4f6" }]}
                onPress={() => setSelectedConstellation(null)}
              >
                <Text style={[styles.closeButtonText, { color: theme.colors.textSecondary }]}>×</Text>
              </TouchableOpacity>

              <View style={[styles.modalImageContainer, { backgroundColor: theme.colors.nightSky }]}>
                <Image
                  source={{ uri: selectedConstellation.imageUrl }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <View
                  style={[
                    styles.constellationTypeLarge,
                    { backgroundColor: selectedConstellation.color || theme.colors.primary },
                  ]}
                >
                  <Text style={styles.constellationTypeText}>
                    {selectedConstellation.colorScheme?.primary === "#8e44ad"
                      ? "Zodiac"
                      : selectedConstellation.colorScheme?.primary === "#2980b9"
                        ? "Northern"
                        : selectedConstellation.colorScheme?.primary === "#c0392b"
                          ? "Southern"
                          : "Equatorial"}
                  </Text>
                </View>
              </View>

              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>{selectedConstellation.name}</Text>

              <ScrollView style={styles.modalScrollView}>
                <Text style={[styles.modalSubtitle, { color: theme.colors.text }]}>Description</Text>
                <Text style={[styles.modalDescription, { color: theme.colors.textSecondary }]}>
                  {selectedConstellation.description}
                </Text>

                <Text style={[styles.modalSubtitle, { color: theme.colors.text }]}>Best Viewing</Text>
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="compass-outline"
                      size={16}
                      color={selectedConstellation.colorScheme?.secondary || theme.colors.textSecondary}
                    />
                    <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Direction</Text>
                    <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                      {selectedConstellation.direction}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={selectedConstellation.colorScheme?.secondary || theme.colors.textSecondary}
                    />
                    <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Best Time</Text>
                    <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                      {selectedConstellation.bestViewingTime}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.modalSubtitle, { color: theme.colors.text }]}>Main Stars</Text>
                <View style={styles.starsList}>
                  {selectedConstellation.mainStars.map((star, index) => (
                    <View key={index} style={styles.starItem}>
                      <Ionicons
                        name="star-outline"
                        size={16}
                        color={selectedConstellation.colorScheme?.secondary || theme.colors.textSecondary}
                      />
                      <Text style={[styles.starText, { color: theme.colors.textSecondary }]}>{star}</Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.modalSubtitle, { color: theme.colors.text }]}>Mythology</Text>
                <Text style={[styles.modalDescription, { color: theme.colors.textSecondary }]}>
                  {selectedConstellation.mythology}
                </Text>
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewModeButton: {
    padding: 8,
  },
  listContainer: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  // Grid view styles
  gridItem: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  starMapPreview: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
    position: "relative",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  constellationType: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  constellationTypeLarge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  constellationTypeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  gridName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  // List view styles
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
  },
  listImage: {
    width: "100%",
    height: "100%",
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
  listName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  listDirection: {
    fontSize: 14,
    marginBottom: 4,
  },
  visibilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  visibilityText: {
    fontSize: 12,
    marginLeft: 4,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxHeight: "90%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    lineHeight: 24,
  },
  modalImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
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
    marginLeft: 8,
  },
})
