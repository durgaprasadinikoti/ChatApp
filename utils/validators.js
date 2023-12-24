import { isValidNumber } from "libphonenumber-js";

export const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  };

  function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    
    // Adjust for months
    if (monthsDiff < 0 || (monthsDiff === 0 && today.getDate() < birthDate.getDate())) {
      return yearsDiff - 1;
    }
    
    return yearsDiff;
  }
  
  export function validateAge(dateString) {
    const age = calculateAge(dateString);
    return age >= 18;
  }

  export function convertDateFormat(inputDateString) {
    const parts = inputDateString.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);
  
    const formattedDate = new Date(year, month - 1, day);
    const formattedDateString = formattedDate.toISOString().split('T')[0];
  
    return formattedDateString;
  }

  export function validatePassword(password) {
    // Password must be 10 characters and contain at least 1 letter, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
  
    return passwordRegex.test(password);
  }

  export function validateIndianPhoneNumber(phoneNumber) {
    // return isValidNumber(phoneNumber, "IN");
      // Regular expression pattern for Indian mobile numbers
  const pattern = /^[6-9]\d{9}$/;

  // Test the input phoneNumber against the pattern
  return pattern.test(phoneNumber);
  }
  