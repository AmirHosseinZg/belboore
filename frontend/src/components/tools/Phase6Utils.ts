export function cryptoRandom(): number {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] / 0x100000000;
}

export function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}

export function secureRandomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
}

export function encodeBase64Url(buf: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < buf.length; i++) binary += String.fromCharCode(buf[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function generateUlid(timestamp?: number): string {
  const now = timestamp ?? Date.now();
  const timeStr = now.toString(16).padStart(12, '0');
  const randomBytes = secureRandomBytes(10);
  const randomStr = encodeBase64Url(randomBytes).slice(0, 16).toLowerCase();
  const ulid = (timeStr + randomStr).toUpperCase();
  return ulid;
}

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export function extractEmails(input: string): string[] {
  return input.match(EMAIL_RE) || [];
}

export function normalizeEmail(email: string): string {
  const [local, domain] = email.toLowerCase().split('@');
  return `${local}@${domain}`;
}

export interface EmailStats {
  total: number;
  valid: number;
  invalid: number;
  duplicatesRemoved: number;
}

export function normalizeEmailList(input: string, options: {
  lowercase?: boolean;
  trim?: boolean;
  removeDuplicates?: boolean;
  sort?: boolean;
  removeInvalid?: boolean;
}): { emails: string[]; invalid: string[]; stats: EmailStats; rawLines: string[] } {
  const rawLines = input.split(/[,;\n\r]+/).map(l => l.trim()).filter(Boolean);
  const invalid: string[] = [];
  const validEmails: string[] = [];

  for (const line of rawLines) {
    const extracted = extractEmails(line);
    if (extracted.length > 0) {
      for (const e of extracted) {
        validEmails.push(options.lowercase !== false ? normalizeEmail(e) : e);
      }
    } else {
      invalid.push(line);
    }
  }

  let totalDetected = validEmails.length;
  let duplicatesRemoved = 0;

  if (options.removeDuplicates !== false) {
    const seen = new Set<string>();
    const deduped: string[] = [];
    for (const e of validEmails) {
      if (seen.has(e)) {
        duplicatesRemoved++;
      } else {
        seen.add(e);
        deduped.push(e);
      }
    }
    validEmails.length = 0;
    validEmails.push(...deduped);
  }

  if (options.sort) {
    validEmails.sort();
  }

  const stats: EmailStats = {
    total: totalDetected,
    valid: validEmails.length,
    invalid: invalid.length,
    duplicatesRemoved,
  };

  return { emails: validEmails, invalid, stats, rawLines };
}

export function chmodToOctal(owner: number, group: number, others: number): string {
  return `${owner}${group}${others}`;
}

export function chmodToSymbolic(owner: number, group: number, others: number): string {
  const perm = (v: number) => {
    const r = v & 4 ? 'r' : '-';
    const w = v & 2 ? 'w' : '-';
    const x = v & 1 ? 'x' : '-';
    return r + w + x;
  };
  return perm(owner) + perm(group) + perm(others);
}

export function octalToChmod(octal: string): { owner: number; group: number; others: number } | null {
  if (!/^[0-7]{3}$/.test(octal)) return null;
  return {
    owner: parseInt(octal[0], 10),
    group: parseInt(octal[1], 10),
    others: parseInt(octal[2], 10),
  };
}

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_NAMES_SHORT = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function parseCron(expr: string): CronFields | null {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

function describeField(field: string, type: 'minute' | 'hour' | 'day' | 'month' | 'dow'): string {
  if (field === '*') return type === 'minute' ? 'every minute' : type === 'hour' ? 'every hour' : type === 'day' ? 'every day' : type === 'month' ? 'every month' : 'every day of week';

  if (field.startsWith('*/')) {
    const n = parseInt(field.slice(2), 10);
    if (isNaN(n)) return '';
    if (type === 'minute') return `every ${n} minutes`;
    if (type === 'hour') return `every ${n} hours`;
    if (type === 'day') return `every ${n} days`;
    if (type === 'month') return `every ${n} months`;
    return '';
  }

  const parts = field.split(',');
  const descriptions = parts.map(p => {
    const rangeMatch = p.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      return describeRange(start, end, type);
    }
    const val = parseInt(p, 10);
    if (isNaN(val)) return p;
    return describeValue(val, type);
  });

  return descriptions.join(', ');
}

function describeValue(val: number, type: string): string {
  if (type === 'minute') return `minute ${val}`;
  if (type === 'hour') return `${String(val).padStart(2, '0')}:00`;
  if (type === 'day') return `day ${val}`;
  if (type === 'month') return MONTH_NAMES[val - 1] || `month ${val}`;
  if (type === 'dow') return DAY_NAMES[val] || `day ${val}`;
  return String(val);
}

function describeRange(start: number, end: number, type: string): string {
  const s = describeValue(start, type);
  const e = describeValue(end, type);
  return `${s}-${e}`;
}

export function translateCron(expr: string): string {
  const fields = parseCron(expr);
  if (!fields) return '';

  const minuteDesc = describeField(fields.minute, 'minute');
  const hourDesc = describeField(fields.hour, 'hour');
  const domDesc = describeField(fields.dayOfMonth, 'day');
  const monthDesc = describeField(fields.month, 'month');
  const dowDesc = describeField(fields.dayOfWeek, 'dow');

  // Build a human-readable sentence
  const parts: string[] = [];

  const isMinuteStar = fields.minute === '*';
  const isHourStar = fields.hour === '*';
  const isDomStar = fields.dayOfMonth === '*';
  const isMonthStar = fields.month === '*';
  const isDowStar = fields.dayOfWeek === '*';

  if (isMinuteStar && isHourStar && isDomStar && isMonthStar && isDowStar) {
    return 'Every minute';
  }

  if (isHourStar && isDomStar && isMonthStar && isDowStar) {
    return minuteDesc;
  }

  if (isDomStar && isMonthStar && isDowStar) {
    return `${hourDesc} ${minuteDesc !== 'every minute' ? minuteDesc : ''}`.trim();
  }

  if (!isMinuteStar) parts.push(minuteDesc.replace(/^minute /i, 'at minute '));
  if (!isHourStar) parts.push(hourDesc);
  if (!isDomStar) parts.push(domDesc);
  if (!isMonthStar) parts.push(monthDesc);
  if (!isDowStar) parts.push(dowDesc);

  return parts.join(', ') || 'Invalid cron expression';
}

export function generateCronFromFields(fields: {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}): string {
  return `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;
}

export function buildCommitMessage(type: string, scope: string, subject: string, body: string, breaking: string, issue: string): string {
  let msg = type;
  if (scope) msg += `(${scope})`;
  msg += `: ${subject}`;
  if (body) msg += `\n\n${body}`;
  if (breaking) msg += `\n\nBREAKING CHANGE: ${breaking}`;
  if (issue) {
    const refs = issue.split(/[,\s]+/).filter(Boolean).map(r => r.startsWith('#') ? r : `#${r}`).join(', ');
    msg += `\n\nRefs: ${refs}`;
  }
  return msg;
}

export function validateGeoJson(input: string): { valid: boolean; data?: any; error?: string; featureCount?: number; geometryTypes?: string[] } {
  try {
    const data = JSON.parse(input);
    if (!data || typeof data !== 'object') {
      return { valid: false, error: 'Invalid GeoJSON: must be a JSON object.' };
    }
    if (data.type === 'FeatureCollection') {
      if (!Array.isArray(data.features)) {
        return { valid: false, error: 'FeatureCollection must have a "features" array.' };
      }
      const types = new Set<string>();
      for (const f of data.features) {
        if (f?.geometry?.type) types.add(f.geometry.type);
      }
      return { valid: true, data, featureCount: data.features.length, geometryTypes: [...types] };
    }
    if (data.type === 'Feature') {
      const types = data.geometry?.type ? [data.geometry.type] : [];
      return { valid: true, data, featureCount: 1, geometryTypes: types };
    }
    if (['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'].includes(data.type)) {
      return { valid: true, data, featureCount: 1, geometryTypes: [data.type] };
    }
    return { valid: false, error: 'Unrecognized GeoJSON type.' };
  } catch (e) {
    return { valid: false, error: `Invalid JSON: ${(e as Error).message}` };
  }
}

export function formatXml(input: string, indent: number = 2): string {
  const spaces = ' '.repeat(indent);
  let formatted = '';
  let depth = 0;
  const cleaned = input.replace(/>\s+</g, '><').trim();

  const tokens = cleaned.match(/<[^>]*>|[^<]+/g) || [];
  for (const token of tokens) {
    if (token.startsWith('</')) {
      depth--;
      formatted += spaces.repeat(depth) + token + '\n';
    } else if (token.startsWith('<') && !token.endsWith('/>')) {
      formatted += spaces.repeat(depth) + token + '\n';
      depth++;
    } else if (token.startsWith('<') && token.endsWith('/>')) {
      formatted += spaces.repeat(depth) + token + '\n';
    } else {
      formatted += spaces.repeat(depth) + token.trim() + '\n';
    }
  }
  return formatted.trim();
}

export function validateXml(input: string): { valid: boolean; error?: string } {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/xml');
    const errors = doc.querySelectorAll('parsererror');
    if (errors.length > 0) {
      return { valid: false, error: errors[0].textContent || 'XML parse error' };
    }
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export interface RegexMemoEntry {
  id: string;
  title: string;
  pattern: string;
  flags: string;
  description: string;
  tags: string;
  testString: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'belboore_regex_memos';

export function loadRegexMemos(): RegexMemoEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRegexMemo(memo: RegexMemoEntry): void {
  const memos = loadRegexMemos();
  const idx = memos.findIndex(m => m.id === memo.id);
  if (idx >= 0) {
    memos[idx] = memo;
  } else {
    memos.push(memo);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}

export function deleteRegexMemo(id: string): void {
  const memos = loadRegexMemos();
  const filtered = memos.filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}
