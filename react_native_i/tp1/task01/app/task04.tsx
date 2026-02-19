import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const items = [
  "Arroz",
  "Feijão",
  "Macarrão",
  "Leite",
  "Ovos",
  "Pão",
  "Manteiga",
  "Café",
  "Açúcar",
  "Sal",
];

export default function Task04Screen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {items.map((item, index) => (
          <Text key={index} style={styles.text}>
            {item}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkslategray",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  text: {
    color: "#fff",
    minHeight: Dimensions.get("window").height * 0.25,
  },
});
