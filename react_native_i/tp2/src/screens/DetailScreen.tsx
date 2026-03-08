import { Image, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { Book } from "../data/books";

export function DetailScreen({ route }: { route: { params: { book: Book } } }) {
  const { book } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <ThemedText style={styles.title}>{book.title}</ThemedText>
      <ThemedText style={styles.year}>{book.year}</ThemedText>
      <ThemedText style={styles.price}>R$ {book.price.toFixed(2)}</ThemedText>
      <ThemedText style={styles.description}>{book.description}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    gap: 12,
  },
  cover: {
    width: 200,
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  year: {
    opacity: 0.6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
  },
});
