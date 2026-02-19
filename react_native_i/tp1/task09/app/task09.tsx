import { Image, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task09Screen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: "https://github.com/raggesilver.png" }}
        style={styles.avatar}
      />
      <ThemedText style={styles.name}>Paulo Queiroz</ThemedText>
      <ThemedText>
        Engenheiro de software apaixonado por programação, livros de ficção
        científica e fantasia, e RPG de mesa. Experiência em desenvolvimento web
        e programação de sistemas, desde aplicações em C até frameworks
        full-stack JavaScript.
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontWeight: "bold",
  },
});
