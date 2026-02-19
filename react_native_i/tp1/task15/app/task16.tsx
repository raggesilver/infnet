import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function Task16Screen() {
  const [feedback, setFeedback] = useState("");
  const { colors } = useTheme();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <ThemedText>Seu feedback</ThemedText>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.border, color: colors.text },
          ]}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Escreva seu feedback aqui..."
          multiline
          scrollEnabled
        />
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
  },
  input: {
    borderWidth: 1,
    padding: 8,
    maxHeight: 200,
    textAlignVertical: "top",
  },
});
