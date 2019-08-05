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

	describe('#placeMine', () => {

	});

	describe('#getAdjacentMines', () => {
		let board: Board;

		beforeEach(() => {
			board = new Board(5, 5);
		});

		it('should return zero mines if no mines are adjacent', () => {
			expect(board.getAdjacentMines([2,2])).toBe(0);
		});

		it('should return one adjacent mine', () => {
			board.placeMine([1,1]);
			expect(board.getAdjacentMines([0, 0])).toBe(1);
		});

		it('should return multiple adjacent mines', () => {
			const points: Point[] = [
				[0,0],
				[1,0],
				[0,1],
			];
			points.forEach(board.placeMine.bind(board));

			expect(board.getAdjacentMines([1,1])).toBe(3);
		});
	});
});
