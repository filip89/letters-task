import { GameMapScheme } from '../../models/GameMapScheme.ts';
import { Result } from '../../models/Result.ts';

export const basicMap: GameMapScheme = [
  ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
  [null, null, null, null, null, null, null, null, '|'],
  ['x', '-', 'B', '-', '+', null, null, null, 'C'],
  [null, null, null, null, '|', null, null, null, '|'],
  [null, null, null, null, '+', '-', '-', '-', '+'],
];

export const basicMapResult: Result = {
  characters: 'ACB',
  letters: '@---A---+|C|+---+|+-B-x',
};
