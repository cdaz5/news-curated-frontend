import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  render() {
    return (
      <Menu stackable borderless inverted className='nav'>
        <Menu.Item>
          <NavLink to='/' className="navheader neon">News, Curated</NavLink>
        </Menu.Item>
        <Menu.Item position="right">
          { this.props.isLoggedIn ?
          <span>
            <h2>Hi, {this.props.username}</h2>
            <NavLink
              className='navLink'
              to="/interests"
              >Edit Interests |
            </NavLink>
            <NavLink
              className='navLink'
              to="/logout"
              >&nbsp;Logout
            </NavLink>
          </span>
          : null}

        </Menu.Item>
      </Menu>
    )
  }
}
