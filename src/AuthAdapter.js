const baseUrl = process.env.REACT_API

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(process.env.REACT_API + '/login', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(resp => resp.json())
  }

  static signUp (signUpParams) {
    return fetch(`${process.env.REACT_API}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signUpParams)
    }).then(resp => resp.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}/me`, {
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
