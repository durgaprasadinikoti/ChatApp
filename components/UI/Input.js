import { SafeAreaView, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../constants';

const Input = ({placeholder, onChangeText, secureTextEntry = false, errorText, onBlur, keyboardType="default", value}) => {
    return (
        <SafeAreaView style={styles.conatiner}>
                <TextInput placeholder={placeholder} value={value} style={[styles.inputContainer, errorText ? styles.errorBorder : '' ]}  placeholderTextColor={errorText ? COLORS.primary200 : COLORS.gray} onChangeText={onChangeText} secureTextEntry={secureTextEntry} onBlur={onBlur} keyboardType={keyboardType} />
                {errorText && <SafeAreaView style={styles.errorTextContainer}>
                 <Text style={styles.errorText}>{errorText}</Text>
                </SafeAreaView> }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        // flex: 1
    },
    inputContainer: {
        fontFamily: 'navFont',
        borderWidth: 1,
        borderTopColor: COLORS.primary100,
        borderRightColor: COLORS.primary100,
        borderLeftColor: COLORS.primary100,
        borderBottomColor: COLORS.gray,
        padding: 10,
        margin: 5,
        marginVertical: 10,
        width: '100%',
        color: COLORS.secondary100
    },
    errorBorder: {
        borderBottomColor: COLORS.primary200,
    },
    errorTextContainer: {
        marginHorizontal: 15
    },
    errorText: {
        color: COLORS.primary200,
        fontFamily: 'navFont',
    }

})

export default Input;