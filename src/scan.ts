import { GameMapScheme } from './models/GameMapScheme.ts';
import { Result } from './models/Result.ts';
import { directX, directY, end, letters, player, turn } from './config.ts';
import { Location } from './models/Location.ts';
import { Direction } from './models/Direction.ts';
import { down, left, right, up } from './constants/directions.ts';
import { Character, Letter } from './models/Characters.ts';

export function scan(map: GameMapScheme): Result {
  const letterCollectionLocations: Location[] = [];
  let pathCharacters: string = '';

  let currentLocation = findStartLocation(map);
  let currentCharacter: Character | null = player;

  let currentDirection: Direction = findAnyPossibleDirection(
    map,
    currentLocation,
  );

  while (currentCharacter && currentCharacter !== end) {
    pathCharacters += currentCharacter;
    if (letters.includes(currentCharacter as Letter)) {
      //TODO if not added already
      letterCollectionLocations.push(currentLocation);
    }

    const nextDirection = getNextDirection(
      map,
      currentLocation,
      currentDirection,
    );

    if (nextDirection) {
      currentLocation = getAdjacentLocation(currentLocation, currentDirection);
      currentCharacter = getLocationCharacter(map, currentLocation);
      currentDirection = nextDirection;
    }
  }

  return {
    letters: getCharactersFromLocations(map, letterCollectionLocations),
    characters: pathCharacters,
  };
}

export function getNextDirection(
  map: GameMapScheme,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const character = getLocationCharacter(map, currentLocation);
  if (character === end) return;
  if (character === directY || character === directX) {
    return currentDirection;
  } else if (character === turn) {
    return findTurnDirection(map, currentLocation, currentDirection);
  } else if (letters.includes(character as Letter)) {
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
  map: GameMapScheme,
  currentLocation: Location,
  currentDirection: Direction,
) {
  const possibleDirections: Direction[] = [];
  if (currentDirection.x === 0) {
    possibleDirections.push(...findPossibleYDirections(map, currentLocation));
  } else {
    possibleDirections.push(...findPossibleXDirections(map, currentLocation));
  }

  if (possibleDirections.length > 1) throw Error('Fork found!');
  if (possibleDirections.length === 0) throw Error('Broken path!');

  return possibleDirections[0];
}

export function findStartLocation(map: GameMapScheme): Location {
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
  map: GameMapScheme,
  location: Location,
): Direction {
  const possibleDirections: Direction[] = [
    ...findPossibleYDirections(map, location),
    ...findPossibleXDirections(map, location),
  ];

  if (possibleDirections.length > 1) throw Error('Fork found!');
  if (possibleDirections.length === 0) throw Error('Broken path!');

  return possibleDirections[0];
}

export function findPossibleYDirections(
  map: GameMapScheme,
  location: Location,
) {
  const possibleDirections: Direction[] = [];

  const upCharacter = getAdjacentCharacter(map, location, up);
  if (upCharacter) possibleDirections.push(up);

  const downCharacter = getAdjacentCharacter(map, location, down);
  if (downCharacter) possibleDirections.push(down);

  return possibleDirections;
}

export function findPossibleXDirections(
  map: GameMapScheme,
  location: Location,
) {
  const possibleDirections: Direction[] = [];

  const leftCharacter = getAdjacentCharacter(map, location, left);
  if (leftCharacter) possibleDirections.push(left);

  const rightCharacter = getAdjacentCharacter(map, location, right);
  if (rightCharacter) possibleDirections.push(right);

  return possibleDirections;
}

export function getAdjacentCharacter(
  map: GameMapScheme,
  relativeTo: Location,
  direction: Direction,
) {
  const location = getAdjacentLocation(relativeTo, direction);
  return getLocationCharacter(map, location);
}

export function getLocationCharacter(map: GameMapScheme, location: Location) {
  return map[location.y]?.[location.x];
}

export function getAdjacentLocation(location: Location, direction: Direction) {
  return { y: location.y + direction.y, x: location.x + direction.x };
}

export function getCharactersFromLocations(
  map: GameMapScheme,
  locations: Location[],
): string {
  return locations
    .map((location) => getLocationCharacter(map, location))
    .join('');
}
