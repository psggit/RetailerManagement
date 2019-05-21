export function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles
  console.log(data)
  // const hasuraRoles = ["user", "support_person", "excise", "support_admin"]
  const rolesMap = {
    admin: 8,
    opdataadmin: 7,
    opdataentry: 6,
    support_admin: 5,
    support_master: 4,
    promoter: 3,
    user: 1
  }
  let maxRole = rolesMap["user"]
  let xHasuraRole = "user"
  for (let i = 0; i < hasuraRoles.length; i++) {
    if (maxRole <= rolesMap[hasuraRoles[i]]) {
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}

// export function getAuthToken(data) {
//   const token = data.auth_token
//   return token
// }

export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}

export function createSession(data) {
  localStorage.setItem('x-hasura-role', getHasuraRole(data))
  localStorage.setItem('hasura-id', getHasuraId(data))
}
