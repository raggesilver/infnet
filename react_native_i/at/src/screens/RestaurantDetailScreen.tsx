import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { restaurants } from "../data/restaurants";
import { RestaurantDetailScreenProps } from "../navigation/types";

export function RestaurantDetailScreen({ route }: RestaurantDetailScreenProps) {
  const { colors } = useTheme();
  const restaurant = restaurants.find(
    (r) => r.id === route.params.restaurantId,
  )!;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Ionicons name="restaurant-outline" size={48} color={colors.primary} />
      <ThemedText style={styles.name}>{restaurant.name}</ThemedText>

      <View
        style={[
          styles.card,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <Ionicons name="location-outline" size={20} color={colors.text} />
        <ThemedText style={styles.address}>{restaurant.address}</ThemedText>
      </View>

      <ThemedText style={styles.sectionTitle}>Destaque do Cardapio</ThemedText>
      <View
        style={[
          styles.card,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <Ionicons name="star-outline" size={20} color={colors.primary} />
        <View style={styles.menuInfo}>
          <ThemedText style={styles.menuItem}>
            {restaurant.menuHighlight}
          </ThemedText>
          <ThemedText style={[styles.menuPrice, { color: colors.primary }]}>
            R$ {restaurant.menuHighlightPrice.toFixed(2)}
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 16, alignItems: "center" },
  name: { fontSize: 24, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
  },
  address: { flex: 1, fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", alignSelf: "flex-start" },
  menuInfo: { flex: 1, gap: 2 },
  menuItem: { fontSize: 15, fontWeight: "600" },
  menuPrice: { fontSize: 14, fontWeight: "bold" },
});
