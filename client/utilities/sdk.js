// client/utilities/sdk.js
/* global FB gapi */

const injectScript = (d, s, id, src) => {
  if (d.getElementById(id)) { return; }
  const fjs = d.getElementsByTagName(s)[0];
  const js = d.createElement(s);
  js.id = id;
  js.src = src;
  fjs.parentNode.insertBefore(js, fjs);
};

export const facebookSDK = (cb) => {
  const options = {
    appId: '226818887672810', // Facebook application ID
    version: 'v2.5', // Graph API version to use
    status: true, // retrieves status which will be cached for .getLoginStatus()
    cookie: true, // creates cookie for session
    xfbml: false, // parses XFBML tags
  };
  const sdkURL = '//connect.facebook.net/en_US/sdk.js';

  window.fbAsyncInit = function init() {
    FB.init(options);
    if (cb) cb();
  };

  injectScript(document, 'script', 'facebook-jssdk', sdkURL);
};

export const googleSDK = (cb) => {
  const options = {
    client_id: '886234065999-13hov7knkap2otp8tipgjh2bnrrq88qq.apps.googleusercontent.com',
  };

  gapi.load('auth2', () => {
    const auth2 = gapi.auth2.init(options);
    if (cb) cb(auth2);
  });
};
