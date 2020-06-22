import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[substr] Works when given a start and a length', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.substr(str, 0, 1), '🇸🇴');
  assertEquals(UtfStringVisual.substr(str, 1, 1), '🇫🇷');
});

Deno.test('[substr] Works when not given a length', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.substr(str, 0), '🇸🇴🇫🇷');
  assertEquals(UtfStringVisual.substr(str, 1), '🇫🇷');
});

Deno.test('[substr] Returns an empty string if given an out-of-bounds start', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.substr(str, 4, 1), '');
});

Deno.test('[substr] Returns up to the length of the string if given an out-of-bounds length', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.substr(str, 1, 10), '🇫🇷');
});

Deno.test('[substr] Accepts a negative start value', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.substr(str, -1, 1), '🇫🇷');
  assertEquals(UtfStringVisual.substr(str, -2, 1), '🇸🇴');
});

Deno.test('[substr] Returns an empty string if the negative start value is out-of-bounds', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.substr(str, -3, 1), '');
});
