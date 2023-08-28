import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { start } from '../constants/characters.ts';
import { errorMessages } from '../constants/errorMessages.ts';

export function findStartLocation(map: GameMap): Location {
  const startLocations: Location[] = [];
  map.forEach((row, y) => {
    row.forEach((element, x) => {
      if (element === start) startLocations.push({ y, x });
    });
  });

  if (!startLocations.length) throw errorMessages.startMissing;
  if (startLocations.length > 1) throw errorMessages.multiStart;

  return startLocations[0];
}
