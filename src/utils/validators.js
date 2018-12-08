import { emailRegex } from 'Utils/regex'
// export function validateOrganizationName(name) {
//     if (!name.length) {
//       return {
//         status: true,
//         value: 'Name is required'
//       }
//     }
//     return {
//       status: false,
//       value: ''
//     }
// }

export function validateTextField(fieldName, value) {
  if (!value.length) {
    //this.setState({errorFound: true})
    return {
      errStatus: true,
      errValue: `${fieldName} is required`
    }
  }
  //this.setState({errorFound: false})
  return {
    errStatus: false,
    errValue: ''
  }
}

export function validateEmail(fieldName, value) {
  if (!value.length) {
    //this.setState({errorFound: true})
    return {
      errStatus: true,
      errValue: `${fieldName} is required`
    }
  } else if (!emailRegex.test(value)) {
    //this.setState({errorFound: true})
    return {
      errStatus: true,
      errValue: `${fieldName} is invalid`
    }
  }
  //this.setState({errorFound: false})
  return {
    errStatus: false,
    errValue: ''
  }
}

export function validateNumberField({fieldName, value, length}) {
  //console.log("value", value.length, length)
  if (!value.length) {
    //this.setState({errorFound: true})
    //console.log("if")
    return {
      errStatus: true,
      errValue: `${fieldName} is required`
    }
  } else if (isNaN(value) || (value.length) !== (length)) {
    //this.setState({errorFound: true})
    //console.log("else", isNaN(value), parseInt(value.length) !== parseInt(length))
    return {
      errStatus: true,
      errValue: `${fieldName} is invalid`
    }
  }
  //this.setState({errorFound: false})
  return {
    errStatus: false,
    errValue: ''
  }
}
