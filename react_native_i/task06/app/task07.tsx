import { Alert, Button, StyleSheet, View } from "react-native";

export default function Task07Screen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.small}>
          <Button
            title="Pequeno"
            color="#2196F3"
            onPress={() =>
              Alert.alert("Botão Pequeno", "Você clicou no botão azul!")
            }
          />
        </View>
        <View style={styles.medium}>
          <Button
            title="Médio"
            color="#4CAF50"
            onPress={() =>
              Alert.alert("Botão Médio", "Você clicou no botão verde!")
            }
          />
        </View>
      </View>
      <Button
        title="Largura Total"
        color="#F44336"
        onPress={() =>
          Alert.alert(
            "Botão Grande",
            "Você clicou no botão vermelho de largura total!",
          )
        }
      />
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
});
