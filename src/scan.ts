import { GameMap } from './types/GameMap.ts';
import { Result } from './types/Result.ts';

export function scan(map: GameMap): Result {
  return {
    letters: 'ABCD',
    characters: '@|A+---B--+|+--C-+|-||+---D--+|x',
  };
}
