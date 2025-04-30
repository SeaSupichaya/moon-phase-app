import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Svg, { Circle, Line, Text } from "react-native-svg"

interface Star {
  id: string
  name: string
  x: number
  y: number
  magnitude: number // Brightness (lower is brighter)
}

interface Connection {
  from: string
  to: string
}

interface StarMapProps {
  stars: Star[]
  connections: Connection[]
  width?: number
  height?: number
  backgroundColor?: string
  starColor?: string
  lineColor?: string
  showLabels?: boolean
}

export const StarMap: React.FC<StarMapProps> = ({
  stars,
  connections,
  width = Dimensions.get("window").width - 40,
  height = 300,
  backgroundColor = "#0a0a1a",
  starColor = "#ffffff",
  lineColor = "rgba(255, 255, 255, 0.3)",
  showLabels = false,
}) => {
  // Calculate star size based on magnitude (brightness)
  const getStarSize = (magnitude: number) => {
    // Magnitude scale is inverse (lower is brighter)
    // Convert to a size between 1 and 5
    return Math.max(5 - magnitude, 1)
  }

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Svg width="100%" height="100%">
        {/* Draw connections between stars */}
        {connections.map((connection, index) => {
          const fromStar = stars.find((s) => s.id === connection.from)
          const toStar = stars.find((s) => s.id === connection.to)

          if (!fromStar || !toStar) return null

          return (
            <Line
              key={`line-${index}`}
              x1={fromStar.x}
              y1={fromStar.y}
              x2={toStar.x}
              y2={toStar.y}
              stroke={lineColor}
              strokeWidth="1"
            />
          )
        })}

        {/* Draw stars */}
        {stars.map((star) => (
          <React.Fragment key={star.id}>
            <Circle cx={star.x} cy={star.y} r={getStarSize(star.magnitude)} fill={starColor} />

            {showLabels && (
              <Text
                x={star.x + getStarSize(star.magnitude) + 3}
                y={star.y + 4}
                fill={starColor}
                fontSize="10"
                textAnchor="start"
              >
                {star.name}
              </Text>
            )}
          </React.Fragment>
        ))}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 0,
  },
})
