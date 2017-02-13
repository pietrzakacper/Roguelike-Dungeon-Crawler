import { PLAYER_MOVEMENT } from './actionTypes';

export const moveRight = () => {
	console.log( 'moveRight action ' );
	return { type: PLAYER_MOVEMENT };
};
