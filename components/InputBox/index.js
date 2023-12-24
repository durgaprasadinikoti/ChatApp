import { StyleSheet, Text, View, TextInput } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';

const InputBox = ({chatRoom}) => {
  const [newMessage, setNewMessage] = useState("");

  const onSend = async() => {
    const authUser = await Auth.currentAuthenticatedUser();
    const newMessageObj = {
      chatroomID: chatRoom.id,
      text: newMessage,
      userID: authUser.attributes.sub
    }
   const newMessageData =  await API.graphql(graphqlOperation(createMessage, {input: newMessageObj}))
    setNewMessage("");

    //set the new message as Last message of that chat room
    await API.graphql(graphqlOperation(updateChatRoom, 
      { input: {
        _version: chatRoom._version,
        chatRoomLastMessageId: newMessageData.data.createMessage.id,
        id: chatRoom.id
      } }))
  };

  const handleTypeMessage = (text) => {
    setNewMessage(text);
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <AntDesign name="plus" size={20} color={"royalblue"} />

      <TextInput
        value={newMessage}
        style={styles.input}
        placeholder="Type a message"
        placeholderTextColor={"gray"}
        onChangeText={handleTypeMessage}
      />

      <MaterialIcons
        style={styles.send}
        name="send"
        size={16}
        color={"white"}
        onPress={onSend}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 10,
    fontFamily: "navFont",
  },

  send: {
    backgroundColor: "royalblue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default InputBox;
