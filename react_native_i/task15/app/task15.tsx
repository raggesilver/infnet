import { useTheme } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

const news = [
  {
    id: "1",
    title: "Nova versão do React Native é lançada",
    image: "https://picsum.photos/id/0/800/400",
    description:
      "A equipe do React Native anunciou uma nova versão com melhorias significativas de performance e novos componentes nativos.",
  },
  {
    id: "2",
    title: "Expo SDK 54 traz novidades para desenvolvedores",
    image: "https://picsum.photos/id/1/800/400",
    description:
      "O Expo SDK 54 inclui suporte aprimorado para módulos nativos e uma experiência de desenvolvimento mais rápida.",
  },
  {
    id: "3",
    title: "TypeScript 6.0 está em desenvolvimento",
    image: "https://picsum.photos/id/2/800/400",
    description:
      "A Microsoft revelou os planos para o TypeScript 6.0, prometendo inferência de tipos ainda mais poderosa.",
  },
  {
    id: "4",
    title: "Inteligência artificial no desenvolvimento mobile",
    image: "https://picsum.photos/id/3/800/400",
    description:
      "Ferramentas de IA estão transformando a forma como aplicativos móveis são desenvolvidos, testados e mantidos.",
  },
];

export default function Task15Screen() {
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {news.map((item) => (
        <View
          key={item.id}
          style={[styles.card, { borderColor: colors.border }]}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.cardBody}>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedText>{item.description}</ThemedText>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 2,
  },
  cardBody: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontWeight: "bold",
  },
});
