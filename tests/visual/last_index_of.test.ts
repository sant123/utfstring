import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[lastIndexOf] Works with regional indicators', function () {
  const str = '🇫🇷🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.lastIndexOf(str, '🇫🇷'), 2);
  assertEquals(UtfStringVisual.lastIndexOf(str, '🇫'), 2);
  assertEquals(UtfStringVisual.lastIndexOf(str, '🇷'), 2);
  assertEquals(UtfStringVisual.lastIndexOf(str, '🇸🇴'), 1);
});
