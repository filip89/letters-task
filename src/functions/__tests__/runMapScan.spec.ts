import { describe, expect, it, test } from 'vitest';
import { runMapScan } from '../runMapScan.ts';
import { GameMap } from '../../models/GameMap.ts';
import { ScanResult } from '../../models/ScanResult.ts';
import { defaultMaps } from '../../constants/defaultMaps.ts';
import { errorMessages } from '../../constants/errorMessages.ts';

function testMap(map: GameMap, expectedResult: ScanResult) {
  const result = runMapScan(map);
  expect(result.letters).toBe(expectedResult.letters);
  expect(result.pathCharacters).toBe(expectedResult.pathCharacters);
}

describe('runMapScan', () => {
  describe('test default maps results', () => {
    for (const [key, value] of Object.entries(defaultMaps)) {
      test(key, () => {
        testMap(value.map, value.result);
      });
    }
  });

  describe('test error maps', () => {
    it('should throw if start is missing', function () {
      const map: GameMap = [
        [null, null, null, '-', 'A', '-', '-', '-', '+'],
        [null, null, null, null, null, null, null, null, '|'],
        ['x', '-', 'B', '-', '+', null, null, null, 'C'],
        [null, null, null, null, '|', null, null, null, '|'],
        [null, null, null, null, '+', '-', '-', '-', '+'],
      ];
      expect(() => runMapScan(map)).toThrow(errorMessages.startMissing);
    });

    it('should throw if end is missing', function () {
      const map: GameMap = [
        [null, null, '@', '-', 'A', '-', '-', '-', '+'],
        [null, null, null, null, null, null, null, null, '|'],
        [null, null, 'B', '-', '+', null, null, null, 'C'],
        [null, null, null, null, '|', null, null, null, '|'],
        [null, null, null, null, '+', '-', '-', '-', '+'],
      ];
      expect(() => runMapScan(map)).toThrow(errorMessages.endMissing);
    });

    it('should throw if has multiple starts', function () {
      const map1: GameMap = [
        [null, '@', '-', '-', 'A', '-', '@', '-', '+'],
        [null, null, null, null, null, null, null, null, '|'],
        ['x', '-', 'B', '-', '+', null, null, null, 'C'],
        [null, null, null, null, '|', null, null, null, '|'],
        [null, null, null, null, '+', '-', '-', '-', '+'],
      ];
      expect(() => runMapScan(map1)).toThrow(errorMessages.multiStart);

      const map2: GameMap = [
        [null, '@', '-', '-', 'A', '-', '-', '-', '+'],
        [null, null, null, null, null, null, null, null, '|'],
        [null, null, null, null, null, null, null, null, 'C'],
        [null, null, null, null, null, null, null, null, 'x'],
        [null, null, null, null, '@', '-', 'B', '-', '+'],
      ];
      expect(() => runMapScan(map2)).toThrow(errorMessages.multiStart);

      const map3: GameMap = [
        [null, '@', '-', '-', 'A', '-', '-', 'x'],
        [],
        ['x', '-', 'B', '-', '+'],
        [null, null, null, null, '|'],
        [null, null, null, null, '@'],
      ];
      expect(() => runMapScan(map3)).toThrow(errorMessages.multiStart);
    });

    it('should throw when if has a fork in path', function () {
      const map: GameMap = [
        [null, 'x', '-', 'A', '-', 'B', '-', '+'],
        [null, null, null, null, null, null, null, '|'],
        ['@', '-', '-', 'A', '-', '-', '-', '+'],
        [null, null, null, null, null, null, null, '|'],
        [null, null, 'x', '+', null, null, null, 'C'],
        [null, null, null, '|', null, null, null, '|'],
        [null, null, null, '+', '-', '-', '-', '+'],
      ];
      expect(() => runMapScan(map)).toThrow(errorMessages.forkFound);
    });

    it('should throw if has broken path', function () {
      const map: GameMap = [
        ['@', '-', '-', 'A', '-', '+'],
        [null, null, null, null, null, '|'],
        [],
        [null, null, null, null, null, 'B', '-', 'x'],
      ];
      expect(() => runMapScan(map)).toThrow(errorMessages.brokenPath);
    });

    it('should throw if has multiple starting paths', function () {
      const map: GameMap = [['x', '-', 'B', '-', '@', '-', 'A', '-', 'x']];
      expect(() => runMapScan(map)).toThrow(errorMessages.multiStartPaths);
    });

    it('should throw if has fake turn', function () {
      const map: GameMap = [['@', '-', 'A', '-', '+', '-', 'B', '-', 'x']];
      //TODO could check at findTurnDirection whether it can keep same direction and then throw 'Fake turn'
      expect(() => runMapScan(map)).toThrow(errorMessages.brokenPath);
    });
  });
});
