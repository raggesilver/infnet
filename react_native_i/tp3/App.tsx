import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { ThemeProvider, useThemeMode } from "./src/context/ThemeContext";
import { UserProvider } from "./src/context/UserContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

function AppContent() {
  const { isDark } = useThemeMode();

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
