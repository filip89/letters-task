import { GameMapScheme } from '../../models/GameMapScheme.ts';
import { Result } from '../../models/Result.ts';

export const intersectionMap: GameMapScheme = [
  ['@'],
  ['|', null, '+', '-', 'C', '-', '-', '+'],
  ['A', null, '|', null, null, null, null, '|'],
  ['+', '-', '-', '-', 'B', '-', '-', '+'],
  [null, null, '|', null, null, null, null, null, null, 'x'],
  [null, null, '|', null, null, null, null, null, null, '|'],
  [null, null, '+', '-', '-', '-', 'D', '-', '-', '+'],
];

export const intersectionMapResult: Result = {
  characters: 'ACB',
  letters: '@---A---+|C|+---+|+-B-x',
};
