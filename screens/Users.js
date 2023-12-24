import { SafeAreaView, StyleSheet } from "react-native";
import UserList from "../components/Users/UserList";
import { COLORS } from '../constants';

const Users = () => {

  return (
    <SafeAreaView style={styles.container}>
      <UserList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary100,
      },
})

export default Users;
