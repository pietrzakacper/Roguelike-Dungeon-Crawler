import React from 'react';

import Header from './Header';
import StatisticsBar from './StatisticsBar';
import Board from './Board';

export default class RoguelikeDungeonCrawler extends React.Component{
	constructor( props ){
		super( props );
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
