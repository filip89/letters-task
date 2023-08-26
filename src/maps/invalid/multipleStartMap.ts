import { GameMapScheme } from '../../models/GameMapScheme.ts';

export const multipleStartMap1: GameMapScheme = [
  [null, '@', '-', '-', 'A', '-', '@', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  ['x', '-', 'B', '-', '+', null, null, null, 'C'],
  [null, null, null, null, '|', null, null, null, '|'],
  [null, null, null, null, '+', '-', '-', '-', '+'],
];

export const multipleStartMap2: GameMapScheme = [
  [null, '@', '-', '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  [null, null, null, null, null, null, null, null, 'C'],
  [null, null, null, null, null, null, null, null, 'x'],
  [null, null, null, null, '@', '-', 'B', '-', '+'],
];

export const multipleStartMap3: GameMapScheme = [
  [null, '@', '-', '-', 'A', '-', '-', 'x'],
  [],
  ['x', '-', 'B', '-', '+'],
  [null, null, null, null, '|'],
  [null, null, null, null, '@'],
];
