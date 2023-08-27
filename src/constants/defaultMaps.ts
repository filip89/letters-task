import { intersectionMap } from './maps/intersectionMap.ts';
import { basicMap } from './maps/basicMap.ts';
import { sameLocationLetterMap } from './maps/sameLocationLetterMap.ts';
import { compactMap } from './maps/compactMap.ts';
import { ignoreMap } from './maps/ignoreMap.ts';
import { GameMap } from '../models/GameMap.ts';
import { ScanResult } from '../models/ScanResult.ts';

export const defaultMaps = {
  basic: basicMap,
  intersection: intersectionMap,
  sameLocationLetter: sameLocationLetterMap,
  compact: compactMap,
  ignore: ignoreMap,
};

export type DefaultMapInfo = {
  map: GameMap;
  result: ScanResult;
};
