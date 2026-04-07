import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useAuth } from "../context/AuthContext";

export function LoginScreen() {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const result = login(email, password);
    setError(result);
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
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <ThemedText style={styles.title}>InfnetFood</ThemedText>
        <ThemedText style={styles.subtitle}>
          Faca login para continuar
        </ThemedText>

        {error && (
          <ThemedText style={[styles.error, { color: colors.notification }]}>
            {error}
          </ThemedText>
        )}

        <TextInput
          style={inputStyle}
          placeholder="E-mail"
          placeholderTextColor={colors.border}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={inputStyle}
          placeholder="Senha"
          placeholderTextColor={colors.border}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
        >
          <ThemedText style={styles.buttonText}>Entrar</ThemedText>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  content: { padding: 24, gap: 12 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
    marginBottom: 8,
  },
  error: { textAlign: "center", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  button: {
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 4,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
