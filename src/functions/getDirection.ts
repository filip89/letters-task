import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { directions } from '../constants/directions.ts';

import { getAdjacentLocation, isLetterCharacter, readLocationCharacter } from './utils.ts';
import { Character } from '../models/Characters.ts';
import { errorMessages } from '../constants/errorMessages.ts';
import { characters } from '../constants/characters.ts';

export function getDirection(map: GameMap, currentLocation: Location, activeDirection?: Direction) {
  if (!activeDirection) return findStartingDirection(map, currentLocation);
  const character = readLocationCharacter(map, currentLocation);
  if (!character || character === characters.end) return;
  if (isDirectCharacter(character)) return activeDirection;
  if (character === characters.turn)
    return findTurnDirection(map, currentLocation, activeDirection);
  if (isLetterCharacter(character)) {
    return findLetterDirection(map, currentLocation, activeDirection);
  }
}

function findStartingDirection(map: GameMap, location: Location): Direction {
  const possibleDirections: Direction[] = [
    ...findPossibleVerticalDirections(map, location),
    ...findPossibleHorizontalDirections(map, location),
  ];

  if (possibleDirections.length > 1) throw errorMessages.multiStartPaths;
  if (possibleDirections.length === 0) throw errorMessages.brokenPath;

  return possibleDirections[0];
}

function isDirectCharacter(character: Character) {
  return character === characters.directY || character === characters.directX;
}

function findTurnDirection(map: GameMap, currentLocation: Location, currentDirection: Direction) {
  const possibleDirections: Direction[] = [];
  if (currentDirection.x === 0) {
    possibleDirections.push(...findPossibleHorizontalDirections(map, currentLocation));
  } else {
    possibleDirections.push(...findPossibleVerticalDirections(map, currentLocation));
  }

  if (possibleDirections.length > 1) throw errorMessages.forkFound;
  if (possibleDirections.length === 0) {
    if (getAdjacentCharacter(map, currentLocation, currentDirection)) {
      throw errorMessages.fakeTurn;
    }
    throw errorMessages.brokenPath;
  }

  return possibleDirections[0];
}

function findLetterDirection(map: GameMap, currentLocation: Location, currentDirection: Direction) {
  const nextDirectCharacter = getAdjacentCharacter(map, currentLocation, currentDirection);
  if (nextDirectCharacter) {
    return currentDirection;
  } else {
    return findTurnDirection(map, currentLocation, currentDirection);
  }
}

function findPossibleVerticalDirections(map: GameMap, location: Location) {
  return findPossibleDirections(map, location, [directions.up, directions.down]);
}

function findPossibleHorizontalDirections(map: GameMap, location: Location) {
  return findPossibleDirections(map, location, [directions.left, directions.right]);
}

function findPossibleDirections(map: GameMap, location: Location, allowedDirections: Direction[]) {
  const possibleDirections: Direction[] = [];

  allowedDirections.forEach((allowedDirection) => {
    const leftCharacter = getAdjacentCharacter(map, location, allowedDirection);
    if (leftCharacter) possibleDirections.push(allowedDirection);
  });

  return possibleDirections;
}

function getAdjacentCharacter(map: GameMap, location: Location, direction: Direction) {
  const adjacentLocation = getAdjacentLocation(location, direction);
  return readLocationCharacter(map, adjacentLocation);
}
