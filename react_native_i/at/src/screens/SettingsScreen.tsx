import { useTheme } from "@react-navigation/native";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useThemeMode } from "../context/ThemeContext";

export function SettingsScreen() {
  const { colors } = useTheme();
  const { themeMode, isDark, setThemeMode } = useThemeMode();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.sectionTitle}>Aparencia</ThemedText>

      <View style={styles.row}>
        <ThemedText>Modo Escuro</ThemedText>
        <Switch
          value={isDark}
          onValueChange={(value) => setThemeMode(value ? "dark" : "light")}
        />
      </View>

      <View style={styles.row}>
        <ThemedText>Seguir Sistema</ThemedText>
        <Switch
          value={themeMode === "system"}
          onValueChange={(value) =>
            setThemeMode(value ? "system" : isDark ? "dark" : "light")
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});
