import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

// with standard ASCII characters - [WSAC]
// with multi-byte characters - [WMC]
// with astral plane unicode characters - [WAC]

Deno.test('[slice] [WSAC] works when given start and end indices', function () {
  const str = 'abc';
  assertEquals(UtfString.slice(str, 0, 1), 'a');
  assertEquals(UtfString.slice(str, 1, 2), 'b');
  assertEquals(UtfString.slice(str, 2, 3), 'c');

  assertEquals(UtfString.slice(str, 1, 3), 'bc');
  assertEquals(UtfString.slice(str, 0, 3), 'abc');
});

Deno.test('[slice] [WSAC] works when not given an end index', function () {
  const str = 'abc';
  assertEquals(UtfString.slice(str, 0), 'abc');
  assertEquals(UtfString.slice(str, 1), 'bc');
  assertEquals(UtfString.slice(str, 2), 'c');
});

Deno.test('[slice] [WSAC] returns an empty string when given out-of-bounds indices', function () {
  const str = 'abc';
  assertEquals(UtfString.slice(str, 3), '');
  assertEquals(UtfString.slice(str, 3, 4), '');
});

Deno.test('[slice] [WMC] works when given start and end indices', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.slice(str, 0, 1), 'あ');
  assertEquals(UtfString.slice(str, 1, 2), 'り');
  assertEquals(UtfString.slice(str, 2, 3), 'が');
  assertEquals(UtfString.slice(str, 3, 4), 'と');
  assertEquals(UtfString.slice(str, 4, 5), 'う');

  assertEquals(UtfString.slice(str, 0, 3), 'ありが');
  assertEquals(UtfString.slice(str, 1, 3), 'りが');
});

Deno.test('[slice] [WMC] works when not given an end index', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.slice(str, 0), 'ありがとう');
  assertEquals(UtfString.slice(str, 1), 'りがとう');
  assertEquals(UtfString.slice(str, 2), 'がとう');
  assertEquals(UtfString.slice(str, 3), 'とう');
  assertEquals(UtfString.slice(str, 4), 'う');
});

Deno.test('[slice] [WMC] returns an empty string when given out-of-bounds indices', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.slice(str, 5), '');
  assertEquals(UtfString.slice(str, 5, 6), '');
});

Deno.test('[slice] [WAC] works when given start and end indices', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.slice(str, 0, 1), '𤔣');
  assertEquals(UtfString.slice(str, 1, 2), '𤔤');
  assertEquals(UtfString.slice(str, 2, 3), '𤔥');
  assertEquals(UtfString.slice(str, 3, 4), '𤔦');

  assertEquals(UtfString.slice(str, 1, 3), '𤔤𤔥');
  assertEquals(UtfString.slice(str, 0, 4), '𤔣𤔤𤔥𤔦');
});

Deno.test('[slice] [WAC] works when not given an end index', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.slice(str, 0), '𤔣𤔤𤔥𤔦');
  assertEquals(UtfString.slice(str, 1), '𤔤𤔥𤔦');
  assertEquals(UtfString.slice(str, 2), '𤔥𤔦');
  assertEquals(UtfString.slice(str, 3), '𤔦');
});

Deno.test('[slice] [WAC] returns an empty string when given out-of-bounds indices', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.slice(str, 4), '');
  assertEquals(UtfString.slice(str, 4, 5), '');
});
