import loadInput from "../utils/loadInput";
import { multiply } from "../utils/math";

const testInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`;

enum Tile {
    Open = 'Open',
    Tree = 'Tree'
}

(async () => {
    const grid = parseInput(
        await loadInput(3)
        // testInput
    );

    const paths = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ];

    console.log(
        multiply(
            ...paths.map(path => checkPath(grid, path))
        )
    );
})();

interface Coords {
    x: number
    y: number
}

function checkPath(grid: Tile[][], movement: Coords, startingPosition: Coords = { x: 0, y: 0 }) {
    const position = { ...startingPosition };

    let trees = 0;
    let tile: undefined | Tile;

    while (tile = getTileAt(grid, position)) {
        if (tile === Tile.Tree) {
            trees++;
        }

        position.x += movement.x;
        position.y += movement.y;
    }

    return trees;
}

function getTileAt(grid: Tile[][], position: { x: number, y: number }) {
    if (position.y >= grid.length) {
        return;
    }

    const row = grid[position.y];
    return row[position.x % row.length];
}

function parseInput(input: string): Tile[][] {
    return input.split('\n')
        .filter(Boolean)
        .map(row => (
            [...row].map(parseTile)
        ))
}

function parseTile(char: string) {
    switch (char) {
        case '.':
            return Tile.Open;
        case '#':
            return Tile.Tree;
        default:
            throw new Error(`Encountered unknown tile char: ${char}`);
    }
}