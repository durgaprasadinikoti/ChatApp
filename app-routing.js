import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Users from "./screens/Users";
import { COLORS } from "./constants";
import { FontAwesome, Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import Messages from "./screens/Messages";
import Favorites from "./screens/Favorites";
import Settings from "./screens/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "./screens/ChatScreen";
import ChatsScreen from "./screens/ChatsScreen/ChatsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppRouting = () => {

  const ChatNavigations = () =>  (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary100 },
        headerTintColor: COLORS.secondary100,
      }}
    >
      <Stack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ title: "Chats" }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerStyle: {backgroundColor: COLORS.primary100 }, 
                headerTintColor: COLORS.secondary100, 
                tabBarStyle: { backgroundColor: COLORS.black },
                tabBarActiveTintColor: COLORS.primary200,
                tabBarLabelStyle: {fontFamily: 'navFont'}
                }}>
                     <Tab.Screen name="Users" component={Users} options={{headerTitle: 'Connections',tabBarIcon: ({color, size }) => <FontAwesome name="users" size={24} color={color} />, tabBarLabel: 'Users' }} />
                     <Tab.Screen name="Inbox" component={ChatNavigations} options={{headerShown: false,  headerTitle: '', tabBarIcon: ({color, size }) => <Entypo name="message" size={24} color={color} />, tabBarLabel: 'Chats' }} />
                     <Tab.Screen name="Favorites" component={Favorites} options={{headerTitle: 'Favorites', tabBarIcon: ({color, size }) => <AntDesign name="star" size={24} color={color} />, tabBarLabel: 'Favorites' }} />
                     <Tab.Screen name="Settings" component={Settings} options={{headerTitle: 'Settings', tabBarIcon: ({color, size }) => <Ionicons name="settings" size={24} color={color} />, tabBarLabel: 'Settings' }} />
                </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRouting;
