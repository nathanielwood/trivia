// client/components/Header.jsx

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

const Header = (props) => {
  let userArea;
  if (props.user.id) {
    userArea = () => (
      <Nav pullRight>
        <NavDropdown title={
            <span>
              <i className="fa fa-user"></i>&nbsp;&nbsp;{props.user.username}
            </span>
          } id="user-nav-dropdown"
        >
          <LinkContainer to={{ pathname: '/logout' }}>
            <NavItem>Logout</NavItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    );
  } else {
    userArea = () => (
      <Nav pullRight>
        <LinkContainer to={{ pathname: '/login' }}>
          <NavItem>Login</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/register' }}>
          <NavItem>Register</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
  return (
    <header>
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Trivia Station</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{ pathname: '/game' }}>
              <NavItem>Game</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/question' }}>
              <NavItem>Database</NavItem>
            </LinkContainer>
          </Nav>
          {userArea()}
        </Navbar.Collapse>
      </Navbar>
      <div style={{ minHeight: '50px' }}></div>
    </header>
  );
};
Header.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Header);
