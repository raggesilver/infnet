import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task08Screen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.small, { backgroundColor: "#2196F3" }]}
          onPress={() =>
            Alert.alert("Botão Pequeno", "Você clicou no botão azul!")
          }
        >
          <ThemedText style={styles.buttonText}>Pequeno</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.medium, { backgroundColor: "#4CAF50" }]}
          onPress={() =>
            Alert.alert("Botão Médio", "Você clicou no botão verde!")
          }
        >
          <ThemedText style={styles.buttonText}>Médio</ThemedText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#F44336" }]}
        onPress={() =>
          Alert.alert(
            "Botão Grande",
            "Você clicou no botão vermelho de largura total!",
          )
        }
      >
        <ThemedText style={styles.buttonText}>Largura Total</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: "center",
  },
  button: {
    padding: 12,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  small: {
    flex: 1,
  },
  medium: {
    flex: 2,
  },
  buttonText: {
    color: "#fff",
  },
});
