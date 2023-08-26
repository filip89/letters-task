import { describe, expect, it } from 'vitest';
import { validateMapElements } from '../validateMapElements.ts';
import { map2 } from '../maps/map2.ts';

describe('validateMapElements', () => {
  it('should return true if character is valid', function () {
    const result = validateMapElements(map2);
    expect(result).toBeTruthy();
  });
});
