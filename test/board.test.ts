import { Point, Flag } from '../src/types';
import { Board } from '../src/board';

describe('Board', () => {
	describe('#constructor', () => {
		it('should construct a Board of the correct size', () => {
			const width = 10;
			const height = 15;

			const board = new Board(width, height);

			expect(board.width).toEqual(width);
			expect(board.height).toEqual(height);
		});

		it('should be initialized with zero mines', () => {
			const board = new Board(10, 10);

			expect(board.totalMines).toBe(0);
			expect(board.revealedMines).toBe(0);
		});
	});

	describe('#isMine', () => {
		let board: Board;

		beforeEach(() => {
			board = new Board(10, 20);
		});

		it('should throw an error if checking out of bounds cells', () => {
			expect(() => {
				board.isMine([-1,-1]);
			}).toThrow('Out of bounds');

			expect(() => {
				board.isMine([10,20]);
			}).toThrow('Out of bounds');
		});

		it('should not contain mines by default', () => {
			expect(board.isMine([5,5])).toBe(false);
		});
	});
});
