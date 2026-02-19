import { Button, StyleSheet, View } from "react-native";

export default function Task06Screen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.small}>
          <Button title="Pequeno" color="#2196F3" onPress={() => {}} />
        </View>
        <View style={styles.medium}>
          <Button title="Médio" color="#4CAF50" onPress={() => {}} />
        </View>
      </View>
      <Button title="Largura Total" color="#F44336" onPress={() => {}} />
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
