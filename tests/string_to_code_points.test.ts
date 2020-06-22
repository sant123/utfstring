import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[stringToCodePoints] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.stringToCodePoints(str), [97, 98, 99]);
});

Deno.test('[stringToCodePoints] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.stringToCodePoints(str), [12354, 12426, 12364, 12392, 12358]);
});

Deno.test('[stringToCodePoints] Works with unicode astral plane characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.stringToCodePoints(str), [148771, 148772, 148773, 148774]);
});

Deno.test('[stringToCodePoints] Works with mixed astral and non-astral plane characters', function () {
  const str = '\u0001\u{1F1E6}\u0002';
  assertEquals(UtfString.stringToCodePoints(str), [1, 127462, 2]);
});

Deno.test('[stringToCodePoints] Works with regional indicators', function () {
  const str = '🇫🇷';
  assertEquals(UtfString.stringToCodePoints(str), [127467, 127479]);
});
