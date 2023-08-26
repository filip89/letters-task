import { GameMapScheme } from '../../models/GameMapScheme.ts';

export const forkInPathMap: GameMapScheme = [
  [null, null, '-', 'A', '-', 'B', '-', '+'],
  [null, null, null, null, null, null, null, '|'],
  ['@', '-', '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, '|'],
  [null, null, 'x', '+', null, null, null, 'C'],
  [null, null, null, '|', null, null, null, '|'],
  [null, null, null, '+', '-', '-', '-', '+'],
];
