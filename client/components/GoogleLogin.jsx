// client/components/GoogleLogin.jsx
/* global gapi */

import React, { Component, PropTypes } from 'react';
import { googleSDK } from '../utilities/sdk';

export default class GoogleLogin extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    googleSDK();
  }
  handleClick() {
    const auth2 = gapi.auth2.getAuthInstance();
    if (!auth2.isSignedIn.get()) {
      auth2.signIn()
      .then(user => {
        this.props.onLogin(user.getAuthResponse());
      }, () => {
        // sign in failed
      });
    } else {
      const googleUser = auth2.currentUser.get();
      this.props.onLogin(googleUser.getAuthResponse());
    }
  }
  render() {
    return (
      <button className="btn btn-block btn-lg btn-social btn-google" onClick={this.handleClick}>
        <span className="fa fa-google"></span> Sign in with Google
      </button>
    );
  }
}
GoogleLogin.propTypes = {
  onLogin: PropTypes.func,
};
