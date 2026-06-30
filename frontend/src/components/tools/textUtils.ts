export const NATO_MAP: Record<string, string> = {
  A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo',
  F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett',
  K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar',
  P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango',
  U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee',
  Z: 'Zulu',
};

export const NATO_NUMBERS: Record<string, string> = {
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine',
};

const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;',
};

const DECODE_ENTITY_RE = /&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g;

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  nbsp: '\u00A0', iexcl: '\u00A1', cent: '\u00A2', pound: '\u00A3',
  curren: '\u00A4', yen: '\u00A5', brvbar: '\u00A6', sect: '\u00A7',
  uml: '\u00A8', copy: '\u00A9', ordf: '\u00AA', laquo: '\u00AB',
  not: '\u00AC', shy: '\u00AD', reg: '\u00AE', macr: '\u00AF',
  deg: '\u00B0', plusmn: '\u00B1', sup2: '\u00B2', sup3: '\u00B3',
  acute: '\u00B4', micro: '\u00B5', para: '\u00B6', middot: '\u00B7',
  cedil: '\u00B8', sup1: '\u00B9', ordm: '\u00BA', raquo: '\u00BB',
  frac14: '\u00BC', frac12: '\u00BD', frac34: '\u00BE', iquest: '\u00BF',
  times: '\u00D7', divide: '\u00F7',
  Agrave: '\u00C0', Aacute: '\u00C1', Acirc: '\u00C2', Atilde: '\u00C3',
  Auml: '\u00C4', Aring: '\u00C5', AElig: '\u00C6', Ccedil: '\u00C7',
  Egrave: '\u00C8', Eacute: '\u00C9', Ecirc: '\u00CA', Euml: '\u00CB',
  Igrave: '\u00CC', Iacute: '\u00CD', Icirc: '\u00CE', Iuml: '\u00CF',
  ETH: '\u00D0', Ntilde: '\u00D1', Ograve: '\u00D2', Oacute: '\u00D3',
  Ocirc: '\u00D4', Otilde: '\u00D5', Ouml: '\u00D6', Oslash: '\u00D8',
  Ugrave: '\u00D9', Uacute: '\u00DA', Ucirc: '\u00DB', Uuml: '\u00DC',
  Yacute: '\u00DD', THORN: '\u00DE', szlig: '\u00DF',
  agrave: '\u00E0', aacute: '\u00E1', acirc: '\u00E2', atilde: '\u00E3',
  auml: '\u00E4', aring: '\u00E5', aelig: '\u00E6', ccedil: '\u00E7',
  egrave: '\u00E8', eacute: '\u00E9', ecirc: '\u00EA', euml: '\u00EB',
  igrave: '\u00EC', iacute: '\u00ED', icirc: '\u00EE', iuml: '\u00EF',
  eth: '\u00F0', ntilde: '\u00F1', ograve: '\u00F2', oacute: '\u00F3',
  ocirc: '\u00F4', otilde: '\u00F5', ouml: '\u00F6', oslash: '\u00F8',
  ugrave: '\u00F9', uacute: '\u00FA', ucirc: '\u00FB', uuml: '\u00FC',
  yacute: '\u00FD', thorn: '\u00FE', yuml: '\u00FF',
  OElig: '\u0152', oelig: '\u0153', Scaron: '\u0160', scaron: '\u0161',
  Yuml: '\u0178', fnof: '\u0192', circ: '\u02C6', tilde: '\u02DC',
  Alpha: '\u0391', Beta: '\u0392', Gamma: '\u0393', Delta: '\u0394',
  Epsilon: '\u0395', Zeta: '\u0396', Eta: '\u0397', Theta: '\u0398',
  Iota: '\u0399', Kappa: '\u039A', Lambda: '\u039B', Mu: '\u039C',
  Nu: '\u039D', Xi: '\u039E', Omicron: '\u039F', Pi: '\u03A0',
  Rho: '\u03A1', Sigma: '\u03A3', Tau: '\u03A4', Upsilon: '\u03A5',
  Phi: '\u03A6', Chi: '\u03A7', Psi: '\u03A8', Omega: '\u03A9',
  alpha: '\u03B1', beta: '\u03B2', gamma: '\u03B3', delta: '\u03B4',
  epsilon: '\u03B5', zeta: '\u03B6', eta: '\u03B7', theta: '\u03B8',
  iota: '\u03B9', kappa: '\u03BA', lambda: '\u03BB', mu: '\u03BC',
  nu: '\u03BD', xi: '\u03BE', omicron: '\u03BF', pi: '\u03C0',
  rho: '\u03C1', sigmaf: '\u03C2', sigma: '\u03C3', tau: '\u03C4',
  upsilon: '\u03C5', phi: '\u03C6', chi: '\u03C7', psi: '\u03C8',
  omega: '\u03C9', thetasym: '\u03D1', upsih: '\u03D2', piv: '\u03D6',
  ensp: '\u2002', emsp: '\u2003', thinsp: '\u2009', zwnj: '\u200C',
  zwj: '\u200D', lrm: '\u200E', rlm: '\u200F', ndash: '\u2013',
  mdash: '\u2014', lsquo: '\u2018', rsquo: '\u2019', sbquo: '\u201A',
  ldquo: '\u201C', rdquo: '\u201D', bdquo: '\u201E', dagger: '\u2020',
  Dagger: '\u2021', bull: '\u2022', hellip: '\u2026', permil: '\u2030',
  prime: '\u2032', Prime: '\u2033', lsaquo: '\u2039', rsaquo: '\u203A',
  oline: '\u203E', frasl: '\u2044', euro: '\u20AC', image: '\u2111',
  weierp: '\u2118', real: '\u211C', trade: '\u2122', alefsym: '\u2135',
  larr: '\u2190', uarr: '\u2191', rarr: '\u2192', darr: '\u2193',
  harr: '\u2194', crarr: '\u21B5', lArr: '\u21D0', uArr: '\u21D1',
  rArr: '\u21D2', dArr: '\u21D3', hArr: '\u21D4', part: '\u2202',
  exist: '\u2203', empty: '\u2205', nabla: '\u2207', isin: '\u2208',
  notin: '\u2209', ni: '\u220B', prod: '\u220F', sum: '\u2211',
  minus: '\u2212', lowast: '\u2217', radic: '\u221A', prop: '\u221D',
  infin: '\u221E', ang: '\u2220', and: '\u2227', or: '\u2228',
  cap: '\u2229', cup: '\u222A', int: '\u222B', there4: '\u2234',
  sim: '\u223C', cong: '\u2245', asymp: '\u2248', ne: '\u2260',
  equiv: '\u2261', le: '\u2264', ge: '\u2265', sub: '\u2282',
  sup: '\u2283', nsub: '\u2284', sube: '\u2286', supe: '\u2287',
  oplus: '\u2295', otimes: '\u2297', perp: '\u22A5', sdot: '\u22C5',
  lceil: '\u2308', rceil: '\u2309', lfloor: '\u230A', rfloor: '\u230B',
  lang: '\u2329', rang: '\u232A', loz: '\u25CA', spades: '\u2660',
  clubs: '\u2663', hearts: '\u2665', diams: '\u2666',
};

export function encodeHtmlEntities(input: string): string {
  return input.replace(/[&<>"'`]/g, (ch) => HTML_ENTITY_MAP[ch] || ch);
}

export function decodeHtmlEntities(input: string): string {
  return input.replace(DECODE_ENTITY_RE, (_, entity) => {
    if (entity.startsWith('#x')) {
      const code = parseInt(entity.slice(2), 16);
      return isNaN(code) ? _ : String.fromCodePoint(code);
    } else if (entity.startsWith('#')) {
      const code = parseInt(entity.slice(1), 10);
      return isNaN(code) ? _ : String.fromCodePoint(code);
    }
    return NAMED_ENTITIES[entity] || _;
  });
}

export function textToBinary(input: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  return Array.from(bytes).map(b => b.toString(2).padStart(8, '0')).join(' ');
}

export function binaryToText(input: string): string {
  const cleaned = input.replace(/\s+/g, ' ').trim();
  if (!cleaned) return '';
  if (!/^[01\s]+$/.test(cleaned)) {
    throw new Error('Invalid binary input. Use only 0, 1, and spaces.');
  }
  const groups = cleaned.split(' ');
  const bytes = new Uint8Array(groups.length);
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].length !== 8) {
      throw new Error(`Invalid binary group at position ${i + 1}: "${groups[i]}" is not 8 bits.`);
    }
    bytes[i] = parseInt(groups[i], 2);
  }
  return new TextDecoder().decode(bytes);
}

export function textToUnicodeRows(input: string): { char: string; codePoint: string; unicodeEscape: string; decimal: number; index: number }[] {
  const rows: { char: string; codePoint: string; unicodeEscape: string; decimal: number; index: number }[] = [];
  const chars = [...input];
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const code = ch.codePointAt(0)!;
    const hex = code.toString(16).toUpperCase().padStart(4, '0');
    rows.push({
      char: ch,
      codePoint: `U+${hex}`,
      unicodeEscape: code > 0xFFFF ? `\\u{${hex}}` : `\\u${hex}`,
      decimal: code,
      index: i,
    });
  }
  return rows;
}

export function unicodeToText(input: string): string {
  const cleaned = input.trim();
  if (!cleaned) return '';
  const tokens = cleaned.split(/\s+/);
  let result = '';
  for (const token of tokens) {
    let code: number | undefined;
    if (token.startsWith('U+') || token.startsWith('u+')) {
      code = parseInt(token.slice(2), 16);
    } else if (token.startsWith('\\u{') && token.endsWith('}')) {
      code = parseInt(token.slice(3, -1), 16);
    } else if (token.startsWith('\\u')) {
      code = parseInt(token.slice(2), 16);
    } else if (/^[0-9a-fA-F]+$/.test(token)) {
      code = parseInt(token, 16);
    }
    if (code === undefined || isNaN(code)) {
      throw new Error(`Invalid Unicode value: "${token}". Use formats like U+0041, \\u0041, \\u{1F600}, or 0041.`);
    }
    if (code < 0 || code > 0x10FFFF) {
      throw new Error(`Invalid code point: U+${code.toString(16).toUpperCase()}. Must be between U+0000 and U+10FFFF.`);
    }
    try {
      result += String.fromCodePoint(code);
    } catch {
      throw new Error(`Invalid code point value: ${token}`);
    }
  }
  return result;
}

export function textToNato(input: string, preservePunctuation: boolean): string {
  const words: string[] = [];
  for (const ch of input) {
    const upper = ch.toUpperCase();
    if (NATO_MAP[upper]) {
      words.push(NATO_MAP[upper]);
    } else if (NATO_NUMBERS[upper]) {
      words.push(NATO_NUMBERS[upper]);
    } else if (preservePunctuation && /[^\w\s]/.test(ch)) {
      words.push(ch);
    }
  }
  return words.join(' ');
}

export function transformList(input: string, options: {
  sortAsc?: boolean;
  sortDesc?: boolean;
  sortByLengthAsc?: boolean;
  sortByLengthDesc?: boolean;
  random?: boolean;
  removeDuplicates?: boolean;
  removeEmpty?: boolean;
  trim?: boolean;
  prefix?: string;
  suffix?: string;
  truncateMax?: number;
  truncateEllipsis?: boolean;
  reverse?: boolean;
  numberLines?: boolean;
  joinDelimiter?: string;
}): string {
  let lines = input.split('\n');

  if (options.trim) {
    lines = lines.map(l => l.trim());
  }
  if (options.removeEmpty) {
    lines = lines.filter(l => l.length > 0);
  }
  if (options.removeDuplicates) {
    lines = [...new Set(lines)];
  }
  if (options.sortAsc) {
    lines.sort((a, b) => a.localeCompare(b));
  } else if (options.sortDesc) {
    lines.sort((a, b) => b.localeCompare(a));
  } else if (options.sortByLengthAsc) {
    lines.sort((a, b) => a.length - b.length);
  } else if (options.sortByLengthDesc) {
    lines.sort((a, b) => b.length - a.length);
  } else if (options.random) {
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
  }

  if (options.reverse) {
    lines.reverse();
  }

  if (options.prefix || options.suffix) {
    lines = lines.map(l => (options.prefix || '') + l + (options.suffix || ''));
  }

  if (options.truncateMax && options.truncateMax > 0) {
    lines = lines.map(l => {
      if (l.length > options.truncateMax!) {
        return l.slice(0, options.truncateMax) + (options.truncateEllipsis ? '…' : '');
      }
      return l;
    });
  }

  if (options.numberLines) {
    lines = lines.map((l, i) => `${i + 1}. ${l}`);
  }

  if (options.joinDelimiter != null) {
    return lines.join(options.joinDelimiter);
  }

  return lines.join('\n');
}

export function transposeRows(input: string, delimiter: string): string {
  const lines = input.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return '';

  const rows = lines.map(l => l.split(delimiter));
  const maxCols = Math.max(...rows.map(r => r.length));

  const result: string[] = [];
  for (let col = 0; col < maxCols; col++) {
    const newRow: string[] = [];
    for (let row = 0; row < rows.length; row++) {
      newRow.push(rows[row][col] !== undefined ? (rows[row][col] as string).trim() : '');
    }
    result.push(newRow.join(delimiter));
  }
  return result.join('\n');
}

export function convertCase(input: string, caseType: string): string {
  switch (caseType) {
    case 'lower': return input.toLowerCase();
    case 'upper': return input.toUpperCase();
    case 'title': return input.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence': {
      const trimmed = input.trim();
      if (!trimmed) return '';
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    }
    case 'camel': {
      return input
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s_-]+/g, ' ')
        .replace(/[-_\s]+(.)?/g, (_, chr) => chr ? chr.toUpperCase() : '')
        .replace(/^(.)/, m => m.toLowerCase());
    }
    case 'pascal': {
      const camel = convertCase(input, 'camel');
      return camel ? camel.charAt(0).toUpperCase() + camel.slice(1) : '';
    }
    case 'snake': {
      return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toLowerCase();
    }
    case 'constant': {
      return convertCase(input, 'snake').toUpperCase();
    }
    case 'kebab': {
      return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
    }
    case 'dot': {
      return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, '.')
        .replace(/^\.+|\.+$/g, '')
        .toLowerCase();
    }
    case 'path': {
      return input
        .trim()
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, '/')
        .replace(/^\/+|\/+$/g, '')
        .toLowerCase();
    }
    case 'train': {
      return convertCase(input, 'kebab').replace(/(^|-)(.)/g, (_, sep, c) => sep + c.toUpperCase());
    }
    case 'alternating': {
      let result = '';
      let upper = true;
      for (const ch of input) {
        if (/[a-zA-Z]/.test(ch)) {
          result += upper ? ch.toUpperCase() : ch.toLowerCase();
          upper = !upper;
        } else {
          result += ch;
        }
      }
      return result;
    }
    case 'inverse': {
      let result = '';
      for (const ch of input) {
        if (ch >= 'a' && ch <= 'z') result += ch.toUpperCase();
        else if (ch >= 'A' && ch <= 'Z') result += ch.toLowerCase();
        else result += ch;
      }
      return result;
    }
    case 'slug': {
      return input
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    default:
      return input;
  }
}

export function encodeBase64Text(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeBase64Text(input: string): string {
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
