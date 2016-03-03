import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Trivia Game</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div style={{ minHeight: '50px' }}></div>
      </header>
    );
  }
}
