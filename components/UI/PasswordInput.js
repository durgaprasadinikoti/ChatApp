import { SafeAreaView, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
const PasswordInput = ({ placeholder, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(true);

  const passwordShowHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.inputContainer}>
        <Input
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={showPassword}
        />
      </SafeAreaView>
      <SafeAreaView>
        <Ionicons
          name={showPassword ? "eye" : "eye-off"}
          size={24}
          color={COLORS.secondary100}
          onPress={passwordShowHandler}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 20
  }
});

export default PasswordInput;
