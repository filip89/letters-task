import { describe, expect, it } from 'vitest';
import { validateMapElements } from '../validateMapElements.ts';
import { intersectionMap } from '../../constants/maps/intersectionMap.ts';
import { GameMap } from '../../models/GameMap.ts';
import { errorMessages } from '../../constants/errorMessages.ts';

describe('validateMapElements', () => {
  it('should return true if map contains valid elements', function () {
    const result = validateMapElements(intersectionMap.map);
    expect(result).toBeTruthy();
  });

  it('should throw if map contains invalid elements', function () {
    const validate = () => validateMapElements([['@', '-', 'x', 'd']] as GameMap);
    expect(validate).toThrow(errorMessages.invalidCharacter);
  });

  it('should throw if map contains multiple starts', function () {
    const validate = () => validateMapElements([['@', '-', '@', '-', 'x']]);
    expect(validate).toThrow(errorMessages.multiStart);
  });

  it('should throw if map contains no start', function () {
    const validate = () => validateMapElements([['A', '-', 'x']]);
    expect(validate).toThrow(errorMessages.startMissing);
  });

  it('should throw if map contains no end', function () {
    const validate = () => validateMapElements([['@', '-', '-']]);
    expect(validate).toThrow(errorMessages.endMissing);
  });
});
