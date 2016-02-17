import React, { Component } from 'react';
import Header from './Header.jsx';
import Body from './Body.jsx';
// import Footer from './Footer.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
        {/* <Footer /> */}
      </div>
    );
  }
}
