import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[findCharIndex] Works with regional indicators', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.findCharIndex(str, 0), 0);
  assertEquals(UtfStringVisual.findCharIndex(str, 1), 0);
  assertEquals(UtfStringVisual.findCharIndex(str, 2), 0);
  assertEquals(UtfStringVisual.findCharIndex(str, 3), 0);
  assertEquals(UtfStringVisual.findCharIndex(str, 4), 1);
  assertEquals(UtfStringVisual.findCharIndex(str, 5), 1);
  assertEquals(UtfStringVisual.findCharIndex(str, 6), 1);
  assertEquals(UtfStringVisual.findCharIndex(str, 7), 1);
  assertEquals(UtfStringVisual.findCharIndex(str, 8), -1);
});
