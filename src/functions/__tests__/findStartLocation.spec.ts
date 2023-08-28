import { describe, expect, it } from 'vitest';
import { findStartLocation } from '../findStartLocation.ts';
import { errorMessages } from '../../constants/errorMessages.ts';

describe('findStartLocation', () => {
  it('should return correct start location if map has a single start', () => {
    const start1 = findStartLocation([[], [null, null, '@']]);
    expect(start1).toStrictEqual({ y: 1, x: 2 });
    const start2 = findStartLocation([[null, '@']]);
    expect(start2).toStrictEqual({ y: 0, x: 1 });
  });

  it('should throw an error if start is missing', () => {
    expect(() => findStartLocation([['-', 'A', '-']])).toThrow(errorMessages.startMissing);
  });

  it('should throw an error if multiple starts present', () => {
    expect(() => findStartLocation([['@', 'A', '@']])).toThrow(errorMessages.multiStart);
  });
});
