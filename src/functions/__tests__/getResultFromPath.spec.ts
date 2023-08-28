import { describe, expect, it } from 'vitest';
import { GameMap } from '../../models/GameMap.ts';
import { readPathCharacters, readPathLetters } from '../getResultFromPath.ts';

describe('readPathCharacters', () => {
  it('should return correct characters string', () => {
    const map: GameMap = [
      ['@', '-', 'A', 'B', 'x'],
      ['@', '-', 'A', 'B', '+'],
    ];
    const locations = [
      { y: 0, x: 0 },
      { y: 1, x: 3 },
      { y: 0, x: 4 },
    ];
    const result = readPathCharacters(map, locations);
    expect(result).toBe('@Bx');
  });

  it('should ignore null location values', () => {
    const map: GameMap = [
      ['@', null, 'A', 'B', 'x'],
      ['@', '-', 'A', 'B', '+'],
    ];
    const locations = [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 1, x: 3 },
      { y: 0, x: 7 },
    ];
    const result = readPathCharacters(map, locations);
    expect(result).toBe('@B');
  });
});

describe('readPathLetters', () => {
  const map: GameMap = [['@', '-', 'A', 'B', 'x']];

  it('should read only letters', () => {
    const locations = [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 0, x: 2 },
      { y: 0, x: 3 },
      { y: 0, x: 4 },
    ];
    const result = readPathLetters(map, locations);
    expect(result).toBe('AB');
  });

  it('should read letter from the same location only the first time', () => {
    const locations = [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 0, x: 2 },
      { y: 0, x: 2 },
      { y: 0, x: 3 },
      { y: 0, x: 2 },
      { y: 0, x: 4 },
    ];
    const result = readPathLetters(map, locations);
    expect(result).toBe('AB');
  });
});
