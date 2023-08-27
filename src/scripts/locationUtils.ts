import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { GameMap } from '../models/GameMap.ts';

export function locationsInclude(locations: Location[], searchLocation: Location) {
  return !!locations.find(
    (location) => location.y === searchLocation.y && location.x === searchLocation.x,
  );
}

export function getLocationCharacter(map: GameMap, location: Location) {
  return map[location.y]?.[location.x];
}

export function getAdjacentLocation(location: Location, direction: Direction): Location {
  return { y: location.y + direction.y, x: location.x + direction.x };
}

export function getAdjacentCharacter(map: GameMap, location: Location, direction: Direction) {
  const adjacentLocation = getAdjacentLocation(location, direction);
  return getLocationCharacter(map, adjacentLocation);
}

export function convertLocationsToCharactersString(map: GameMap, locations: Location[]): string {
  return locations.map((location) => getLocationCharacter(map, location)).join('');
}
