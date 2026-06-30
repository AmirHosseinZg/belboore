const SAFELINK_PARAMS = new Set([
  'url', 'u', 'q', 'target', 'to', 'dest', 'destination',
  'redirect', 'redirect_url', 'return', 'returnUrl', 'r', 'link', 'safe',
]);

export function decodeBase64Url(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) base64 += '=';
  try {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}

export function htmlAttrEncode(str: string): string {
  return str.replace(/[&<>"'\/]/g, (ch) => {
    const m: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' };
    return m[ch] || ch;
  });
}

export function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseUrl(input: string): {
  valid: boolean;
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  params?: { key: string; value: string }[];
  error?: string;
} {
  let url: URL;
  try {
    const hasProto = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(input);
    url = new URL(hasProto ? input : `https://${input}`);
  } catch {
    return { valid: false, error: 'Invalid URL' };
  }
  if (!url.hostname && !url.pathname) {
    return { valid: false, error: 'Invalid URL' };
  }
  const params: { key: string; value: string }[] = [];
  url.searchParams.forEach((val, key) => params.push({ key, value: val }));
  return {
    valid: true,
    protocol: url.protocol.replace(':', ''),
    hostname: url.hostname,
    port: url.port || '(default)',
    pathname: url.pathname,
    search: url.search || '(none)',
    hash: url.hash || '(none)',
    params,
  };
}

export function detectSafelink(url: string): {
  isSafelink: boolean;
  decodeAttempts: { step: number; url: string }[];
  finalUrl: string;
  error?: string;
} {
  const attempts: { step: number; url: string }[] = [{ step: 0, url }];
  let current = url;
  let maxIter = 20;

  while (maxIter-- > 0) {
    const lower = current.toLowerCase().trim();

    let found = false;
    for (const param of SAFELINK_PARAMS) {
      const re = new RegExp(`[?&]${encodeURIComponent(param)}=(?<val>[^&#]+)`, 'i');
      const m = re.exec(lower);
      if (m?.groups?.val) {
        const raw = m.groups.val;
        let decoded = tryDecodeUrl(raw, current);
        if (decoded && decoded !== current && !attempts.some(a => a.url === decoded)) {
          current = decoded;
          attempts.push({ step: attempts.length, url: current });
          found = true;
          break;
        }
        // try decoding the matched parameter value as well
        const paramDecoded = tryDecodeAll(raw);
        if (paramDecoded && paramDecoded !== current && !attempts.some(a => a.url === paramDecoded)) {
          current = paramDecoded;
          attempts.push({ step: attempts.length, url: current });
          found = true;
          break;
        }
      }
    }

    if (!found) {
      const allParams = [...lower.matchAll(/[?&]([^=]+)=([^&#]+)/g)];
      for (const p of allParams) {
        if (SAFELINK_PARAMS.has(decodeURIComponent(p[1]).toLowerCase())) {
          const valDecoded = tryDecodeAll(p[2]);
          if (valDecoded && valDecoded !== current && !attempts.some(a => a.url === valDecoded)) {
            current = valDecoded;
            attempts.push({ step: attempts.length, url: current });
            found = true;
            break;
          }
        }
      }
    }

    if (!found) break;
  }

  return {
    isSafelink: attempts.length > 1,
    decodeAttempts: attempts,
    finalUrl: current,
  };
}

function tryDecodeUrl(encoded: string, originalUrl: string): string | null {
  try {
    const d1 = decodeURIComponent(encoded);
    if (d1 !== encoded && looksLikeUrl(d1)) return d1;
  } catch {}
  try {
    const base64decoded = decodeBase64Url(encoded);
    if (base64decoded && base64decoded !== encoded && looksLikeUrl(base64decoded)) return base64decoded;
  } catch {}
  return null;
}

function tryDecodeAll(val: string): string | null {
  let current = val;
  for (let i = 0; i < 5; i++) {
    const prev = current;
    try {
      current = decodeURIComponent(current);
    } catch { break; }
    if (current === prev) break;
  }
  if (current !== val) return current;
  const b64 = decodeBase64Url(val);
  if (b64 && b64 !== val) return b64;
  return null;
}

function looksLikeUrl(s: string): boolean {
  return /^https?:\/\//i.test(s) || (s.includes('.') && !/\s/.test(s) && s.length > 4);
}

export function btoaUtf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function jwtDecode(token: string): {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
  error?: string;
} {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { header: null, payload: null, signature: '', error: 'Invalid JWT format. Expected 3 dot-separated parts.' };
  }
  try {
    const headerRaw = decodeBase64Url(parts[0]);
    const payloadRaw = decodeBase64Url(parts[1]);
    const header = JSON.parse(headerRaw) as Record<string, unknown>;
    const payload = JSON.parse(payloadRaw) as Record<string, unknown>;

    if (payload.exp) payload.exp_human = new Date(Number(payload.exp) * 1000).toISOString();
    if (payload.iat) payload.iat_human = new Date(Number(payload.iat) * 1000).toISOString();
    if (payload.nbf) payload.nbf_human = new Date(Number(payload.nbf) * 1000).toISOString();

    return { header, payload, signature: parts[2] };
  } catch (e) {
    return { header: null, payload: null, signature: '', error: `Failed to decode: ${(e as Error).message}` };
  }
}
