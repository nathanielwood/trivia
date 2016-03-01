import React, { Component } from 'react';

export default class Points extends Component {
  render() {
    return (
      <h3>Points: {this.props.points}</h3>
    );
  }
}
Points.propTypes = {
  points: React.PropTypes.number,
};
