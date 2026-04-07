import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { Order, useOrders } from "../context/OrderContext";

export function OrdersScreen() {
  const { colors } = useTheme();
  const { orders } = useOrders();

  const renderOrder = ({ item }: { item: Order }) => (
    <View
      style={[
        styles.card,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.orderId}>
          Pedido #{item.id.slice(-4)}
        </ThemedText>
        <ThemedText style={[styles.status, { color: colors.primary }]}>
          {item.status}
        </ThemedText>
      </View>
      <ThemedText style={styles.date}>{item.createdAt}</ThemedText>
      {item.items.map((cartItem) => (
        <ThemedText key={cartItem.product.id} style={styles.itemText}>
          {cartItem.quantity}x {cartItem.product.name}
        </ThemedText>
      ))}
      <ThemedText style={styles.total}>
        Total: R$ {item.total.toFixed(2)}
      </ThemedText>
      <ThemedText style={styles.address}>{item.address}</ThemedText>
    </View>
  );

  if (orders.length === 0) {
    return (
      <View
        style={[styles.emptyContainer, { backgroundColor: colors.background }]}
      >
        <Ionicons name="receipt-outline" size={64} color={colors.border} />
        <ThemedText style={styles.emptyText}>
          Nenhum pedido realizado
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
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
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    gap: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: { fontSize: 16, fontWeight: "bold" },
  status: { fontSize: 13, fontWeight: "600" },
  date: { fontSize: 12, opacity: 0.5 },
  itemText: { fontSize: 14, opacity: 0.8 },
  total: { fontSize: 15, fontWeight: "bold", marginTop: 4 },
  address: { fontSize: 12, opacity: 0.5 },
});
