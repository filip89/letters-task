import { describe, expect, it } from 'vitest';
import {
  convertLocationsToCharactersString,
  getAdjacentCharacter,
  getAdjacentLocation,
  locationsInclude,
  getLocationCharacter,
} from '../locationUtils.ts';
import { GameMap } from '../../models/GameMap.ts';
import { directions } from '../../constants/directions.ts';
import { Location } from '../../models/Location.ts';

describe('locationsInclude', () => {
  const locations = [
    { y: 0, x: 0 },
    { y: 3, x: 3 },
    { y: 2, x: 7 },
  ];
  it('should return true if it includes a specified location', () => {
    const result = locationsInclude(locations, { y: 2, x: 7 });
    expect(result).toBeTruthy();
  });

  it('should return false if it doesnt include a specified location', () => {
    const result = locationsInclude(locations, { y: 7, x: 2 });
    expect(result).toBeFalsy();
  });
});

describe('readLocationCharacter', () => {
  it('should return a character if exist in location', () => {
    const map: GameMap = [[null, null, '-']];
    expect(getLocationCharacter(map, { y: 0, x: 2 })).toBe('-');
  });

  it('should return null or undefined if character not at location', () => {
    const map: GameMap = [[null, null, '-']];
    expect(getLocationCharacter(map, { y: 0, x: 0 })).toBeFalsy();
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

describe('getAdjacentCharacter', () => {
  const map: GameMap = [
    ['@', '-', 'A'],
    [null, 'x', '+'],
  ];
  const location = { y: 1, x: 1 };

  it('should return correct character based on direction', () => {
    const characterAbove = getAdjacentCharacter(map, location, directions.up);
    expect(characterAbove).toBe('-');
    const rightCharacter = getAdjacentCharacter(map, location, directions.right);
    expect(rightCharacter).toBe('+');
  });

  it('should return no character based on direction', () => {
    const character = getAdjacentCharacter(map, location, directions.down);
    expect(character).toBeUndefined();
  });
});

describe('convertLocationsToCharactersString', () => {
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
    const result = convertLocationsToCharactersString(map, locations);
    expect(result).toBe('@Bx');
  });

  it('should ignore null and undefined location values', () => {
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
    const result = convertLocationsToCharactersString(map, locations);
    expect(result).toBe('@B');
  });
});
