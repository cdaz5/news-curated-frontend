
const BASE_URL = process.env.REACT_APP_API

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(resp => resp.json())
  }

  static signUp (signUpParams) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signUpParams)
    }).then(resp => resp.json())
  }

  static currentUser () {
    return fetch(`${BASE_URL}/me`, {
      headers: headers()
    }).then(resp => resp.json())
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
