import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[lastIndexOf] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.lastIndexOf(str, 'a'), 0);
  assertEquals(UtfString.lastIndexOf(str, 'b'), 1);
  assertEquals(UtfString.lastIndexOf(str, 'c'), 2);
});

Deno.test('[lastIndexOf] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.lastIndexOf(str, 'あ'), 0);
  assertEquals(UtfString.lastIndexOf(str, 'り'), 1);
  assertEquals(UtfString.lastIndexOf(str, 'が'), 2);
  assertEquals(UtfString.lastIndexOf(str, 'と'), 3);
  assertEquals(UtfString.lastIndexOf(str, 'う'), 4);
});

Deno.test('[lastIndexOf] Works with astral plane unicode characters', function () {
  const str = '𤔣𤔤𤔥𤔦';

  assertEquals(str.lastIndexOf('𤔣'), 0);
  assertEquals(UtfString.lastIndexOf(str, '𤔣'), 0);

  assertEquals(str.lastIndexOf('𤔤'), 2);
  assertEquals(UtfString.lastIndexOf(str, '𤔤'), 1);

  assertEquals(str.lastIndexOf('𤔥'), 4);
  assertEquals(UtfString.lastIndexOf(str, '𤔥'), 2);

  assertEquals(str.lastIndexOf('𤔦'), 6);
  assertEquals(UtfString.lastIndexOf(str, '𤔦'), 3);
});

Deno.test('[lastIndexOf] Works with mixed characters', function () {
  const str = 'あaりbがc𤔣dとeうf';
  assertEquals(UtfString.lastIndexOf(str, 'a'), 1);
  assertEquals(UtfString.lastIndexOf(str, 'が'), 4);
  assertEquals(UtfString.lastIndexOf(str, '𤔣'), 6);
  assertEquals(UtfString.lastIndexOf(str, 'e'), 9);
});

Deno.test('[lastIndexOf] Returns -1 if search value is not found', function () {
  assertEquals(UtfString.lastIndexOf('abc', 'd'), -1);
});

Deno.test('[lastIndexOf] Respects the start parameter', function () {
  assertEquals(UtfString.lastIndexOf('abcabc', 'b', 3), 1);
  assertEquals(UtfString.lastIndexOf('ありがとうり', 'り', 4), 1);
  assertEquals(UtfString.lastIndexOf('𤔣𤔤𤔥𤔤𤔦', '𤔤', 2), 1);
});
