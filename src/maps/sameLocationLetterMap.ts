import { DefaultMapInfo } from '../models/DefaultMapInfo.ts';

export const sameLocationLetterMap: DefaultMapInfo = {
  map: [
    [null, null, null, null, '+', '-', 'O', '-', 'N', '-', '+'],
    [null, null, null, null, '|', null, null, null, null, null, '|'],
    [null, null, null, null, '|', null, null, null, '+', '-', 'I', '-', '+'],
    ['@', '-', 'G', '-', 'O', '-', '+', null, '|', null, '|', null, '|'],
    [null, null, null, null, '|', null, '|', null, '+', '-', '+', null, 'E'],
    [null, null, null, null, '+', '-', '+', null, null, null, null, null, 'S'],
    [null, null, null, null, null, null, null, null, null, null, null, null, '|'],
    [null, null, null, null, null, null, null, null, null, null, null, null, 'x'],
  ],
  result: {
    letters: 'GOONIES',
    pathCharacters: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
  },
};
