// ── String Obfuscation ──

export function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, ch => {
    const code = ch.charCodeAt(0);
    const base = code >= 97 ? 97 : 65;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

export function reverseText(text: string): string {
  return [...text].reverse().join('');
}

export function unicodeEncode(text: string): string {
  return [...text].map(ch => {
    return '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0');
  }).join('');
}

export function unicodeDecode(text: string): string {
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
}

export function base64Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function base64Decode(text: string): string {
  return decodeURIComponent(escape(atob(text)));
}

// ── Numeronym ──

export function generateNumeronym(word: string, minLen: number = 3): string {
  if (word.length < minLen) return word;
  const first = word[0];
  const last = word[word.length - 1];
  const middle = word.length - 2;
  return first + middle + last;
}

export function generateNumeronyms(text: string, minLen: number = 3): { result: string; breakdown: { original: string; numeronym: string }[] } {
  const words = text.split(/\s+/);
  const breakdown: { original: string; numeronym: string }[] = [];
  const resultWords: string[] = [];

  for (const word of words) {
    if (!word) continue;
    const numeronym = generateNumeronym(word, minLen);
    breakdown.push({ original: word, numeronym });
    resultWords.push(numeronym);
  }

  return { result: resultWords.join(' '), breakdown };
}

// ── Integer Base Conversion ──

export function convertBase(value: string, fromBase: number, toBase: number): string {
  const cleaned = value.trim().toUpperCase();
  if (!cleaned) throw new Error('Empty input');
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let decimal = 0n;
  for (const ch of cleaned) {
    const digit = digits.indexOf(ch);
    if (digit < 0 || digit >= fromBase) throw new Error(`Invalid digit '${ch}' for base ${fromBase}`);
    decimal = decimal * BigInt(fromBase) + BigInt(digit);
  }
  if (decimal === 0n) return '0';
  let result = '';
  const targetBase = BigInt(toBase);
  while (decimal > 0n) {
    result = digits[Number(decimal % targetBase)] + result;
    decimal = decimal / targetBase;
  }
  return result;
}

export function validateBaseInput(value: string, base: number): boolean {
  if (!value.trim()) return false;
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base);
  const re = new RegExp('^[' + digits + ']+$', 'i');
  return re.test(value.trim());
}

// ── Roman Numerals ──

const ROMAN_MAP: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const ROMAN_NUMERAL_RE = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function arabicToRoman(num: number): string {
  if (num < 1 || num > 3999) throw new Error('Number must be between 1 and 3999');
  if (!Number.isInteger(num)) throw new Error('Number must be an integer');
  let result = '';
  let remaining = num;
  for (const [value, symbol] of ROMAN_MAP) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function romanToArabic(roman: string): number {
  const cleaned = roman.trim().toUpperCase();
  if (!cleaned) throw new Error('Empty input');
  if (!ROMAN_NUMERAL_RE.test(cleaned)) throw new Error('Invalid Roman numeral');
  
  const valueMap: Record<string, number> = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1,
  };
  
  let result = 0;
  let i = 0;
  while (i < cleaned.length) {
    const two = cleaned.substring(i, i + 2);
    if (valueMap[two]) {
      result += valueMap[two];
      i += 2;
    } else {
      result += valueMap[cleaned[i]];
      i++;
    }
  }
  return result;
}

// ── Safe Math Evaluator (recursive descent parser) ──

type Token = { type: 'num'; value: number } | { type: 'id'; value: string } | { type: 'op'; value: string } | { type: 'paren'; value: string } | { type: 'comma' };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.replace(/\s+/g, '');
  
  while (i < s.length) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9' || ch === '.') {
      let num = '';
      while (i < s.length && (s[i] >= '0' && s[i] <= '9' || s[i] === '.')) {
        num += s[i++];
      }
      tokens.push({ type: 'num', value: parseFloat(num) });
    } else if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch === '_') {
      let id = '';
      while (i < s.length && (s[i] >= 'a' && s[i] <= 'z' || s[i] >= 'A' && s[i] <= 'Z' || s[i] >= '0' && s[i] <= '9' || s[i] === '_')) {
        id += s[i++];
      }
      tokens.push({ type: 'id', value: id });
    } else if ('+-*/%^'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
    } else if (ch === '(' || ch === ')') {
      tokens.push({ type: 'paren', value: ch });
      i++;
    } else if (ch === ',') {
      tokens.push({ type: 'comma' });
      i++;
    } else {
      throw new Error('Unexpected character: ' + ch);
    }
  }
  return tokens;
}

let _tokens: Token[];
let _pos: number;

function peek(): Token | null {
  return _pos < _tokens.length ? _tokens[_pos] : null;
}

function consume(): Token {
  return _tokens[_pos++];
}

function parseExpr(): number {
  let left = parseTerm();
  while (peek()?.type === 'op' && ((peek() as any).value === '+' || (peek() as any).value === '-')) {
    const op = (consume() as any).value;
    const right = parseTerm();
    if (op === '+') left += right;
    else left -= right;
  }
  return left;
}

function parseTerm(): number {
  let left = parsePower();
  while (peek()?.type === 'op' && ((peek() as any).value === '*' || (peek() as any).value === '/' || (peek() as any).value === '%')) {
    const op = (consume() as any).value;
    const right = parsePower();
    if (op === '*') left *= right;
    else if (op === '/') {
      if (right === 0) throw new Error('Division by zero');
      left /= right;
    }
    else left %= right;
  }
  return left;
}

function parsePower(): number {
  let base = parseFactor();
  while (peek()?.type === 'op' && (peek() as any).value === '^') {
    consume();
    const exp = parsePower();
    base = Math.pow(base, exp);
  }
  return base;
}

function parseFactor(): number {
  if (peek()?.type === 'op' && (peek() as any).value === '-') {
    consume();
    return -parseFactor();
  }
  if (peek()?.type === 'op' && (peek() as any).value === '+') {
    consume();
    return parseFactor();
  }
  
  if (peek()?.type === 'num') {
    return (consume() as any).value;
  }
  
  if (peek()?.type === 'paren' && (peek() as any).value === '(') {
    consume();
    const val = parseExpr();
    if (peek()?.type !== 'paren' || (peek() as any).value !== ')') throw new Error('Missing closing parenthesis');
    consume();
    return val;
  }
  
  if (peek()?.type === 'id') {
    return parseFunction();
  }
  
  if (peek() === null) throw new Error('Unexpected end of expression');
  throw new Error('Unexpected token');
}

function parseFunction(): number {
  const name = (consume() as any).value;
  
  if (name === 'pi') return Math.PI;
  if (name === 'e') return Math.E;
  
  if (peek()?.type !== 'paren' || (peek() as any).value !== '(') {
    throw new Error('Expected ( after ' + name);
  }
  consume();
  
  const args: number[] = [];
  if (peek()?.type === 'paren' && (peek() as any).value === ')') {
    consume();
  } else {
    args.push(parseExpr());
    while (peek()?.type === 'comma') {
      consume();
      args.push(parseExpr());
    }
    if (peek()?.type !== 'paren' || (peek() as any).value !== ')') throw new Error('Missing )');
    consume();
  }
  
  switch (name) {
    case 'sqrt': return Math.sqrt(args[0]);
    case 'abs': return Math.abs(args[0]);
    case 'round': return Math.round(args[0]);
    case 'floor': return Math.floor(args[0]);
    case 'ceil': return Math.ceil(args[0]);
    case 'sin': case 'sin_deg': return Math.sin(args[0] * (name === 'sin_deg' ? Math.PI / 180 : 1));
    case 'cos': case 'cos_deg': return Math.cos(args[0] * (name === 'cos_deg' ? Math.PI / 180 : 1));
    case 'tan': case 'tan_deg': return Math.tan(args[0] * (name === 'tan_deg' ? Math.PI / 180 : 1));
    case 'asin': return Math.asin(args[0]);
    case 'acos': return Math.acos(args[0]);
    case 'atan': return Math.atan(args[0]);
    case 'atan2': return Math.atan2(args[0], args[1]);
    case 'log': return Math.log10(args[0]);
    case 'ln': return Math.log(args[0]);
    case 'pow': return Math.pow(args[0], args[1]);
    case 'min': return Math.min(...args);
    case 'max': return Math.max(...args);
    case 'exp': return Math.exp(args[0]);
    default: throw new Error('Unknown function: ' + name);
  }
}

export function evaluate(expression: string, angleMode: 'deg' | 'rad' = 'rad'): number {
  let expr = expression.trim();
  if (!expr) throw new Error('Empty expression');
  
  if (angleMode === 'deg') {
    expr = expr.replace(/\b(sin|cos|tan)\b/g, (m) => m + '_deg');
    _tokens = tokenize(expr);
    _pos = 0;
    const result = parseExpr();
    return result;
  }
  
  _tokens = tokenize(expr);
  _pos = 0;
  return parseExpr();
}

export function formatNumber(num: number, precision?: number): string {
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';
  if (precision !== undefined) return num.toFixed(precision);
  if (Number.isInteger(num) && Math.abs(num) < 1e15) return num.toString();
  return parseFloat(num.toPrecision(12)).toString();
}

// ── Figlet-style ASCII Art Renderer ──

type FontChar = [string, string, string, string, string];

const FONT_BLOCK: Record<string, FontChar> = {};

function initFontBlock() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const data: [number[], number[], number[], number[], number[]] = [
    [30,51,63,51,51],   [60,51,60,51,60],    [30,51,48,51,30],    [60,51,51,51,60],    [62,48,60,48,62],
    [62,48,60,48,48],   [30,51,55,51,30],    [51,51,63,51,51],    [62,24,24,24,62],    [31,12,12,44,24],
    [51,54,60,54,51],   [48,48,48,48,62],    [99,119,85,65,65],   [51,59,63,51,51],    [30,51,51,51,30],
    [60,51,60,48,48],   [30,51,51,54,29],    [60,51,60,54,51],    [30,51,24,51,30],    [126,24,24,24,24],
    [51,51,51,51,30],   [51,51,51,30,12],    [65,65,85,119,99],   [51,51,30,51,51],    [51,51,30,12,12],
    [62,12,24,48,62],   [15,12,12,12,15],    [12,30,51,51,51],    [60,48,48,48,60],    [51,51,63,63,63],
    [12,30,51,51,51],   [51,51,51,51,30],    [14,27,27,27,14],    [51,51,63,51,51],    [48,48,48,48,48],
    [6,12,12,12,12],    [56,12,24,12,56],    [48,48,48,48,60],    [31,51,51,51,51],    [31,51,51,51,31],
    [31,51,51,51,31],   [31,51,48,48,48],    [31,51,51,51,63],    [31,49,49,49,63],    [31,48,56,48,62],
    [127,12,12,12,12],  [51,51,51,51,31],    [51,51,51,30,12],    [51,51,51,63,63],    [51,30,12,30,51],
    [51,51,30,12,12],   [63,6,12,24,63],
  ];

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const d = data[i];
    FONT_BLOCK[c] = [
      toRow(d[0], 6),
      toRow(d[1], 6),
      toRow(d[2], 6),
      toRow(d[3], 6),
      toRow(d[4], 6),
    ];
  }

  function toRow(bits: number, width: number): string {
    let row = '';
    for (let i = width - 1; i >= 0; i--) {
      row += (bits >> i) & 1 ? '\u2588\u2588' : '  ';
    }
    return row;
  }
}

initFontBlock();

const FONT_SMALL: Record<string, FontChar> = {};

function initFontSmall() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const data: [number[], number[], number[], number[], number[]] = [
    [2,5,7,5,5],  [6,5,6,5,6],  [2,5,4,5,2],  [6,5,5,5,6],  [7,4,6,4,7],
    [7,4,6,4,4],  [2,5,7,5,2],  [5,5,7,5,5],  [7,2,2,2,7],  [7,2,2,6,4],
    [5,6,4,6,5],  [4,4,4,4,7],  [5,7,5,5,5],  [5,7,7,5,5],  [2,5,5,5,2],
    [6,5,6,4,4],  [2,5,5,6,3],  [6,5,6,6,5],  [2,5,2,5,2],  [7,2,2,2,2],
    [5,5,5,5,2],  [5,5,5,2,2],  [5,5,5,7,5],  [5,5,2,5,5],  [5,5,2,2,2],
    [7,1,2,4,7],  [2,2,2,2,2],  [2,5,5,5,2],  [4,4,4,4,6],  [5,5,5,5,2],
    [2,5,5,5,2],  [5,5,5,5,2],  [2,5,5,5,2],  [5,5,7,5,5],  [4,4,4,4,4],
    [1,2,2,2,2],  [6,4,2,4,6],  [4,4,4,4,6],  [5,5,5,5,2],  [5,5,5,5,2],
    [2,5,5,5,2],  [6,5,6,4,6],  [2,5,5,6,2],  [6,5,4,4,4],  [0,0,0,0,0],
    [5,5,5,5,2],  [5,5,5,2,2],  [5,5,5,5,5],  [5,5,2,5,5],  [5,5,2,2,2],
    [7,2,4,2,7],
  ];

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const d = data[i];
    FONT_SMALL[c] = [
      toRow(d[0], 3),
      toRow(d[1], 3),
      toRow(d[2], 3),
      toRow(d[3], 3),
      toRow(d[4], 3),
    ];
  }

  function toRow(bits: number, width: number): string {
    let row = '';
    for (let i = width - 1; i >= 0; i--) {
      row += (bits >> i) & 1 ? '\u2588' : ' ';
    }
    return row;
  }
}

initFontSmall();

function renderFont(text: string, fontMap: Record<string, FontChar>, charWidth: number): string {
  const clean = text.toUpperCase();
  let result = '';
  for (let row = 0; row < 5; row++) {
    let line = '';
    for (const ch of clean) {
      const fc = fontMap[ch];
      if (fc) {
        line += fc[row];
      } else if (ch === ' ') {
        line += ' '.repeat(charWidth * 2);
      } else {
        line += ' '.repeat(charWidth * 2);
      }
    }
    result += line.replace(/\s+$/, '') + '\n';
  }
  return result;
}

export function generateFiglet(text: string, font: 'standard' | 'small' | 'slant' = 'standard'): string {
  if (!text.trim()) return '';
  if (font === 'small') {
    return renderFont(text, FONT_SMALL, 3);
  }
  return renderFont(text, FONT_BLOCK, 6);
}

// ── ETA Calculator ──

export interface EtaInput {
  distance?: number;
  speed?: number;
  time?: number;
  total?: number;
  completed?: number;
  elapsed?: number;
}

export interface EtaResult {
  time?: { value: number; unit: string };
  speed?: { value: number; unit: string };
  distance?: { value: number; unit: string };
  remaining?: { value: number; unit: string };
  remainingItems?: number;
  completionTime?: string;
  totalTime?: { value: number; unit: string };
}

export function calculateEta(mode: string, inputs: Record<string, number>, units: Record<string, string>): EtaResult {
  switch (mode) {
    case 'distance-speed-time': {
      const d = inputs.distance || 0;
      const s = inputs.speed || 0;
      if (s === 0) throw new Error('Speed cannot be zero');
      const t = d / s;
      return { time: formatDuration(t) };
    }
    case 'distance-time-speed': {
      const d = inputs.distance || 0;
      const t = inputs.time || 0;
      if (t === 0) throw new Error('Time cannot be zero');
      const s = d / t;
      const unit = units.distance === 'mi' ? 'mph' : units.distance === 'm' ? 'm/s' : 'km/h';
      return { speed: { value: parseFloat(s.toFixed(2)), unit } };
    }
    case 'speed-time-distance': {
      const s = inputs.speed || 0;
      const t = inputs.time || 0;
      const d = s * t;
      const unit = units.distance || 'km';
      return { distance: { value: parseFloat(d.toFixed(2)), unit } };
    }
    case 'progress': {
      const total = inputs.total || 0;
      const completed = inputs.completed || 0;
      const elapsed = inputs.elapsed || 0;
      
      if (completed > total) throw new Error('Completed items cannot exceed total');
      if (completed === 0) throw new Error('Completed items must be greater than 0');
      if (total === 0) throw new Error('Total items must be greater than 0');
      if (elapsed === 0) throw new Error('Elapsed time must be greater than 0');
      
      const remainingItems = total - completed;
      const rate = elapsed / completed;
      const remainingTime = rate * remainingItems;
      const totalTime = elapsed + remainingTime;
      const now = new Date();
      const completionDate = new Date(now.getTime() + remainingTime * 60 * 1000);
      
      return {
        remainingItems,
        remaining: formatDuration(remainingTime),
        totalTime: formatDuration(totalTime),
        completionTime: completionDate.toLocaleTimeString(),
      };
    }
    default:
      throw new Error('Unknown mode');
  }
}

function formatDuration(hours: number): { value: number; unit: string } {
  if (hours < 1 / 60) {
    return { value: parseFloat((hours * 3600).toFixed(1)), unit: 'seconds' };
  } else if (hours < 1) {
    return { value: parseFloat((hours * 60).toFixed(1)), unit: 'minutes' };
  } else if (hours < 24) {
    return { value: parseFloat(hours.toFixed(2)), unit: 'hours' };
  } else {
    return { value: parseFloat((hours / 24).toFixed(2)), unit: 'days' };
  }
}

// ── Emoji Data ──

export interface EmojiEntry {
  emoji: string;
  name: string;
  keywords: string[];
  category: string;
}

export const EMOJI_CATEGORIES = [
  'Smileys & Emotion',
  'People & Body',
  'Animals & Nature',
  'Food & Drink',
  'Travel & Places',
  'Activities',
  'Objects',
  'Symbols',
  'Flags',
] as const;

export const EMOJI_DATA: EmojiEntry[] = [
{ emoji: '😀', name: 'Grinning Face', keywords: ['smile', 'happy', 'grin'], category: 'Smileys & Emotion' },
{ emoji: '😃', name: 'Grinning Face with Big Eyes', keywords: ['smile', 'happy', 'eyes'], category: 'Smileys & Emotion' },
{ emoji: '😄', name: 'Grinning Face with Smiling Eyes', keywords: ['smile', 'happy', 'eyes'], category: 'Smileys & Emotion' },
{ emoji: '😁', name: 'Beaming Face with Smiling Eyes', keywords: ['smile', 'happy', 'teeth'], category: 'Smileys & Emotion' },
{ emoji: '😆', name: 'Grinning Squinting Face', keywords: ['laugh', 'happy', 'squint'], category: 'Smileys & Emotion' },
{ emoji: '😅', name: 'Grinning Face with Sweat', keywords: ['sweat', 'nervous', 'laugh'], category: 'Smileys & Emotion' },
{ emoji: '🤣', name: 'Rolling on the Floor Laughing', keywords: ['laugh', 'rofl', 'funny'], category: 'Smileys & Emotion' },
{ emoji: '😂', name: 'Face with Tears of Joy', keywords: ['laugh', 'tears', 'cry'], category: 'Smileys & Emotion' },
{ emoji: '🙂', name: 'Slightly Smiling Face', keywords: ['smile', 'slight'], category: 'Smileys & Emotion' },
{ emoji: '🙃', name: 'Upside-Down Face', keywords: ['upside', 'silly'], category: 'Smileys & Emotion' },
{ emoji: '😉', name: 'Winking Face', keywords: ['wink', 'flirt'], category: 'Smileys & Emotion' },
{ emoji: '😊', name: 'Smiling Face with Smiling Eyes', keywords: ['blush', 'smile', 'eyes'], category: 'Smileys & Emotion' },
{ emoji: '😇', name: 'Smiling Face with Halo', keywords: ['angel', 'innocent'], category: 'Smileys & Emotion' },
{ emoji: '🥰', name: 'Smiling Face with Hearts', keywords: ['love', 'hearts', 'crush'], category: 'Smileys & Emotion' },
{ emoji: '😍', name: 'Smiling Face with Heart-Eyes', keywords: ['love', 'heart eyes', 'crush'], category: 'Smileys & Emotion' },
{ emoji: '🤩', name: 'Star-Struck', keywords: ['star', 'excited', 'amazed'], category: 'Smileys & Emotion' },
{ emoji: '😘', name: 'Face Blowing a Kiss', keywords: ['kiss', 'love', 'blow'], category: 'Smileys & Emotion' },
{ emoji: '😗', name: 'Kissing Face', keywords: ['kiss', 'smooch'], category: 'Smileys & Emotion' },
{ emoji: '😚', name: 'Kissing Face with Closed Eyes', keywords: ['kiss', 'eyes'], category: 'Smileys & Emotion' },
{ emoji: '😙', name: 'Kissing Face with Smiling Eyes', keywords: ['kiss', 'smile'], category: 'Smileys & Emotion' },
{ emoji: '🥲', name: 'Smiling Face with Tear', keywords: ['tear', 'bittersweet'], category: 'Smileys & Emotion' },
{ emoji: '😋', name: 'Face Savoring Food', keywords: ['yum', 'food', 'tongue'], category: 'Smileys & Emotion' },
{ emoji: '😛', name: 'Face with Tongue', keywords: ['tongue', 'silly'], category: 'Smileys & Emotion' },
{ emoji: '😜', name: 'Winking Face with Tongue', keywords: ['silly', 'joke', 'tongue'], category: 'Smileys & Emotion' },
{ emoji: '🤪', name: 'Zany Face', keywords: ['crazy', 'zany', 'silly'], category: 'Smileys & Emotion' },
{ emoji: '😝', name: 'Squinting Face with Tongue', keywords: ['silly', 'tongue', 'squint'], category: 'Smileys & Emotion' },
{ emoji: '🤑', name: 'Money-Mouth Face', keywords: ['money', 'rich', 'tongue'], category: 'Smileys & Emotion' },
{ emoji: '🤗', name: 'Hugging Face', keywords: ['hug', 'arms'], category: 'Smileys & Emotion' },
{ emoji: '🤭', name: 'Face with Hand Over Mouth', keywords: ['shh', 'secret', 'giggle'], category: 'Smileys & Emotion' },
{ emoji: '🫢', name: 'Face with Open Eyes and Hand Over Mouth', keywords: ['shock', 'surprise'], category: 'Smileys & Emotion' },
{ emoji: '🫣', name: 'Face with Peeking Eye', keywords: ['peek', 'hide'], category: 'Smileys & Emotion' },
{ emoji: '🤫', name: 'Shushing Face', keywords: ['shh', 'quiet', 'shush'], category: 'Smileys & Emotion' },
{ emoji: '🤔', name: 'Thinking Face', keywords: ['think', 'ponder'], category: 'Smileys & Emotion' },
{ emoji: '🫡', name: 'Saluting Face', keywords: ['salute', 'respect'], category: 'Smileys & Emotion' },
{ emoji: '🤐', name: 'Zipper-Mouth Face', keywords: ['zipper', 'silent', 'secrets'], category: 'Smileys & Emotion' },
{ emoji: '🤨', name: 'Face with Raised Eyebrow', keywords: ['skeptic', 'eyeroll'], category: 'Smileys & Emotion' },
{ emoji: '😐', name: 'Neutral Face', keywords: ['neutral', 'meh'], category: 'Smileys & Emotion' },
{ emoji: '😑', name: 'Expressionless Face', keywords: ['blank', 'expressionless'], category: 'Smileys & Emotion' },
{ emoji: '😶', name: 'Face Without Mouth', keywords: ['silent', 'no mouth'], category: 'Smileys & Emotion' },
{ emoji: '🫥', name: 'Dotted Line Face', keywords: ['invisible', 'hidden'], category: 'Smileys & Emotion' },
{ emoji: '😶‍🌫️', name: 'Face in Clouds', keywords: ['fog', 'cloud'], category: 'Smileys & Emotion' },
{ emoji: '😏', name: 'Smirking Face', keywords: ['smirk', 'smug'], category: 'Smileys & Emotion' },
{ emoji: '😒', name: 'Unamused Face', keywords: ['unamused', 'meh', 'eyeroll'], category: 'Smileys & Emotion' },
{ emoji: '🙄', name: 'Face with Rolling Eyes', keywords: ['eyeroll', 'annoyed'], category: 'Smileys & Emotion' },
{ emoji: '😬', name: 'Grimacing Face', keywords: ['grimace', 'awkward'], category: 'Smileys & Emotion' },
{ emoji: '😮‍💨', name: 'Face Exhaling', keywords: ['sigh', 'exhale', 'relief'], category: 'Smileys & Emotion' },
{ emoji: '🤥', name: 'Lying Face', keywords: ['liar', 'pinocchio'], category: 'Smileys & Emotion' },
{ emoji: '😌', name: 'Relieved Face', keywords: ['relieved', 'peaceful'], category: 'Smileys & Emotion' },
{ emoji: '😔', name: 'Pensive Face', keywords: ['sad', 'pensive', 'depressed'], category: 'Smileys & Emotion' },
{ emoji: '😪', name: 'Sleepy Face', keywords: ['sleepy', 'tired'], category: 'Smileys & Emotion' },
{ emoji: '🤤', name: 'Drooling Face', keywords: ['drool', 'hungry'], category: 'Smileys & Emotion' },
{ emoji: '😴', name: 'Sleeping Face', keywords: ['sleep', 'zzz'], category: 'Smileys & Emotion' },
{ emoji: '😷', name: 'Face with Medical Mask', keywords: ['mask', 'sick', 'covid'], category: 'Smileys & Emotion' },
{ emoji: '🤒', name: 'Face with Thermometer', keywords: ['fever', 'sick'], category: 'Smileys & Emotion' },
{ emoji: '🤕', name: 'Face with Head-Bandage', keywords: ['hurt', 'injury'], category: 'Smileys & Emotion' },
{ emoji: '🤢', name: 'Nauseated Face', keywords: ['sick', 'nausea', 'vomit'], category: 'Smileys & Emotion' },
{ emoji: '🤮', name: 'Face Vomiting', keywords: ['vomit', 'sick'], category: 'Smileys & Emotion' },
{ emoji: '🤧', name: 'Sneezing Face', keywords: ['sneeze', 'allergy'], category: 'Smileys & Emotion' },
{ emoji: '🥵', name: 'Hot Face', keywords: ['hot', 'sweat', 'overheated'], category: 'Smileys & Emotion' },
{ emoji: '🥶', name: 'Cold Face', keywords: ['cold', 'freezing'], category: 'Smileys & Emotion' },
{ emoji: '🥴', name: 'Woozy Face', keywords: ['dizzy', 'woozy'], category: 'Smileys & Emotion' },
{ emoji: '😵', name: 'Dizzy Face', keywords: ['dizzy', 'spiral'], category: 'Smileys & Emotion' },
{ emoji: '😵‍💫', name: 'Face with Spiral Eyes', keywords: ['dizzy', 'hypnotized'], category: 'Smileys & Emotion' },
{ emoji: '🤯', name: 'Exploding Head', keywords: ['mind blown', 'shock'], category: 'Smileys & Emotion' },
{ emoji: '🤠', name: 'Cowboy Hat Face', keywords: ['cowboy', 'yeehaw'], category: 'Smileys & Emotion' },
{ emoji: '🥳', name: 'Partying Face', keywords: ['party', 'celebration', 'confetti'], category: 'Smileys & Emotion' },
{ emoji: '🥸', name: 'Disguised Face', keywords: ['disguise', 'spy'], category: 'Smileys & Emotion' },
{ emoji: '😎', name: 'Smiling Face with Sunglasses', keywords: ['cool', 'sunglasses'], category: 'Smileys & Emotion' },
{ emoji: '🤓', name: 'Nerd Face', keywords: ['nerd', 'glasses', 'smart'], category: 'Smileys & Emotion' },
{ emoji: '🧐', name: 'Face with Monocle', keywords: ['monocle', 'fancy'], category: 'Smileys & Emotion' },
{ emoji: '😕', name: 'Confused Face', keywords: ['confused', 'unsure'], category: 'Smileys & Emotion' },
{ emoji: '🫤', name: 'Face with Diagonal Mouth', keywords: ['confused', 'unsure'], category: 'Smileys & Emotion' },
{ emoji: '😟', name: 'Worried Face', keywords: ['worried', 'anxious'], category: 'Smileys & Emotion' },
{ emoji: '🙁', name: 'Slightly Frowning Face', keywords: ['frown', 'sad'], category: 'Smileys & Emotion' },
{ emoji: '😮', name: 'Face with Open Mouth', keywords: ['surprised', 'shock'], category: 'Smileys & Emotion' },
{ emoji: '😯', name: 'Hushed Face', keywords: ['hushed', 'surprised'], category: 'Smileys & Emotion' },
{ emoji: '😲', name: 'Astonished Face', keywords: ['astonished', 'shock'], category: 'Smileys & Emotion' },
{ emoji: '😳', name: 'Flushed Face', keywords: ['embarrassed', 'blush'], category: 'Smileys & Emotion' },
{ emoji: '🥺', name: 'Pleading Face', keywords: ['pleading', 'beg', 'cute'], category: 'Smileys & Emotion' },
{ emoji: '🥹', name: 'Face Holding Back Tears', keywords: ['tears', 'emotional'], category: 'Smileys & Emotion' },
{ emoji: '😢', name: 'Crying Face', keywords: ['cry', 'tears', 'sad'], category: 'Smileys & Emotion' },
{ emoji: '😭', name: 'Loudly Crying Face', keywords: ['cry', 'sob', 'tears'], category: 'Smileys & Emotion' },
{ emoji: '😤', name: 'Face with Steam From Nose', keywords: ['angry', 'frustrated'], category: 'Smileys & Emotion' },
{ emoji: '😠', name: 'Angry Face', keywords: ['angry', 'mad'], category: 'Smileys & Emotion' },
{ emoji: '😡', name: 'Pouting Face', keywords: ['angry', 'pout', 'rage'], category: 'Smileys & Emotion' },
{ emoji: '🤬', name: 'Face with Symbols on Mouth', keywords: ['swear', 'cursing'], category: 'Smileys & Emotion' },
{ emoji: '💀', name: 'Skull', keywords: ['death', 'danger'], category: 'Smileys & Emotion' },
{ emoji: '☠️', name: 'Skull and Crossbones', keywords: ['death', 'pirate'], category: 'Smileys & Emotion' },
{ emoji: '💩', name: 'Pile of Poo', keywords: ['poop', 'crap'], category: 'Smileys & Emotion' },
{ emoji: '👋', name: 'Waving Hand', keywords: ['wave', 'hello', 'goodbye'], category: 'People & Body' },
{ emoji: '🤚', name: 'Raised Back of Hand', keywords: ['hand', 'raised'], category: 'People & Body' },
{ emoji: '🖐️', name: 'Hand with Fingers Splayed', keywords: ['hand', 'splayed'], category: 'People & Body' },
{ emoji: '✋', name: 'Raised Hand', keywords: ['hand', 'stop', 'high five'], category: 'People & Body' },
{ emoji: '🖖', name: 'Vulcan Salute', keywords: ['spock', 'star trek'], category: 'People & Body' },
{ emoji: '👌', name: 'OK Hand', keywords: ['ok', 'perfect'], category: 'People & Body' },
{ emoji: '🤌', name: 'Pinched Fingers', keywords: ['italian', 'gesture'], category: 'People & Body' },
{ emoji: '🤏', name: 'Pinching Hand', keywords: ['small', 'little'], category: 'People & Body' },
{ emoji: '✌️', name: 'Victory Hand', keywords: ['peace', 'victory'], category: 'People & Body' },
{ emoji: '🤞', name: 'Crossed Fingers', keywords: ['luck', 'hope'], category: 'People & Body' },
{ emoji: '🫰', name: 'Hand with Index Finger and Thumb Crossed', keywords: ['love', 'cross'], category: 'People & Body' },
{ emoji: '🤟', name: 'Love-You Gesture', keywords: ['love', 'ily'], category: 'People & Body' },
{ emoji: '🤘', name: 'Sign of the Horns', keywords: ['rock', 'horns'], category: 'People & Body' },
{ emoji: '🤙', name: 'Call Me Hand', keywords: ['call', 'phone'], category: 'People & Body' },
{ emoji: '👈', name: 'Backhand Index Pointing Left', keywords: ['point', 'left'], category: 'People & Body' },
{ emoji: '👉', name: 'Backhand Index Pointing Right', keywords: ['point', 'right'], category: 'People & Body' },
{ emoji: '👆', name: 'Backhand Index Pointing Up', keywords: ['point', 'up'], category: 'People & Body' },
{ emoji: '🖕', name: 'Middle Finger', keywords: ['finger', 'fuck'], category: 'People & Body' },
{ emoji: '👇', name: 'Backhand Index Pointing Down', keywords: ['point', 'down'], category: 'People & Body' },
{ emoji: '👍', name: 'Thumbs Up', keywords: ['like', 'approve', 'good'], category: 'People & Body' },
{ emoji: '👎', name: 'Thumbs Down', keywords: ['dislike', 'bad'], category: 'People & Body' },
{ emoji: '✊', name: 'Raised Fist', keywords: ['fist', 'power'], category: 'People & Body' },
{ emoji: '👊', name: 'Oncoming Fist', keywords: ['fist', 'punch'], category: 'People & Body' },
{ emoji: '🤛', name: 'Left-Facing Fist', keywords: ['fist', 'left'], category: 'People & Body' },
{ emoji: '🤜', name: 'Right-Facing Fist', keywords: ['fist', 'right'], category: 'People & Body' },
{ emoji: '👏', name: 'Clapping Hands', keywords: ['clap', 'applause'], category: 'People & Body' },
{ emoji: '🙌', name: 'Raising Hands', keywords: ['celebrate', 'hands'], category: 'People & Body' },
{ emoji: '🫶', name: 'Heart Hands', keywords: ['love', 'heart', 'hands'], category: 'People & Body' },
{ emoji: '👐', name: 'Open Hands', keywords: ['open', 'hands'], category: 'People & Body' },
{ emoji: '🤲', name: 'Palms Up Together', keywords: ['pray', 'hands'], category: 'People & Body' },
{ emoji: '🤝', name: 'Handshake', keywords: ['shake', 'deal'], category: 'People & Body' },
{ emoji: '🙏', name: 'Folded Hands', keywords: ['pray', 'please', 'thank you'], category: 'People & Body' },
{ emoji: '✍️', name: 'Writing Hand', keywords: ['write', 'hand'], category: 'People & Body' },
{ emoji: '💅', name: 'Nail Polish', keywords: ['nails', 'beauty'], category: 'People & Body' },
{ emoji: '🤳', name: 'Selfie', keywords: ['selfie', 'phone'], category: 'People & Body' },
{ emoji: '💪', name: 'Flexed Biceps', keywords: ['muscle', 'strong', 'arm'], category: 'People & Body' },
{ emoji: '🦵', name: 'Leg', keywords: ['leg', 'kick'], category: 'People & Body' },
{ emoji: '🦶', name: 'Foot', keywords: ['foot', 'stomp'], category: 'People & Body' },
{ emoji: '👂', name: 'Ear', keywords: ['ear', 'hear'], category: 'People & Body' },
{ emoji: '👃', name: 'Nose', keywords: ['nose', 'smell'], category: 'People & Body' },
{ emoji: '🧠', name: 'Brain', keywords: ['brain', 'smart'], category: 'People & Body' },
{ emoji: '🫀', name: 'Anatomical Heart', keywords: ['heart', 'anatomy'], category: 'People & Body' },
{ emoji: '🫁', name: 'Lungs', keywords: ['lungs', 'breathe'], category: 'People & Body' },
{ emoji: '👀', name: 'Eyes', keywords: ['eyes', 'look'], category: 'People & Body' },
{ emoji: '👅', name: 'Tongue', keywords: ['tongue', 'taste'], category: 'People & Body' },
{ emoji: '👄', name: 'Mouth', keywords: ['mouth', 'lips'], category: 'People & Body' },
{ emoji: '🐶', name: 'Dog Face', keywords: ['dog', 'puppy', 'pet'], category: 'Animals & Nature' },
{ emoji: '🐱', name: 'Cat Face', keywords: ['cat', 'kitten', 'pet'], category: 'Animals & Nature' },
{ emoji: '🐭', name: 'Mouse Face', keywords: ['mouse', 'rodent'], category: 'Animals & Nature' },
{ emoji: '🐹', name: 'Hamster', keywords: ['hamster', 'pet'], category: 'Animals & Nature' },
{ emoji: '🐰', name: 'Rabbit Face', keywords: ['rabbit', 'bunny'], category: 'Animals & Nature' },
{ emoji: '🦊', name: 'Fox', keywords: ['fox', 'clever'], category: 'Animals & Nature' },
{ emoji: '🐻', name: 'Bear', keywords: ['bear', 'teddy'], category: 'Animals & Nature' },
{ emoji: '🐼', name: 'Panda', keywords: ['panda', 'bear'], category: 'Animals & Nature' },
{ emoji: '🐨', name: 'Koala', keywords: ['koala', 'cute'], category: 'Animals & Nature' },
{ emoji: '🐯', name: 'Tiger Face', keywords: ['tiger', 'stripes'], category: 'Animals & Nature' },
{ emoji: '🦁', name: 'Lion', keywords: ['lion', 'king'], category: 'Animals & Nature' },
{ emoji: '🐮', name: 'Cow Face', keywords: ['cow', 'moo'], category: 'Animals & Nature' },
{ emoji: '🐷', name: 'Pig Face', keywords: ['pig', 'oink'], category: 'Animals & Nature' },
{ emoji: '🐸', name: 'Frog', keywords: ['frog', 'toad'], category: 'Animals & Nature' },
{ emoji: '🐵', name: 'Monkey Face', keywords: ['monkey', 'ape'], category: 'Animals & Nature' },
{ emoji: '🐔', name: 'Chicken', keywords: ['chicken', 'bird'], category: 'Animals & Nature' },
{ emoji: '🐧', name: 'Penguin', keywords: ['penguin', 'bird'], category: 'Animals & Nature' },
{ emoji: '🐦', name: 'Bird', keywords: ['bird', 'sing'], category: 'Animals & Nature' },
{ emoji: '🐤', name: 'Baby Chick', keywords: ['chick', 'baby'], category: 'Animals & Nature' },
{ emoji: '🦅', name: 'Eagle', keywords: ['eagle', 'bird'], category: 'Animals & Nature' },
{ emoji: '🦉', name: 'Owl', keywords: ['owl', 'wise'], category: 'Animals & Nature' },
{ emoji: '🐍', name: 'Snake', keywords: ['snake', 'reptile'], category: 'Animals & Nature' },
{ emoji: '🐢', name: 'Turtle', keywords: ['turtle', 'slow'], category: 'Animals & Nature' },
{ emoji: '🐠', name: 'Tropical Fish', keywords: ['fish', 'tropical'], category: 'Animals & Nature' },
{ emoji: '🐟', name: 'Fish', keywords: ['fish', 'sea'], category: 'Animals & Nature' },
{ emoji: '🐬', name: 'Dolphin', keywords: ['dolphin', 'ocean'], category: 'Animals & Nature' },
{ emoji: '🐳', name: 'Spouting Whale', keywords: ['whale', 'ocean'], category: 'Animals & Nature' },
{ emoji: '🐋', name: 'Whale', keywords: ['whale', 'sea'], category: 'Animals & Nature' },
{ emoji: '🦋', name: 'Butterfly', keywords: ['butterfly', 'beautiful'], category: 'Animals & Nature' },
{ emoji: '🐛', name: 'Bug', keywords: ['bug', 'insect'], category: 'Animals & Nature' },
{ emoji: '🐜', name: 'Ant', keywords: ['ant', 'insect'], category: 'Animals & Nature' },
{ emoji: '🐝', name: 'Honeybee', keywords: ['bee', 'honey'], category: 'Animals & Nature' },
{ emoji: '🪲', name: 'Beetle', keywords: ['beetle', 'bug'], category: 'Animals & Nature' },
{ emoji: '🐞', name: 'Lady Beetle', keywords: ['ladybug', 'lucky'], category: 'Animals & Nature' },
{ emoji: '🦗', name: 'Cricket', keywords: ['cricket', 'insect'], category: 'Animals & Nature' },
{ emoji: '🪳', name: 'Cockroach', keywords: ['roach', 'bug'], category: 'Animals & Nature' },
{ emoji: '🦂', name: 'Scorpion', keywords: ['scorpion', 'danger'], category: 'Animals & Nature' },
{ emoji: '🌸', name: 'Cherry Blossom', keywords: ['flower', 'spring', 'blossom'], category: 'Animals & Nature' },
{ emoji: '💐', name: 'Bouquet', keywords: ['flowers', 'bouquet'], category: 'Animals & Nature' },
{ emoji: '🌹', name: 'Rose', keywords: ['rose', 'flower', 'love'], category: 'Animals & Nature' },
{ emoji: '🌺', name: 'Hibiscus', keywords: ['flower', 'hibiscus'], category: 'Animals & Nature' },
{ emoji: '🌻', name: 'Sunflower', keywords: ['sunflower', 'flower'], category: 'Animals & Nature' },
{ emoji: '🌿', name: 'Herb', keywords: ['plant', 'herb'], category: 'Animals & Nature' },
{ emoji: '🍀', name: 'Four Leaf Clover', keywords: ['clover', 'lucky'], category: 'Animals & Nature' },
{ emoji: '🍁', name: 'Maple Leaf', keywords: ['leaf', 'canada'], category: 'Animals & Nature' },
{ emoji: '🌍', name: 'Globe Showing Europe-Africa', keywords: ['earth', 'globe'], category: 'Animals & Nature' },
{ emoji: '🌎', name: 'Globe Showing Americas', keywords: ['earth', 'globe'], category: 'Animals & Nature' },
{ emoji: '🌏', name: 'Globe Showing Asia-Australia', keywords: ['earth', 'globe'], category: 'Animals & Nature' },
{ emoji: '🍏', name: 'Green Apple', keywords: ['apple', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍎', name: 'Red Apple', keywords: ['apple', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍐', name: 'Pear', keywords: ['pear', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍊', name: 'Tangerine', keywords: ['orange', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍋', name: 'Lemon', keywords: ['lemon', 'sour'], category: 'Food & Drink' },
{ emoji: '🍌', name: 'Banana', keywords: ['banana', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍉', name: 'Watermelon', keywords: ['watermelon', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍇', name: 'Grapes', keywords: ['grapes', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍓', name: 'Strawberry', keywords: ['strawberry', 'fruit'], category: 'Food & Drink' },
{ emoji: '🫐', name: 'Blueberries', keywords: ['blueberry', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍈', name: 'Melon', keywords: ['melon', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍒', name: 'Cherries', keywords: ['cherry', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍑', name: 'Peach', keywords: ['peach', 'fruit'], category: 'Food & Drink' },
{ emoji: '🥭', name: 'Mango', keywords: ['mango', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍍', name: 'Pineapple', keywords: ['pineapple', 'fruit'], category: 'Food & Drink' },
{ emoji: '🥝', name: 'Kiwi Fruit', keywords: ['kiwi', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍅', name: 'Tomato', keywords: ['tomato', 'fruit'], category: 'Food & Drink' },
{ emoji: '🥑', name: 'Avocado', keywords: ['avocado', 'fruit'], category: 'Food & Drink' },
{ emoji: '🍆', name: 'Eggplant', keywords: ['eggplant', 'aubergine'], category: 'Food & Drink' },
{ emoji: '🥕', name: 'Carrot', keywords: ['carrot', 'vegetable'], category: 'Food & Drink' },
{ emoji: '🌽', name: 'Ear of Corn', keywords: ['corn', 'maize'], category: 'Food & Drink' },
{ emoji: '🌶️', name: 'Hot Pepper', keywords: ['hot', 'spicy', 'pepper'], category: 'Food & Drink' },
{ emoji: '🍄', name: 'Mushroom', keywords: ['mushroom', 'fungus'], category: 'Food & Drink' },
{ emoji: '🥜', name: 'Peanuts', keywords: ['peanut', 'nut'], category: 'Food & Drink' },
{ emoji: '🍞', name: 'Bread', keywords: ['bread', 'toast'], category: 'Food & Drink' },
{ emoji: '🧀', name: 'Cheese Wedge', keywords: ['cheese', 'dairy'], category: 'Food & Drink' },
{ emoji: '🍖', name: 'Meat on Bone', keywords: ['meat', 'bone'], category: 'Food & Drink' },
{ emoji: '🍗', name: 'Poultry Leg', keywords: ['chicken', 'leg'], category: 'Food & Drink' },
{ emoji: '🥩', name: 'Cut of Meat', keywords: ['steak', 'meat'], category: 'Food & Drink' },
{ emoji: '🥓', name: 'Bacon', keywords: ['bacon', 'breakfast'], category: 'Food & Drink' },
{ emoji: '🍔', name: 'Hamburger', keywords: ['burger', 'fast food'], category: 'Food & Drink' },
{ emoji: '🍟', name: 'French Fries', keywords: ['fries', 'fast food'], category: 'Food & Drink' },
{ emoji: '🍕', name: 'Pizza', keywords: ['pizza', 'slice'], category: 'Food & Drink' },
{ emoji: '🌭', name: 'Hot Dog', keywords: ['hot dog', 'sausage'], category: 'Food & Drink' },
{ emoji: '🥪', name: 'Sandwich', keywords: ['sandwich', 'lunch'], category: 'Food & Drink' },
{ emoji: '🌮', name: 'Taco', keywords: ['taco', 'mexican'], category: 'Food & Drink' },
{ emoji: '🌯', name: 'Burrito', keywords: ['burrito', 'wrap'], category: 'Food & Drink' },
{ emoji: '🥗', name: 'Green Salad', keywords: ['salad', 'healthy'], category: 'Food & Drink' },
{ emoji: '🍿', name: 'Popcorn', keywords: ['popcorn', 'movie'], category: 'Food & Drink' },
{ emoji: '🧁', name: 'Cupcake', keywords: ['cupcake', 'dessert'], category: 'Food & Drink' },
{ emoji: '🍰', name: 'Shortcake', keywords: ['cake', 'dessert'], category: 'Food & Drink' },
{ emoji: '🎂', name: 'Birthday Cake', keywords: ['birthday', 'cake'], category: 'Food & Drink' },
{ emoji: '🍦', name: 'Soft Ice Cream', keywords: ['ice cream', 'dessert'], category: 'Food & Drink' },
{ emoji: '🍩', name: 'Doughnut', keywords: ['donut', 'dessert'], category: 'Food & Drink' },
{ emoji: '🍪', name: 'Cookie', keywords: ['cookie', 'dessert'], category: 'Food & Drink' },
{ emoji: '☕', name: 'Hot Beverage', keywords: ['coffee', 'tea'], category: 'Food & Drink' },
{ emoji: '🍵', name: 'Teacup Without Handle', keywords: ['tea', 'green tea'], category: 'Food & Drink' },
{ emoji: '🍺', name: 'Beer Mug', keywords: ['beer', 'drink'], category: 'Food & Drink' },
{ emoji: '🍻', name: 'Clinking Beer Mugs', keywords: ['cheers', 'beer'], category: 'Food & Drink' },
{ emoji: '🥂', name: 'Clinking Glasses', keywords: ['cheers', 'champagne'], category: 'Food & Drink' },
{ emoji: '🍷', name: 'Wine Glass', keywords: ['wine', 'drink'], category: 'Food & Drink' },
{ emoji: '🚗', name: 'Automobile', keywords: ['car', 'vehicle'], category: 'Travel & Places' },
{ emoji: '🚕', name: 'Taxi', keywords: ['taxi', 'cab'], category: 'Travel & Places' },
{ emoji: '🚙', name: 'Sport Utility Vehicle', keywords: ['suv', 'offroad'], category: 'Travel & Places' },
{ emoji: '🚌', name: 'Bus', keywords: ['bus', 'vehicle'], category: 'Travel & Places' },
{ emoji: '🚎', name: 'Trolleybus', keywords: ['bus', 'trolley'], category: 'Travel & Places' },
{ emoji: '🏎️', name: 'Racing Car', keywords: ['race', 'sports car'], category: 'Travel & Places' },
{ emoji: '🚓', name: 'Police Car', keywords: ['police', 'cop'], category: 'Travel & Places' },
{ emoji: '🚑', name: 'Ambulance', keywords: ['ambulance', 'medical'], category: 'Travel & Places' },
{ emoji: '🚒', name: 'Fire Engine', keywords: ['fire', 'truck'], category: 'Travel & Places' },
{ emoji: '🚚', name: 'Delivery Truck', keywords: ['truck', 'delivery'], category: 'Travel & Places' },
{ emoji: '🚲', name: 'Bicycle', keywords: ['bike', 'cycle'], category: 'Travel & Places' },
{ emoji: '🛴', name: 'Kick Scooter', keywords: ['scooter', 'ride'], category: 'Travel & Places' },
{ emoji: '🚂', name: 'Locomotive', keywords: ['train', 'railway'], category: 'Travel & Places' },
{ emoji: '🚀', name: 'Rocket', keywords: ['rocket', 'space'], category: 'Travel & Places' },
{ emoji: '🛸', name: 'Flying Saucer', keywords: ['ufo', 'alien'], category: 'Travel & Places' },
{ emoji: '✈️', name: 'Airplane', keywords: ['plane', 'flight'], category: 'Travel & Places' },
{ emoji: '🚁', name: 'Helicopter', keywords: ['helicopter', 'chopper'], category: 'Travel & Places' },
{ emoji: '🛶', name: 'Canoe', keywords: ['canoe', 'boat'], category: 'Travel & Places' },
{ emoji: '⛵', name: 'Sailboat', keywords: ['sailboat', 'yacht'], category: 'Travel & Places' },
{ emoji: '🚢', name: 'Ship', keywords: ['ship', 'boat'], category: 'Travel & Places' },
{ emoji: '🏠', name: 'House', keywords: ['home', 'house'], category: 'Travel & Places' },
{ emoji: '🏢', name: 'Office Building', keywords: ['office', 'building'], category: 'Travel & Places' },
{ emoji: '🏨', name: 'Hotel', keywords: ['hotel', 'stay'], category: 'Travel & Places' },
{ emoji: '🏪', name: 'Convenience Store', keywords: ['store', 'shop'], category: 'Travel & Places' },
{ emoji: '🏫', name: 'School', keywords: ['school', 'education'], category: 'Travel & Places' },
{ emoji: '🏔️', name: 'Snow-Capped Mountain', keywords: ['mountain', 'snow'], category: 'Travel & Places' },
{ emoji: '🌋', name: 'Volcano', keywords: ['volcano', 'lava'], category: 'Travel & Places' },
{ emoji: '🏖️', name: 'Beach with Umbrella', keywords: ['beach', 'vacation'], category: 'Travel & Places' },
{ emoji: '🏜️', name: 'Desert', keywords: ['desert', 'sand'], category: 'Travel & Places' },
{ emoji: '🌊', name: 'Water Wave', keywords: ['wave', 'ocean'], category: 'Travel & Places' },
{ emoji: '🌅', name: 'Sunrise', keywords: ['sunrise', 'morning'], category: 'Travel & Places' },
{ emoji: '🌄', name: 'Sunrise Over Mountains', keywords: ['sunrise', 'mountains'], category: 'Travel & Places' },
{ emoji: '🎉', name: 'Party Popper', keywords: ['party', 'confetti', 'celebration'], category: 'Activities' },
{ emoji: '🎊', name: 'Confetti Ball', keywords: ['confetti', 'party'], category: 'Activities' },
{ emoji: '🎃', name: 'Jack-O-Lantern', keywords: ['halloween', 'pumpkin'], category: 'Activities' },
{ emoji: '🎄', name: 'Christmas Tree', keywords: ['christmas', 'tree'], category: 'Activities' },
{ emoji: '🎁', name: 'Wrapped Gift', keywords: ['gift', 'present'], category: 'Activities' },
{ emoji: '🎈', name: 'Balloon', keywords: ['balloon', 'party'], category: 'Activities' },
{ emoji: '🎀', name: 'Ribbon', keywords: ['ribbon', 'bow'], category: 'Activities' },
{ emoji: '⚽', name: 'Soccer Ball', keywords: ['soccer', 'football', 'sport'], category: 'Activities' },
{ emoji: '🏀', name: 'Basketball', keywords: ['basketball', 'sport'], category: 'Activities' },
{ emoji: '🏈', name: 'American Football', keywords: ['football', 'sport'], category: 'Activities' },
{ emoji: '⚾', name: 'Baseball', keywords: ['baseball', 'sport'], category: 'Activities' },
{ emoji: '🎾', name: 'Tennis', keywords: ['tennis', 'sport'], category: 'Activities' },
{ emoji: '🎳', name: 'Bowling', keywords: ['bowling', 'sport'], category: 'Activities' },
{ emoji: '🏆', name: 'Trophy', keywords: ['trophy', 'win'], category: 'Activities' },
{ emoji: '🥇', name: '1st Place Medal', keywords: ['gold', 'first'], category: 'Activities' },
{ emoji: '🥈', name: '2nd Place Medal', keywords: ['silver', 'second'], category: 'Activities' },
{ emoji: '🥉', name: '3rd Place Medal', keywords: ['bronze', 'third'], category: 'Activities' },
{ emoji: '🎵', name: 'Musical Note', keywords: ['music', 'note'], category: 'Activities' },
{ emoji: '🎶', name: 'Musical Notes', keywords: ['music', 'notes'], category: 'Activities' },
{ emoji: '🎤', name: 'Microphone', keywords: ['mic', 'sing'], category: 'Activities' },
{ emoji: '🎸', name: 'Guitar', keywords: ['guitar', 'music'], category: 'Activities' },
{ emoji: '🎹', name: 'Musical Keyboard', keywords: ['piano', 'keys'], category: 'Activities' },
{ emoji: '🎺', name: 'Trumpet', keywords: ['trumpet', 'brass'], category: 'Activities' },
{ emoji: '🎻', name: 'Violin', keywords: ['violin', 'string'], category: 'Activities' },
{ emoji: '🎮', name: 'Video Game', keywords: ['game', 'controller'], category: 'Activities' },
{ emoji: '🎯', name: 'Direct Hit', keywords: ['target', 'dart'], category: 'Activities' },
{ emoji: '🎲', name: 'Game Die', keywords: ['dice', 'game'], category: 'Activities' },
{ emoji: '♟️', name: 'Chess Pawn', keywords: ['chess', 'pawn'], category: 'Activities' },
{ emoji: '🎭', name: 'Performing Arts', keywords: ['theater', 'mask'], category: 'Activities' },
{ emoji: '🎨', name: 'Artist Palette', keywords: ['art', 'palette'], category: 'Activities' },
{ emoji: '📚', name: 'Books', keywords: ['books', 'library'], category: 'Objects' },
{ emoji: '📖', name: 'Open Book', keywords: ['book', 'reading'], category: 'Objects' },
{ emoji: '📕', name: 'Closed Book', keywords: ['book', 'red'], category: 'Objects' },
{ emoji: '📗', name: 'Green Book', keywords: ['book', 'green'], category: 'Objects' },
{ emoji: '📘', name: 'Blue Book', keywords: ['book', 'blue'], category: 'Objects' },
{ emoji: '📙', name: 'Orange Book', keywords: ['book', 'orange'], category: 'Objects' },
{ emoji: '📝', name: 'Memo', keywords: ['memo', 'note'], category: 'Objects' },
{ emoji: '✏️', name: 'Pencil', keywords: ['pencil', 'write'], category: 'Objects' },
{ emoji: '🖊️', name: 'Pen', keywords: ['pen', 'write'], category: 'Objects' },
{ emoji: '🔍', name: 'Magnifying Glass Tilted Left', keywords: ['search', 'find'], category: 'Objects' },
{ emoji: '🔎', name: 'Magnifying Glass Tilted Right', keywords: ['search', 'find'], category: 'Objects' },
{ emoji: '🔒', name: 'Locked', keywords: ['lock', 'secure'], category: 'Objects' },
{ emoji: '🔓', name: 'Unlocked', keywords: ['unlock', 'open'], category: 'Objects' },
{ emoji: '🔑', name: 'Key', keywords: ['key', 'password'], category: 'Objects' },
{ emoji: '🔨', name: 'Hammer', keywords: ['hammer', 'tool'], category: 'Objects' },
{ emoji: '🪓', name: 'Axe', keywords: ['axe', 'chop'], category: 'Objects' },
{ emoji: '🔧', name: 'Wrench', keywords: ['wrench', 'tool'], category: 'Objects' },
{ emoji: '🔩', name: 'Nut and Bolt', keywords: ['screw', 'tool'], category: 'Objects' },
{ emoji: '⚙️', name: 'Gear', keywords: ['gear', 'settings'], category: 'Objects' },
{ emoji: '💻', name: 'Laptop', keywords: ['computer', 'laptop'], category: 'Objects' },
{ emoji: '🖥️', name: 'Desktop Computer', keywords: ['computer', 'desktop'], category: 'Objects' },
{ emoji: '📱', name: 'Mobile Phone', keywords: ['phone', 'mobile'], category: 'Objects' },
{ emoji: '📞', name: 'Telephone Receiver', keywords: ['phone', 'call'], category: 'Objects' },
{ emoji: '⌚', name: 'Watch', keywords: ['watch', 'time'], category: 'Objects' },
{ emoji: '📷', name: 'Camera', keywords: ['camera', 'photo'], category: 'Objects' },
{ emoji: '🎥', name: 'Movie Camera', keywords: ['camera', 'film'], category: 'Objects' },
{ emoji: '🔦', name: 'Flashlight', keywords: ['flashlight', 'light'], category: 'Objects' },
{ emoji: '💡', name: 'Light Bulb', keywords: ['idea', 'light'], category: 'Objects' },
{ emoji: '🔥', name: 'Fire', keywords: ['fire', 'burn'], category: 'Objects' },
{ emoji: '💣', name: 'Bomb', keywords: ['bomb', 'explode'], category: 'Objects' },
{ emoji: '❤️', name: 'Red Heart', keywords: ['heart', 'love'], category: 'Symbols' },
{ emoji: '🧡', name: 'Orange Heart', keywords: ['heart', 'orange'], category: 'Symbols' },
{ emoji: '💛', name: 'Yellow Heart', keywords: ['heart', 'yellow'], category: 'Symbols' },
{ emoji: '💚', name: 'Green Heart', keywords: ['heart', 'green'], category: 'Symbols' },
{ emoji: '💙', name: 'Blue Heart', keywords: ['heart', 'blue'], category: 'Symbols' },
{ emoji: '💜', name: 'Purple Heart', keywords: ['heart', 'purple'], category: 'Symbols' },
{ emoji: '🖤', name: 'Black Heart', keywords: ['heart', 'black'], category: 'Symbols' },
{ emoji: '🤍', name: 'White Heart', keywords: ['heart', 'white'], category: 'Symbols' },
{ emoji: '💔', name: 'Broken Heart', keywords: ['heart', 'broken'], category: 'Symbols' },
{ emoji: '❣️', name: 'Heart Exclamation', keywords: ['heart', 'exclamation'], category: 'Symbols' },
{ emoji: '💕', name: 'Two Hearts', keywords: ['hearts', 'love'], category: 'Symbols' },
{ emoji: '💞', name: 'Revolving Hearts', keywords: ['hearts', 'revolving'], category: 'Symbols' },
{ emoji: '💓', name: 'Beating Heart', keywords: ['heart', 'beat'], category: 'Symbols' },
{ emoji: '💗', name: 'Growing Heart', keywords: ['heart', 'growing'], category: 'Symbols' },
{ emoji: '💖', name: 'Sparkling Heart', keywords: ['sparkle', 'heart'], category: 'Symbols' },
{ emoji: '💘', name: 'Heart with Arrow', keywords: ['cupid', 'love'], category: 'Symbols' },
{ emoji: '💝', name: 'Heart with Ribbon', keywords: ['gift', 'heart'], category: 'Symbols' },
{ emoji: '⭐', name: 'Star', keywords: ['star', 'rating'], category: 'Symbols' },
{ emoji: '🌟', name: 'Glowing Star', keywords: ['star', 'shiny'], category: 'Symbols' },
{ emoji: '✨', name: 'Sparkles', keywords: ['sparkle', 'magic'], category: 'Symbols' },
{ emoji: '💯', name: 'Hundred Points', keywords: ['100', 'perfect'], category: 'Symbols' },
{ emoji: '✅', name: 'Check Mark Button', keywords: ['check', 'yes'], category: 'Symbols' },
{ emoji: '❌', name: 'Cross Mark', keywords: ['x', 'no'], category: 'Symbols' },
{ emoji: '❓', name: 'Question Mark', keywords: ['question', 'help'], category: 'Symbols' },
{ emoji: '❗', name: 'Exclamation Mark', keywords: ['exclamation', 'alert'], category: 'Symbols' },
{ emoji: '♻️', name: 'Recycling Symbol', keywords: ['recycle', 'green'], category: 'Symbols' },
{ emoji: '⚠️', name: 'Warning', keywords: ['warning', 'caution'], category: 'Symbols' },
{ emoji: '☮️', name: 'Peace Symbol', keywords: ['peace', 'hippie'], category: 'Symbols' },
{ emoji: '☯️', name: 'Yin Yang', keywords: ['balance', 'tao'], category: 'Symbols' },
{ emoji: '🛐', name: 'Place of Worship', keywords: ['worship', 'religion'], category: 'Symbols' },
{ emoji: '🔴', name: 'Red Circle', keywords: ['circle', 'red'], category: 'Symbols' },
{ emoji: '🟠', name: 'Orange Circle', keywords: ['circle', 'orange'], category: 'Symbols' },
{ emoji: '🟡', name: 'Yellow Circle', keywords: ['circle', 'yellow'], category: 'Symbols' },
{ emoji: '🟢', name: 'Green Circle', keywords: ['circle', 'green'], category: 'Symbols' },
{ emoji: '🔵', name: 'Blue Circle', keywords: ['circle', 'blue'], category: 'Symbols' },
{ emoji: '🟣', name: 'Purple Circle', keywords: ['circle', 'purple'], category: 'Symbols' },
{ emoji: '⚫', name: 'Black Circle', keywords: ['circle', 'black'], category: 'Symbols' },
{ emoji: '⚪', name: 'White Circle', keywords: ['circle', 'white'], category: 'Symbols' },
{ emoji: '🏁', name: 'Chequered Flag', keywords: ['flag', 'finish'], category: 'Flags' },
{ emoji: '🚩', name: 'Triangular Flag', keywords: ['flag', 'post'], category: 'Flags' },
{ emoji: '🎌', name: 'Crossed Flags', keywords: ['flag', 'crossed'], category: 'Flags' },
{ emoji: '🏴', name: 'Black Flag', keywords: ['flag', 'black'], category: 'Flags' },
{ emoji: '🇺🇳', name: 'United Nations', keywords: ['un', 'nations'], category: 'Flags' },
{ emoji: '🇺🇸', name: 'United States', keywords: ['usa', 'america'], category: 'Flags' },
{ emoji: '🇬🇧', name: 'United Kingdom', keywords: ['uk', 'britain'], category: 'Flags' },
{ emoji: '🇨🇦', name: 'Canada', keywords: ['canada'], category: 'Flags' },
{ emoji: '🇦🇺', name: 'Australia', keywords: ['australia'], category: 'Flags' },
{ emoji: '🇩🇪', name: 'Germany', keywords: ['germany', 'deutschland'], category: 'Flags' },
{ emoji: '🇫🇷', name: 'France', keywords: ['france'], category: 'Flags' },
{ emoji: '🇯🇵', name: 'Japan', keywords: ['japan'], category: 'Flags' },
{ emoji: '🇰🇷', name: 'South Korea', keywords: ['korea'], category: 'Flags' },
{ emoji: '🇮🇹', name: 'Italy', keywords: ['italy'], category: 'Flags' },
{ emoji: '🇪🇸', name: 'Spain', keywords: ['spain'], category: 'Flags' },
{ emoji: '🇷🇺', name: 'Russia', keywords: ['russia'], category: 'Flags' },
{ emoji: '🇧🇷', name: 'Brazil', keywords: ['brazil'], category: 'Flags' },
{ emoji: '🇮🇳', name: 'India', keywords: ['india'], category: 'Flags' },
{ emoji: '🇨🇳', name: 'China', keywords: ['china'], category: 'Flags' },
{ emoji: '🇸🇪', name: 'Sweden', keywords: ['sweden'], category: 'Flags' },
{ emoji: '🇳🇴', name: 'Norway', keywords: ['norway'], category: 'Flags' },
{ emoji: '🇫🇮', name: 'Finland', keywords: ['finland'], category: 'Flags' },
{ emoji: '🇩🇰', name: 'Denmark', keywords: ['denmark'], category: 'Flags' },
{ emoji: '🇳🇱', name: 'Netherlands', keywords: ['netherlands', 'holland'], category: 'Flags' },
{ emoji: '🇨🇭', name: 'Switzerland', keywords: ['switzerland'], category: 'Flags' },
{ emoji: '🇦🇹', name: 'Austria', keywords: ['austria'], category: 'Flags' },
{ emoji: '🇮🇪', name: 'Ireland', keywords: ['ireland'], category: 'Flags' },
{ emoji: '🇵🇹', name: 'Portugal', keywords: ['portugal'], category: 'Flags' },
{ emoji: '🇬🇷', name: 'Greece', keywords: ['greece'], category: 'Flags' },
{ emoji: '🇵🇱', name: 'Poland', keywords: ['poland'], category: 'Flags' },
{ emoji: '🇹🇷', name: 'Turkey', keywords: ['turkey'], category: 'Flags' },
{ emoji: '🇦🇪', name: 'United Arab Emirates', keywords: ['uae', 'dubai'], category: 'Flags' },
{ emoji: '🇸🇦', name: 'Saudi Arabia', keywords: ['saudi'], category: 'Flags' },
{ emoji: '🇮🇱', name: 'Israel', keywords: ['israel'], category: 'Flags' },
{ emoji: '🇿🇦', name: 'South Africa', keywords: ['south africa'], category: 'Flags' },
{ emoji: '🇲🇽', name: 'Mexico', keywords: ['mexico'], category: 'Flags' },
{ emoji: '🇦🇷', name: 'Argentina', keywords: ['argentina'], category: 'Flags' },
{ emoji: '🫨', name: 'Shaking Face', keywords: ['shake', 'vibrate'], category: 'Smileys & Emotion' },
{ emoji: '🫵', name: 'Index Pointing at the Viewer', keywords: ['point', 'you'], category: 'People & Body' },
{ emoji: '🫷', name: 'Leftwards Pushing Hand', keywords: ['push', 'left'], category: 'People & Body' },
{ emoji: '🫸', name: 'Rightwards Pushing Hand', keywords: ['push', 'right'], category: 'People & Body' },
{ emoji: '🫠', name: 'Melting Face', keywords: ['melt', 'hot'], category: 'Smileys & Emotion' },
{ emoji: '🪪', name: 'Identification Card', keywords: ['id', 'identity'], category: 'Objects' },
{ emoji: '🪫', name: 'Low Battery', keywords: ['battery', 'low'], category: 'Objects' },
{ emoji: '🪬', name: 'Hamsa', keywords: ['hand', 'protection'], category: 'Symbols' },
{ emoji: '🪶', name: 'Feather', keywords: ['feather', 'bird'], category: 'Animals & Nature' },
{ emoji: '🪺', name: 'Nest with Eggs', keywords: ['nest', 'eggs'], category: 'Animals & Nature' },
{ emoji: '🪹', name: 'Empty Nest', keywords: ['nest', 'empty'], category: 'Animals & Nature' },
{ emoji: '🪻', name: 'Hyacinth', keywords: ['flower', 'purple'], category: 'Animals & Nature' },
{ emoji: '🪼', name: 'Jellyfish', keywords: ['jellyfish', 'ocean'], category: 'Animals & Nature' },
{ emoji: '🪽', name: 'Wing', keywords: ['wing', 'fly'], category: 'Animals & Nature' },
{ emoji: '🪿', name: 'Goose', keywords: ['goose', 'bird'], category: 'Animals & Nature' },
{ emoji: '🫎', name: 'Moose', keywords: ['moose', 'elk'], category: 'Animals & Nature' },
{ emoji: '🫏', name: 'Donkey', keywords: ['donkey', 'ass'], category: 'Animals & Nature' },
{ emoji: '🫘', name: 'Beans', keywords: ['beans', 'legume'], category: 'Food & Drink' },
{ emoji: '🫙', name: 'Jar', keywords: ['jar', 'container'], category: 'Food & Drink' },
{ emoji: '🫚', name: 'Ginger Root', keywords: ['ginger', 'root'], category: 'Food & Drink' },
{ emoji: '🫛', name: 'Pea Pod', keywords: ['pea', 'pod'], category: 'Food & Drink' },
{ emoji: '🫜', name: 'Root Vegetable', keywords: ['root', 'vegetable'], category: 'Food & Drink' },
{ emoji: '🫒', name: 'Olive', keywords: ['olive', 'fruit'], category: 'Food & Drink' },
{ emoji: '🫓', name: 'Flatbread', keywords: ['flatbread', 'naan'], category: 'Food & Drink' },
{ emoji: '🫔', name: 'Tamale', keywords: ['tamale', 'mexican'], category: 'Food & Drink' },
{ emoji: '🫕', name: 'Fondue', keywords: ['fondue', 'cheese'], category: 'Food & Drink' },
{ emoji: '🫖', name: 'Teapot', keywords: ['tea', 'teapot'], category: 'Food & Drink' },
{ emoji: '🫗', name: 'Pouring Liquid', keywords: ['pour', 'drink'], category: 'Food & Drink' },
{ emoji: '🦺', name: 'Safety Vest', keywords: ['safety', 'vest'], category: 'Objects' },
{ emoji: '🦻', name: 'Ear with Hearing Aid', keywords: ['hearing', 'aid'], category: 'People & Body' },
{ emoji: '🦼', name: 'Motorized Wheelchair', keywords: ['wheelchair', 'motorized'], category: 'Travel & Places' },
{ emoji: '🦽', name: 'Manual Wheelchair', keywords: ['wheelchair', 'manual'], category: 'Travel & Places' },
{ emoji: '🦾', name: 'Mechanical Arm', keywords: ['prosthetic', 'arm'], category: 'People & Body' },
{ emoji: '🦿', name: 'Mechanical Leg', keywords: ['prosthetic', 'leg'], category: 'People & Body' },
{ emoji: '🧑‍🦯', name: 'Person with White Cane', keywords: ['blind', 'cane'], category: 'People & Body' },
{ emoji: '🧑‍🦼', name: 'Person in Motorized Wheelchair', keywords: ['wheelchair'], category: 'People & Body' },
{ emoji: '🧑‍🦽', name: 'Person in Manual Wheelchair', keywords: ['wheelchair'], category: 'People & Body' },
{ emoji: '🧌', name: 'Troll', keywords: ['troll', 'fantasy'], category: 'People & Body' },
{ emoji: '🪸', name: 'Coral', keywords: ['coral', 'reef'], category: 'Animals & Nature' },
{ emoji: '🪷', name: 'Lotus', keywords: ['lotus', 'flower'], category: 'Animals & Nature' },
{ emoji: '🪾', name: 'Deciduous Tree', keywords: ['tree', 'deciduous'], category: 'Animals & Nature' },
{ emoji: '🫃', name: 'Pregnant Man', keywords: ['pregnant', 'man'], category: 'People & Body' },
{ emoji: '🫄', name: 'Pregnant Person', keywords: ['pregnant', 'person'], category: 'People & Body' },
{ emoji: '🫅', name: 'Person with Crown', keywords: ['crown', 'royal'], category: 'People & Body' },
{ emoji: '🫱', name: 'Rightwards Hand', keywords: ['hand', 'right'], category: 'People & Body' },
{ emoji: '🫲', name: 'Leftwards Hand', keywords: ['hand', 'left'], category: 'People & Body' },
{ emoji: '🫳', name: 'Palm Down Hand', keywords: ['hand', 'palm down'], category: 'People & Body' },
{ emoji: '🫴', name: 'Palm Up Hand', keywords: ['hand', 'palm up'], category: 'People & Body' },
{ emoji: '🫹', name: 'Rightwards Pushing Hand: Dark Skin Tone', keywords: ['push', 'right', 'dark'], category: 'People & Body' },
{ emoji: '🛞', name: 'Wheel', keywords: ['wheel', 'circle'], category: 'Travel & Places' },
{ emoji: '🛟', name: 'Ring Buoy', keywords: ['life', 'buoy'], category: 'Travel & Places' },
{ emoji: '🛝', name: 'Playground Slide', keywords: ['slide', 'play'], category: 'Travel & Places' },
{ emoji: '🛜', name: 'Wireless', keywords: ['wifi', 'wireless'], category: 'Symbols' },
{ emoji: '🛗', name: 'Elevator', keywords: ['elevator', 'lift'], category: 'Symbols' },
{ emoji: '🟰', name: 'Heavy Equals Sign', keywords: ['equals', 'math'], category: 'Symbols' },
{ emoji: '🞨', name: 'Dotted Star', keywords: ['star', 'dotted'], category: 'Symbols' },
{ emoji: '🟕', name: 'Circled Triangle', keywords: ['triangle', 'circle'], category: 'Symbols' },
{ emoji: '🟖', name: 'Circled Cross', keywords: ['cross', 'circle'], category: 'Symbols' },
{ emoji: '🟗', name: 'Circled Asterisk', keywords: ['asterisk', 'circle'], category: 'Symbols' },
{ emoji: '🟘', name: 'Circled Double Vertical Bar', keywords: ['bar', 'circle'], category: 'Symbols' },
{ emoji: '🪩', name: 'Mirror Ball', keywords: ['disco', 'ball'], category: 'Activities' },
{ emoji: '🪰', name: 'Fly', keywords: ['fly', 'insect'], category: 'Animals & Nature' },
{ emoji: '🪱', name: 'Worm', keywords: ['worm', 'insect'], category: 'Animals & Nature' },
{ emoji: '🪴', name: 'Potted Plant', keywords: ['plant', 'potted'], category: 'Animals & Nature' },
{ emoji: '🪵', name: 'Wood', keywords: ['wood', 'log'], category: 'Animals & Nature' },
{ emoji: '🧘', name: 'Person in Lotus Position', keywords: ['yoga', 'meditation'], category: 'People & Body' },
{ emoji: '🧘‍♂️', name: 'Man in Lotus Position', keywords: ['yoga', 'meditation'], category: 'People & Body' },
{ emoji: '🧘‍♀️', name: 'Woman in Lotus Position', keywords: ['yoga', 'meditation'], category: 'People & Body' },
{ emoji: '🧗', name: 'Person Climbing', keywords: ['climb', 'rock'], category: 'Activities' },
{ emoji: '🧗‍♂️', name: 'Man Climbing', keywords: ['climb', 'rock'], category: 'Activities' },
{ emoji: '🧗‍♀️', name: 'Woman Climbing', keywords: ['climb', 'rock'], category: 'Activities' },
{ emoji: '🧛', name: 'Vampire', keywords: ['vampire', 'dracula'], category: 'People & Body' },
{ emoji: '🧜', name: 'Merperson', keywords: ['mermaid', 'merman'], category: 'People & Body' },
{ emoji: '🧜‍♂️', name: 'Merman', keywords: ['merman', 'trident'], category: 'People & Body' },
{ emoji: '🧜‍♀️', name: 'Mermaid', keywords: ['mermaid', 'sea'], category: 'People & Body' },
{ emoji: '🧝', name: 'Elf', keywords: ['elf', 'fantasy'], category: 'People & Body' },
{ emoji: '🧞', name: 'Genie', keywords: ['genie', 'magic'], category: 'People & Body' },
{ emoji: '🧟', name: 'Zombie', keywords: ['zombie', 'undead'], category: 'People & Body' },
{ emoji: '🪄', name: 'Wand', keywords: ['magic', 'wand'], category: 'Activities' },
{ emoji: '🪅', name: 'Piñata', keywords: ['pinata', 'party'], category: 'Activities' },
{ emoji: '🪆', name: 'Nesting Dolls', keywords: ['matryoshka', 'doll'], category: 'Activities' },
{ emoji: '🪇', name: 'Maracas', keywords: ['maracas', 'music'], category: 'Activities' },
{ emoji: '🪈', name: 'Flute', keywords: ['flute', 'music'], category: 'Activities' },
{ emoji: '🪉', name: 'Harp', keywords: ['harp', 'music'], category: 'Activities' },
{ emoji: '🪗', name: 'Accordion', keywords: ['accordion', 'music'], category: 'Activities' },
{ emoji: '🪘', name: 'Drum', keywords: ['drum', 'music'], category: 'Activities' },
{ emoji: '🪙', name: 'Coin', keywords: ['coin', 'money'], category: 'Objects' },
{ emoji: '🪠', name: 'Plunger', keywords: ['plunger', 'plumbing'], category: 'Objects' },
{ emoji: '🪡', name: 'Sewing Needle', keywords: ['needle', 'sew'], category: 'Objects' },
{ emoji: '🪢', name: 'Knot', keywords: ['knot', 'rope'], category: 'Objects' },
{ emoji: '🪣', name: 'Bucket', keywords: ['bucket', 'pail'], category: 'Objects' },
{ emoji: '🪤', name: 'Mouse Trap', keywords: ['mouse', 'trap'], category: 'Objects' },
{ emoji: '🪥', name: 'Toothbrush', keywords: ['toothbrush', 'teeth'], category: 'Objects' },
{ emoji: '🪦', name: 'Headstone', keywords: ['grave', 'tombstone'], category: 'Objects' },
{ emoji: '🪧', name: 'Placard', keywords: ['sign', 'placard'], category: 'Objects' },
{ emoji: '🪨', name: 'Rock', keywords: ['rock', 'stone'], category: 'Animals & Nature' },
{ emoji: '🫟', name: 'Splatter', keywords: ['splat', 'paint'], category: 'Symbols' },
{ emoji: '🧃', name: 'Beverage Box', keywords: ['juice', 'box'], category: 'Food & Drink' },
{ emoji: '🧄', name: 'Garlic', keywords: ['garlic', 'cooking'], category: 'Food & Drink' },
{ emoji: '🧅', name: 'Onion', keywords: ['onion', 'cooking'], category: 'Food & Drink' },
{ emoji: '🧆', name: 'Falafel', keywords: ['falafel', 'middle eastern'], category: 'Food & Drink' },
{ emoji: '🧇', name: 'Waffle', keywords: ['waffle', 'breakfast'], category: 'Food & Drink' },
{ emoji: '🧈', name: 'Butter', keywords: ['butter', 'dairy'], category: 'Food & Drink' },
{ emoji: '🧉', name: 'Mate', keywords: ['mate', 'tea'], category: 'Food & Drink' },
{ emoji: '🧊', name: 'Ice', keywords: ['ice', 'cube'], category: 'Food & Drink' },
{ emoji: '🧑‍🍳', name: 'Cook', keywords: ['cook', 'chef'], category: 'People & Body' },
{ emoji: '🧑‍🎓', name: 'Student', keywords: ['student', 'graduate'], category: 'People & Body' },
{ emoji: '🧑‍🏫', name: 'Teacher', keywords: ['teacher', 'professor'], category: 'People & Body' },
{ emoji: '🧑‍💻', name: 'Technologist', keywords: ['coder', 'developer'], category: 'People & Body' },
{ emoji: '🧑‍🚀', name: 'Astronaut', keywords: ['astronaut', 'space'], category: 'People & Body' },
{ emoji: '🧑‍🚒', name: 'Firefighter', keywords: ['firefighter', 'fire'], category: 'People & Body' },
{ emoji: '🧑‍⚕️', name: 'Health Worker', keywords: ['doctor', 'nurse'], category: 'People & Body' },
{ emoji: '🧑‍⚖️', name: 'Judge', keywords: ['judge', 'court'], category: 'People & Body' },
{ emoji: '🧑‍✈️', name: 'Pilot', keywords: ['pilot', 'aviator'], category: 'People & Body' },
{ emoji: '🧑‍🌾', name: 'Farmer', keywords: ['farmer', 'gardener'], category: 'People & Body' },
{ emoji: '🧑‍🎨', name: 'Artist', keywords: ['artist', 'painter'], category: 'People & Body' },
{ emoji: '🧳', name: 'Luggage', keywords: ['luggage', 'suitcase'], category: 'Travel & Places' },
{ emoji: '🧴', name: 'Lotion Bottle', keywords: ['lotion', 'moisturizer'], category: 'Objects' },
{ emoji: '🧵', name: 'Thread', keywords: ['thread', 'sewing'], category: 'Objects' },
{ emoji: '🧶', name: 'Yarn', keywords: ['yarn', 'knitting'], category: 'Objects' },
{ emoji: '🧷', name: 'Safety Pin', keywords: ['safety', 'pin'], category: 'Objects' },
{ emoji: '🧸', name: 'Teddy Bear', keywords: ['teddy', 'bear', 'toy'], category: 'Activities' },
{ emoji: '🧹', name: 'Broom', keywords: ['broom', 'sweep'], category: 'Objects' },
{ emoji: '🧺', name: 'Basket', keywords: ['basket', 'laundry'], category: 'Objects' },
{ emoji: '🧻', name: 'Roll of Paper', keywords: ['toilet', 'paper'], category: 'Objects' },
{ emoji: '🧼', name: 'Soap', keywords: ['soap', 'clean'], category: 'Objects' },
{ emoji: '🧽', name: 'Sponge', keywords: ['sponge', 'clean'], category: 'Objects' },
{ emoji: '🧾', name: 'Receipt', keywords: ['receipt', 'invoice'], category: 'Objects' },
{ emoji: '🧿', name: 'Nazar Amulet', keywords: ['nazar', 'evil eye'], category: 'Objects' },
{ emoji: '🦮', name: 'Guide Dog', keywords: ['guide', 'seeing eye'], category: 'Animals & Nature' },
{ emoji: '🦯', name: 'White Cane', keywords: ['cane', 'blind'], category: 'Objects' },
{ emoji: '🦰', name: 'Red Hair', keywords: ['red', 'ginger'], category: 'People & Body' },
{ emoji: '🦱', name: 'Curly Hair', keywords: ['curly', 'hair'], category: 'People & Body' },
{ emoji: '🦲', name: 'Bald', keywords: ['bald', 'hairless'], category: 'People & Body' },
{ emoji: '🦳', name: 'White Hair', keywords: ['white', 'gray'], category: 'People & Body' },
{ emoji: '🪭', name: 'Folding Hand Fan', keywords: ['fan', 'folding'], category: 'Objects' },
{ emoji: '🪮', name: 'Hair Pick', keywords: ['hair', 'pick'], category: 'Objects' },
{ emoji: '🪯', name: 'Khanda', keywords: ['khanda', 'sikh'], category: 'Symbols' }
];

export function searchEmojis(query: string, category: string): EmojiEntry[] {
  const q = query.toLowerCase().trim();
  return EMOJI_DATA.filter(e => {
    if (category && e.category !== category) return false;
    if (!q) return true;
    return (
      e.emoji.includes(q) ||
      e.name.toLowerCase().includes(q) ||
      e.keywords.some(k => k.includes(q)) ||
      e.category.toLowerCase().includes(q)
    );
  });
}
