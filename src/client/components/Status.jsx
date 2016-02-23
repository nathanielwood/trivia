import React, { Component } from 'react';

export default class Status extends Component {
  render() {
    let status = '';
    let button = '';
    if (this.props.visible) {
      if (this.props.correct) {
        status = <h3>Correct!</h3>;
      } else {
        status = <h3>Incorrect</h3>;
      }
      button = <button onClick={this.props.onClick}>Next</button>;
    }
    return (
      <div>
        {status}
        {button}
      </div>
    );
  }
}
Status.propTypes = {
  visible: React.PropTypes.bool,
  correct: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
