import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useAuth } from "../context/AuthContext";

type Props = {
  navigation: { navigate: (screen: string) => void };
};

export function ProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <Ionicons
          name="person-circle-outline"
          size={64}
          color={colors.primary}
        />
        <ThemedText style={styles.name}>{user.name}</ThemedText>
        <ThemedText style={styles.detail}>{user.email}</ThemedText>
        <ThemedText style={styles.detail}>{user.phone}</ThemedText>
      </View>

      <Pressable
        style={[styles.settingsButton, { borderColor: colors.border }]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings-outline" size={20} color={colors.text} />
        <ThemedText>Configuracoes</ThemedText>
      </Pressable>

      <Pressable
        style={[styles.logoutButton, { borderColor: colors.notification }]}
        onPress={logout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color={colors.notification}
        />
        <ThemedText style={{ color: colors.notification }}>Sair</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  card: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    gap: 8,
  },
  name: { fontSize: 20, fontWeight: "bold" },
  detail: { fontSize: 15, opacity: 0.7 },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderWidth: 1,
    borderRadius: 6,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 14,
    borderWidth: 1,
    borderRadius: 6,
  },
});
