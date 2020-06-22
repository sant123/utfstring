import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[indexOf] Works with regional indicators', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.indexOf(str, '🇸🇴'), 0);
  assertEquals(UtfStringVisual.indexOf(str, '🇫🇷'), 1);
  assertEquals(UtfStringVisual.indexOf(str, '🇸'), 0);
  assertEquals(UtfStringVisual.indexOf(str, '🇴'), 0);
  assertEquals(UtfStringVisual.indexOf(str, '🇫'), 1);
  assertEquals(UtfStringVisual.indexOf(str, '🇷'), 1);
});
