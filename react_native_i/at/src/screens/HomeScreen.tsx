import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { categories, Category } from "../data/categories";

export function HomeScreen({
  navigation,
}: {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
}) {
  const { colors } = useTheme();

  const renderCategory = ({ item }: { item: Category }) => (
    <Pressable
      style={[
        styles.card,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
      onPress={() =>
        navigation.navigate("Products", {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    >
      <Ionicons
        name={item.icon as keyof typeof Ionicons.glyphMap}
        size={32}
        color={colors.primary}
      />
      <ThemedText style={styles.cardText}>{item.name}</ThemedText>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.heading}>Categorias</ThemedText>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: { fontSize: 22, fontWeight: "bold", padding: 16, paddingBottom: 8 },
  list: { paddingHorizontal: 12, paddingBottom: 16 },
  row: { gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  cardText: { fontSize: 15, fontWeight: "600" },
});
