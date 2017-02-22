import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

@connect( store => ( {
	playerHealth: store.playerHealth,
	playerWeapon: store.playerWeapon,
	playerLevel: store.playerLevel,
	enemiesLeft: store.enemiesLeft
} ) )
class StatisticsBar  extends React.Component{
	render(){
		return (
  <Row className='statistics-bar'>
    <Col md={3} className='stat'><span className='stat-label'>Health:</span><span className='stat-value'>{this.props.playerHealth}</span></Col>
    <Col md={3} className='stat'><span className='stat-label'>Weapon:</span><span className='stat-value'>{this.props.playerWeapon}</span></Col>
    <Col md={3} className='stat'><span className='stat-label'>Level:</span><span className='stat-value'>{this.props.playerLevel}</span></Col>
    <Col md={3} className='stat'><span className='stat-label'>Enemies Left:</span><span className='stat-value'>{this.props.enemiesLeft}</span></Col>
  </Row>
		);
	}
}
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
