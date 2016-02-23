import React, { Component } from 'react';
import { GameContainer } from '../containers/GameContainer';

export default class Body extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: '40px' }}>
        <GameContainer />
      </div>
    );
  }
}
