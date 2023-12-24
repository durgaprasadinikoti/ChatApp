import { SafeAreaView, Text, StyleSheet, Platform } from "react-native";
import Input from "../UI/Input";
import PrimaryButton from "../UI/PrimaryButton";
import { COLORS } from "../../constants";
import SocialLogin from "../Common/SocialLogin";
import PasswordInput from "../UI/PasswordInput";
import { useReducer, useEffect, useState } from "react";
import DateOfBirthPicker from "../UI/DateOfBirthPicker";
import { MaterialIcons } from '@expo/vector-icons'; 
import { validateEmail, validateAge, convertDateFormat, validatePassword, validateIndianPhoneNumber } from '../../utils/validators'

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  phoneNumber: "",
  errors: {}
};

const reducer = (state, payload) => {
  if (payload.action === "UPDATE") {
    return { ...state, [payload.key]: payload.value };
  } else if (payload.action === "RESET") {
    return state;
  }
  return state;
};

const CreateAccount = () => {
  const [user, dispatch] = useReducer(reducer, initialState);
  const [isDateSet, setIsDateSet] = useState(false);
  const [dirtyStates, setDirtyStates] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
    dateOfBirth: false,
  })

  useEffect( () => {
    if(isDateSet) {
      isUserValidForRegister();
    }

  }, [isDateSet])

  const handleTextChange = (key, value) => {
    dispatch({ action: "UPDATE", key, value });
    setDirtyStates( prevState => ({...prevState, [key]: true}) )
    isUserValidForRegister();
  };

  const handleSubmitAction = () => {
    setDirtyStates({
      email: true,
      password: true,
      confirmPassword: true,
      phoneNumber: true,
      dateOfBirth: true
    })
    if(Object.keys(isUserValidForRegister()).length === 0 && passwordsMatch() && isPhoneNumberValid()) {
    } else {
      console.log('There is an error');
    }

  };

  const isUserValidForRegister = () => {
    const errors = {}
    if(user.email === '' || user.email.trim().length === 0) {
      errors['email'] = 'Please enter the email';
    }

    if(user.email !== '' && user.email.trim().length > 0 && !validateEmail(user.email)) {
      errors['email'] = 'Please enter a valid email';
    }

    if(user.password === '' || user.password.trim().length === 0) {
      errors['password'] = 'Please enter the password';
    }

    if(user.password !== '' && user.password.trim().length > 0 && !validatePassword(user.password)) {
      errors['password'] = 'Password must be 10 characters and contain at least 1 letter, 1 number, and 1 special character';
    }

    if(user.confirmPassword === '' || user.confirmPassword.trim().length === 0) {
      errors['confirmPassword'] = 'Please enter the confirmPassword';
    }

    if(user.dateOfBirth === '' || user.dateOfBirth.trim().length === 0) {
      errors['dateOfBirth'] = 'Please enter the Date Of Birth';
    }

    if(user.phoneNumber === '' || user.phoneNumber.trim().length === 0) {
      errors['phoneNumber'] = 'Please enter the Phone Number';
    }

    if(user.dateOfBirth !== '' && user.dateOfBirth.trim().length >= 0 && !validateAge(convertDateFormat(user.dateOfBirth) )) {
      errors['dateOfBirth'] = 'Below 18 not allowed';
    }
    setIsDateSet(false);
    dispatch({ action: "UPDATE", key: 'errors', value: errors });
    return errors;
  }



  const setDob = (value) => {
    dispatch({ action: "UPDATE", key: 'dateOfBirth', value });
    setIsDateSet(true);
  }

  handleInputBlur = () => {
    isUserValidForRegister();
  }

  const passwordsMatch = () => {
    let passwordsMatchFlag = true;
    let errorText = '';
    if(user.password !== '' && user.confirmPassword !== '' && user.password !== user.confirmPassword) {
      errorText = 'Please enter the confirmPassword same as password';
      passwordsMatchFlag = false;
    }
    dispatch({ action: "UPDATE", key: 'errors', value: {...user.errors, confirmPassword: errorText} });
    return passwordsMatchFlag;
  }

  const isPhoneNumberValid = () => {
    let phoneNumberValidFlag = true;
    let errorText = '';
    if(user.phoneNumber !== '' && user.phoneNumber.trim().length > 0 && !validateIndianPhoneNumber(user.phoneNumber)) {
      errorText = 'Please enter the valid Phone Number';
      phoneNumberValidFlag = false;
    }
    dispatch({ action: "UPDATE", key: 'errors', value: {...user.errors, phoneNumber: errorText} });
    return phoneNumberValidFlag;
  }


  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder="Email"
        onChangeText={(text) => handleTextChange("email", text)}
        value={user.email}
        errorText={dirtyStates['email'] ? user.errors['email'] : undefined}
        onBlur={handleInputBlur}
        keyboardType={"email-address"}
      />
      <Input
        placeholder="Password"
        onChangeText={(text) => handleTextChange("password", text)}
        secureTextEntry={true}
        value={user.password}
        errorText={dirtyStates['password'] ? user.errors['password'] : undefined}
        onBlur={handleInputBlur}
      />
      <Input
        placeholder="Confirm Password"
        onChangeText={(text) => handleTextChange("confirmPassword", text)}
        secureTextEntry={true}
        value={user.confirmPassword}
        errorText={dirtyStates['confirmPassword'] ? user.errors['confirmPassword'] : undefined}
        onBlur={handleInputBlur}
      />
       <Input
        placeholder="Phone"
        onChangeText={(text) => handleTextChange("phoneNumber", text)}
        value={user.phoneNumber}
        errorText={dirtyStates['phoneNumber'] ? user.errors['phoneNumber'] : undefined}
        onBlur={handleInputBlur}
        keyboardType={"phone-pad"}
      />
      <SafeAreaView style={[styles.dateOfBirthPickerContainer, dirtyStates['dateOfBirth'] && user.errors['dateOfBirth']  ?  styles.dateOfBirthPickerContainerError : '']}>
        <SafeAreaView style={styles.inputContainer}>
          <Text style={[user.dateOfBirth === '' ? ( dirtyStates['dateOfBirth'] && user.errors['dateOfBirth'] ? styles.dateOfBirthTextErrorText : styles.dateOfBirthTextDiable) : styles.dateOfBirthTextActive]}>{user.dateOfBirth === '' ? 'Date of Birth' : user.dateOfBirth}</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.iconContainer}>
          <DateOfBirthPicker setDob={setDob} />
        </SafeAreaView>
      </SafeAreaView>
     { dirtyStates['dateOfBirth'] && user.errors['dateOfBirth'] && <SafeAreaView style={styles.errorTextContainer}>
        <Text style={styles.errorText}>{user.errors['dateOfBirth']}</Text>
      </SafeAreaView> }
      <SafeAreaView style={styles.infoTextContainer}>
           <MaterialIcons name="info" size={13} color={COLORS.gray} />
           <Text style={styles.infoText}> You must be 18 or older to use Pakka Local</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <PrimaryButton onPress={handleSubmitAction}>
          Create Account
        </PrimaryButton>
      </SafeAreaView>
      <SafeAreaView style={styles.socialLoginContainer}>
        <Text style={styles.text}> Or Continue with</Text>
        <SocialLogin />
        <Text style={styles.helpText}>
          Pakka Local will Never post anything to your social channels
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialLoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: COLORS.secondary100,
    fontFamily: "navFont",
  },
  helpText: {
    fontSize: 13,
    color: COLORS.secondary100,
    fontFamily: "navFont",
  },
  dateOfBirthPickerContainer: {
    flexDirection: "row",
    gap: 30,
    borderWidth: 1,
    borderTopColor: COLORS.primary100,
    borderRightColor: COLORS.primary100,
    borderLeftColor: COLORS.primary100,
    borderBottomColor: COLORS.gray,
    padding: 10,
    marginVertical: 10,
  },
  dateOfBirthPickerContainerError: {
    borderBottomColor: COLORS.primary200,
  },
  inputContainer: {
    width: "85%",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Platform.OS === 'ios'?  3 : 0
  },
  dateOfBirthTextActive: {
    fontFamily: 'navFont',
    color: COLORS.secondary100,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 1
  },
  dateOfBirthTextDiable: {
    fontFamily: 'navFont',
    color: COLORS.gray,
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 1
  },
  dateOfBirthTextErrorText: {
    color: COLORS.primary200,
    fontFamily: 'navFont',
    paddingHorizontal: Platform.OS === 'ios' ? 15 : 1
  },
  infoText: {
    fontFamily: 'navFont',
    color: COLORS.gray,
    fontSize: 11
  },
  infoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: Platform.OS === 'ios'? 10 : 1
  },
  errorText: {
    color: COLORS.primary200,
    fontFamily: 'navFont',
},
errorTextContainer: {
  marginHorizontal: 15
},

});

export default CreateAccount;
