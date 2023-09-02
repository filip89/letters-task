import { GameMap } from '../models/GameMap.ts';
import { ScanResult } from '../models/ScanResult.ts';
import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { getDirection } from './getDirection.ts';
import { findStartLocation } from './findStartLocation.ts';
import { getAdjacentLocation, isLetterCharacter, readLocationCharacter } from './utils.ts';
import { validateMapElements } from './validateMapElements.ts';
import { errorMessages } from '../constants/errorMessages.ts';
import { characters } from '../constants/characters.ts';

export function runMapScan(map: GameMap): ScanResult {
  validateMapElements(map);

  const path = generatePath(map);

  return {
    letters: readPathLetters(map, path),
    pathCharacters: readPathCharacters(map, path),
  };
}

function generatePath(map: GameMap): Location[] {
  const startLocation = findStartLocation(map);
  const path: Location[] = [startLocation];

  let activeDirection: Direction | undefined = undefined;

  do {
    const currentLocation = path[path.length - 1];
    activeDirection = getDirection(map, currentLocation, activeDirection);

    if (!activeDirection) {
      const isEndReached = readLocationCharacter(map, currentLocation) === characters.end;
      if (isEndReached) {
        break;
      } else {
        throw errorMessages.brokenPath;
      }
    }

    const nextLocation = getAdjacentLocation(currentLocation, activeDirection);
    path.push(nextLocation);
  } while (activeDirection);

  return path;
}

function readPathCharacters(map: GameMap, path: Location[]): string {
  return path.map((location) => readLocationCharacter(map, location)).join('');
}

function readPathLetters(map: GameMap, path: Location[]): string {
  const letterLocations: Location[] = [];

  path.forEach((location) => {
    const character = readLocationCharacter(map, location);
    if (character && isLetterCharacter(character) && !locationsInclude(letterLocations, location)) {
      letterLocations.push(location);
    }
  });

  return readPathCharacters(map, letterLocations);
}

function locationsInclude(locations: Location[], searchLocation: Location) {
  return locations.some(
    (location) => location.y === searchLocation.y && location.x === searchLocation.x,
  );
}
