import { StyleSheet, Text, View } from "react-native";

export default function Task01Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindos ao meu TP1 de React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkslategray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
