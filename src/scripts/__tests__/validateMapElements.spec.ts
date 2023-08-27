import { describe, expect, it } from 'vitest';
import { validateMapElements } from '../validateMapElements.ts';
import { intersectionMap } from '../../maps/intersectionMap.ts';
import { GameMap } from '../../models/GameMap.ts';

describe('validateMapElements', () => {
  it('should return true if map contains valid elements', function () {
    const result = validateMapElements(intersectionMap.map);
    expect(result).toBeTruthy();
  });

  it('should throw if map contains invalid elements', function () {
    const validate = () => validateMapElements([['@', '-', 'x', 'd']] as GameMap);
    expect(validate).toThrow('Map contains invalid characters!');
  });

  it('should throw if map contains multiple starts', function () {
    const validate = () => validateMapElements([['@', '-', '@', '-', 'x']]);
    expect(validate).toThrow('Multiple start characters!');
  });

  it('should throw if map contains no start', function () {
    const validate = () => validateMapElements([['A', '-', 'x']]);
    expect(validate).toThrow('Missing start character!');
  });

  it('should throw if map contains no end', function () {
    const validate = () => validateMapElements([['@', '-', '-']]);
    expect(validate).toThrow('Missing end character!');
  });
});
