import { generateDungeon } from '../utils/dungeonUtils';
import { getViewBounds } from '../utils/boardUtils';
import { WINDOW_RESIZE } from '../actions/actionTypes';

const playerPosition = { x: 40, y: 40 };

const defaultBoardState = ( () => {
	const board = generateDungeon();
	board[ playerPosition.y ][ playerPosition.x ] = 2;
  // TODO place enemies, player etc.
	const width = document.getElementById( 'app' ).clientWidth;
	const height = window.innerHeight - 200;

	const viewBounds = getViewBounds( playerPosition, board, width, height  );

	return { board, numberOfEnemies: 0, viewBounds };
} )();

const boardReducer = ( state = defaultBoardState, action ) => {
	switch ( action.type ){
	case WINDOW_RESIZE:
		return Object.assign( {}, state, { viewBounds: getViewBounds( playerPosition, state.board, action.width, action.height ) } );
	default:
		return state;
	}
};

export default boardReducer;
