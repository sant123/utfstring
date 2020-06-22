import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[bytesToString] Works with standard ASCII characters', function () {
  const arr = [0, 97, 0, 98, 0, 99];
  assertEquals(UtfString.bytesToString(arr), 'abc');
});

Deno.test('[bytesToString] Works with multi-byte characters', function () {
  const arr = [48, 66, 48, 138, 48, 76, 48, 104, 48, 70];
  assertEquals(UtfString.bytesToString(arr), 'ありがとう');
});

Deno.test('[bytesToString] Works with unicode astral plane characters', function () {
  const arr = [216, 81, 221, 35, 216, 81, 221, 36, 216, 81, 221, 37, 216, 81, 221, 38];
  assertEquals(UtfString.bytesToString(arr), '𤔣𤔤𤔥𤔦');
});

Deno.test('[bytesToString] Works with pairs of regional indicators', function () {
  const arr = [216, 60, 221, 235, 216, 60, 221, 247];
  assertEquals(UtfString.bytesToString(arr), '🇫🇷');
});
