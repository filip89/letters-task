import { DefaultMapInfo } from '../models/DefaultMapInfo.ts';

export const intersectionMap: DefaultMapInfo = {
  map: [
    ['@'],
    ['|', null, '+', '-', 'C', '-', '-', '+'],
    ['A', null, '|', null, null, null, null, '|'],
    ['+', '-', '-', '-', 'B', '-', '-', '+'],
    [null, null, '|', null, null, null, null, null, null, 'x'],
    [null, null, '|', null, null, null, null, null, null, '|'],
    [null, null, '+', '-', '-', '-', 'D', '-', '-', '+'],
  ],
  result: {
    letters: 'ABCD',
    pathCharacters: '@|A+---B--+|+--C-+|-||+---D--+|x',
  },
};
