import { scan } from '../scan.ts';
import { intersectionMap } from '../maps/valid/intersectionMap.ts';
import { describe, expect, it } from 'vitest';

describe('scan', () => {
  it('should return correct results when passed in a valid map', () => {
    const result = scan(intersectionMap);
    expect(result.letters).toBe('ABCD');
    expect(result.characters).toBe('@|A+---B--+|+--C-+|-||+---D--+|x');
  });
});
