import React from 'react';
import { tileIdToClassName } from '../utils/boardUtils';
export default class Board extends React.Component{
	constructor( props ){
		super( props );
	}
	getBoard(){
		const boardToRender = [];

		for ( const rowIndex in this.props.board ){
			const rowToRender = [];
			for ( const tileIndex in this.props.board[ rowIndex ] ){
				rowToRender.push( <span key={tileIndex} className={`tile ${tileIdToClassName( this.props.board[ rowIndex ][ tileIndex ] )}`} /> );
			}
			boardToRender.push( <span key={rowIndex} className='tile-row'>{rowToRender}</span> );
		}

		return boardToRender;
	}
	render(){
		return ( <div className='board'>{this.getBoard()}</div> );
	}
}

Board.defaultProps = {
	board: [ [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0 ] ]
};

// TODO isRequired
Board.propTypes = {
	board: React.PropTypes.array
};
