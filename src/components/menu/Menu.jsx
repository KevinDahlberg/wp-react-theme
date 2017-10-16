import React, { Component } from 'react'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Menu extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
              The OCD Coder
            </Navbar.Brand>
          </LinkContainer>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/home">
              <NavItem eventKey={1} href="/home">Home</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/about">
              <NavItem eventKey={2} href="/about">About</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
