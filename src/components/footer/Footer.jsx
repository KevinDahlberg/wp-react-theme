import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

export default class Footer extends Component {
  render () {
    return (
      <div className="footer">
        <Navbar inverse>
          <Nav>
            <NavItem>Copyright 2017 One Point Oh Solutions</NavItem>
          </Nav>
        </Navbar>
      </div>
    )
  }
}
