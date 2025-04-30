import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from "react-native"
import type { Constellation } from "../types"

interface ConstellationViewProps {
  constellations: Constellation[]
}

export function ConstellationView({ constellations }: ConstellationViewProps) {
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null)

  const openConstellationDetails = (constellation: Constellation) => {
    setSelectedConstellation(constellation)
  }

  const closeModal = () => {
    setSelectedConstellation(null)
  }

  if (constellations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No visible constellations at this time.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {constellations.map((constellation, index) => (
          <TouchableOpacity
            key={index}
            style={styles.constellationCard}
            onPress={() => openConstellationDetails(constellation)}
          >
            <Image source={{ uri: constellation.imageUrl }} style={styles.constellationImage} />
            <Text style={styles.constellationName}>{constellation.name}</Text>
            <Text style={styles.visibilityText}>
              {constellation.visibility > 0.7
                ? "Highly Visible"
                : constellation.visibility > 0.4
                  ? "Moderately Visible"
                  : "Barely Visible"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={selectedConstellation !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        {selectedConstellation && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>

              <Image source={{ uri: selectedConstellation.imageUrl }} style={styles.modalImage} />

              <Text style={styles.modalTitle}>{selectedConstellation.name}</Text>

              <ScrollView style={styles.modalScrollView}>
                <Text style={styles.modalSubtitle}>Description</Text>
                <Text style={styles.modalDescription}>{selectedConstellation.description}</Text>

                <Text style={styles.modalSubtitle}>Best Viewing</Text>
                <Text style={styles.modalText}>Direction: {selectedConstellation.direction}</Text>
                <Text style={styles.modalText}>Time: {selectedConstellation.bestViewingTime}</Text>

                <Text style={styles.modalSubtitle}>Stars</Text>
                {selectedConstellation.mainStars.map((star, index) => (
                  <Text key={index} style={styles.starText}>
                    • {star}
                  </Text>
                ))}

                <Text style={styles.modalSubtitle}>Mythology</Text>
                <Text style={styles.modalDescription}>{selectedConstellation.mythology}</Text>
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollView: {
    flexDirection: "row",
  },
  constellationCard: {
    width: 150,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  constellationImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  constellationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 4,
  },
  visibilityText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  emptyContainer: {
    padding: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxHeight: "80%",
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
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#4b5563",
    lineHeight: 24,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  modalScrollView: {
    maxHeight: 300,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4b5563",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  starText: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
    marginLeft: 8,
  },
})
