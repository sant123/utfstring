import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[indexOf] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.indexOf(str, 'a'), 0);
  assertEquals(UtfString.indexOf(str, 'b'), 1);
  assertEquals(UtfString.indexOf(str, 'c'), 2);
});

Deno.test('[indexOf] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.indexOf(str, 'あ'), 0);
  assertEquals(UtfString.indexOf(str, 'り'), 1);
  assertEquals(UtfString.indexOf(str, 'が'), 2);
  assertEquals(UtfString.indexOf(str, 'と'), 3);
  assertEquals(UtfString.indexOf(str, 'う'), 4);
});

Deno.test('[indexOf] Works with astral plane unicode characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(str.indexOf('𤔣'), 0);
  assertEquals(UtfString.indexOf(str, '𤔣'), 0);

  assertEquals(str.indexOf('𤔤'), 2);
  assertEquals(UtfString.indexOf(str, '𤔤'), 1);

  assertEquals(str.indexOf('𤔥'), 4);
  assertEquals(UtfString.indexOf(str, '𤔥'), 2);

  assertEquals(str.indexOf('𤔦'), 6);
  assertEquals(UtfString.indexOf(str, '𤔦'), 3);
});

Deno.test('[indexOf] Works with mixed characters', function () {
  const str = 'あaりbがc𤔣dとeうf';
  assertEquals(UtfString.indexOf(str, 'a'), 1);
  assertEquals(UtfString.indexOf(str, 'が'), 4);
  assertEquals(UtfString.indexOf(str, '𤔣'), 6);
  assertEquals(UtfString.indexOf(str, 'e'), 9);
});

Deno.test('[indexOf] Returns -1 if search value is not found', function () {
  assertEquals(UtfString.indexOf('abc', 'd'), -1);
});

Deno.test('[indexOf] Respects the start parameter', function () {
  assertEquals(UtfString.indexOf('abcabc', 'b', 2), 4);
  assertEquals(UtfString.indexOf('ありがとうり', 'り', 2), 5);
  assertEquals(UtfString.indexOf('𤔣𤔤𤔥𤔤𤔦', '𤔤', 2), 3);
});
