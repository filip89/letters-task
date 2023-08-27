import { GameMap } from './models/GameMap.ts';
import { ScanResult } from './models/ScanResult.ts';
import {
  directX,
  directY,
  end,
  letters,
  player,
  turn,
} from './constants/config.ts';
import { Location } from './models/Location.ts';
import { Direction } from './models/Direction.ts';
import { Character, Letter } from './models/Characters.ts';
import { direction } from './constants/directions.ts';

export function scan(map: GameMap): ScanResult {
  const letterCollectionLocations: Location[] = [];
  let pathCharacters: string = '';

  //TODO find end for missing end error
  let currentLocation = findStartLocation(map);
  let currentCharacter: Character | null = player;
  let currentDirection: Direction = findAnyPossibleDirection(
    map,
    currentLocation,
  );

  while (currentCharacter) {
    pathCharacters += currentCharacter;

    if (currentCharacter === end) {
      break;
    }

    if (letters.includes(currentCharacter as Letter)) {
      //TODO if not added
      letterCollectionLocations.push(currentLocation);
    }

    const nextDirection = getNextDirection(
      map,
      currentLocation,
      currentDirection,
    );

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
    letters: getCharactersFromLocations(map, letterCollectionLocations),
    characters: pathCharacters,
  };
}

export function getNextDirection(
  map: GameMap,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const character = getLocationCharacter(map, currentLocation);
  if (character === end) return;
  if (character === directY || character === directX) {
    return currentDirection;
  }
  if (character === turn) {
    return findTurnDirection(map, currentLocation, currentDirection);
  }
  if (letters.includes(character as Letter)) {
    const nextDirectCharacter = getAdjacentCharacter(
      map,
      currentLocation,
      currentDirection,
    );
    if (nextDirectCharacter) {
      return currentDirection;
    } else {
      return findTurnDirection(map, currentLocation, currentDirection);
    }
  } else if (character === player) {
    //TODO remove
    return findAnyPossibleDirection(map, currentLocation);
  }
}

export function findTurnDirection(
  map: GameMap,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const possibleDirections: Direction[] = [];
  if (currentDirection.x === 0) {
    possibleDirections.push(...findPossibleXDirections(map, currentLocation));
  } else {
    possibleDirections.push(...findPossibleYDirections(map, currentLocation));
  }

  if (possibleDirections.length > 1) throw Error('Fork found!');
  if (possibleDirections.length === 0) {
    throw Error('Broken path!');
  }

  return possibleDirections[0];
}

export function findStartLocation(map: GameMap): Location {
  const playerLocations: Location[] = [];
  map.forEach((row, y) => {
    row.forEach((element, x) => {
      if (element === player) playerLocations.push({ y, x });
    });
  });

  if (!playerLocations.length) throw Error('Start location missing');
  if (playerLocations.length > 1) throw Error('Multiple start locations');

  return playerLocations[0];
}

export function findAnyPossibleDirection(
  map: GameMap,
  location: Location,
): Direction {
  const possibleDirections: Direction[] = [
    ...findPossibleYDirections(map, location),
    ...findPossibleXDirections(map, location),
  ];

  if (possibleDirections.length > 1) throw Error('Multiple starting paths!');
  if (possibleDirections.length === 0) throw Error('Broken path!');

  return possibleDirections[0];
}

export function findPossibleYDirections(map: GameMap, location: Location) {
  const possibleDirections: Direction[] = [];

  const upCharacter = getAdjacentCharacter(map, location, direction.up);
  if (upCharacter) possibleDirections.push(direction.up);

  const downCharacter = getAdjacentCharacter(map, location, direction.down);
  if (downCharacter) possibleDirections.push(direction.down);

  return possibleDirections;
}

export function findPossibleXDirections(map: GameMap, location: Location) {
  const possibleDirections: Direction[] = [];

  const leftCharacter = getAdjacentCharacter(map, location, direction.left);
  if (leftCharacter) possibleDirections.push(direction.left);

  const rightCharacter = getAdjacentCharacter(map, location, direction.right);
  if (rightCharacter) possibleDirections.push(direction.right);

  return possibleDirections;
}

export function getAdjacentCharacter(
  map: GameMap,
  relativeTo: Location,
  direction: Direction,
) {
  const location = getAdjacentLocation(relativeTo, direction);
  return getLocationCharacter(map, location);
}

export function getLocationCharacter(map: GameMap, location: Location) {
  return map[location.y]?.[location.x];
}

export function getAdjacentLocation(location: Location, direction: Direction) {
  return { y: location.y + direction.y, x: location.x + direction.x };
}

export function getCharactersFromLocations(
  map: GameMap,
  locations: Location[],
): string {
  return locations
    .map((location) => getLocationCharacter(map, location))
    .join('');
}
