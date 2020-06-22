import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[findCharIndex] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.findCharIndex(str, 0), 0);
  assertEquals(UtfString.findCharIndex(str, 1), 1);
  assertEquals(UtfString.findCharIndex(str, 2), 2);
  assertEquals(UtfString.findCharIndex(str, 3), -1);
});

Deno.test('[findCharIndex] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.findCharIndex(str, 0), 0);
  assertEquals(UtfString.findCharIndex(str, 1), 1);
  assertEquals(UtfString.findCharIndex(str, 2), 2);
  assertEquals(UtfString.findCharIndex(str, 3), 3);
  assertEquals(UtfString.findCharIndex(str, 4), 4);
  assertEquals(UtfString.findCharIndex(str, 5), -1);
});

Deno.test('[findCharIndex] Works with astral plane unicode characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.findCharIndex(str, 0), 0);
  assertEquals(UtfString.findCharIndex(str, 1), 0);
  assertEquals(UtfString.findCharIndex(str, 2), 1);
  assertEquals(UtfString.findCharIndex(str, 3), 1);
  assertEquals(UtfString.findCharIndex(str, 4), 2);
  assertEquals(UtfString.findCharIndex(str, 5), 2);
  assertEquals(UtfString.findCharIndex(str, 6), 3);
  assertEquals(UtfString.findCharIndex(str, 7), 3);
  assertEquals(UtfString.findCharIndex(str, 8), -1);
});

Deno.test('[findCharIndex] Works with a newline character', function () {
  const str = '\u{000D}\u{1F1E6}';
  assertEquals(UtfString.findCharIndex(str, 0), 0);
  assertEquals(UtfString.findCharIndex(str, 1), 1);
  assertEquals(UtfString.findCharIndex(str, 2), 1);
});
