import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Task03Screen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: "https://picsum.photos/id/10/1200/800" }}
          style={styles.image}
        />
        <Text style={styles.text}>
          Uma bela paisagem capturada em um dia ensolarado, mostrando a natureza
          em toda sua grandeza.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkslategray",
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  text: {
    color: "#fff",
    padding: 16,
  },
});
