const regionalIndicatorPairs = /\uD83C[\uDDE6-\uDDFF]\uD83C[\uDDE6-\uDDFF]/;
const surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

const graphemeClusterRegex = createScanner([], [], '');

function findSurrogateByteIndex(string: string, charIndex: number) {
  return scan(string, new RegExp(surrogatePairs.source, 'g'), charIndex);
}

function scan(string: string, scanner: RegExp, charIndex: number) {
  // optimization: don't iterate unless it's necessary
  if (!containsGraphemeClusterGroup(string)) {
    return charIndex;
  }

  let byteIndex = 0;
  let curCharIndex = 0;

  while (true) {
    const match = scanner.exec(string);
    let nextIdx: number;

    if (match) {
      nextIdx = match.index;
    } else {
      nextIdx = string.length;
    }

    while (curCharIndex < charIndex) {
      if (byteIndex == nextIdx) {
        if (curCharIndex < charIndex) {
          curCharIndex++;

          if (match) {
            byteIndex += match[0].length;
          } else {
            byteIndex++;
          }
        }

        break;
      }

      byteIndex++;
      curCharIndex++;
    }

    if (curCharIndex == charIndex) {
      break;
    } else if (byteIndex >= string.length || !match) {
      return -1;
    }
  }

  return byteIndex;
}

function containsGraphemeClusterGroup(string: string) {
  return graphemeClusterRegex.test(string);
}

function createScanner(graphemeClusterRegexes: RegExp[], extraSources = ['[^]'], modifiers = 'g') {
  let sources = [];

  graphemeClusterRegexes.forEach(function (re) {
    sources.push(re.source);
  });

  sources.push(surrogatePairs.source);
  sources = sources.concat(extraSources);

  return new RegExp(sources.join('|'), modifiers);
}

class UTFString {
  #graphemeClusterRegexes: RegExp[];

  constructor(graphemeClusterRegexes: RegExp[]) {
    this.#graphemeClusterRegexes = graphemeClusterRegexes;
  }

  findCharIndex(string: string, byteIndex: number): number {
    if (byteIndex >= string.length) {
      return -1;
    }

    // optimization: don't iterate unless necessary
    if (!containsGraphemeClusterGroup(string)) {
      return byteIndex;
    }

    const scanner = createScanner(this.#graphemeClusterRegexes);
    let charCount = 0;

    while (scanner.exec(string) !== null) {
      if (scanner.lastIndex > byteIndex) {
        break;
      }

      charCount++;
    }

    return charCount;
  }

  findByteIndex(string: string, charIndex: number): number {
    if (charIndex >= this.length(string)) {
      return -1;
    }

    return scan(string, createScanner(this.#graphemeClusterRegexes), charIndex);
  }

  charAt(string: string, index: number): string {
    const byteIndex = this.findByteIndex(string, index);

    if (byteIndex < 0 || byteIndex >= string.length) {
      return '';
    }

    const characters = string.slice(byteIndex, byteIndex + 8);
    const scanner = createScanner(this.#graphemeClusterRegexes);
    const match = scanner.exec(characters);

    if (match === null) {
      return characters[0];
    } else {
      return match[0];
    }
  }

  charCodeAt(string: string, index: number): number {
    const byteIndex = findSurrogateByteIndex(string, index);

    if (byteIndex < 0) {
      return NaN;
    }

    const code = string.charCodeAt(byteIndex);

    if (0xd800 <= code && code <= 0xdbff) {
      const hi = code;
      const low = string.charCodeAt(byteIndex + 1);

      return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
    }

    return code;
  }

  fromCharCode(charCode: number): string {
    if (charCode > 0xffff) {
      charCode -= 0x10000;

      return String.fromCharCode(0xd800 + (charCode >> 10), 0xdc00 + (charCode & 0x3ff));
    } else {
      return String.fromCharCode(charCode);
    }
  }

  indexOf(string: string, searchValue: string, start?: number): number {
    if (typeof start === 'undefined' || start === null) {
      start = 0;
    }

    const startByteIndex = this.findByteIndex(string, start);
    const index = string.indexOf(searchValue, startByteIndex);

    if (index < 0) {
      return -1;
    } else {
      return this.findCharIndex(string, index);
    }
  }

  lastIndexOf(string: string, searchValue: string, start?: number): number {
    let index;

    if (typeof start === 'undefined' || start === null) {
      index = string.lastIndexOf(searchValue);
    } else {
      const startByteIndex = this.findByteIndex(string, start);
      index = string.lastIndexOf(searchValue, startByteIndex);
    }

    if (index < 0) {
      return -1;
    } else {
      return this.findCharIndex(string, index);
    }
  }

  slice(string: string, start: number, finish?: number): string {
    let startByteIndex = this.findByteIndex(string, start);
    let finishByteIndex;

    if (startByteIndex < 0) {
      startByteIndex = string.length;
    }

    if (typeof finish === 'undefined' || finish === null) {
      finishByteIndex = string.length;
    } else {
      finishByteIndex = this.findByteIndex(string, finish);

      if (finishByteIndex < 0) {
        finishByteIndex = string.length;
      }
    }

    return string.slice(startByteIndex, finishByteIndex);
  }

  substr(string: string, start: number, length?: number): string {
    if (start < 0) {
      start = this.length(string) + start;
    }

    if (typeof length === 'undefined' || length === null) {
      return this.slice(string, start);
    } else {
      return this.slice(string, start, start + length);
    }
  }

  // they do the same thing
  substring(string: string, start: number, length?: number): string {
    return this.substr(string, start, length);
  }

  length(string: string): number {
    // findCharIndex will return -1 if string is empty, so add 1
    return this.findCharIndex(string, string.length - 1) + 1;
  }

  stringToCodePoints(string: string): number[] {
    const result: number[] = [];

    for (var i = 0; i < string.length; i++) {
      let codePoint = this.charCodeAt(string, i);

      if (!codePoint) {
        break;
      }

      result.push(codePoint);
    }

    return result;
  }

  codePointsToString(arr: number[]): string {
    const chars = [];

    for (var i = 0; i < arr.length; i++) {
      chars.push(this.fromCharCode(arr[i]));
    }

    return chars.join('');
  }

  stringToBytes(string: string): number[] {
    let result: number[] = [];

    for (var i = 0; i < string.length; i++) {
      const byteArray = [];
      let chr = string.charCodeAt(i);

      while (chr > 0) {
        byteArray.push(chr & 0xff);
        chr >>= 8;
      }

      // all utf-16 characters are two bytes
      if (byteArray.length == 1) {
        byteArray.push(0);
      }

      // assume big-endian
      result = result.concat(byteArray.reverse());
    }

    return result;
  }

  bytesToString(arr: number[]): string {
    const result = [];

    for (let i = 0; i < arr.length; i += 2) {
      const hi = arr[i];
      const low = arr[i + 1];
      const combined = (hi << 8) | low;

      result.push(String.fromCharCode(combined));
    }

    return result.join('');
  }

  stringToCharArray(string: string): string[] {
    const result = [];
    const scanner = createScanner(this.#graphemeClusterRegexes);
    let match;

    do {
      match = scanner.exec(string);

      if (match === null) {
        break;
      }

      result.push(match[0]);
    } while (match !== null);

    return result;
  }
}

export const UtfString = new UTFString([]);
export const UtfStringVisual = new UTFString([regionalIndicatorPairs]);
