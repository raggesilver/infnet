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
          options={{ title: "TP1 — Paulo Queiroz" }}
        />
        <Stack.Screen
          name="task15"
          options={{ title: "Tarefa 15", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task16"
          options={{ title: "Tarefa 16", headerBackTitle: "Início" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
