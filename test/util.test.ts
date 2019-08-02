import { neighbors } from '../src/util';
import { Point } from '../src/types';

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
});
