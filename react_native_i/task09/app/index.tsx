import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const tasks = [
  { href: "/task09", label: "Tarefa 09 — Tela de Perfil" },
  { href: "/task10", label: "Tarefa 10 — Lista de Compras" },
  { href: "/task11", label: "Tarefa 11 — Galeria de Imagens" },
  { href: "/task12", label: "Tarefa 12 — Contador de Cliques" },
  { href: "/task13", label: "Tarefa 13 — Contador V2" },
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
