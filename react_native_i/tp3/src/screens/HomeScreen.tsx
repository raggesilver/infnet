import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useUser } from "../context/UserContext";

export function HomeScreen({ navigation }: { navigation: any }) {
  const { profile } = useUser();
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{ paddingRight: 8 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </Pressable>
      ),
    });
  }, [navigation, colors.text]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={[styles.profileCard, { borderColor: colors.border }]}
      >
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <ThemedText style={styles.name}>{profile.name}</ThemedText>
          <ThemedText style={styles.title}>{profile.title}</ThemedText>
          <ThemedText style={styles.bio} numberOfLines={2}>
            {profile.bio}
          </ThemedText>
          <ThemedText style={[styles.link, { color: colors.primary }]}>
            Ver perfil completo →
          </ThemedText>
        </View>
      </Pressable>

      <ThemedText style={styles.sectionTitle}>Navegacao Rapida</ThemedText>

      <View style={styles.quickLinks}>
        {[
          {
            label: "Qualificacoes",
            tab: "Qualifications",
            icon: "school-outline" as const,
          },
          {
            label: "Projetos",
            tab: "Projects",
            icon: "code-slash-outline" as const,
          },
          {
            label: "Candidaturas",
            tab: "Applications",
            icon: "briefcase-outline" as const,
          },
          {
            label: "Artigos",
            tab: "Articles",
            icon: "newspaper-outline" as const,
          },
        ].map((item) => (
          <Pressable
            key={item.tab}
            style={[styles.quickLink, { borderColor: colors.border }]}
            onPress={() => navigation.navigate(item.tab)}
          >
            <Ionicons name={item.icon} size={24} color={colors.primary} />
            <ThemedText>{item.label}</ThemedText>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 16 },
  profileCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  profileInfo: { flex: 1, gap: 2 },
  name: { fontSize: 18, fontWeight: "bold" },
  title: { fontSize: 14, opacity: 0.7 },
  bio: { fontSize: 13, opacity: 0.6, marginTop: 4 },
  link: { fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  quickLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  quickLink: {
    flex: 1,
    minWidth: "45%",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
});
