import {
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import bg from "../assets/images/BG.png";
import Message from "../components/Message";
import messageData from "../data/messages.json";
import InputBox from "../components/InputBox";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons'; 
import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom } from '../src/graphql/queries';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const chatroomID = route.params.id;

  const [chatRoom, setChatRoom] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  if(!chatRoom) {
    <ActivityIndicator />
  }

  useEffect( () => {
      API.graphql(graphqlOperation(getChatRoom, {id: chatroomID})).then( (result) => {
        setChatRoom(result.data?.getChatRoom)
        setIsDataLoaded(true);
      });
  }, []);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bg}
      keyboardVerticalOffset={88}
    >
      <ImageBackground source={bg} style={styles.bg}>
       {isDataLoaded && <FlatList
          data={chatRoom.Messages.items}
          style={styles.list}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Message message={item} />}
        /> }
        <InputBox chatRoom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  list: {
    padding: 10,
  },
});

export default ChatScreen;
