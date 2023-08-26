import { describe, expect, it } from 'vitest';
import { validateMapElements } from '../validateMapElements.ts';
import { intersectionMap } from '../maps/valid/intersectionMap.ts';

describe('validateMapElements', () => {
  it('should return true if character is valid', function () {
    const result = validateMapElements(intersectionMap);
    expect(result).toBeTruthy();
  });
});
