import { neighbors, getString } from '../src/util';
import { Point } from '../src/types';
import { Board } from '../src/board';

describe('Util', () => {
	describe('#neighbors', () => {
		it('computes neighboring cells for a Point', () => {
			const point: Point = [5,6];
			const result = neighbors(point);

			expect(result).toHaveLength(8);
			expect(result).toEqual(
				expect.arrayContaining([
					[4,5], [5,5], [6,5],
					[4,6],        [6,6],
					[4,7], [5,7], [6,7]
				])
			);
		});
	});

	describe('#getString', () => {
		it('returns a string representation of the Board state', () => {
			const board: Board = new Board(3, 3);
			const points: Point[] = [
				[0,0],
				[1,0],
				[0,1],
			];
			points.forEach(board.placeMine.bind(board));

			const representation = getString(board);

			expect(representation).toEqual('MM1\nM31\n110');
		});
	});
});
