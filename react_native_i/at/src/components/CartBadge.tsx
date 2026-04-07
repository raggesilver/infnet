import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useCart } from "../context/CartContext";

export function CartBadge() {
  const { totalItems } = useCart();
  const { colors } = useTheme();

  if (totalItems === 0) return null;

  return (
    <View style={[styles.badge, { backgroundColor: colors.notification }]}>
      <Text style={styles.text}>{totalItems > 99 ? "99+" : totalItems}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  text: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
