import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const { width } = Dimensions.get("window");

const images = [
  { uri: "https://picsum.photos/id/10/800/600", caption: "Floresta verde" },
  { uri: "https://picsum.photos/id/20/800/600", caption: "Material de escritório" },
  { uri: "https://picsum.photos/id/30/800/600", caption: "Estrada rural" },
  { uri: "https://picsum.photos/id/40/800/600", caption: "Folhas secas" },
  { uri: "https://picsum.photos/id/50/800/600", caption: "Paisagem urbana" },
];

export default function Task11Screen() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled>
        {images.map((img) => (
          <View key={img.uri} style={styles.slide}>
            <Image source={{ uri: img.uri }} style={styles.image} />
            <ThemedText>{img.caption}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    padding: 16,
    gap: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
});
