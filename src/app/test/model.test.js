import {
  calculateDayDifference,
  getCountdown,
  getNights,
} from '../js/model.js';

describe('Date Calculations', () => {
  describe('calculateDayDifference()', () => {
    test('Same Day', () => {
      expect(calculateDayDifference(new Date(0), new Date(0))).toBe(0);
      expect(calculateDayDifference(new Date(1), new Date(1))).toBe(0);
      expect(
        calculateDayDifference(new Date(1628750765001), new Date(1628750765002))
      ).toBe(0);
    });
    test('1 Day', () => {
      expect(calculateDayDifference(new Date(86400000), new Date(0))).toBe(1);
      expect(calculateDayDifference(new Date(86400001), new Date(1))).toBe(1);
      expect(
        calculateDayDifference(new Date(1628750765001), new Date(1628664365001))
      ).toBe(1);
    });
    test('-1 Day', () => {
      expect(
        calculateDayDifference(new Date(86400000), new Date(172800000))
      ).toBe(-1);
      expect(
        calculateDayDifference(new Date(86400001), new Date(172800001))
      ).toBe(-1);
      expect(
        calculateDayDifference(new Date(1628577965001), new Date(1628664365001))
      ).toBe(-1);
    });
  });

  describe('getCountdown()', () => {
    test('Today', () => {
      expect(getCountdown(new Date(0), new Date(0))).toBe('Today');
    });
    test('Tomorrow', () => {
      expect(getCountdown(new Date(86400000), new Date(0))).toBe('Tomorrow');
    });
    test('Yesterday', () => {
      expect(getCountdown(new Date(86400000), new Date(172800000))).toBe(
        'Yesterday'
      );
    });
    test('2 days ago', () => {
      expect(getCountdown(new Date(0), new Date(172800000))).toBe('2 days ago');
    });
    test('in 2 days', () => {
      expect(getCountdown(new Date(172800000), new Date(0))).toBe('in 2 days');
    });
  });

  describe('getNights()', () => {
    test('0 Nights', () => {
      expect(getNights(new Date(0), new Date(0))).toBe('0 Nights');
    });
    test('1 Night', () => {
      expect(getNights(new Date(86400000), new Date(0))).toBe('1 Night');
    });
    test('2 Nights', () => {
      expect(getNights(new Date(172800000), new Date(0))).toBe('2 Nights');
    });
    test('Back to Future', () => {
      expect(getNights(new Date(0), new Date(172800000))).toBe(
        'Back to Future?'
      );
    });
  });
});
