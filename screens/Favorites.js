import { SafeAreaView, StyleSheet, Text } from "react-native";
import { COLORS } from '../constants';

const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favorites</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary100,
      },
})

export default Favorites;
