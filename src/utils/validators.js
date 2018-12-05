export function validateOrganizationName(name) {
    if (!name.length) {
      return {
        status: true,
        value: 'Name is required'
      }
    }
    return {
      status: false,
      value: ''
    }
}