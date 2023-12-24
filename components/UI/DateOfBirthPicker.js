import React, { useState } from 'react';
import { SafeAreaView, Text, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons'; 
import { COLORS } from '../../constants';

const DateOfBirthPicker = ({setDob}) => {

    const [isVisible, setIsVisible] = useState(false);
  
    const showDatePicker = () => {
      setIsVisible(true);
    };
  
    const hideDatePicker = () => {
      setIsVisible(false);
    };
  
    const handleConfirm = (date) => {
      setDob(date.toLocaleDateString());
      hideDatePicker();
    };

    return (

    <SafeAreaView>
      <FontAwesome name="calendar" size={24} color={COLORS.secondary100} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
    );

}

export default DateOfBirthPicker;