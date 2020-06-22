import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[stringToBytes] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.stringToBytes(str), [0, 97, 0, 98, 0, 99]);
});

Deno.test('[stringToBytes] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.stringToBytes(str), [48, 66, 48, 138, 48, 76, 48, 104, 48, 70]);
});

Deno.test('[stringToBytes] Works with regional indicators', function () {
  const str = '🇸🇴🇫🇷';
  assertEquals(UtfString.stringToBytes(str), [216, 60, 221, 248, 216, 60, 221, 244, 216, 60, 221, 235, 216, 60, 221, 247]);
});

Deno.test('[stringToBytes] Works with unicode astral plane characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.stringToBytes(str), [216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38]);
});
