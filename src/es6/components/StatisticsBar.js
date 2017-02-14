import React from 'react';

import { Row, Col } from 'react-bootstrap';

const StatisticsBar = ( props ) => (
  <Row className='statistics-bar'>
    <Col md={3} className='stat'><span className='stat-label'>Health:</span><span className='stat-value'>{props.playerHealth}</span></Col>
    <Col md={3} className='stat'><span className='stat-label'>Weapon:</span><span className='stat-value'>{props.playerWeapon}</span></Col>
    <Col md={3} className='stat'><span className='stat-label'>Level:</span><span className='stat-value'>{props.playerLevel}</span></Col>
    <Col md={3} className='stat'><span className='stat-label'>Enemies Left:</span><span className='stat-value'>{props.enemiesLeft}</span></Col>
  </Row>
 );

StatisticsBar.defaultProps = {
	playerHealth: 0,
	playerWeapon: 'Not Set',
	playerLevel: 0,
	enemiesLeft: 0
};

// TODO set isRequired
StatisticsBar.propTypes = {
	playerHealth: React.PropTypes.number,
	playerWeapon: React.PropTypes.string,
	playerLevel: React.PropTypes.number,
	enemiesLeft: React.PropTypes.number
};

export default StatisticsBar;
