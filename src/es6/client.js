import React from 'react';
import ReactDOM from 'react-dom';

import Bootstrap from 'bootstrap-without-jquery'; // eslint-disable-line no-unused-vars

import RoguelikeDungeonCrawler from './components';

import { Provider } from 'react-redux';
import store from './store';

const targetNode =  document.getElementById( 'app' );

ReactDOM.render( <Provider store={store}><RoguelikeDungeonCrawler /></Provider>, targetNode );
