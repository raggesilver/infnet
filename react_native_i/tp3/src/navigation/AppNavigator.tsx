import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationDetailScreen } from "../screens/ApplicationDetailScreen";
import { ApplicationsScreen } from "../screens/ApplicationsScreen";
import { ArticleWebViewScreen } from "../screens/ArticleWebViewScreen";
import { ArticlesScreen } from "../screens/ArticlesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ProjectDetailScreen } from "../screens/ProjectDetailScreen";
import { ProjectsScreen } from "../screens/ProjectsScreen";
import { QualificationsScreen } from "../screens/QualificationsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Home: "home-outline",
            Qualifications: "school-outline",
            Projects: "code-slash-outline",
            Applications: "briefcase-outline",
            Articles: "newspaper-outline",
          };
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
        name="Qualifications"
        component={QualificationsScreen}
        options={{ title: "Qualificacoes", tabBarLabel: "Qualificacoes" }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{ title: "Projetos", tabBarLabel: "Projetos" }}
      />
      <Tab.Screen
        name="Applications"
        component={ApplicationsScreen}
        options={{ title: "Candidaturas", tabBarLabel: "Candidaturas" }}
      />
      <Tab.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{ title: "Artigos", tabBarLabel: "Artigos" }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
        options={{ title: "Detalhes do Projeto", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="ApplicationDetail"
        component={ApplicationDetailScreen}
        options={{
          title: "Detalhes da Candidatura",
          headerBackTitle: "Voltar",
        }}
      />
      <Stack.Screen
        name="ArticleWebView"
        component={ArticleWebViewScreen}
        options={{ title: "Artigo", headerBackTitle: "Voltar" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Configuracoes", headerBackTitle: "Voltar" }}
      />
    </Stack.Navigator>
  );
}
