import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[length] Correctly counts single regional indicator characters', function () {
  const str = '🇸';
  assertEquals(str.length, 2);
  assertEquals(UtfStringVisual.length(str), 1);
});

Deno.test('[length] Correctly counts pairs of regional indicator characters', function () {
  const str = '🇸🇴';
  assertEquals(str.length, 4);
  assertEquals(UtfStringVisual.length(str), 1);
});

Deno.test('[length] Correctly counts multiple pairs of regional indicator characters', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(str.length, 8);
  assertEquals(UtfStringVisual.length(str), 2);
});
