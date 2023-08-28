import { GameMap } from '../models/GameMap.ts';
import { Character } from '../models/Characters.ts';
import { directX, directY, end, letters, start, turn } from '../constants/characters.ts';
import { errorMessages } from '../constants/errorMessages.ts';

export function validateMapElements(map: GameMap) {
  let starts: number = 0;
  let ends: number = 0;
  for (const row of map) {
    for (const element of row) {
      if (!element) continue;

      if (element === start) starts++;
      else if (element === end) ends++;

      if (!isValidCharacter(element)) {
        throw errorMessages.invalidCharacter;
      }
    }
  }

  if (starts < 1) throw errorMessages.startMissing;
  if (starts > 1) throw errorMessages.multiStart;
  if (ends < 1) throw errorMessages.endMissing;

  return true;
}

function isValidCharacter(character: Character) {
  const characters: Character[] = [start, end, directX, directY, turn, ...letters];
  return characters.includes(character);
}
