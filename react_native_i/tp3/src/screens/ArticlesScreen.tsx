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

type DevToArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
};

export function ArticlesScreen({ navigation }: { navigation: any }) {
  const { profile } = useUser();
  const { colors } = useTheme();
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${profile.devto}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar artigos");
        return res.json();
      })
      .then(setArticles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [profile.devto]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" />
        <ThemedText>Carregando artigos...</ThemedText>
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

  if (articles.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ThemedText>Nenhum artigo encontrado.</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      data={articles}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.item, { borderColor: colors.border }]}
          onPress={() =>
            navigation.navigate("ArticleWebView", {
              url: item.url,
              title: item.title,
            })
          }
        >
          <ThemedText style={styles.title}>{item.title}</ThemedText>
          {item.description ? (
            <ThemedText style={styles.description} numberOfLines={2}>
              {item.description}
            </ThemedText>
          ) : null}
          <View style={styles.meta}>
            <ThemedText style={styles.metaText}>
              {new Date(item.published_at).toLocaleDateString("pt-BR")}
            </ThemedText>
            <ThemedText style={styles.metaText}>
              {item.reading_time_minutes} min de leitura
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
  title: { fontSize: 16, fontWeight: "bold" },
  description: { fontSize: 13, opacity: 0.7 },
  meta: { flexDirection: "row", gap: 12, marginTop: 4 },
  metaText: { fontSize: 12, opacity: 0.5 },
});
