import { WINDOW_RESIZE } from './actionTypes';

export const windowResize = ( ) => {
	const width = document.getElementById( 'app' ).clientWidth;
	const height = window.innerHeight - 200;
	return { type: WINDOW_RESIZE,  width, height };
};
