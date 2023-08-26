import { GameMap } from './types/GameMap.ts';
import { Character } from './types/Characters.ts';
import { directX, directY, end, letters, player, turn } from './config.ts';

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
      if (!element) continue;
      if (isValidCharacter(element)) continue;
      throw Error('Map contains invalid characters');
    }
  }
  return true;
}

function isValidCharacter(character: Character) {
  return characters.includes(character);
}
