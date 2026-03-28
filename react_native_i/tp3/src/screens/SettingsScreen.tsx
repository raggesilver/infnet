import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useThemeMode } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

export function SettingsScreen() {
  const { profile, updateProfile } = useUser();
  const { themeMode, setThemeMode, isDark } = useThemeMode();
  const { colors } = useTheme();

  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [bio, setBio] = useState(profile.bio);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, title, bio });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = [
    styles.input,
    {
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.card,
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <ThemedText style={styles.sectionTitle}>Perfil</ThemedText>

      <ThemedText style={styles.label}>Nome</ThemedText>
      <TextInput
        style={inputStyle}
        value={name}
        onChangeText={setName}
        placeholder="Seu nome"
        placeholderTextColor={colors.border}
      />

      <ThemedText style={styles.label}>Titulo</ThemedText>
      <TextInput
        style={inputStyle}
        value={title}
        onChangeText={setTitle}
        placeholder="Seu titulo profissional"
        placeholderTextColor={colors.border}
      />

      <ThemedText style={styles.label}>Bio</ThemedText>
      <TextInput
        style={[...inputStyle, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        placeholder="Sobre voce"
        placeholderTextColor={colors.border}
        multiline
        numberOfLines={4}
      />

      <Pressable
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <ThemedText style={styles.saveButtonText}>
          {saved ? "Salvo!" : "Salvar Perfil"}
        </ThemedText>
      </Pressable>

      <ThemedText style={[styles.sectionTitle, { marginTop: 24 }]}>
        Aparencia
      </ThemedText>

      <View style={styles.themeRow}>
        <ThemedText>Modo Escuro</ThemedText>
        <Switch
          value={isDark}
          onValueChange={(value) => setThemeMode(value ? "dark" : "light")}
        />
      </View>

      <View style={styles.themeRow}>
        <ThemedText>Seguir Sistema</ThemedText>
        <Switch
          value={themeMode === "system"}
          onValueChange={(value) =>
            setThemeMode(value ? "system" : isDark ? "dark" : "light")
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  label: { fontSize: 14, fontWeight: "600", opacity: 0.6, marginTop: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
  },
  bioInput: { minHeight: 80, textAlignVertical: "top" },
  saveButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  themeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});
