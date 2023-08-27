import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { directions } from '../constants/directions.ts';

import { getAdjacentCharacter } from './locationUtils.ts';

export function findStartDirection(map: GameMap, location: Location): Direction {
  const possibleDirections: Direction[] = [
    ...findDirectionsForVerticalCharacters(map, location),
    ...findDirectionsForHorizontalCharacters(map, location),
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
    possibleDirections.push(...findDirectionsForHorizontalCharacters(map, currentLocation));
  } else {
    possibleDirections.push(...findDirectionsForVerticalCharacters(map, currentLocation));
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

export function findDirectionsForVerticalCharacters(map: GameMap, location: Location) {
  const possibleDirections: Direction[] = [];

  const characterAbove = getAdjacentCharacter(map, location, directions.up);
  if (characterAbove) possibleDirections.push(directions.up);

  const characterBelow = getAdjacentCharacter(map, location, directions.down);
  if (characterBelow) possibleDirections.push(directions.down);

  return possibleDirections;
}

export function findDirectionsForHorizontalCharacters(map: GameMap, location: Location) {
  const possibleDirections: Direction[] = [];

  const leftCharacter = getAdjacentCharacter(map, location, directions.left);
  if (leftCharacter) possibleDirections.push(directions.left);

  const rightCharacter = getAdjacentCharacter(map, location, directions.right);
  if (rightCharacter) possibleDirections.push(directions.right);

  return possibleDirections;
}
