import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[slice] Works when given start and end indices', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.slice(str, 0, 1), '🇸🇴');
  assertEquals(UtfStringVisual.slice(str, 1, 2), '🇫🇷');
});

Deno.test('[slice] Works when not given an end index', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.slice(str, 0), '🇸🇴🇫🇷');
  assertEquals(UtfStringVisual.slice(str, 1), '🇫🇷');
});

Deno.test('[slice] Weturns an empty string when given out-of-bounds indices', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.slice(str, 4), '');
  assertEquals(UtfStringVisual.slice(str, 4, 5), '');
});
