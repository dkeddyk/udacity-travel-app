/**
 * @jest-environment jsdom
 */

const { JSDOM } = require('jsdom');
require('iconv-lite').encodingExists('foo');

describe('initDateInput', () => {
  test('Dates initialized', () => {
    JSDOM.fromFile('src/app/views/index.html').then((dom) => {
      expect(isNaN(dom.window.document.querySelector('#start').value)).toBe(
        false
      );
      expect(isNaN(dom.window.document.querySelector('#end').value)).toBe(
        false
      );
    });
  });
});
