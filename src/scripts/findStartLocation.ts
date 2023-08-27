import { GameMap } from '../models/GameMap.ts';
import { Location } from '../models/Location.ts';
import { start } from '../constants/characters.ts';

export function findStartLocation(map: GameMap): Location {
  const startLocations: Location[] = [];
  map.forEach((row, y) => {
    row.forEach((element, x) => {
      if (element === start) startLocations.push({ y, x });
    });
  });

  if (!startLocations.length) throw Error('Start character missing');
  if (startLocations.length > 1) throw Error('Multiple start characters');

  return startLocations[0];
}
