import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from '../../constants';
import { AntDesign } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native";
const Iconbutton = ({ children, icon }) => {
  return (
    <TouchableOpacity style={styles.conatiner}>
     <SafeAreaView style={styles.innerContainer}>
        <AntDesign name={icon} size={24} color="white" /> 
        <Text style={styles.text}>{children}</Text>
     </SafeAreaView>   

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 15,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: COLORS.gray300,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  innerContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: COLORS.secondary100,
    fontFamily: "navFont",
  },
});

export default Iconbutton;
