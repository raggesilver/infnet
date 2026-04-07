import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { OrderProvider } from "./src/context/OrderContext";
import { ThemeProvider, useThemeMode } from "./src/context/ThemeContext";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { requestNotificationPermissions } from "./src/services/notifications";

function AppContent() {
  const { isDark } = useThemeMode();

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
