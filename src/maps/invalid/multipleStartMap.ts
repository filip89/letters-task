import { GameMap } from '../../models/GameMap.ts';

export const multipleStartMap1: GameMap = [
  [null, '@', '-', '-', 'A', '-', '@', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  ['x', '-', 'B', '-', '+', null, null, null, 'C'],
  [null, null, null, null, '|', null, null, null, '|'],
  [null, null, null, null, '+', '-', '-', '-', '+'],
];

export const multipleStartMap2: GameMap = [
  [null, '@', '-', '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  [null, null, null, null, null, null, null, null, 'C'],
  [null, null, null, null, null, null, null, null, 'x'],
  [null, null, null, null, '@', '-', 'B', '-', '+'],
];

export const multipleStartMap3: GameMap = [
  [null, '@', '-', '-', 'A', '-', '-', 'x'],
  [],
  ['x', '-', 'B', '-', '+'],
  [null, null, null, null, '|'],
  [null, null, null, null, '@'],
];
