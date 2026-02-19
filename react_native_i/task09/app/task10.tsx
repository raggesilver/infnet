import { FlatList, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const items = [
  { id: "1", name: "Arroz" },
  { id: "2", name: "Feijão" },
  { id: "3", name: "Macarrão" },
  { id: "4", name: "Leite" },
  { id: "5", name: "Ovos" },
  { id: "6", name: "Pão" },
  { id: "7", name: "Manteiga" },
  { id: "8", name: "Café" },
  { id: "9", name: "Açúcar" },
  { id: "10", name: "Sal" },
];

export default function Task10Screen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ThemedText>{item.name}</ThemedText>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 24,
    gap: 12,
  },
});
