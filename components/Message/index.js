import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { API, Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

const Message = ({message}) => {
    const [itMe, setItMe] = useState(false);

    useEffect( () => {
        isMyMessage();
    }, [])

    const isMyMessage = async() => {
        const authUser = await Auth.currentAuthenticatedUser();
        setItMe(message.userID === authUser.attributes.sub);
    }

    return (
        <View style={[styles.container, {backgroundColor: itMe ? '#DCF8C5' : 'white', alignSelf: itMe ? 'flex-end' : 'flex-start' }]}>
                <Text style={styles.text}>{message.text}</Text>
                <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,
   },

   text: {
    // padding: 10,
    fontFamily: 'navFont'
   },

   time: {
     color: COLORS.gray,
     alignSelf: 'flex-end'
   }
})

export default Message;