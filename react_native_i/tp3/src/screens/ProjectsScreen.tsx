import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useUser } from "../context/UserContext";

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
};

export function ProjectsScreen({ navigation }: { navigation: any }) {
  const { profile } = useUser();
  const { colors } = useTheme();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=10`,
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar repositorios");
        return res.json();
      })
      .then(setRepos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [profile.github]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
        <ThemedText>Carregando projetos...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ThemedText>{error}</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      data={repos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.item, { borderColor: colors.border }]}
          onPress={() => navigation.navigate("ProjectDetail", { repo: item })}
        >
          <ThemedText style={styles.repoName}>{item.name}</ThemedText>
          {item.description && (
            <ThemedText style={styles.description} numberOfLines={2}>
              {item.description}
            </ThemedText>
          )}
          <View style={styles.meta}>
            {item.language && (
              <ThemedText style={styles.metaText}>{item.language}</ThemedText>
            )}
            <ThemedText style={styles.metaText}>
              ⭐ {item.stargazers_count}
            </ThemedText>
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  content: { padding: 16, gap: 8 },
  item: { padding: 12, borderWidth: 1, borderRadius: 8, gap: 4 },
  repoName: { fontSize: 16, fontWeight: "bold" },
  description: { fontSize: 13, opacity: 0.7 },
  meta: { flexDirection: "row", gap: 12, marginTop: 4 },
  metaText: { fontSize: 12, opacity: 0.5 },
});
