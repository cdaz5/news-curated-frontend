import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  render() {
    return (
      <Menu stackable borderless inverted className='nav'>
        <Menu.Item>
          <div className="navheader neon">News, Curated</div>
        </Menu.Item>
        <Menu.Item position="right">
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
        </Menu.Item>
      </Menu>
    )
  }
}
