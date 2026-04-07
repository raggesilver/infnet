import { useTheme } from "@react-navigation/native";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { Product, products } from "../data/products";
import { ProductsScreenProps } from "../navigation/types";

export function ProductsScreen({ navigation, route }: ProductsScreenProps) {
  const { colors } = useTheme();
  const { categoryId } = route.params;
  const filtered = products.filter((p) => p.categoryId === categoryId);

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={[
        styles.card,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item.id })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <ThemedText style={styles.name}>{item.name}</ThemedText>
        <ThemedText style={styles.description} numberOfLines={2}>
          {item.description}
        </ThemedText>
        <ThemedText style={[styles.price, { color: colors.primary }]}>
          R$ {item.price.toFixed(2)}
        </ThemedText>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 12, gap: 12 },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 10, gap: 4 },
  name: { fontSize: 16, fontWeight: "bold" },
  description: { fontSize: 13, opacity: 0.6 },
  price: { fontSize: 15, fontWeight: "bold", marginTop: 4 },
});
