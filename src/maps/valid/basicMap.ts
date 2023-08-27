import { GameMap } from '../../models/GameMap.ts';
import { ScanResult } from '../../models/ScanResult.ts';

export const basicMap: GameMap = [
  ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  ['x', '-', 'B', '-', '+', null, null, null, 'C'],
  [null, null, null, null, '|', null, null, null, '|'],
  [null, null, null, null, '+', '-', '-', '-', '+'],
];

export const basicMapResult: ScanResult = {
  characters: 'ACB',
  letters: '@---A---+|C|+---+|+-B-x',
};
