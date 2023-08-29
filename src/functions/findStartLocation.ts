import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { errorMessages } from '../constants/errorMessages.ts';
import { characters } from '../constants/characters.ts';

export function findStartLocation(map: GameMap): Location {
  const startLocations: Location[] = [];
  map.forEach((row, y) => {
    row.forEach((element, x) => {
      if (element === characters.start) startLocations.push({ y, x });
    });
  });

  if (!startLocations.length) throw errorMessages.startMissing;
  if (startLocations.length > 1) throw errorMessages.multiStart;

  return startLocations[0];
}
