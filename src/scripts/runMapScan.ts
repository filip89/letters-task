import { GameMap } from '../models/GameMap.ts';
import { ScanResult } from '../models/ScanResult.ts';
import { directX, directY, end, letters, start, turn } from '../constants/characters.ts';
import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { Character, Letter } from '../models/Characters.ts';
import {
  findStartDirection,
  findLetterDirection,
  findTurnDirection,
} from './directionResolvers.ts';
import { findStartLocation } from './findStartLocation.ts';
import {
  convertLocationsToCharactersString,
  getAdjacentLocation,
  locationsInclude,
  getLocationCharacter,
} from './locationUtils.ts';
import { validateMapElements } from './validateMapElements.ts';

export function runMapScan(map: GameMap): ScanResult {
  validateMapElements(map);

  const letterCollectionLocations: Location[] = [];
  let pathCharacters: string = '';

  //TODO find end for missing end error
  let currentLocation = findStartLocation(map);
  let currentCharacter: Character | null | undefined = start;
  let currentDirection: Direction = findStartDirection(map, currentLocation);

  while (currentCharacter) {
    pathCharacters += currentCharacter;

    if (currentCharacter === end) break;

    if (
      isLetterCharacter(currentCharacter) &&
      !locationsInclude(letterCollectionLocations, currentLocation)
    ) {
      letterCollectionLocations.push(currentLocation);
    }

    const nextDirection = getNextDirection(map, currentLocation, currentDirection);

    if (nextDirection) {
      currentLocation = getAdjacentLocation(currentLocation, nextDirection);
      currentCharacter = getLocationCharacter(map, currentLocation);
      currentDirection = nextDirection;
    } else {
      currentCharacter = null;
    }
  }

  if (currentCharacter !== end) throw 'Broken path!';

  return {
    letters: convertLocationsToCharactersString(map, letterCollectionLocations),
    pathCharacters,
  };
}

export function getNextDirection(
  map: GameMap,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const character = getLocationCharacter(map, currentLocation);
  if (!character || character === end) return;
  if (character === directY || character === directX) {
    return currentDirection;
  }
  if (character === turn) {
    return findTurnDirection(map, currentLocation, currentDirection);
  }
  if (isLetterCharacter(character)) {
    return findLetterDirection(map, currentLocation, currentDirection);
  } else if (character === start) {
    //TODO remove
    return findStartDirection(map, currentLocation);
  }
}

export function isLetterCharacter(character: Character) {
  return letters.includes(character as Letter);
}
