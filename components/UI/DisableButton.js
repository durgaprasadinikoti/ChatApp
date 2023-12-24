
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants'
const Button = ({children}) => {
  return (
        <TouchableOpacity style={styles.conatiner}>
                <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

    conatiner: {
       borderWidth: 1,
       borderColor:COLORS.gray200,
       padding: 15,
       borderRadius: 20,
       elevation: 2,
       backgroundColor: COLORS.gray100,
       width: 350,
       justifyContent: 'center',
       alignItems: 'center',
       marginVertical: 10,
       opacity: 0.2
    },

    text: {
        color: COLORS.gray,
        fontFamily: 'navFont'
    }
})

export default Button;