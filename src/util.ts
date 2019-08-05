import { Point } from './types';
import { Board } from './board';

export function neighbors([x,y]: Point): Point[] {
	return [
		[x-1,y-1], [x  ,y-1], [x+1,y-1],
		[x-1,y  ],            [x+1,y  ],
		[x-1,y+1], [x  ,y+1], [x+1,y+1],
	];
}

export function getString(board: Board): string {
	const charArray = Array.from(board.iterator())
		.map(p => board.isMine(p) ? 'M' : String(board.getAdjacentMines(p)));

	for (let i = board.height-1; i >= 0; i--) {
		charArray.splice(i * board.width, 0, '\n');
	}

	return charArray.join('').trim();
}
