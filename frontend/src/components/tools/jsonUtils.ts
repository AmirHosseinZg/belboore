export function parseJsonSafe(input: string): { success: true; data: unknown } | { success: false; error: string; line?: number; column?: number } {
  try {
    const data = JSON.parse(input);
    return { success: true, data };
  } catch (e: any) {
    const msg = e?.message || 'Invalid JSON';
    const match = msg.match(/position\s+(\d+)/i);
    if (match) {
      const pos = parseInt(match[1], 10);
      const lines = input.slice(0, pos).split('\n');
      const line = lines.length;
      const column = (lines[lines.length - 1]?.length || 0) + 1;
      return { success: false, error: msg, line, column };
    }
    const lineMatch = msg.match(/line\s+(\d+)/i);
    const colMatch = msg.match(/column\s+(\d+)/i);
    if (lineMatch || colMatch) {
      return { success: false, error: msg, line: lineMatch ? parseInt(lineMatch[1], 10) : undefined, column: colMatch ? parseInt(colMatch[1], 10) : undefined };
    }
    return { success: false, error: msg };
  }
}

export function formatJson(input: string, spaces = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, spaces);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function formatJsonPreview(input: string): { formatted: string; error: string | null } {
  try {
    return { formatted: formatJson(input), error: null };
  } catch (e: any) {
    return { formatted: '', error: e?.message || 'Invalid JSON' };
  }
}

export function flattenJsonObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenJsonObject(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = stringifyValueForDisplay(value);
    }
  }
  return result;
}

export function stringifyValueForDisplay(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    const allPrimitive = value.every(v => v === null || typeof v !== 'object');
    if (allPrimitive) {
      return value.map(v => stringifyValueForDisplay(v)).join(', ');
    }
    return JSON.stringify(value);
  }
  return JSON.stringify(value);
}

export function jsonToCsv(input: string): { csv: string; error: string | null } {
  try {
    const data = JSON.parse(input);
    if (!Array.isArray(data)) {
      return { csv: '', error: 'Input must be a JSON array of objects. Wrap your object in [ ] brackets.' };
    }
    if (data.length === 0) {
      return { csv: '', error: 'Array is empty. No CSV to generate.' };
    }
    const allKeys = new Set<string>();
    const flattenedRows: Record<string, string>[] = [];
    for (const item of data) {
      if (item === null || typeof item !== 'object' || Array.isArray(item)) {
        return { csv: '', error: 'Each array element must be a JSON object.' };
      }
      const flat = flattenJsonObject(item as Record<string, unknown>);
      flattenedRows.push(flat);
      for (const key of Object.keys(flat)) {
        allKeys.add(key);
      }
    }
    const headers = Array.from(allKeys);
    const escapeCell = (val: string): string => {
      if (val.includes('"') || val.includes(',') || val.includes('\n') || val.includes('\r')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    const lines: string[] = [];
    lines.push(headers.map(h => escapeCell(h)).join(','));
    for (const row of flattenedRows) {
      lines.push(headers.map(h => escapeCell(row[h] || '')).join(','));
    }
    return { csv: lines.join('\n'), error: null };
  } catch (e: any) {
    return { csv: '', error: e?.message || 'Invalid JSON' };
  }
}

export interface DiffEntry {
  path: string;
  type: 'added' | 'removed' | 'changed';
  oldValue: string;
  newValue: string;
}

export function diffJson(original: string, changed: string): { diffs: DiffEntry[]; error: string | null } {
  try {
    const origParsed = JSON.parse(original);
    const changedParsed = JSON.parse(changed);
    const diffs: DiffEntry[] = [];
    function compare(a: unknown, b: unknown, path: string) {
      if (a === b) return;
      if (typeof a !== typeof b) {
        diffs.push({ path, type: 'changed', oldValue: stringifyValueForDisplay(a), newValue: stringifyValueForDisplay(b) });
        return;
      }
      if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
        const aIsArr = Array.isArray(a);
        const bIsArr = Array.isArray(b);
        if (aIsArr !== bIsArr) {
          diffs.push({ path, type: 'changed', oldValue: stringifyValueForDisplay(a), newValue: stringifyValueForDisplay(b) });
          return;
        }
        if (aIsArr) {
          const arrA = a as unknown[];
          const arrB = b as unknown[];
          const maxLen = Math.max(arrA.length, arrB.length);
          for (let i = 0; i < maxLen; i++) {
            const itemPath = `${path}[${i}]`;
            if (i >= arrA.length) {
              diffs.push({ path: itemPath, type: 'added', oldValue: '', newValue: stringifyValueForDisplay(arrB[i]) });
            } else if (i >= arrB.length) {
              diffs.push({ path: itemPath, type: 'removed', oldValue: stringifyValueForDisplay(arrA[i]), newValue: '' });
            } else {
              compare(arrA[i], arrB[i], itemPath);
            }
          }
        } else {
          const objA = a as Record<string, unknown>;
          const objB = b as Record<string, unknown>;
          const allKeys = new Set([...Object.keys(objA), ...Object.keys(objB)]);
          for (const key of allKeys) {
            const keyPath = path ? `${path}.${key}` : key;
            if (!(key in objA)) {
              diffs.push({ path: keyPath, type: 'added', oldValue: '', newValue: stringifyValueForDisplay(objB[key]) });
            } else if (!(key in objB)) {
              diffs.push({ path: keyPath, type: 'removed', oldValue: stringifyValueForDisplay(objA[key]), newValue: '' });
            } else {
              compare(objA[key], objB[key], keyPath);
            }
          }
        }
        return;
      }
      diffs.push({ path, type: 'changed', oldValue: stringifyValueForDisplay(a), newValue: stringifyValueForDisplay(b) });
    }
    compare(origParsed, changedParsed, '');
    return { diffs, error: null };
  } catch (e: any) {
    return { diffs: [], error: e?.message || 'Invalid JSON' };
  }
}

export function getJsonParseErrorDetails(input: string, errorMessage: string): string {
  const match = errorMessage.match(/position\s+(\d+)/i);
  if (match) {
    const pos = parseInt(match[1], 10);
    const lines = input.slice(0, pos).split('\n');
    const line = lines.length;
    const column = (lines[lines.length - 1]?.length || 0) + 1;
    const lineContent = input.split('\n')[line - 1] || '';
    const pointer = ' '.repeat(Math.max(0, column - 1)) + '^';
    return `Syntax error at line ${line}, column ${column}:\n${lineContent}\n${pointer}`;
  }
  return errorMessage;
}

export const JSON_SAMPLE_OBJECT = JSON.stringify({
  name: "Belboore",
  version: 1.0,
  features: ["json", "tools", "open-source"],
  active: true,
  metadata: null,
  author: {
    name: "Developer",
    website: null
  }
}, null, 2);

export const JSON_SAMPLE_ARRAY = JSON.stringify([
  { id: 1, name: "Alice", role: "admin", active: true },
  { id: 2, name: "Bob", role: "editor", active: false },
  { id: 3, name: "Charlie", role: "viewer", active: true }
], null, 2);
