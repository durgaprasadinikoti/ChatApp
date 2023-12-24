import { SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import { COLORS } from "../../constants";
import ChatListItem from "../../components/ChatListItem";
import chatData from '../../data/chats.json'
import { listChatRooms } from './queries';
import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  useEffect( () => {
    const fetchChatRooms = async() => {
        const authUser = await Auth.currentAuthenticatedUser()
        const response = await API.graphql( graphqlOperation(listChatRooms, {id: authUser.attributes.sub }) )
        setChatRooms(response.data.getUser.ChatRooms.items)
    }

    fetchChatRooms();

  }, []);

    return (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.innerContainer}>
            <FlatList data={chatRoom} keyExtractor={ (item) => item.id } renderItem={({item}) => <ChatListItem chat={item.chatRoom} /> } />
          </SafeAreaView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary100,
    },
    innerContainer: {
      marginTop: 20
    }
  });

export default ChatsScreen;
