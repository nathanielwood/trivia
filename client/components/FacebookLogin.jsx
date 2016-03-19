// client/components/FacebookLogin.jsx
/* global FB */

import React, { Component, PropTypes } from 'react';
import { facebookSDK } from '../utilities/sdk';

export default class FacebookLogin extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
  }
  componentDidMount() {
    facebookSDK();
  }
  checkLoginState(cb) {
    FB.getLoginStatus((response) => {
      cb(response);
    });
  }
  handleClick() {
    this.checkLoginState((response) => {
      if (response.status !== 'connected') {
        FB.login((response2) => {
          if (response2.authResponse) {
            this.props.onLogin(response2);
          }
          // else user cancelled login
        });
      } else {
        this.props.onLogin(response);
      }
    });
  }
  render() {
    return (
      <button className="btn btn-block btn-lg btn-social btn-facebook" onClick={this.handleClick}>
        <span className="fa fa-facebook"></span> Sign in with Facebook
      </button>
    );
  }
}
FacebookLogin.propTypes = {
  onLogin: PropTypes.func,
};
