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
	default:
		return 'not-defined';
	}
};
