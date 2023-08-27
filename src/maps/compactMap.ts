import { DefaultMapInfo } from '../models/DefaultMapInfo.ts';

export const compactMap: DefaultMapInfo = {
  map: [
    [null, '+', '-', 'L', '-', '+'],
    [null, '|', null, null, '+', 'A', '-', '+'],
    ['@', 'B', '+', null, '+', '+', null, 'H'],
    [null, '+', '+', null, null, null, null, 'x'],
  ],
  result: {
    letters: 'BLAH',
    pathCharacters: '@B+++B|+-L-+A+++A-+Hx',
  },
};
