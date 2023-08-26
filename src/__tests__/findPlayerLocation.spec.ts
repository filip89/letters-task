import { describe, expect, it } from 'vitest';
import { findStartLocation } from '../scan.ts';
import { map2 } from '../maps/map2.ts';

describe('findPlayerLocation', () => {
  it('should return player location if player exists', function () {
    const location = findStartLocation(map2);
    expect(location).toStrictEqual({ x: 0, y: 0 });
  });

  it('should throw an error if player is missing', function () {
    expect(() => findStartLocation([['-', 'A', '-']])).toThrow(
      'Player character missing',
    );
  });
});
