import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const tasks = [
  { href: "/task15", label: "Tarefa 15 — Página de Notícias" },
  { href: "/task16", label: "Tarefa 16 — Campo de Feedback" },
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
