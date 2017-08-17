import React, { Component } from 'react';
import AuthAdapter from './AuthAdapter';
import { Router, Route, Redirect } from 'react-router-dom';
import Nav from './Components/Nav';
import AppContainer from './Containers/AppContainer';
import Landing from './Components/Landing';
import Authorize from './Authorize';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PropTypes from 'prop-types';
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
    // debugger
    AuthAdapter.login(loginParams)
    .then(res => {
      console.log(res)
      if (res.error) {
        this.setState({
          auth: {
            errors: ['User Email Already Exists']
          }
        })
      } else {
        localStorage.setItem('jwt', res.jwt)
        this.setState({
          auth: {
            isLoggedIn: true,
            user: res.email,
            errors: []
          }
        })
      }
    })
  }


  onSignup = (signUpParams) => {
    // debugger
    console.log('in signup in app compnenet')
    AuthAdapter.signUp(signUpParams)
    .then(res => {
      if (res.error) {
        this.setState({
          auth: {
            errors: res.error
          }
        })
      } else {
        localStorage.setItem('jwt', res.jwt)
        this.setState({
          auth: {
            isLoggedIn: true,
            user: res.email,
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

{/* <Route path='/signup' render={() => {
  if (props.isFirstTime) {
    return <Redirect to='/interests'/>
  } else if (props.isLoggedIn) {
    return <Redirect to='/dashboard'/>
  } else {
    return <Redirect to='/signup'/>
  }
}} /> */}
{/* <RouterContainer {...this.state.auth} submittedInterests={this.state.submittedInterests} onLogin={this.onLogin} onLogout={this.onLogout} onSignup={this.onSignup} /> */}
export default App;
