import { describe, expect, it } from 'vitest';
import { GameMap } from '../../models/GameMap.ts';
import {
  findLetterDirection,
  findDirectionsForVerticalCharacters,
  findStartDirection,
  findTurnDirection,
  findDirectionsForHorizontalCharacters,
} from '../directionResolvers.ts';
import { directions } from '../../constants/directions.ts';

describe('findStartDirection', () => {
  it('should find direction if single possible exists', () => {
    const map: GameMap = [
      ['@', '-', '+'],
      [null, null, 'x'],
    ];
    const result = findStartDirection(map, { y: 0, x: 0 });
    expect(result).toBe(directions.right);
  });

  it('should throw error if multiple directions exist', () => {
    const map: GameMap = [
      ['@', '-', '+'],
      ['+', '-', 'x'],
    ];
    expect(() => findStartDirection(map, { y: 0, x: 0 })).toThrow('Multiple starting paths!');
  });

  it('should throw error if no directions exist', () => {
    const map: GameMap = [['@', null, '+']];
    expect(() => findStartDirection(map, { y: 0, x: 0 })).toThrow('Broken path!');
  });
});

describe('findTurnDirection', () => {
  it('should find direction when current direction is horizontal', () => {
    const map: GameMap = [
      ['@', '-', '+'],
      [null, null, 'x'],
    ];
    const location = { y: 0, x: 2 };
    const result = findTurnDirection(map, location, directions.right);
    expect(result).toBe(directions.down);
  });

  it('should find direction when current direction is vertical', () => {
    const map: GameMap = [['@'], ['|'], ['+', '-', 'x']];
    const location = { y: 2, x: 0 };
    const result = findTurnDirection(map, location, directions.down);
    expect(result).toBe(directions.right);
  });

  it('should throw error when no valid direction', () => {
    const map: GameMap = [['@', '-', '+']];
    const location = { y: 0, x: 2 };
    expect(() => findTurnDirection(map, location, directions.right)).toThrow('Broken path!');
  });

  it('should throw error when at fork', () => {
    const map: GameMap = [
      ['x', '-', '+'],
      ['@', '-', '+'],
      ['x', '-', '+'],
    ];
    const location = { y: 1, x: 2 };
    expect(() => findTurnDirection(map, location, directions.right)).toThrow('Fork found!');
  });
});

describe('findLetterDirection', () => {
  it('should keep direction when possible', () => {
    const map: GameMap = [['@', '-', 'A', '-', 'x']];
    const result = findLetterDirection(map, { y: 0, x: 2 }, directions.right);
    expect(result).toStrictEqual(directions.right);
  });

  it('should turn when unable to keep direction', () => {
    const map: GameMap = [
      ['@', '-', 'A'],
      [null, null, 'x'],
    ];
    const result = findLetterDirection(map, { y: 0, x: 2 }, directions.right);
    expect(result).toStrictEqual(directions.down);
  });

  it('should throw error if nowhere to go', () => {
    const map: GameMap = [['@', '-', 'A']];
    const find = () => findLetterDirection(map, { y: 0, x: 2 }, directions.right);
    expect(find).toThrow();
  });

  it('should throw error if fork', () => {
    const map: GameMap = [
      [null, '|'],
      ['-', '+'],
      [null, '|'],
    ];
    const find = () => findLetterDirection(map, { y: 0, x: 2 }, directions.right);
    expect(find).toThrow();
  });
});

describe('findPossibleVerticalDirections', () => {
  it('should return 2 directions when 2 are possible', () => {
    const map: GameMap = [
      [null, '|'],
      ['-', '+'],
      [null, '|'],
    ];
    const result = findDirectionsForVerticalCharacters(map, { y: 1, x: 1 });
    expect(result.length).toBe(2);
  });

  it('should return 1 direction when 1 possible', () => {
    const map: GameMap = [
      ['-', '+'],
      [null, '|'],
    ];
    const result = findDirectionsForVerticalCharacters(map, { y: 1, x: 1 });
    expect(result.length).toBe(1);
  });

  it('should return 0 direction when 0 possible', () => {
    const map: GameMap = [['A']];
    const result = findDirectionsForVerticalCharacters(map, { y: 0, x: 0 });
    expect(result.length).toBe(0);
  });
});

describe('findPossibleHorizontalDirections', () => {
  it('should return 2 directions when 2 are possible', () => {
    const map: GameMap = [
      ['-', '+', '-'],
      [null, '|'],
    ];
    const result = findDirectionsForHorizontalCharacters(map, { y: 0, x: 1 });
    expect(result.length).toBe(2);
  });

  it('should return 1 direction when 1 possible', () => {
    const map: GameMap = [[null, '|', '-']];
    const result = findDirectionsForHorizontalCharacters(map, { y: 0, x: 1 });
    expect(result.length).toBe(1);
  });

  it('should return 0 direction when 0 possible', () => {
    const map: GameMap = [['A'], ['A']];
    const result = findDirectionsForHorizontalCharacters(map, { y: 0, x: 0 });
    expect(result.length).toBe(0);
  });
});
