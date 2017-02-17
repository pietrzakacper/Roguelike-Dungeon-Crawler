import { PLAYER_MOVEMENT } from './actionTypes';

export const move = ( direction ) => {
	return { type: PLAYER_MOVEMENT, direction };
};
