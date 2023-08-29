import { GameMap } from '../models/GameMap.ts';
import { Character } from '../models/Characters.ts';
import { errorMessages } from '../constants/errorMessages.ts';
import { characters } from '../constants/characters.ts';

export function validateMapElements(map: GameMap) {
  let starts: number = 0;
  let ends: number = 0;
  for (const row of map) {
    for (const element of row) {
      if (!element) continue;

      if (element === characters.start) starts++;
      else if (element === characters.end) ends++;

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
  return [
    characters.start,
    characters.end,
    characters.directX,
    characters.directY,
    characters.turn,
    ...characters.letters,
  ].includes(character);
}
