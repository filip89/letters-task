import { GameMapScheme } from '../../models/GameMapScheme.ts';

export const missingStartMap: GameMapScheme = [
  [null, null, null, '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  ['x', '-', 'B', '-', '+', null, null, null, 'C'],
  [null, null, null, null, '|', null, null, null, '|'],
  [null, null, null, null, '+', '-', '-', '-', '+'],
];
