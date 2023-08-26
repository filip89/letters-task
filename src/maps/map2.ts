import { GameMapScheme } from '../models/GameMapScheme.ts';

export const map2: GameMapScheme = [
  ['@'],
  ['|', null, '+', '-', 'C', '-', '-', '+'],
  ['A', null, '|', null, null, null, null, '|'],
  ['+', '-', '-', '-', 'B', '-', '-', '+'],
  [null, null, '|', null, null, null, null, null, null, 'x'],
  [null, null, '|', null, null, null, null, null, null, '|'],
  [null, null, '+', '-', '-', '-', '-', 'D', '-', '+'],
];
