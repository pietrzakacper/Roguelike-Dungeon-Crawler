import React from 'react';
import { connect } from 'react-redux';
import { tileIdToClassName } from '../utils/boardUtils';

@connect( store => ( {
	board: store.board.board,
	viewBounds: store.board.viewBounds
} ) )
export default class Board extends React.Component{
	constructor( props ){
		super( props );
	}
	getBoard(){
		const boardToRender = [];

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
	viewBounds: React.PropTypes.object
};
