import { generateDungeon } from './utils/dungeonUtils';
import { getViewBounds } from './utils/boardUtils';
import { WINDOW_RESIZE, PLAYER_MOVEMENT } from './actions/actionTypes';

const areTilesEqual = ( tile1, tile2 ) => tile1.x === tile2.x && tile1.y === tile2.y;

const defaultState = ( () => {
	const dungeon = generateDungeon();

	const playerPosition = dungeon.floorTiles[ Math.floor( Math.random() * dungeon.floorTiles.length ) ];
	dungeon.board[ playerPosition.y ][ playerPosition.x ] = 2;

	const enemiesNumber = 10 + Math.floor( ( Math.random() * 11 ) );
	const enemies = [];
	for ( let i = 0; i < enemiesNumber; i++ ){
		const enemyPosition = dungeon.floorTiles[ Math.floor( Math.random() * dungeon.floorTiles.length ) ];
		if ( [ ...enemies, playerPosition ].every( occupiedTile => !areTilesEqual( occupiedTile, enemyPosition ) ) ){
			enemies.push( enemyPosition );
			dungeon.board[ enemyPosition.y ][ enemyPosition.x ] = 3;
		}
	}
  // TODO place enemies, player etc.
	const width = document.getElementById( 'app' ).clientWidth;
	const height = window.innerHeight - 200;

	const viewBounds = getViewBounds( playerPosition, dungeon.board, width, height  );

	return { board: dungeon.board, numberOfEnemies: 0, viewBounds, playerPosition, width, height };
} )();

const getNewPlayerPosition = ( oldPosition, board, direction ) => {
	const newPlayerPosition = Object.assign( {}, oldPosition );
	switch ( direction ){
	case 'UP':
		newPlayerPosition.y = ( newPlayerPosition.y !== 0 ) ? newPlayerPosition.y - 1 : 0;
		break;
	case 'DOWN':
		newPlayerPosition.y = ( newPlayerPosition.y !== board.length - 1 ) ? newPlayerPosition.y + 1 : newPlayerPosition.y;
		break;
	case 'LEFT':
		newPlayerPosition.x = ( newPlayerPosition.x !== 0 ) ? newPlayerPosition.x - 1 : 0;
		break;
	case 'RIGHT':
		newPlayerPosition.x = ( newPlayerPosition.x !== board[ 0 ].length ) ? newPlayerPosition.x + 1 : newPlayerPosition.x;
	}
	return ( board[ newPlayerPosition.y ][ newPlayerPosition.x ] === 0 ) ? newPlayerPosition : oldPosition;
};

const reducer = ( state = defaultState, action ) => {
	switch ( action.type ){
	case WINDOW_RESIZE:
		return Object.assign( {}, state, { viewBounds: getViewBounds( state.playerPosition, state.board, action.width, action.height ), width: action.width, height: action.height } );
	case PLAYER_MOVEMENT: {
		const newPlayerPosition = getNewPlayerPosition( state.playerPosition, state.board, action.direction );
		return Object.assign( {}, state, { viewBounds: getViewBounds( newPlayerPosition, state.board, state.width, state.height ), playerPosition: newPlayerPosition } );
	}
	default:
		return state;
	}
};

export default reducer;
