const TILE_SIZE = 24;

export const tileIdToClassName = ( id ) => {
	switch ( id ) {
	case 0:
		return 'floor';
	case 1:
		return 'wall';
	case 2:
		return 'player';
	case 3:
		return 'enemy';
	case 4:
		return 'health-item';
	case 5:
		return 'weapon';
	case 6:
		return 'boss';
	default:
		return 'not-defined';
	}
};

export const getViewBounds = ( playerPosition, board, width, height ) => {
	const viewWidth = Math.floor( width / TILE_SIZE );
	const viewHeight = Math.floor( height / TILE_SIZE );

	let beginX = ( playerPosition.x - Math.floor( viewWidth / 2 ) < 0 ) ? 0 : playerPosition.x - Math.floor( viewWidth / 2 );
	let beginY = ( playerPosition.y - Math.floor( viewHeight / 2 ) < 0 ) ? 0 : playerPosition.y - Math.floor( viewHeight / 2 );

	if ( beginX + viewWidth > board[ 0 ].length ){
		beginX = board[ 0 ].length - viewWidth;
	}
	if ( beginY + viewHeight > board.length ){
		beginY = board.length - viewHeight;
	}

	return { left: beginX, top: beginY, width: viewWidth, height: viewHeight };
};
