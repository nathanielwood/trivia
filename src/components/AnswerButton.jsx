import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class AnswerButton extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.styleButton = this.styleButton.bind(this);
  }
  onClick() {
    this.props.selectAnswer(this.props.id);
  }
  styleButton() {
    if (this.props.disabled && this.props.correct) {
      return 'success';
    }
    return 'default';
  }
  render() {
    return (
      <Button
        onClick={this.onClick}
        bsSize="large"
        bsStyle={this.styleButton()}
        disabled={this.props.disabled}
        block
      >
        {this.props.text}
      </Button>
    );
  }
}
AnswerButton.propTypes = {
  selectAnswer: React.PropTypes.func,
  text: React.PropTypes.string,
  id: React.PropTypes.number,
  disabled: React.PropTypes.bool,
  correct: React.PropTypes.bool,
};
