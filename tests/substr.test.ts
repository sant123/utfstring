import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import { UtfString } from '../utfstring.ts';

// with standard ASCII characters - [WSAC]
// with multi-byte characters - [WMC]
// with astral plane unicode characters - [WAC]

Deno.test('[substr] [WSAC] works when given a start and a length', function () {
  const str = 'abc';
  assertEquals(UtfString.substr(str, 0, 1), 'a');
  assertEquals(UtfString.substr(str, 1, 1), 'b');
  assertEquals(UtfString.substr(str, 2, 1), 'c');
});

Deno.test('[substr] [WSAC] works when not given a length', function () {
  const str = 'abc';
  assertEquals(UtfString.substr(str, 0), 'abc');
  assertEquals(UtfString.substr(str, 1), 'bc');
  assertEquals(UtfString.substr(str, 2), 'c');
});

Deno.test('[substr] [WSAC] returns an empty string if given an out-of-bounds start', function () {
  const str = 'abc';
  assertEquals(UtfString.substr(str, 3, 1), '');
});

Deno.test('[substr] [WSAC] returns up to the length of the string if given an out-of-bounds length', function () {
  const str = 'abc';
  assertEquals(UtfString.substr(str, 2, 10), 'c');
});

Deno.test('[substr] [WSAC] accepts a negative start value', function () {
  const str = 'abc';
  assertEquals(UtfString.substr(str, -1, 1), 'c');
  assertEquals(UtfString.substr(str, -2, 1), 'b');
  assertEquals(UtfString.substr(str, -3, 1), 'a');
});

Deno.test('[substr] [WSAC] returns an empty string if the negative start value is out-of-bounds', function () {
  const str = 'abc';
  assertEquals(UtfString.substr(str, -4, 1), '');
});

Deno.test('[substr] [WMC] works when given a start and a length', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.substr(str, 0, 1), 'あ');
  assertEquals(UtfString.substr(str, 1, 1), 'り');
  assertEquals(UtfString.substr(str, 2, 1), 'が');
  assertEquals(UtfString.substr(str, 3, 1), 'と');
  assertEquals(UtfString.substr(str, 4, 1), 'う');
});

Deno.test('[substr] [WMC] works when not given a length', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.substr(str, 0), 'ありがとう');
  assertEquals(UtfString.substr(str, 1), 'りがとう');
  assertEquals(UtfString.substr(str, 2), 'がとう');
  assertEquals(UtfString.substr(str, 3), 'とう');
  assertEquals(UtfString.substr(str, 4), 'う');
});

Deno.test('[substr] [WMC] returns an empty string if given an out-of-bounds start', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.substr(str, 5, 1), '');
});

Deno.test('[substr] [WMC] returns up to the length of the string if given an out-of-bounds length', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.substr(str, 2, 10), 'がとう');
});

Deno.test('[substr] [WMC] accepts a negative start value', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.substr(str, -1, 1), 'う');
  assertEquals(UtfString.substr(str, -2, 1), 'と');
  assertEquals(UtfString.substr(str, -3, 1), 'が');
  assertEquals(UtfString.substr(str, -4, 1), 'り');
  assertEquals(UtfString.substr(str, -5, 1), 'あ');
});

Deno.test('[substr] [WMC] returns an empty string if the negative start value is out-of-bounds', function () {
  const str = 'ありがとう';
  assertEquals(UtfString.substr(str, -6, 1), '');
});

Deno.test('[substr] [WAC] works when given a start and a length', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.substr(str, 0, 1), '𤔣');
  assertEquals(UtfString.substr(str, 1, 1), '𤔤');
  assertEquals(UtfString.substr(str, 2, 1), '𤔥');
  assertEquals(UtfString.substr(str, 3, 1), '𤔦');
});

Deno.test('[substr] [WAC] works when not given a length', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.substr(str, 0), '𤔣𤔤𤔥𤔦');
  assertEquals(UtfString.substr(str, 1), '𤔤𤔥𤔦');
  assertEquals(UtfString.substr(str, 2), '𤔥𤔦');
  assertEquals(UtfString.substr(str, 3), '𤔦');
});

Deno.test('[substr] [WAC] returns an empty string if given an out-of-bounds start', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.substr(str, 4, 1), '');
});

Deno.test('[substr] [WAC] returns up to the length of the string if given an out-of-bounds length', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.substr(str, 2, 10), '𤔥𤔦');
});

Deno.test('[substr] [WAC] accepts a negative start value', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.substr(str, -1, 1), '𤔦');
  assertEquals(UtfString.substr(str, -2, 1), '𤔥');
  assertEquals(UtfString.substr(str, -3, 1), '𤔤');
  assertEquals(UtfString.substr(str, -4, 1), '𤔣');
});

Deno.test('[substr] [WAC] returns an empty string if the negative start value is out-of-bounds', function () {
  const str = '𤔣𤔤𤔥𤔦';
  assertEquals(UtfString.substr(str, -5, 1), '');
});
