import { GameMap } from '../models/GameMap.ts';
import { ScanResult } from '../models/ScanResult.ts';
import { end } from '../constants/characters.ts';
import { Location } from '../models/Location.ts';
import { Direction } from '../models/Direction.ts';
import { getDirection } from './getDirection.ts';
import { findStartLocation } from './findStartLocation.ts';
import { getAdjacentLocation, readLocationCharacter } from './utils.ts';
import { validateMapElements } from './validateMapElements.ts';
import { getResultFromPath } from './getResultFromPath.ts';

export function runMapScan(map: GameMap): ScanResult {
  validateMapElements(map);
  const path = generatePath(map);
  return getResultFromPath(map, path);
}

function generatePath(map: GameMap): Location[] {
  const startLocation = findStartLocation(map);
  const path: Location[] = [startLocation];

  let activeDirection: Direction | undefined = undefined;

  do {
    const currentLocation = path[path.length - 1];
    activeDirection = getDirection(map, currentLocation, activeDirection);

    if (!activeDirection) {
      const isEndReached = readLocationCharacter(map, currentLocation) === end;
      if (isEndReached) {
        break;
      } else {
        throw 'Broken path!';
      }
    }

    const nextLocation = getAdjacentLocation(currentLocation, activeDirection);
    path.push(nextLocation);
  } while (activeDirection);

  return path;
}
