import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task02Screen() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();

  function handleLogin() {
    if (user.trim() && password.trim()) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } else {
      Alert.alert("Erro", "Preencha todos os campos.");
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <ThemedText>Usuário</ThemedText>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={user}
          onChangeText={setUser}
          placeholder="Digite seu usuário"
        />

        <ThemedText>Senha</ThemedText>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <Button title="Entrar" onPress={handleLogin} />
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 8,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    padding: 8,
  },
});
