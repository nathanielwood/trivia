import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>What would you like to do?</p>
        <ul>
          <li><Link to="/about">View About Page</Link></li>
          <li><Link to="/game">Play Trivia Game</Link></li>
        </ul>
      </div>
    );
  }
}
