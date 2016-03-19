// client/components/Points.jsx

import React, { PropTypes } from 'react';

const Points = (props) => (
  <h3>Points: {props.points}</h3>
);
Points.propTypes = {
  points: PropTypes.number,
};

export default Points;
