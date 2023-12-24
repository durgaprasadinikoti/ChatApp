import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants'
const SingnUpNavigation = () => {
  
  const navigation = useNavigation();  
  const handleSingnUpNavigation = () => {
    navigation.navigate("SingnUp")
  };

  return (
    <TouchableOpacity onPress={handleSingnUpNavigation}>
      <Text style={styles.title}>Singn Up</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    title: {
        color: COLORS.primary200,
        fontFamily: 'navFont'
    }
})


export default SingnUpNavigation;
