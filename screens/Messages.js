import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from './ChatsScreen/ChatsScreen';
import { COLORS } from '../constants';
import ChatScreen from './ChatScreen';
import { Entypo } from '@expo/vector-icons'; 

const Stack = createNativeStackNavigator();

const Messages = () => {
  return (
    //  <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerStyle: {backgroundColor: COLORS.primary100 }, headerTintColor: COLORS.secondary100 }}>
              <Stack.Screen name="ChatsScreen" component={ChatsScreen} options={{title: 'Chats', headerRight: () => (<Entypo name="new-message" size={18} color={"white"} style={{marginRight: 15}} />)}}/>
              <Stack.Screen name="ChatScreen" component={ChatScreen} options={{title: ''}}/> 
          </Stack.Navigator>
    //  </NavigationContainer>
  );
};


export default Messages;
