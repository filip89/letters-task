import { scan } from '../scan.ts';
import { map2 } from '../maps/map2.ts';
import { describe, expect, it } from 'vitest';

describe('scan', () => {
  it('should return correct results when passed in a valid map', () => {
    const result = scan(map2);
    expect(result.letters).toBe('ABCD');
    expect(result.characters).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
  });
});
