import assert from 'assert';
import {describe, it} from 'mocha';
import Grid from 'grid';

describe('Grid', () => {
	describe('new ()', () => {
		it('should initialize a grid', () => {
			let grid = new Grid(10, 10),
				cells = grid.Cells;
			assert.equal(cells.length, 10);
			assert.equal(cells[0].length, 10);
		});
	});
	describe('get Cells ()', () => {
		it('should return the grid', () => {
			let grid = new Grid(10, 10),
				cells = grid.Cells;
			assert.equal(cells.length, 10);
			assert.equal(cells[0].length, 10);
		});
	});
	describe('get Size ()', () => {
		it('should return the grid size', () => {
			let grid = new Grid(10, 10),
				size = grid.Size;
			assert.deepEqual(size, {x: 10, y: 10});
		});
	});
	describe('get Rules ()', () => {
		it('should return the grid rules', () => {
			let grid = new Grid(10, 10),
				rules = grid.Rules;
			assert.deepEqual(rules, {
				b: [false, false, false, false, false, false, false, false, false],
				s: [false, false, false, false, false, false, false, false, false]
			});
		});
	});
	describe('random (ratio)', () => {
		it('should fill the grid when ratio = 1', () => {
			let grid = new Grid(10, 10);
			grid.random(1);
			for(let x = 0; x < 10; x++) {
				for(let y = 0; y < 10; y++) {
					assert.equal(grid.Cells[x][y].flip, true);
				}
			}
		});
		it('should leave the grid empty when ratio = 0', () => {
			let grid = new Grid(10, 10);
			grid.random(0);
			for(let x = 0; x < 10; x++) {
				for(let y = 0; y < 10; y++) {
					assert.equal(grid.Cells[x][y].flip, false);
				}
			}
		});
	});
	describe('clear ()', () => {
		it('should clear the grid', () => {
			let grid = new Grid(10, 10);
			grid.clear();
			for(let x = 0; x < 10; x++) {
				for(let y = 0; y < 10; y++) {
					assert.equal(grid.Cells[x][y].flip, true);
					assert.equal(grid.Cells[x][y].state, 1);
				}
			}
		});
	});
});
