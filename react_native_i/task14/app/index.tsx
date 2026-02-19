import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const tasks = [
  { href: "/task14", label: "Tarefa 14 — Pressable" },
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
