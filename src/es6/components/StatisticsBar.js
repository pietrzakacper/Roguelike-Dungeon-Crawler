import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

@connect( store => ( {
	playerHealth: store.playerHealth,
	playerWeapon: store.currentWeapon.name,
	playerLevel: store.playerLevel,
	enemiesLeft: store.enemies.length,
	maxHealth: store.maxHealth,
	isGameEnd: store.isGameEnd
} ) )
class StatisticsBar  extends React.Component{
	render(){
		if ( this.props.isGameEnd === true ){
			return ( <a className='play-again' onClick={() => location.reload()}>Press this link to play again!</a> );
		}
		return (
  <Row className='statistics-bar'>
    <Col xs={3} className='stat'><span className='stat-label'>Health:</span><span className='stat-value'>{`${this.props.playerHealth} / ${this.props.maxHealth}`}</span></Col>
    <Col xs={3} className='stat'><span className='stat-label'>Weapon:</span><span className='stat-value'>{this.props.playerWeapon}</span></Col>
    <Col xs={3} className='stat'><span className='stat-label'>Level:</span><span className='stat-value'>{this.props.playerLevel}</span></Col>
    <Col xs={3} className='stat'><span className='stat-label'>Enemies Left:</span><span className='stat-value'>{this.props.enemiesLeft}</span></Col>
  </Row>
		);
	}
}
StatisticsBar.defaultProps = {
	playerHealth: 0,
	playerWeapon: 'Not Set',
	playerLevel: 0,
	enemiesLeft: 0,
	maxHealth: 0
};

StatisticsBar.propTypes = {
	playerHealth: React.PropTypes.number.isRequired,
	playerWeapon: React.PropTypes.string.isRequired,
	playerLevel: React.PropTypes.number.isRequired,
	enemiesLeft: React.PropTypes.number.isRequired,
	maxHealth: React.PropTypes.number.isRequired,
	isGameEnd: React.PropTypes.bool
};

export default StatisticsBar;
