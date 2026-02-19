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
          name="task01"
          options={{ title: "Tarefa 01", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task02"
          options={{ title: "Tarefa 02", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task03"
          options={{ title: "Tarefa 03", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task04"
          options={{ title: "Tarefa 04", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task05"
          options={{ title: "Tarefa 05", headerBackTitle: "Início" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
