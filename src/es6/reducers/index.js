import { combineReducers } from 'redux';

import playerReducer from './playerReducer';
import boardReducer from './boardReducer';

export default combineReducers( { player: playerReducer, board: boardReducer } );
