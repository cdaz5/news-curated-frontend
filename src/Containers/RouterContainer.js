// import React, { Component } from 'react'
// import AuthAdapter from '../AuthAdapter'
// import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom'
// import Nav from '../Components/Nav'
// import AppContainer from '../Containers/AppContainer'
// import Landing from '../Components/Landing'
// import Authorize from '../Authorize'
// import Signup from '../Components/Signup'
// import Login from '../Components/Login'
// import PropTypes from 'prop-types'
// import Interests from '../Components/Interests'
//
// const RouterContainer = (props) => {
//   console.log(props.isFirstTime)
//     return (
//       <div>
//         <Nav />
//         <Route exact path='/' render={() => props.isLoggedIn ? <Redirect to='/dashboard'/> : <Landing/> } />
//         <Route path='/interests' component={Authorize(Interests)} onInterestSubmit={props.onInterestSubmit} />
//         <Route path='/dashboard' component={Authorize(AppContainer)} />
//         <Route path='/signup' render={() => {
//           if (props.isFirstTime) {
//             return <Redirect to='/interests'/>
//           } else if (props.isLoggedIn) {
//             return <Redirect to='/dashboard'/>
//           } else {
//             return <Redirect to='/signup'/>
//           }
//         }} />
//         <Route path='/logout' render={() => {
//           props.onLogout()
//           return (<Redirect to='/' />)
//         }} />
//       </div>
//     )
// }
//
// export default RouterContainer
