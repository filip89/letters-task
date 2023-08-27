import { GameMap } from '../models/GameMap.ts';
import { Character } from '../models/Characters.ts';
import { directX, directY, end, letters, start, turn } from '../constants/characters.ts';

const characters: Character[] = [start, end, directX, directY, turn, ...letters];

export function validateMapElements(map: GameMap) {
  let starts: number = 0;
  let ends: number = 0;
  for (const row of map) {
    for (const element of row) {
      if (!element) continue;
      if (!isValidCharacter(element)) {
        throw Error('Map contains invalid characters!');
      }
      if (element === start) starts++;
      else if (element === end) ends++;
    }
  }

  if (starts < 1) throw Error('Missing start character!');
  if (starts > 1) throw Error('Multiple start characters!');
  if (ends < 1) throw Error('Missing end character!');

  return true;
}

export function isValidCharacter(character: Character) {
  return characters.includes(character);
}
