import { Point } from './types';

export function neighbors([x,y]: Point): Point[] {
	return [
		[x-1,y-1], [x  ,y-1], [x+1,y-1],
		[x-1,y  ],            [x+1,y  ],
		[x-1,y+1], [x  ,y+1], [x+1,y+1],
	];
}
