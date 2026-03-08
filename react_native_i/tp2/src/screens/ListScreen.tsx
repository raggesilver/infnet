import { useTheme } from "@react-navigation/native";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { books } from "../data/books";

export function ListScreen({ navigation }: { navigation: any }) {
  const { colors } = useTheme();

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={books}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.item, { borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate("Detail", { book: item })}
        >
          <Image source={{ uri: item.cover }} style={styles.cover} />
          <View style={styles.info}>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedText>R$ {item.price.toFixed(2)}</ThemedText>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
  },
  cover: {
    width: 60,
    height: 90,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  title: {
    fontWeight: "bold",
  },
});
