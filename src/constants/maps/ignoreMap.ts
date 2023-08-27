import { DefaultMapInfo } from '../defaultMaps.ts';

export const ignoreMap: DefaultMapInfo = {
  map: [
    ['@', '-', 'A', '-', '-', '+'],
    [null, null, null, null, null, '|'],
    [null, null, null, null, null, '+', '-', 'B', '-', '-', 'x', '-', 'C', '-', '-', 'D'],
  ],
  result: {
    letters: 'AB',
    pathCharacters: '@-A--+|+-B--x',
  },
};
