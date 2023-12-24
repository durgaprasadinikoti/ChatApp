import { SafeAreaView, StyleSheet, Text } from "react-native";
import Input from "../UI/Input";
import { COLORS } from '../../constants';
import Button from "../UI/DisableButton";
import SocialLogin from "../Common/SocialLogin";
import { useState, useEffect } from 'react';
import PrimaryButton from "../UI/PrimaryButton";
import { useAuthContext } from '../../store/AuthProvider';

const PhoneNumber = () => {
    const { setAuthKey } = useAuthContext();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();
    const [btnActive, setBtnActive] = useState(false);

    useEffect( () => {
        setBtnActive(phoneNumber && phoneNumber !== '' && phoneNumber.trim().length > 0 && password && password !== '' && password.trim().length > 0)
      }, [phoneNumber, password])
    
    
      const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
      }
    
      const handlePasswordChange = (value) => {
        setPassword(value);
      }

      const handleSubmitAction = () => {
        setAuthKey('ABCXYZ')
      }

  return (
    <SafeAreaView>
      <Input placeholder={"Phone"} onChangeText={handlePhoneNumberChange}  keyboardType={"phone-pad"} value={phoneNumber} />
      <Input placeholder={"Password"} onChangeText={handlePasswordChange} secureTextEntry={true} value={password} />
      <SafeAreaView style={styles.mainButtonsContainer}>
        <SafeAreaView style={styles.loginButtonContainer}>
          <PrimaryButton disabledStyle={!btnActive ? {opacity: 0.1} : ''} onPress={handleSubmitAction}>Login</PrimaryButton>
        </SafeAreaView>
        <SafeAreaView style={styles.textContainer}>
          <Text style={styles.text}>Forgot Password?</Text>
        </SafeAreaView>
        <SocialLogin />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    mainButtonsContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      loginButtonContainer: {
        marginVertical: 10,
      },
      textContainer: {
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
      },
      text: {
        fontFamily: "navFont",
        color: COLORS.gray,
      },
})

export default PhoneNumber;
