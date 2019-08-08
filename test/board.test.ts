import { Point, Flag } from '../src/types';
import { Board } from '../src/board';
import { neighbors } from '../src/util';

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
		let board: Board;

		beforeEach(() => {
			board = new Board(5, 5);
		});

		it('should update mine counts when adding a mine', () => {
			expect(board.totalMines).toBe(0);

			board.placeMine([1,1]);

			expect(board.totalMines).toBe(1);
		});

		it('should not change mine counts when adding a mine on top of an existing one', () => {
			board.placeMine([1,1]);
			board.placeMine([1,1]);

			expect(board.totalMines).toBe(1);
		});

		it('should throw an error if placing a mine out of bounds', () => {
			expect(() => {
				board.placeMine([6,6]);
			}).toThrowError();
		});
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

	describe('flags', () => {
		let board: Board;

		beforeEach(() => {
			board = new Board(2,2);
		});

		it('should get nothing from an unflagged cell', () => {
			expect(board.getFlag([1,1])).toBeUndefined();
		});

		it('should set flags in bounds and retrieve their value', () => {
			board.setFlag([1,1], Flag.FLAGGED_MINE);

			expect(board.getFlag([1,1])).toBe(Flag.FLAGGED_MINE);
		});

		it('should replace a flag value with another', () => {
			board.setFlag([1,1], Flag.FLAGGED_MINE);
			board.setFlag([1,1], Flag.POSSIBLE_MINE);

			expect(board.getFlag([1,1])).toBe(Flag.POSSIBLE_MINE);
		});

		it('should unset a flag value', () => {
			board.setFlag([1,1], Flag.FLAGGED_MINE);
			board.setFlag([1,1], undefined);

			expect(board.getFlag([1,1])).toBeUndefined();
		});

		it('should throw an error when setting a flag out of bounds', () => {
			expect(() => {
				board.setFlag([3,3], Flag.FLAGGED_MINE);
			}).toThrowError();
		});

		it('should throw an error when getting a flag out of bounds', () => {
			expect(() => {
				board.getFlag([3,3]);
			}).toThrowError();
		});
	});

	describe('#reveallCell', () => {
		let board: Board;

		beforeEach(() => {
			board = new Board(3,3);
		});

		it('should reveal an entire board if empty', () => {
			expect(board.revealCell([2,2])).toBe(false);
			expect(Array.from(board.iterator()).every(board.isRevealed.bind(board))).toBe(true);
		});

		it('should return true if revealing a cell that contains a mine', () => {
			board.placeMine([2,2]);
			expect(board.revealCell([2,2])).toBe(true);
		});

		it('should reveal cells but do not reveal cells with adjacent mines', () => {
			board.placeMine([0,0]);

			expect(board.revealCell([2,2])).toBe(false);

			const revealed: Point[] = [[2,2], [2,1], [2,0], [1,2], [0,2]];
			const unrevealed: Point[] = [[0,0], [0,1], [1,0], [1,1]];

			revealed.forEach(p => expect(board.isRevealed(p)).toBe(true));
			unrevealed.forEach(p => expect(board.isRevealed(p)).toBe(false));
		});

		it('should only reveal the selected cell if it has adjacent mines', () => {
			board.placeMine([0,0]);

			expect(board.revealCell([1,1])).toBe(false);
			expect(board.isRevealed([1,1])).toBe(true);

			const unrevealed: Point[] = [[0,0], [0,1], [1,0], [2,0], [0,2], [2,1], [1,2], [2,2]];

			unrevealed.forEach(p => expect(board.isRevealed(p)).toBe(false));
		});
	});
});
