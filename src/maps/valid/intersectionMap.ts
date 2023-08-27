import { GameMap } from '../../models/GameMap.ts';
import { ScanResult } from '../../models/ScanResult.ts';

export const intersectionMap: GameMap = [
  ['@'],
  ['|', null, '+', '-', 'C', '-', '-', '+'],
  ['A', null, '|', null, null, null, null, '|'],
  ['+', '-', '-', '-', 'B', '-', '-', '+'],
  [null, null, '|', null, null, null, null, null, null, 'x'],
  [null, null, '|', null, null, null, null, null, null, '|'],
  [null, null, '+', '-', '-', '-', 'D', '-', '-', '+'],
];

export const intersectionMapResult: ScanResult = {
  characters: 'ACB',
  letters: '@---A---+|C|+---+|+-B-x',
};
