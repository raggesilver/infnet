import { useTheme } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { ProductDetailScreenProps } from "../navigation/types";

export function ProductDetailScreen({ route }: ProductDetailScreenProps) {
  const { colors } = useTheme();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === route.params.productId)!;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <ThemedText style={styles.name}>{product.name}</ThemedText>
      <ThemedText style={styles.description}>{product.description}</ThemedText>
      <ThemedText style={[styles.price, { color: colors.primary }]}>
        R$ {product.price.toFixed(2)}
      </ThemedText>

      <View style={styles.quantityRow}>
        <Pressable
          style={[styles.quantityButton, { borderColor: colors.border }]}
          onPress={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <ThemedText style={styles.quantityButtonText}>-</ThemedText>
        </Pressable>
        <ThemedText style={styles.quantity}>{quantity}</ThemedText>
        <Pressable
          style={[styles.quantityButton, { borderColor: colors.border }]}
          onPress={() => setQuantity((q) => q + 1)}
        >
          <ThemedText style={styles.quantityButtonText}>+</ThemedText>
        </Pressable>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          style={[
            styles.addButton,
            { backgroundColor: added ? colors.border : colors.primary },
          ]}
          onPress={handleAdd}
        >
          <ThemedText style={styles.addButtonText}>
            {added
              ? "Adicionado!"
              : `Adicionar ao carrinho - R$ ${(product.price * quantity).toFixed(2)}`}
          </ThemedText>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  image: { width: "100%", height: 200, borderRadius: 8 },
  name: { fontSize: 22, fontWeight: "bold" },
  description: { fontSize: 15, opacity: 0.7 },
  price: { fontSize: 20, fontWeight: "bold" },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    alignSelf: "center",
    marginVertical: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: { fontSize: 20, fontWeight: "bold" },
  quantity: {
    fontSize: 20,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
  },
  addButton: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
