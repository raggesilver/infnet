import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { CartItem, useCart } from "../context/CartContext";

type Props = {
  navigation: { navigate: (screen: string) => void };
};

export function CartScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  const renderItem = ({ item }: { item: CartItem }) => (
    <View
      style={[
        styles.card,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <View style={styles.info}>
        <ThemedText style={styles.name}>{item.product.name}</ThemedText>
        <ThemedText style={[styles.price, { color: colors.primary }]}>
          R$ {item.product.price.toFixed(2)}
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <View style={styles.quantityRow}>
          <Pressable
            onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Ionicons
              name="remove-circle-outline"
              size={24}
              color={colors.text}
            />
          </Pressable>
          <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
          <Pressable
            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.text} />
          </Pressable>
        </View>
        <Pressable onPress={() => removeItem(item.product.id)}>
          <Ionicons
            name="trash-outline"
            size={20}
            color={colors.notification}
          />
        </Pressable>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: colors.background }]}
      >
        <Ionicons name="cart-outline" size={64} color={colors.border} />
        <ThemedText style={styles.emptyText}>
          Seu carrinho esta vazio
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <ThemedText style={styles.total}>
          Total: R$ {totalPrice.toFixed(2)}
        </ThemedText>
        <Pressable
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("Checkout")}
        >
          <ThemedText style={styles.checkoutText}>Finalizar Pedido</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: { fontSize: 16, opacity: 0.6 },
  list: { padding: 12, gap: 12 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 15, fontWeight: "600" },
  price: { fontSize: 14, fontWeight: "bold" },
  actions: { alignItems: "center", gap: 8 },
  quantityRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 24,
    textAlign: "center",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  checkoutButton: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
