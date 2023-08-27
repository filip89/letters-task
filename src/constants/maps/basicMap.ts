import { DefaultMapInfo } from '../defaultMaps.ts';

export const basicMap: DefaultMapInfo = {
  map: [
    ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
    [null, null, null, null, null, null, null, null, '|'],
    ['x', '-', 'B', '-', '+', null, null, null, 'C'],
    [null, null, null, null, '|', null, null, null, '|'],
    [null, null, null, null, '+', '-', '-', '-', '+'],
  ],
  result: {
    letters: 'ACB',
    pathCharacters: '@---A---+|C|+---+|+-B-x',
  },
};
