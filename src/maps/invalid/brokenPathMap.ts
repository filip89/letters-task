import { GameMap } from '../../models/GameMap.ts';

export const brokenPathMap: GameMap = [
  ['@', '-', '-', 'A', '-', '+'],
  [null, null, null, null, null, '|'],
  [null, null, null, null, null, null],
  [null, null, null, null, null, 'B', '-', 'x'],
];
