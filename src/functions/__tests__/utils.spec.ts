import { describe, expect, it } from 'vitest';
import { getAdjacentLocation, readLocationCharacter } from '../utils.ts';
import { GameMap } from '../../models/GameMap.ts';
import { directions } from '../../constants/directions.ts';
import { Location } from '../../models/Location.ts';

describe('readLocationCharacter', () => {
  it('should return a character if exist in location', () => {
    const map: GameMap = [[null, null, '-']];
    expect(readLocationCharacter(map, { y: 0, x: 2 })).toBe('-');
  });

  it('should return null or undefined if character not at location', () => {
    const map: GameMap = [[null, null, '-']];
    expect(readLocationCharacter(map, { y: 0, x: 0 })).toBeFalsy();
  });
});

describe('getAdjacentLocation', () => {
  const currentLocation: Location = { y: 2, x: 2 };
  it('should return location to the right of the current location', () => {
    const location = getAdjacentLocation(currentLocation, directions.right);
    expect(location).toStrictEqual({ y: 2, x: 3 });
  });

  it('should return location to the left of the current location', () => {
    const location = getAdjacentLocation(currentLocation, directions.left);
    expect(location).toStrictEqual({ y: 2, x: 1 });
  });

  it('should return location above the current location', () => {
    const location = getAdjacentLocation(currentLocation, directions.up);
    expect(location).toStrictEqual({ y: 1, x: 2 });
  });

  it('should return location below the current location', () => {
    const location = getAdjacentLocation(currentLocation, directions.down);
    expect(location).toStrictEqual({ y: 3, x: 2 });
  });
});
