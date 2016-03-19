// client/components/App.jsx

import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import Header from './Header';
import { getUser } from '../actions';
import RegisterUsername from './RegisterUsername';
// import Footer from './Footer.jsx';

class App extends Component {
  constructor() {
    super();
    this.body = this.body.bind(this);
  }
  componentWillMount() {
    const token = cookie.load('auth');
    if (token) this.props.onToken(token);
  }
  body() {
    if (this.props.user.id && !this.props.user.username) {
      return <RegisterUsername />;
    }
    return this.props.children;
  }
  render() {
    if (this.props.user.isFetching) {
      return (
        <h2>Loading</h2>
      );
    }
    return (
      <div>
        <Header />
        <div className="container" style={{ marginTop: '40px' }}>
          {this.body()}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.node,
  onToken: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  onToken: (token) => {
    dispatch(getUser(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
