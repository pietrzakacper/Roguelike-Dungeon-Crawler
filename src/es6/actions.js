export const PLAYER_MOVEMENT = 0;
export const WINDOW_RESIZE = 1;

export const windowResize = ( ) => {
	const width = document.getElementById( 'app' ).clientWidth;
	const height = window.innerHeight - 200;
	return { type: WINDOW_RESIZE,  width, height };
};

export const move = ( direction ) => {
	return { type: PLAYER_MOVEMENT, direction };
};
