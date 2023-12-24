import { SafeAreaView, StyleSheet} from "react-native";
import { COLORS } from '../constants'
import Title from "../components/Login/Title";
import Tabs from "../components/Login/Tabs";

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title />
      <Tabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.primary100,
  },
});

export default Login;
