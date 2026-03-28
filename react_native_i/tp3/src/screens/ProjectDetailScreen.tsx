import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";

export function ProjectDetailScreen({ route }: { route: any }) {
  const { repo } = route.params;
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <ThemedText style={styles.name}>{repo.name}</ThemedText>

      {repo.description && (
        <ThemedText style={styles.description}>{repo.description}</ThemedText>
      )}

      <View style={styles.stats}>
        <View style={styles.stat}>
          <ThemedText style={styles.statValue}>
            {repo.stargazers_count}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Estrelas</ThemedText>
        </View>
        {repo.language && (
          <View style={styles.stat}>
            <ThemedText style={styles.statValue}>{repo.language}</ThemedText>
            <ThemedText style={styles.statLabel}>Linguagem</ThemedText>
          </View>
        )}
      </View>

      <ThemedText style={styles.label}>Ultima atualizacao</ThemedText>
      <ThemedText>
        {new Date(repo.updated_at).toLocaleDateString("pt-BR")}
      </ThemedText>

      <Pressable
        style={[styles.button, { borderColor: colors.primary }]}
        onPress={() => Linking.openURL(repo.html_url)}
      >
        <Ionicons name="logo-github" size={20} color={colors.primary} />
        <ThemedText style={{ color: colors.primary }}>
          Abrir no GitHub
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  name: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 15, lineHeight: 22, opacity: 0.8 },
  stats: { flexDirection: "row", gap: 24, marginVertical: 8 },
  stat: { alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "bold" },
  statLabel: { fontSize: 12, opacity: 0.6 },
  label: { fontSize: 14, fontWeight: "600", opacity: 0.6 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
  },
});
