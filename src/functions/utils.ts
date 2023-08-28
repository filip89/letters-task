import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { GameMap } from '../models/GameMap.ts';
import { Character, Letter } from '../models/Characters.ts';
import { letters } from '../constants/characters.ts';

export function getAdjacentLocation(location: Location, direction: Direction): Location {
  return { y: location.y + direction.y, x: location.x + direction.x };
}

export function readLocationCharacter(map: GameMap, location: Location) {
  return map[location.y]?.[location.x] || null;
}

export function isLetterCharacter(character: Character) {
  return letters.includes(character as Letter);
}
