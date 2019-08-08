export enum Flag {
	POSSIBLE_MINE,
	FLAGGED_MINE,
};

export type Point = [number, number];

export interface GameState {
	width: number;
	height: number;

	revealedMines: number;
	totalMines: number;

	isInBounds(point: Point): boolean;

	isMine(point: Point): boolean;

	getAdjacentMines(point: Point): number;

	isRevealed(point: Point): boolean;
	revealCell(point: Point): boolean;

	getFlag(point: Point): Flag | undefined;
	setFlag(point: Point, flag: Flag): void;
}
