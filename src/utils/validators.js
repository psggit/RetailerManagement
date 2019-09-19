import { emailRegex } from 'Utils/regex'

export function validateTextField (fieldName, fieldValue) {
  if (!fieldValue.length) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  return {
    status: false,
    value: ''
  }
}

export function validateEmail (fieldName, fieldValue) {
  if (!fieldValue.length) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (!emailRegex.test(fieldValue)) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  }
  
  return {
    status: false,
    value: ''
  }
}

export function validateNumberField ({fieldName, fieldValue, length, checkLength}) {
  if (checkLength && !fieldValue.length) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (checkLength && (isNaN(fieldValue) || (fieldValue.length) !== (length))) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  } else if(!(fieldValue)){
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  
  return {
    status: false,
    value: ''
  }
}


