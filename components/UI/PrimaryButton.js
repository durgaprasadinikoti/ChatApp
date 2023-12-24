import { StyleSheet, TouchableOpacity , Text} from "react-native";
import { COLORS } from '../../constants';

const PrimaryButton = ({children, onPress, disabledStyle}) => {
  return (
    <TouchableOpacity style={[styles.conatiner, disabledStyle]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    borderWidth: 1,
    borderColor: COLORS.primary200,
    padding: 15,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: COLORS.primary200,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  text: {
    color: COLORS.secondary100,
    fontFamily: "navFont",
  },
});

export default PrimaryButton;
