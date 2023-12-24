import { SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { COLORS } from '../constants';
import { Auth } from 'aws-amplify';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title='Signout' onPress={ () => Auth.signOut() } />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary100,
      },
})

export default Settings;
