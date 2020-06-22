import { assertEquals, assert } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

Deno.test('[charCodeAt] Works with standard ASCII characters', function () {
  const str = 'abc';
  assertEquals(UtfString.charCodeAt(str, 0), 97);
  assertEquals(UtfString.charCodeAt(str, 1), 98);
  assertEquals(UtfString.charCodeAt(str, 2), 99);
  assert(Number.isNaN(UtfString.charCodeAt(str, 3)));
});

Deno.test('[charCodeAt] Works with multi-byte characters', function () {
  const str = 'ありがとう'; // "arigatou"
  assertEquals(UtfString.charCodeAt(str, 0), 12354); // あ "a"
  assertEquals(UtfString.charCodeAt(str, 1), 12426); // り "ri"
  assertEquals(UtfString.charCodeAt(str, 2), 12364); // が "ga"
  assertEquals(UtfString.charCodeAt(str, 3), 12392); // と "to"
  assertEquals(UtfString.charCodeAt(str, 4), 12358); // う "u"
  assert(Number.isNaN(UtfString.charCodeAt(str, 5)));
});

Deno.test('[charCodeAt] Works with astral plane unicode characters', function () {
  const str = '\u{24523}';
  assertEquals(UtfString.charCodeAt(str, 0), 148771);
  assert(Number.isNaN(UtfString.charCodeAt(str, 1)));
});

Deno.test('[charCodeAt] Works with mixed astral and non-astral plane characters', function () {
  const str = '\u0001\u{1F1E6}\u0002';
  assertEquals(UtfString.charCodeAt(str, 0), 1);
  assertEquals(UtfString.charCodeAt(str, 1), 127462);
  assertEquals(UtfString.charCodeAt(str, 2), 2);
  assert(Number.isNaN(UtfString.charCodeAt(str, 3)));
});

Deno.test('[charCodeAt] Works with regional indicators', function () {
  const str = '🇫🇷';
  assertEquals(UtfString.charCodeAt(str, 0), 127467);
  assertEquals(UtfString.charCodeAt(str, 1), 127479);
});
