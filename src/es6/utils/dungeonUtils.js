const MAX_NUMBER_OF_ROOMS = 10;
const MIN_NUMBER_OF_ROOMS = 3;
const MIN_ROOM_SIZE = 4;
const MAX_ROOM_SIZE = 8;
const DUNGEON_WIDTH = 80;
const DUNGEON_HEIGHT = 80;

const getDungeonFilledWithWallTiles = () => {
	const dungeon = [];

	while ( dungeon.length < DUNGEON_HEIGHT ){
		const dungeonRow = [];

		while ( dungeonRow.length < DUNGEON_WIDTH ){
			dungeonRow.push( 1 );
		}

		dungeon.push( dungeonRow );
	}
	return dungeon;
};

class Room{
	constructor( x, y, width, height ){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.center = { x: Math.floor( x + width / 2 ), y: Math.floor(  y + height / 2  ) };
	}
	intersects( room ){
		return this.x <= room.x + room.width && this.x + this.width >= room.x && this.y <= room.y + room.heght && this.y + this.height >= room.y;
	}
}

const integerInRange = ( min, max ) => Math.floor( Math.random() * ( max - min + 1 ) ) + min;

const createRoomInDungeon = ( room, dungeon ) => {
	for ( let i = room.y ; i < room.y + room.height; i++ ){
		for ( let j = room.x ; j < room.x + room.width; j++ ){
			dungeon[ i ][ j ] = 0;
		}
	}
};

const createVerticalCorridorInDungeon = ( y1, y2, x, dungeon ) => {
	for ( let i = Math.min( y1, y2 ); i < Math.max( y1, y2 ); i++ ){
		dungeon[ i ][ x ] = 0;
	}
};

const createHorizontalCorridorInDungeon = ( x1, x2, y, dungeon ) => {
	for ( let i = Math.min( x1, x2 ); i < Math.max( x1, x2 ); i++ ){
		dungeon[ y ][ i ] = 0;
	}
};

const connectRoomsWithCorridors = ( room1, room2, dungeon ) => {
	if ( Math.random > .5 ){
		createHorizontalCorridorInDungeon( room1.center.x, room2.center.x, room1.center.y, dungeon );
		createVerticalCorridorInDungeon( room1.center.y, room2.center.y, room2.center.x, dungeon );
	} else {
		createVerticalCorridorInDungeon( room1.center.y, room2.center.y, room1.center.x, dungeon );
		createHorizontalCorridorInDungeon( room1.center.x, room2.center.x, room2.center.y, dungeon );
	}
};

const placeRooms = ( dungeon ) => {
	const rooms = [];
	let numberOfTries = 0;
	while ( numberOfTries <= MAX_NUMBER_OF_ROOMS || rooms.length < MIN_NUMBER_OF_ROOMS ){
		const width = integerInRange( MIN_ROOM_SIZE, MAX_ROOM_SIZE );
		const height = integerInRange( MIN_ROOM_SIZE, MAX_ROOM_SIZE );
		const x = integerInRange( 0, DUNGEON_WIDTH - width - 1 );
		const y = integerInRange( 0, DUNGEON_HEIGHT - height - 1 );

		const newRoom = new Room( x, y, width, height );

		if ( rooms.every( room => !room.intersects( newRoom ) ) ){
			createRoomInDungeon( newRoom, dungeon );

			if ( rooms.length !== 0 ){
				connectRoomsWithCorridors( newRoom, rooms[ rooms.length - 1 ], dungeon );
			}

			rooms.push( newRoom );
		}

		numberOfTries++;
	}
};

export const generateDungeon = () => {
	const dungeon = getDungeonFilledWithWallTiles();
	placeRooms( dungeon );
	return dungeon;
};
