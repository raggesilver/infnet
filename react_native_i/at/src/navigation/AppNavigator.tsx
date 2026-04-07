import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { CartBadge } from "../components/CartBadge";
import { useAuth } from "../context/AuthContext";
import { CartScreen } from "../screens/CartScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { MapScreen } from "../screens/MapScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { ProductDetailScreen } from "../screens/ProductDetailScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { RestaurantDetailScreen } from "../screens/RestaurantDetailScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppStackParamList } from "./types";

const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const AuthStackNav = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Orders: "receipt-outline",
            Map: "map-outline",
            Profile: "person-outline",
          };
          if (route.name === "Cart") {
            return (
              <View>
                <Ionicons name="cart-outline" size={size} color={color} />
                <CartBadge />
              </View>
            );
          }
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio", tabBarLabel: "Inicio" }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ title: "Pedidos", tabBarLabel: "Pedidos" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Carrinho", tabBarLabel: "Carrinho" }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Mapa", tabBarLabel: "Mapa" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil", tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

function AuthScreens() {
  return (
    <AuthStackNav.Navigator>
      <AuthStackNav.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStackNav.Navigator>
  );
}

function AppScreens() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ route }) => ({
          title: route.params.categoryName,
          headerBackTitle: "Voltar",
        })}
      />
      <AppStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Detalhes do Produto", headerBackTitle: "Voltar" }}
      />
      <AppStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: "Checkout", headerBackTitle: "Voltar" }}
      />
      <AppStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{ title: "Restaurante", headerBackTitle: "Voltar" }}
      />
      <AppStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Configuracoes", headerBackTitle: "Voltar" }}
      />
    </AppStack.Navigator>
  );
}

export function AppNavigator() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AppScreens /> : <AuthScreens />;
}
