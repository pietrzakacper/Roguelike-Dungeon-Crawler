import React from 'react';
import { connect } from 'react-redux';
import { tileIdToClassName } from '../utils/boardUtils';

@connect( store => ( {
	board: store.board,
	viewBounds: store.viewBounds,
	playerPosition: store.playerPosition,
	isGameEnd: store.isGameEnd,
	playerWon: store.playerWon
} ) )
export default class Board extends React.Component{
	constructor( props ){
		super( props );
		this.oldPlayerPosition = Object.assign( {}, props.playerPosition );
		this.sightRange = 9.5;
	}
	getBoard(){
		if ( this.props.isGameEnd === true ){
			if ( this.props.playerWon === true ){
				return ( <h2 className='banner won'>YOU WON!</h2> );
			} else {
				return ( <h2 className='banner lost'>YOU DIED!</h2> );
			}
		}
		const boardToRender = [];

		this.props.board[ this.oldPlayerPosition.y ][ this.oldPlayerPosition.x ] = 0;
		this.props.board[ this.props.playerPosition.y ][ this.props.playerPosition.x ] = 2;

		this.oldPlayerPosition = Object.assign( {}, this.props.playerPosition );
		for ( let i = this.props.viewBounds.top; i < this.props.viewBounds.top + this.props.viewBounds.height; i++ ){
			const rowToRender = [];
			for ( let j = this.props.viewBounds.left; j < this.props.viewBounds.left + this.props.viewBounds.width; j++ ){
				rowToRender.push( <span key={j} className={
					`tile ${tileIdToClassName( this.props.board[ i ][ j ] )} ${ this.isInSightRange( j, i, this.props.playerPosition.x, this.props.playerPosition.y ) ? '' : 'shadow' } `
				} /> );
			}
			boardToRender.push( <span key={i} className='tile-row'>{rowToRender}</span> );
		}

		return boardToRender;
	}
	isInSightRange( tileX, tileY, playerX, playerY ){
		return Math.sqrt( Math.pow( playerX - tileX, 2 ) + Math.pow( playerY - tileY, 2 ) ) < this.sightRange;
	}
	render(){
		return ( <div className='board'>{this.getBoard()}</div> );
	}
}

Board.propTypes = {
	board: React.PropTypes.array,
	viewBounds: React.PropTypes.object,
	playerPosition: React.PropTypes.object,
	isGameEnd: React.PropTypes.bool,
	playerWon: React.PropTypes.bool
};
