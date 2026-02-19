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
          name="task14"
          options={{ title: "Tarefa 14", headerBackTitle: "Início" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
