import { GameMap } from '../../models/GameMap.ts';

export const missingStartMap: GameMap = [
  [null, null, null, '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  ['x', '-', 'B', '-', '+', null, null, null, 'C'],
  [null, null, null, null, '|', null, null, null, '|'],
  [null, null, null, null, '+', '-', '-', '-', '+'],
];
