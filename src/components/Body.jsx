import React, { Component } from 'react';
import Game from './Game.jsx';

export default class Body extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: '40px' }}>
        <Game />
      </div>
    );
  }
}
