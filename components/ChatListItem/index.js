import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';


const ChatListItem = ({chat}) => { 
  const navigation = useNavigation();
  const [user, setUser] = useState(null)

  useEffect( () => {

    const fetchUser = async() => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chat.users.items.find( item => item.user.id !== authUser.attributes.sub);
      setUser(userItem?.user)
    }

    fetchUser();

  }, [])


  return (
    <TouchableOpacity style={styles.container} onPress={ () => navigation.navigate('ChatScreen', {id: chat.id, name: user.name}) }>
      <Image
        source={{
          uri: user?.image,
        }}
        style={styles.image}
      />
      <SafeAreaView style={styles.innerContainer}>
        <SafeAreaView style={styles.headerContainer}>
          <SafeAreaView style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.nameText}>{user?.name}</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.timeContainer}>
            <Text style={styles.timeText}>{dayjs(chat?.LastMessage?.createdAt).fromNow(true)}</Text>
          </SafeAreaView>
        </SafeAreaView>
        <Text numberOfLines={2} style={styles.textLastMessageText}>{chat?.LastMessage?.text}</Text>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 10,
    height: 70,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E'
  },
  nameContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
  image: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 35,
    marginRight: 10
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "navFont",
    color: COLORS.secondary100,
  },
  timeText: {
    fontFamily: "navFont",
    color: COLORS.gray,
  },
  textLastMessageText: {
    fontFamily: "navFont",
    color: COLORS.gray,
  },
});

export default ChatListItem;
