import { GameMap } from './models/GameMap.ts';
import { Character } from './models/Characters.ts';
import {
  directX,
  directY,
  end,
  letters,
  player,
  turn,
} from './constants/config.ts';

const characters: Character[] = [
  player,
  end,
  directX,
  directY,
  turn,
  ...letters,
];

export function validateMapElements(map: GameMap) {
  for (const row of map) {
    for (const element of row) {
      if (element === null) continue;
      if (isValidCharacter(element)) continue;
      throw Error('Map contains invalid characters');
    }
  }
  return true;
}

export function isValidCharacter(character: Character) {
  return characters.includes(character);
}
