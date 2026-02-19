import { Image, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task05Screen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Image
            source={{ uri: "https://picsum.photos/id/10/400/300" }}
            style={styles.image}
          />
          <ThemedText>Floresta verde em dia de sol</ThemedText>
        </View>
        <View style={styles.column}>
          <Image
            source={{ uri: "https://picsum.photos/id/20/400/300" }}
            style={styles.image}
          />
          <ThemedText>Material de escritório </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
});
