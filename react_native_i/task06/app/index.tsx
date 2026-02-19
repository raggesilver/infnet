import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const tasks = [
  { href: "/task06", label: "Tarefa 06 — Personalização de Botões" },
  { href: "/task07", label: "Tarefa 07 — Resposta ao Button" },
  { href: "/task08", label: "Tarefa 08 — TouchableOpacity" },
] as const;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <Link key={task.href} href={task.href} style={styles.link}>
          <ThemedText>{task.label}</ThemedText>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    justifyContent: "center",
  },
  link: {
    padding: 16,
  },
});
