import { intersectionMap } from './intersectionMap.ts';
import { basicMap } from './basicMap.ts';
import { sameLocationLetterMap } from './sameLocationLetterMap.ts';
import { compactMap } from './compactMap.ts';
import { ignoreMap } from './ignoreMap.ts';

export const defaultMaps = {
  basic: basicMap,
  intersection: intersectionMap,
  sameLocationLetter: sameLocationLetterMap,
  compact: compactMap,
  ignore: ignoreMap,
};
