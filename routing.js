import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import SingnUp from "./screens/SignUp";
import { COLORS } from './constants';
import SingnUpNavigation from "./components/Login/SingnUpNavigation";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: {backgroundColor: COLORS.primary100 }, headerTintColor: COLORS.secondary100 }}>
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: '', headerRight: SingnUpNavigation}}/>
        <Stack.Screen name="SingnUp" title="Create Account" component={SingnUp} options={{ headerTitle: 'Create Account' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
