import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { isLetterCharacter, readLocationCharacter } from './utils.ts';
import { ScanResult } from '../models/ScanResult.ts';

export function getResultFromPath(map: GameMap, path: Location[]): ScanResult {
  return {
    letters: readPathLetters(map, path),
    pathCharacters: readPathCharacters(map, path),
  };
}

export function readPathCharacters(map: GameMap, path: Location[]): string {
  return path.map((location) => readLocationCharacter(map, location)).join('');
}

export function readPathLetters(map: GameMap, path: Location[]): string {
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
