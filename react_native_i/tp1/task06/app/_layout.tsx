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
          name="task06"
          options={{ title: "Tarefa 06", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task07"
          options={{ title: "Tarefa 07", headerBackTitle: "Início" }}
        />
        <Stack.Screen
          name="task08"
          options={{ title: "Tarefa 08", headerBackTitle: "Início" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
