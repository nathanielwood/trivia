import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { newGame } from '../actions';

class Start extends Component {
  componentWillMount() {
    if (this.props.game._id) {
      browserHistory.push(`/game/${this.props.game._id}`);
    } else {
      this.props.onNewGame();
    }
  }
  render() {
    return <h2>Loading...</h2>;
  }
}

Start.propTypes = {
  onNewGame: React.PropTypes.func,
  game: React.PropTypes.object,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

const mapDispatchToProps = (dispatch) => ({
  onNewGame: () => {
    dispatch(newGame());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
