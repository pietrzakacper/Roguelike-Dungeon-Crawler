import React from 'react';

import Header from './Header';
import StatisticsBar from './StatisticsBar';
import Board from './Board';

import { connect } from 'react-redux';
import { windowResize } from '../actions/boardActions';
import { move } from '../actions/playerActions';

@connect( () => ( {} ), dispatch => ( {
	onResize: () => dispatch( windowResize() ),
	onKeyDown: ( e ) => {
		switch ( e.key ){
		case 'ArrowUp':
			return dispatch( move( 'UP' ) );
		case 'ArrowDown':
			return dispatch( move( 'DOWN' ) );
		case 'ArrowLeft':
			return dispatch( move( 'LEFT' ) );
		case 'ArrowRight':
			return dispatch( move( 'RIGHT' ) );
		}
	}
} ) )

export default class RoguelikeDungeonCrawler extends React.Component{
	constructor( props ){
		super( props );
	}
	componentDidMount(){
		window.addEventListener( 'resize', this.props.onResize );
		window.addEventListener( 'keydown', this.props.onKeyDown );
	}
	componentWillUnmount(){
		window.removeEventListener( 'resize', this.props.onResize );
		window.removeEventListener( 'keydown', this.props.onKeyDown );
	}
	render(){
		return (
  <div>
    <Header />
    <StatisticsBar />
    <Board />
  </div>
		);
	}
}

RoguelikeDungeonCrawler.propTypes = {
	onResize: React.PropTypes.func,
	onKeyDown: React.PropTypes.func
};
