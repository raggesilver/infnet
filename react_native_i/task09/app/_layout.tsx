import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "TP1 — React Native I" }}
        />
        <Stack.Screen
          name="task09"
          options={{ title: "Tarefa 09", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task10"
          options={{ title: "Tarefa 10", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task11"
          options={{ title: "Tarefa 11", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task12"
          options={{ title: "Tarefa 12", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task13"
          options={{ title: "Tarefa 13", headerBackTitle: "Início" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
