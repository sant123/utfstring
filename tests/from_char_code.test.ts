import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[fromCharCode] Works with standard ASCII characters', function () {
  assertEquals(UtfString.fromCharCode(97), 'a');
  assertEquals(UtfString.fromCharCode(98), 'b');
  assertEquals(UtfString.fromCharCode(99), 'c');
});

Deno.test('[fromCharCode] Works with multi-byte characters', function () {
  assertEquals(UtfString.fromCharCode(12354), 'あ');
  assertEquals(UtfString.fromCharCode(12426), 'り');
  assertEquals(UtfString.fromCharCode(12364), 'が');
  assertEquals(UtfString.fromCharCode(12392), 'と');
  assertEquals(UtfString.fromCharCode(12358), 'う');
});

Deno.test('[fromCharCode] Works with astral plane unicode characters', function () {
  assertEquals(UtfString.fromCharCode(148771), '𤔣');
});

Deno.test('[fromCharCode] Works with regional indicators', function () {
  assertEquals(UtfString.fromCharCode(127467), '🇫');
});
