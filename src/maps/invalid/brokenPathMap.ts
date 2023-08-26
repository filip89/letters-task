import { GameMapScheme } from '../../models/GameMapScheme.ts';

export const brokenPathMap: GameMapScheme = [
  ['@', '-', '-', 'A', '-', '+'],
  [null, null, null, null, null, '|'],
  [null, null, null, null, null, null],
  [null, null, null, null, null, 'B', '-', 'x'],
];
