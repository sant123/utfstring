import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[codePointsToString] Works with standard ASCII characters', function () {
  const arr = [97, 98, 99];
  assertEquals(UtfString.codePointsToString(arr), 'abc');
});

Deno.test('[codePointsToString] Works with multi-byte characters', function () {
  const arr = [12354, 12426, 12364, 12392, 12358];
  assertEquals(UtfString.codePointsToString(arr), 'ありがとう');
});

Deno.test('[codePointsToString] Works with characters in the unicode astral plane', function () {
  const arr = [148771, 148772, 148773, 148774];
  assertEquals(UtfString.codePointsToString(arr), '𤔣𤔤𤔥𤔦');
});

Deno.test('[codePointsToString] Works with regional indicators', function () {
  const arr = [127467, 127479];
  assertEquals(UtfString.codePointsToString(arr), '🇫🇷');
});
