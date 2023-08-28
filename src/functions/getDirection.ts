import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { directions } from '../constants/directions.ts';

import { getAdjacentLocation, isLetterCharacter, readLocationCharacter } from './utils.ts';
import { directX, directY, end, turn } from '../constants/characters.ts';
import { Character } from '../models/Characters.ts';

export function getDirection(map: GameMap, currentLocation: Location, activeDirection?: Direction) {
  if (!activeDirection) return findInitialDirection(map, currentLocation);
  const character = readLocationCharacter(map, currentLocation);
  if (!character || character === end) return;
  if (isDirectCharacter(character)) return activeDirection;
  if (character === turn) return findTurnDirection(map, currentLocation, activeDirection);
  if (isLetterCharacter(character))
    return findLetterDirection(map, currentLocation, activeDirection);
}

function isDirectCharacter(character: Character) {
  return character === directY || character === directX;
}

export function findInitialDirection(map: GameMap, location: Location): Direction {
  const possibleDirections: Direction[] = [
    ...findVerticalPathDirections(map, location),
    ...findHorizontalPathDirections(map, location),
  ];

  if (possibleDirections.length > 1) throw Error('Multiple starting paths!');
  if (possibleDirections.length === 0) throw Error('Broken path!');

  return possibleDirections[0];
}

export function findTurnDirection(
  map: GameMap,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const possibleDirections: Direction[] = [];
  if (currentDirection.x === 0) {
    possibleDirections.push(...findHorizontalPathDirections(map, currentLocation));
  } else {
    possibleDirections.push(...findVerticalPathDirections(map, currentLocation));
  }

  if (possibleDirections.length > 1) throw Error('Fork found!');
  if (possibleDirections.length === 0) throw Error('Broken path!');

  return possibleDirections[0];
}

export function findLetterDirection(
  map: GameMap,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const nextDirectCharacter = getAdjacentCharacter(map, currentLocation, currentDirection);
  if (nextDirectCharacter) {
    return currentDirection;
  } else {
    return findTurnDirection(map, currentLocation, currentDirection);
  }
}

export function findVerticalPathDirections(map: GameMap, location: Location) {
  const possibleDirections: Direction[] = [];

  const characterAbove = getAdjacentCharacter(map, location, directions.up);
  if (characterAbove) possibleDirections.push(directions.up);

  const characterBelow = getAdjacentCharacter(map, location, directions.down);
  if (characterBelow) possibleDirections.push(directions.down);

  return possibleDirections;
}

export function findHorizontalPathDirections(map: GameMap, location: Location) {
  const possibleDirections: Direction[] = [];

  const leftCharacter = getAdjacentCharacter(map, location, directions.left);
  if (leftCharacter) possibleDirections.push(directions.left);

  const rightCharacter = getAdjacentCharacter(map, location, directions.right);
  if (rightCharacter) possibleDirections.push(directions.right);

  return possibleDirections;
}

function getAdjacentCharacter(map: GameMap, location: Location, direction: Direction) {
  const adjacentLocation = getAdjacentLocation(location, direction);
  return readLocationCharacter(map, adjacentLocation);
}
