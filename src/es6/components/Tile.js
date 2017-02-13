import React from 'react';

const Tile = props => (
  <div className={`tile ${props.type}`} />
);

Tile.propTypes = {
	type: React.PropTypes.string.isRequired
};

export default Tile;
