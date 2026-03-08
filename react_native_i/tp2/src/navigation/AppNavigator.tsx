import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailScreen } from "../screens/DetailScreen";
import { ListScreen } from "../screens/ListScreen";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: "Catálogo Harry Potter" }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: "Detalhes", headerBackTitle: "Voltar" }}
      />
    </Stack.Navigator>
  );
}
