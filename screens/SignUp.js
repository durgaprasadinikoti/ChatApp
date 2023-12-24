import { SafeAreaView, Text, StyleSheet } from "react-native";
import { COLORS } from '../constants';
import CreateAccount from "../components/SingUp/CreateAccount";

const SingnUp = () => {
  return (
    <SafeAreaView style={styles.conatiner}>
      <CreateAccount />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: COLORS.primary100,
  },
});

export default SingnUp;
