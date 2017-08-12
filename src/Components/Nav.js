import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import logo from '../Images/logo.png'

export default class Nav extends Component {

  render() {
    return (
      <Menu stackable borderless inverted className='nav'>
        <Menu.Item>
          <iframe src="https://giphy.com/embed/zfBfXWozB2WKk" width='50' height='50' frameBorder='0' ></iframe>
        </Menu.Item>
        <Menu.Item header className="navheader" position='right'>
          <div className="navheader">News, Curated</div>
        </Menu.Item>
        <Menu.Item position="right">
        <NavLink
        to="/logout"
        >Logout</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}
