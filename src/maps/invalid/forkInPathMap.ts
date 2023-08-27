import { GameMap } from '../../models/GameMap.ts';

export const forkInPathMap: GameMap = [
  [null, null, '-', 'A', '-', 'B', '-', '+'],
  [null, null, null, null, null, null, null, '|'],
  ['@', '-', '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, '|'],
  [null, null, 'x', '+', null, null, null, 'C'],
  [null, null, null, '|', null, null, null, '|'],
  [null, null, null, '+', '-', '-', '-', '+'],
];
