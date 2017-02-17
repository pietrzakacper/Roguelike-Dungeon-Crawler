import React from 'react';
import { connect } from 'react-redux';
import { tileIdToClassName } from '../utils/boardUtils';

@connect( store => ( {
	board: store.board,
	viewBounds: store.viewBounds,
	playerPosition: store.playerPosition
} ) )
export default class Board extends React.Component{
	constructor( props ){
		super( props );
		this.oldPlayerPosition = Object.assign( {}, props.playerPosition );
	}
	getBoard(){
		const boardToRender = [];

		this.props.board[ this.oldPlayerPosition.y ][ this.oldPlayerPosition.x ] = 0;
		this.props.board[ this.props.playerPosition.y ][ this.props.playerPosition.x ] = 2;
		this.oldPlayerPosition = Object.assign( {}, this.props.playerPosition );
		for ( let i = this.props.viewBounds.top; i < this.props.viewBounds.top + this.props.viewBounds.height; i++ ){
			const rowToRender = [];
			for ( let j = this.props.viewBounds.left; j < this.props.viewBounds.left + this.props.viewBounds.width; j++ ){
				rowToRender.push( <span key={j} className={`tile ${tileIdToClassName( this.props.board[ i ][ j ] )}`} /> );
			}
			boardToRender.push( <span key={i} className='tile-row'>{rowToRender}</span> );
		}

		return boardToRender;
	}
	render(){
		return ( <div className='board'>{this.getBoard()}</div> );
	}
}

// TODO isRequired
Board.propTypes = {
	board: React.PropTypes.array,
	viewBounds: React.PropTypes.object,
	playerPosition: React.PropTypes.object
};
