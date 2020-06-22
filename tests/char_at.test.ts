import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[charAt] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.charAt(str, 0), 'a');
  assertEquals(UtfString.charAt(str, 1), 'b');
  assertEquals(UtfString.charAt(str, 2), 'c');
});

Deno.test('[charAt] Works with multi-byte characters', function () {
  const str = 'ありがとう'; // "arigatou"
  assertEquals(UtfString.charAt(str, 0), 'あ'); // "a"
  assertEquals(UtfString.charAt(str, 1), 'り'); // "ri"
  assertEquals(UtfString.charAt(str, 2), 'が'); // "ga"
  assertEquals(UtfString.charAt(str, 3), 'と'); // "to"
  assertEquals(UtfString.charAt(str, 4), 'う'); // "u"
});

Deno.test('[charAt] Works with astral plane unicode characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.charAt(str, 0), '𤔣');
  assertEquals(UtfString.charAt(str, 1), '𤔤');
  assertEquals(UtfString.charAt(str, 2), '𤔥');
  assertEquals(UtfString.charAt(str, 3), '𤔦');
});

Deno.test('[charAt] Returns an empty string for indices that are out of range', function () {
  const str = 'abc';
  assertEquals(UtfString.charAt(str, 3), '');
});
