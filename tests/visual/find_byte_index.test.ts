import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[findByteIndex] Works with regional indicators', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.findByteIndex(str, 0), 0);
  assertEquals(UtfStringVisual.findByteIndex(str, 1), 4);
  assertEquals(UtfStringVisual.findByteIndex(str, 2), -1);
});
