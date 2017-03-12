import { generateDungeon } from './utils/dungeonUtils';
import { getViewBounds } from './utils/boardUtils';
import { WINDOW_RESIZE, PLAYER_MOVEMENT } from './actions';

const ENEMY_ATTACK = 10;
const HEAL_VALUE = 30;
let BOSS_HEALTH = 300;
const BOSS_ATTACK = 100;

const WEAPONS = [
	{ name: 'fists', attackValue: 30 },
	{ name: 'short knife', attackValue: 40 },
	{ name: 'long knife', attackValue: 50 },
	{ name: 'magic sword', attackValue: 100 },
];

const areTilesEqual = ( tile1, tile2 ) => tile1.x === tile2.x && tile1.y === tile2.y;

const placeTiles = ( dungeon, occupiedTiles, targetTileId, numberOfTargetTiles ) => {
	const tiles = [];

	for ( let i = 0; i < numberOfTargetTiles; i++ ) {
		const targetTilePosition = dungeon.floorTiles[ Math.floor( Math.random() * dungeon.floorTiles.length ) ];
		if ( [ ...occupiedTiles, ...tiles ].every( occupiedTile => !areTilesEqual( occupiedTile, targetTilePosition ) ) ) {
			tiles.push( targetTilePosition );
			dungeon.board[ targetTilePosition.y ][ targetTilePosition.x ] = targetTileId;
		}
	}

	return tiles;
};

const defaultState = ( () => {
	const dungeon = generateDungeon();

	const playerPosition = dungeon.floorTiles[ Math.floor( Math.random() * dungeon.floorTiles.length ) ];
	dungeon.board[ playerPosition.y ][ playerPosition.x ] = 2;

	const enemiesNumber = 10 + Math.floor( ( Math.random() * 11 ) );
	const enemiesTiles = placeTiles( dungeon, [ playerPosition ], 3, enemiesNumber, 10 + Math.floor( ( Math.random() * 11 ) ) );
	const enemies = enemiesTiles.map( tile => Object.assign( {}, tile, { hp: 50 + Math.random() * 30,  attack: 30 + Math.random() * 30 }  ) );
	const healthItems = placeTiles( dungeon, [ ...enemies, playerPosition ], 4, 10 + Math.floor( ( Math.random() * 10 ) ) );
	const weapons = placeTiles( dungeon, [ ...healthItems, ...enemies, playerPosition ], 5, 3 );
	const boss = placeTiles( dungeon, [ ...weapons, ...healthItems, ...enemies, playerPosition ], 6, 1 )[ 0 ];
	console.log( boss );

	const width = document.getElementById( 'app' ).clientWidth;
	const height = window.innerHeight - 200;

	const viewBounds = getViewBounds( playerPosition, dungeon.board, width, height );

	return {
		board: dungeon.board,
		numberOfEnemies: 0,
		viewBounds,
		playerPosition,
		playerLevel: 1,
		playerHealth: 100,
		weaponIndex: 0,
		currentWeapon: WEAPONS[ 0 ],
		width,
		height,
		enemies,
		healthItems,
		weapons,
		boss,
		maxHealth: 100,
		isGameEnd: false,
		playerWon: false
	};
} )();

const handleFight = ( state, enemy ) => {
	const enemies = [ ...state.enemies ];
	let index;

	for ( const enemyIndex in enemies ){
		if ( areTilesEqual( enemies[ enemyIndex ], enemy ) ){
			index = enemyIndex;
			break;
		}
	}

	enemies[ index ].hp -= state.currentWeapon.attackValue + ( ( state.playerLevel - 1 ) / 10 );
	let isGameEnd = state.isGameEnd;
	if ( state.playerHealth - ENEMY_ATTACK <= 0 ){
		isGameEnd = true;
	}

	const board = [ ...state.board ];
	let maxHealth = state.maxHealth;
	let playerLevel = state.playerLevel;
	if ( enemies[ index ].hp <= 0 ){
		board[ enemies[ index ].y  ][ enemies[ index ].x ] = 0;
		enemies.splice( index, 1 );
		playerLevel += 1;
		maxHealth = 100 + 50 * ( playerLevel - 1 );
	}

	return { isGameEnd, enemies, board, playerHealth: state.playerHealth - ENEMY_ATTACK, playerLevel, maxHealth } ;
};

function handleBossFight( state ){
	BOSS_HEALTH -= state.currentWeapon.attackValue + ( ( state.playerLevel - 1 ) / 10 );
	const newPlayerHealth = state.playerHealth - BOSS_ATTACK;

	let isGameEnd = state.isGameEnd;
	let playerWon = state.playerWon;
	if ( newPlayerHealth <= 0 ){
		isGameEnd = true;
	} else if ( BOSS_HEALTH <= 0 ) {
		isGameEnd = true;
		playerWon = true;
	}
	console.log( BOSS_HEALTH, newPlayerHealth );
	return { isGameEnd, playerWon, playerHealth: newPlayerHealth };
}

const handleHealthCollection = ( state, health ) => {
	const healthItems = [ ...state.healthItems ];
	let index;
	for ( const healthIndex in healthItems ){
		if ( areTilesEqual( healthItems[ healthIndex ], health ) ){
			index = healthIndex;
			break;
		}
	}

	const board = [ ...state.board ];
	board[ healthItems[ index ].y ][ healthItems[ index ].x ] = 0;
	healthItems.splice( index, 1 );
	const heal = HEAL_VALUE + ( state.playerLevel - 1 ) * 10;
	return { healthItems, playerHealth: state.playerHealth + heal >= state.maxHealth ? state.maxHealth :  state.playerHealth + heal };
};

const handleWeaponUpgrade = ( state, weapon ) => {
	const weapons = [ ...state.weapons ];
	let index;
	for ( const weaponIndex in weapons ){
		if ( areTilesEqual( weapons[ weaponIndex ], weapon ) ){
			index = weaponIndex;
			break;
		}
	}

	const board = [ ...state.board ];
	board[ weapons[ index ].y ][ weapons[ index ].x ] = 0;
	weapons.splice( index, 1 );

	return { weapons, board, weaponIndex: ( state.weaponIndex >= 3 ? 3 : state.weaponIndex + 1 ), currentWeapon: WEAPONS[ ( state.weaponIndex >= 3 ? 3 : state.weaponIndex + 1 ) ] };
};

const handleMovement = ( state, direction ) => {
	const oldPosition = state.playerPosition;
	const board = state.board;

	const newPlayerPosition = Object.assign( {}, oldPosition );
	switch ( direction ) {
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
	const isOnActionTile = board[ newPlayerPosition.y ][ newPlayerPosition.x ] !== 0 ;
	let aftermovementStateModification = {};
	if ( isOnActionTile ){
		switch ( board[ newPlayerPosition.y ][ newPlayerPosition.x ] ) {
		case 3:
			{
				aftermovementStateModification = handleFight( state, newPlayerPosition );
				break;
			}
		case 4:
			{
				aftermovementStateModification = handleHealthCollection( state, newPlayerPosition );
				break;
			}
		case 5:
			{
				aftermovementStateModification = handleWeaponUpgrade( state, newPlayerPosition );
				break;
			}
		case 6:
			{
				aftermovementStateModification = handleBossFight( state, newPlayerPosition );
			}
		}
	}
	const targetPosition = ( board[ newPlayerPosition.y ][ newPlayerPosition.x ] === 0 ) ? newPlayerPosition : oldPosition;

	return Object.assign( {}, state, { viewBounds: getViewBounds( newPlayerPosition, state.board, state.width, state.height ), playerPosition: targetPosition },  aftermovementStateModification );
};

const reducer = ( state = defaultState, action ) => {
	switch ( action.type ) {
	case WINDOW_RESIZE:
		return Object.assign( {}, state, { viewBounds: getViewBounds( state.playerPosition, state.board, action.width, action.height ), width: action.width, height: action.height } );
	case PLAYER_MOVEMENT:
		{
			return handleMovement( state, action.direction );
		}
	default:
		return state;
	}
};

export default reducer;
