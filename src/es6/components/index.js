import React from 'react';

import Header from './Header';
import StatisticsBar from './StatisticsBar';
import Board from './Board';

import { connect } from 'react-redux';
import { windowResize } from '../actions/boardActions';

@connect( () => ( {} ), dispatch => ( {
	onResize: () => dispatch( windowResize() )
} ) )
export default class RoguelikeDungeonCrawler extends React.Component{
	constructor( props ){
		super( props );
	}
	componentDidMount(){
		window.addEventListener( 'resize', this.props.onResize );
	}
	componentWillUnmount(){
		window.removeEventListener( 'resize', this.props.onResize );
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
	onResize: React.PropTypes.func
};
