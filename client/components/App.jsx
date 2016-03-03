import React, { Component } from 'react';
import Header from './Header';
// import Footer from './Footer.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ marginTop: '40px' }}>
          {this.props.children}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node,
};
