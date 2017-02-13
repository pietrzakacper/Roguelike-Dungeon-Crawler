import React from 'react';
import ReactDOM from 'react-dom';

import Bootstrap from 'bootstrap-without-jquery'; // eslint-disable-line no-unused-vars

import RoguelikeDungeonCrawler from './components';

const targetNode =  document.getElementById( 'app' );

ReactDOM.render( <RoguelikeDungeonCrawler />, targetNode );
