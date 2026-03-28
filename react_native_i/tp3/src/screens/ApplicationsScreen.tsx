import { useTheme } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useUser } from "../context/UserContext";
import { ApplicationStatus } from "../data/applications";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Enviada: "#6b7280",
  "Em Analise": "#f59e0b",
  Entrevista: "#3b82f6",
  Oferta: "#10b981",
  Rejeitada: "#ef4444",
};

export function ApplicationsScreen({ navigation }: { navigation: any }) {
  const { applications } = useUser();
  const { colors } = useTheme();

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      data={applications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.item, { borderColor: colors.border }]}
          onPress={() =>
            navigation.navigate("ApplicationDetail", { application: item })
          }
        >
          <View style={styles.row}>
            <ThemedText style={styles.company}>{item.company}</ThemedText>
            <View
              style={[
                styles.badge,
                { backgroundColor: STATUS_COLORS[item.status] },
              ]}
            >
              <ThemedText style={styles.badgeText}>{item.status}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.role}>{item.role}</ThemedText>
          <ThemedText style={styles.meta}>
            {item.location} —{" "}
            {new Date(item.appliedAt).toLocaleDateString("pt-BR")}
          </ThemedText>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 8 },
  item: { padding: 12, borderWidth: 1, borderRadius: 8, gap: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  company: { fontSize: 16, fontWeight: "bold" },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  role: { fontSize: 14, opacity: 0.8 },
  meta: { fontSize: 12, opacity: 0.5 },
});
