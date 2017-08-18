import React, { Component } from 'react';
import AuthAdapter from './AuthAdapter';
import { Router, Route, Redirect } from 'react-router-dom';
import Nav from './Components/Nav';
import AppContainer from './Containers/AppContainer';
import Landing from './Components/Landing';
import Authorize from './Authorize';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Interests from './Components/Interests'
import history from './history'


class App extends Component {

  state = {
    auth: {
      isLoggedIn: false,
      isFirstTime: false,
      user: '',
      errors: []
    },
    submittedInterests: false,
  }

  onInterestSubmit = () => {
    this.setState({
      submittedInterests: true
    })
  }

  onLogin = (loginParams) => {
    this.setState({
      auth: {
        errors: []
      }
    })
    // debugger
    AuthAdapter.login(loginParams)
    .then(resp => {
      console.log(resp)
      if (resp.error) {
        this.setState({
          auth: {
            errors: [...resp.error]
          }
        })
      } else {
        localStorage.setItem('jwt', resp.jwt)
        this.setState({
          auth: {
            isLoggedIn: true,
            user: resp.email,
            errors: []
          }
        })
      }
    })
  }


  onSignup = (signUpParams) => {
    // this.setState({
    //   auth: {
    //     errors: []
    //   }
    // })
    // debugger
    console.log('in signup in app compnenet')
    AuthAdapter.signUp(signUpParams)
    .then(resp => {
      if (resp.error) {
        this.setState({
          auth: {
            errors: [...resp.error]
          }
        })
      } else {
        localStorage.setItem('jwt', resp.jwt)
        this.setState({
          auth: {
            isLoggedIn: true,
            user: resp.email,
            isFirstTime: true,
            errors: []
          }
        })
        console.log('after auth fetch')
        // debugger
        history.push('/interests')
      }
    })
  }

  onLogout = () => {
    localStorage.clear()
    this.setState({
      auth: {
        isLoggedIn: false,
        user: '',
        isFirstTime: false
      }
    })
  }


  render() {
    return (
      <Router history={history}>
        <div>
          <Nav />
          <Route exact path='/' render={() => this.state.auth.isLoggedIn ? <Redirect to='/dashboard'/> : <Landing/> } />
          <Route path='/interests' component={Authorize(Interests)}/>
          <Route path='/dashboard' component={Authorize(AppContainer)} />
          <Route path='/signup' render={() => <Signup onSignup={this.onSignup} errors={this.state.auth.errors}/>} />
          <Route path='/login' render={() => this.state.auth.isLoggedIn ? <Redirect to='/dashboard'/> : <Login onLogin={this.onLogin.bind(this)} errors={this.state.auth.errors}/>} />

          <Route path='/logout' render={() => {
            this.onLogout()
            return (<Redirect to='/' />)
          }} />

        </div>
      </Router>
    );
  }
}

export default App;
