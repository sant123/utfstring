import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[charAt] Works with regional indicators', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.charAt(str, 0), '🇸🇴');
  assertEquals(UtfStringVisual.charAt(str, 1), '🇫🇷');
});
