import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[length] Counts the number of characters in an ASCII string', function () {
  const str = 'abc';
  assertEquals(str.length, 3);
  assertEquals(UtfString.length(str), 3);
});

Deno.test('[length] Counts the number of characters in a multi-byte string', function () {
  const str = 'ありがとう';
  assertEquals(str.length, 5);
  assertEquals(UtfString.length(str), 5);
});

Deno.test('[length] Counts the number of astral plane unicode characters', function () {
  const str = '𤔣';
  assertEquals(str.length, 2);
  assertEquals(UtfString.length(str), 1);
});

Deno.test('[length] Counts the number of astral plane unicode characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(str.length, 8);
  assertEquals(UtfString.length(str), 4);
});

Deno.test('[length] Counts the number of characters in a mixed string', function () {
  const str = 'あaりbがc𤔣dとeうf🇫🇷g';
  assertEquals(UtfString.length(str), 15);
});

Deno.test('[length] Works correctly with newline characters', function () {
  const str = '\u{000D}\u{1F1E6}';
  assertEquals(str.length, 3);
  assertEquals(UtfString.length(str), 2);
});

Deno.test('[length] Returns zero when the string is empty', function () {
  assertEquals(UtfString.length(''), 0);
});
