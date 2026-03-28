import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useUser } from "../context/UserContext";

export function ProfileScreen() {
  const { profile } = useUser();
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <ThemedText style={styles.name}>{profile.name}</ThemedText>
        <ThemedText style={styles.title}>{profile.title}</ThemedText>
      </View>

      <ThemedText style={styles.sectionTitle}>Sobre</ThemedText>
      <ThemedText style={styles.bioText}>{profile.bio}</ThemedText>

      <ThemedText style={styles.sectionTitle}>Contato</ThemedText>
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={18} color={colors.text} />
        <ThemedText>{profile.email}</ThemedText>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={18} color={colors.text} />
        <ThemedText>{profile.location}</ThemedText>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="logo-github" size={18} color={colors.text} />
        <ThemedText>github.com/{profile.github}</ThemedText>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="document-text-outline" size={18} color={colors.text} />
        <ThemedText>dev.to/{profile.devto}</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  header: { alignItems: "center", gap: 4, marginBottom: 8 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 8 },
  title: { fontSize: 16, opacity: 0.7 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  bioText: { fontSize: 15, lineHeight: 22 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
});
