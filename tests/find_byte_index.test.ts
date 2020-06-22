import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[findByteIndex] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.findByteIndex(str, 0), 0);
  assertEquals(UtfString.findByteIndex(str, 1), 1);
  assertEquals(UtfString.findByteIndex(str, 2), 2);
  assertEquals(UtfString.findByteIndex(str, 3), -1);
});

Deno.test('[findByteIndex] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.findByteIndex(str, 0), 0);
  assertEquals(UtfString.findByteIndex(str, 1), 1);
  assertEquals(UtfString.findByteIndex(str, 2), 2);
  assertEquals(UtfString.findByteIndex(str, 3), 3);
  assertEquals(UtfString.findByteIndex(str, 4), 4);
  assertEquals(UtfString.findByteIndex(str, 5), -1);
});

Deno.test('[findByteIndex] Works with astral plane unicode characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.findByteIndex(str, 0), 0);
  assertEquals(UtfString.findByteIndex(str, 1), 2);
  assertEquals(UtfString.findByteIndex(str, 2), 4);
  assertEquals(UtfString.findByteIndex(str, 3), 6);
  assertEquals(UtfString.findByteIndex(str, 4), -1);
});

Deno.test('[findByteIndex] Works with mixed characters', function () {
  const str = '\u{0001}\u{1F1E6}';
  assertEquals(UtfString.findByteIndex(str, 0), 0);
  assertEquals(UtfString.findByteIndex(str, 1), 1);
});
