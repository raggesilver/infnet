import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const colors = [
  "#E53935",
  "#8E24AA",
  "#1E88E5",
  "#43A047",
  "#FB8C00",
  "#00ACC1",
  "#3949AB",
  "#D81B60",
];

export default function Task14Screen() {
  const [bgColor, setBgColor] = useState(colors[0]);

  function changeColor() {
    const next = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(next);
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Pressable style={styles.button} onPress={changeColor}>
        <Text style={styles.buttonText}>Mudar cor</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 16,
  },
  buttonText: {
    color: "#fff",
  },
});
