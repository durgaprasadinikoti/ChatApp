import { SafeAreaView, StyleSheet, Text, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { COLORS, APP_TITLE } from '../../constants';
const Title = () => {
  return (
    <SafeAreaView style={styles.titleContainer}>
      <SafeAreaView style={styles.iconContainer}>
        <AntDesign name="team" size={30} color={COLORS.primary200} />
      </SafeAreaView>
      <Text style={styles.title}> { APP_TITLE } </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    titleContainer: {
      marginVertical: Platform.OS === 'ios' ? 50 : 30,
      flexDirection: "row",
      gap: 3
    },
    iconContainer: {
      marginVertical: Platform.OS === 'ios' ? -4 : 4
    },
    title: {
      color: COLORS.secondary100,
      fontSize: 30,
      fontFamily: "logoFont",
      fontWeight: "bold",
    },
  });

export default Title;
