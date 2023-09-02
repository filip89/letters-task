import { expect, it } from 'vitest';
import { GameMap } from '../../models/GameMap.ts';
import { getDirection } from '../getDirection.ts';
import { directions } from '../../constants/directions.ts';
import { errorMessages } from '../../constants/errorMessages.ts';

it('should find correct direction on start', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  const result = getDirection(map, { y: 0, x: 0 });
  expect(result).toBe(directions.right);
});

it('should find correct direction on straight horizontal', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  const result = getDirection(map, { y: 0, x: 1 }, directions.right);
  expect(result).toBe(directions.right);
});

it('should find correct direction on straight vertical', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  const result = getDirection(map, { y: 1, x: 2 }, directions.down);
  expect(result).toBe(directions.down);
});

it('should find correct direction on turn', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  const result = getDirection(map, { y: 0, x: 2 }, directions.right);
  expect(result).toBe(directions.down);
});

it('should find correct direction on letter', () => {
  const map: GameMap = [
    ['@', '-', 'A'],
    [null, null, 'x'],
  ];
  const result = getDirection(map, { y: 0, x: 2 }, directions.right);
  expect(result).toStrictEqual(directions.down);
});

it('should not find direction on x', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  const result = getDirection(map, { y: 1, x: 3 }, directions.down);
  expect(result).toBeUndefined();
});

it('should not find direction on empty location', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  const result = getDirection(map, { y: 1, x: 0 }, directions.down);
  expect(result).toBeUndefined();
});

it('should throw if multiple start directions exist', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    ['+', '-', 'x'],
  ];
  expect(() => getDirection(map, { y: 0, x: 0 })).toThrow(errorMessages.multiStartPaths);
});

it('should throw if no start directions available', () => {
  const map: GameMap = [['@', null, '+']];
  expect(() => getDirection(map, { y: 0, x: 0 })).toThrow(errorMessages.brokenPath);
});

it('should throw if no active direction provided on non-start location', () => {
  const map: GameMap = [
    ['@', '-', '+'],
    [null, null, '|'],
    [null, null, 'x'],
  ];

  expect(() => getDirection(map, { y: 0, x: 1 })).toThrow();
  expect(() => getDirection(map, { y: 0, x: 2 })).toThrow();
  expect(() => getDirection(map, { y: 1, x: 2 })).toThrow();
});

it('should throw error when no possible turn', () => {
  const map: GameMap = [['@', '-', '+']];
  const location = { y: 0, x: 2 };
  expect(() => getDirection(map, location, directions.right)).toThrow(errorMessages.brokenPath);
});

it('should throw when at fork', () => {
  const map: GameMap = [
    ['x', '-', '+'],
    ['@', '-', '+'],
    ['x', '-', '+'],
  ];
  const location = { y: 1, x: 2 };
  expect(() => getDirection(map, location, directions.right)).toThrow(errorMessages.forkFound);
});

it('should throw on fake turn', function () {
  const map: GameMap = [['@', '-', 'A', '-', '+', '-', 'B', '-', 'x']];
  const location = { y: 0, x: 4 };
  expect(() => getDirection(map, location, directions.right)).toThrow(errorMessages.fakeTurn);
});
