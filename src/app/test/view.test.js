process.env.NODE_ENV = 'test';
const { formatDate } = require('../js/view');

describe('test1', () => {
  test('test', () => {
    expect(formatDate(new Date(0))).toBe('January 1, 1970');
  });
});
