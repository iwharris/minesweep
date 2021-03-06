import { Flag, Point, GameState } from './types';
import { neighbors } from './util';

export class Board implements GameState {
	private w: number;
	private h: number;

	private total: number;
	private visible: number;

	private mines: boolean[];
	private flags: (Flag | undefined)[];
	private revealed: boolean[];
	private adjacency: number[];

	constructor(width: number, height: number) {
		this.w = width;
		this.h =  height;

		const arrayLength = this.w * this.h;

		this.mines = Array(arrayLength).fill(false);
		this.flags = Array(arrayLength).fill(undefined);
		this.revealed = Array(arrayLength).fill(false);
		this.adjacency = Array(arrayLength).fill(0);

		this.total = 0;
		this.visible = 0;
	}

	private assertInBounds(p: Point): void {
		if (!this.isInBounds(p)) throw new Error('Out of bounds');
	}

	private idx([x,y]: Point): number {
		return y * this.width + x;
	}

	private neighbors(p: Point): Point[] {
		return neighbors(p).filter(p => this.isInBounds(p));
	}

	get width(): number {
		return this.w;
	}

	get height(): number {
		return this.h;
	}

	get revealedMines(): number {
		return this.visible;
	}

	get totalMines(): number {
		return this.total;
	}

	public getAdjacentMines(point: Point): number {
		this.assertInBounds(point);
		return this.adjacency[this.idx(point)];
	}

	public isInBounds([x, y]: Point): boolean {
		return x >= 0 && y >= 0 && x < this.w && y < this.w;
	}

	public isMine(point: Point): boolean {
		this.assertInBounds(point);
		return this.mines[this.idx(point)];
	}

	public getFlag(point: Point): Flag | undefined {
		this.assertInBounds(point);
		return this.flags[this.idx(point)];
	}

	public setFlag(point: Point, flag: Flag | undefined): void {
		this.assertInBounds(point);
		this.flags[this.idx(point)] = flag;
	}

	public placeMine(point: Point): void {
		this.assertInBounds(point);
		if (!this.isMine(point)) {
			const idx = this.idx(point);
			this.mines[idx] = true;
			this.total += 1;
			this.neighbors(point)
				.forEach(p => this.adjacency[this.idx(p)] += 1);
		}
	}

	public isRevealed(p: Point): boolean {
		this.assertInBounds(p);
		return this.revealed[this.idx(p)];
	}

	public revealCell(p: Point): boolean {
		this.assertInBounds(p);
		if (this.isMine(p)) return true;

		// Traverse to neighboring cells, revealing empty ones
		const visited = new Set<number>();
		const traverse = (p: Point): void => {
			const i = this.idx(p);
			this.revealed[i] = true;
			visited.add(i);
			if (this.getAdjacentMines(p) > 0) return; // Skip traversing neighbors if this cell has an adjacent mines
			this.neighbors(p).forEach(np => {
				const ni = this.idx(np);
				if (!visited.has(ni) && !this.revealed[ni] && this.getAdjacentMines(np) === 0) traverse(np);
			});
		};

		traverse(p);

		return false;
	}

	public *iterator(): IterableIterator<Point> {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				yield [x,y];
			}
		}
	}
}
