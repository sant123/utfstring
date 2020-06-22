import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[stringToCharArray] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.stringToCharArray(str), ['a', 'b', 'c']);
});

Deno.test('[stringToCharArray] Works with multi-byte characters', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.stringToCharArray(str), ['あ', 'り', 'が', 'と', 'う']);
});

Deno.test('[stringToCharArray] Works with unicode astral plane characters', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.stringToCharArray(str), ['𤔣', '𤔤', '𤔥', '𤔦']);
});
