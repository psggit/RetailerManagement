import { emailRegex } from 'Utils/regex'

export function validateTextField(fieldName, value) {
  if (!value.length) {
    return {
      errStatus: true,
      errValue: `${fieldName} is required`
    }
  }
  return {
    errStatus: false,
    errValue: ''
  }
}

export function validateEmail(fieldName, value) {
  if (!value.length) {
    return {
      errStatus: true,
      errValue: `${fieldName} is required`
    }
  } else if (!emailRegex.test(value)) {
    return {
      errStatus: true,
      errValue: `${fieldName} is invalid`
    }
  }
  
  return {
    errStatus: false,
    errValue: ''
  }
}

export function validateNumberField({fieldName, value, length}) {
  if (!value.length) {
    return {
      errStatus: true,
      errValue: `${fieldName} is required`
    }
  } else if (isNaN(value) || (value.length) !== (length)) {
    return {
      errStatus: true,
      errValue: `${fieldName} is invalid`
    }
  }

  return {
    errStatus: false,
    errValue: ''
  }
}
