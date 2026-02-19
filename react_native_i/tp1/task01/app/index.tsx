import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const tasks = [
  { href: "/task01", label: "Tarefa 01 — Tela de Boas-vindas" },
  { href: "/task02", label: "Tarefa 02 — Login Básico" },
  { href: "/task03", label: "Tarefa 03 — Imagem e Descrição" },
  { href: "/task04", label: "Tarefa 04 — ScrollView" },
  { href: "/task05", label: "Tarefa 05 — Duas Imagens" },
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
