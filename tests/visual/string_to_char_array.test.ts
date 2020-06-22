import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfStringVisual } from '../../utfstring.ts';

Deno.test('[stringToCharArray] Works with regional indicators', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfStringVisual.stringToCharArray(str), ['🇸🇴', '🇫🇷']);
});
