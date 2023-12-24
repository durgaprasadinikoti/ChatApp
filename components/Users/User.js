import { SafeAreaView, Text, StyleSheet, ImageBackground, Dimensions, Platform, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
const screenWidth = Dimensions.get('window').width;
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createUserChatRoom } from '../../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';
import { getCommonChatRoomWithUser } from '../../services/chatRoomService';

const Card = ({ user }) => {
  const url = user.image ? user.image : "../../assets/images/mm.jpg";
  const navigation = useNavigation();

  const handlePress = async() => {
    console.log('Pressed....');

    // Check if we already have a chatRoomm with user
    const exisitingChatRoom = await getCommonChatRoomWithUser(user.id);
    if(exisitingChatRoom) {
      navigation.navigate('ChatScreen', {id: exisitingChatRoom.chatRoom.id})
    }

   // create a new chat room

    const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {}}));
    console.log(newChatRoomData);

    if(!newChatRoomData.data?.createChatRoom) {
      console.log('Error while creating the chat room');
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    // Add the clicked user to the chatroom
    console.log(user.id)
    console.log(newChatRoom.id)
    await API.graphql(graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: user.id}}))

    // Add the auth user to the chatroom

    const authUser = await Auth.currentAuthenticatedUser();
    console.log(authUser)
    await API.graphql(graphqlOperation(createUserChatRoom, {input: {chatRoomId: newChatRoom.id, userId: authUser.attributes.sub}}))

    // navigate to the newly created chatroom
    navigation.navigate('ChatScreen', {id: newChatRoom.id})
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <ImageBackground
        source={{uri:url}}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.titleContainer}>
          <SafeAreaView
            style={[
              styles.onlineIndicator,
              { backgroundColor: user.status ? "green" : "gray" },
            ]}
          />
          <Text style={styles.title}>{user.name}</Text>
        </SafeAreaView>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 1,
    margin: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: (screenWidth / 3 - 7 ),
    height: 120,
    backgroundColor: COLORS.gray,
    overflow: "hidden",
  },
  backgroundImage: {
    opacity: 0.8
  },
  backgroundContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 105 : 100
  },
  title: {
    fontFamily: "navFont",
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.secondary100,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 6,
  },
});
export default Card;
