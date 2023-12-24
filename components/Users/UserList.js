import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import User from "./User";
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from "../../src/graphql/queries";
import { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState();
  useEffect( () => {
    API.graphql(graphqlOperation(listUsers)).then( (result) => setUsers(result.data?.listUsers?.items) )
  }, []);


  const NUM_COLUMNS = 3;
  const CARD_HEIGHT = 200;

  const getItemLayout = (_, index) => ({
    length: CARD_HEIGHT,
    offset: CARD_HEIGHT * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        getItemLayout={getItemLayout}
        renderItem={({ item }) => (
          <User
            user={item}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContainer: {
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5
  },
});

export default UserList;
