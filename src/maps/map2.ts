import { GameMap } from '../types/GameMap.ts';

export const map2: GameMap = [
  ['@'],
  ['|', null, '+', '-', 'C', '-', '-', '+'],
  ['A', null, '|', null, null, null, null, '|'],
  ['+', '-', '-', '-', 'B', '-', '-', '+'],
  [null, null, '|', null, null, null, null, null, null, 'x'],
  [null, null, '|', null, null, null, null, null, null, '|'],
  [null, null, '+', '-', '-', '-', '-', 'D', '-', '+'],
];
