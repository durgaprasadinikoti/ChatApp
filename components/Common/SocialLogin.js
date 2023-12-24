import { SafeAreaView, StyleSheet, Platform } from "react-native";
import Iconbutton from "../UI/IconButton";
const SocialLogin = () => {
  return (
    <SafeAreaView style={styles.buttonsContainer}>
      <Iconbutton icon="google">Sign In With Google</Iconbutton>
      <Iconbutton icon="facebook-square">Sign In With Facebook</Iconbutton>
      {Platform.OS === "ios" && (
        <Iconbutton icon="apple1">Sign In With Apple</Iconbutton>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        marginVertical: 20,
      },
});

export default SocialLogin;
