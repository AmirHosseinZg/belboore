export interface PasswordScore {
  score: number;
  label: string;
  color: string;
  timeToCrack: string;
  feedback: string[];
}

const COMMON_PASSWORDS = new Set([
  '123456', 'password', '12345678', 'qwerty', '123456789',
  '12345', '1234', '111111', '1234567', 'sunshine',
  'qwerty123', 'iloveyou', 'princess', 'admin', 'welcome',
  '666666', 'abc123', 'football', '123123', 'monkey',
  '654321', '!@#$%^&*', 'charlie', 'aa123456', 'donald',
  'password1', 'qwerty12345', '1234567890', 'letmein', 'trustno1',
  'dragon', 'baseball', 'hockey', 'master', 'batman',
  'starwars', 'passw0rd', 'shadow', 'michael', 'superman',
  'qazwsx', 'maggie', 'rush2112', '123321', 'pass123',
  'hello', 'ashley', 'bailey', 'shadow1', 'chester',
  'jordan', 'andrew', 'liverpool', 'arsenal', 'chelsea',
  'access', 'flower', 'lovely', 'thomas', 'matrix',
  'whatever', 'nicole', 'daniel', 'startrek', 'summer',
  'robert', 'jackson', 'jennifer', 'killer', 'ginger',
  'pepper', 'midnight', 'amanda', 'joshua', 'butterfly',
  'harley', 'thunder', 'tigger', 'william', 'george',
  'curtis', 'james', 'hunter', 'cookie', 'miller',
  'fender', 'justin', 'ranger', 'spencer', 'morris',
  'cowboy', 'carmen', 'kitten', 'pumpkin', 'orange',
  'virginia', 'trooper', 'boston', 'jasper', 'winter',
  'victoria', 'tucker', 'dallas', 'jacob', 'scarlet',
  'golden', 'harry', 'charlotte', 'steelers', 'mustang',
  'amsterdam', 'birgit', 'amazon', 'buddy', 'alexander',
  'swordfish', 'lucky', 'samson', 'titanic', 'samantha',
  'gandalf', 'thomas1', 'walter', 'henry', 'ellie',
  'beatrice', 'dolphin', 'nathan', 'tigger1', 'fluffy',
  'compaq', 'bean', 'merlin', 'change', 'red123',
  'jjjjjj', 'mercedes', 'brandy', 'james1', 'crystal',
  'connie', 'nicole1', 'hannah', 'london', 'midnight1',
  'charles', 'fishing', 'lauren', 'bubbles', 'jesus',
  'douglas', 'richard', 'buster', 'kevin', 'mazin',
  'austin', 'flash', 'molly', 'samuel', 'celtic',
  'lacrosse', 'maxwell', 'angels', 'brian', 'blessed',
  '999999', 'iloveu', 'kathy', 'simpson', 'jessica',
  'beaver', 'ncc1701', 'coral', 'martin', 'bowling',
  'peter', 'passion', 'warrior', 'valentina', 'anna',
  '112233', 'kristina', 'alexis', '123qwe', 'moscow',
  'katerina', 'brooke', 'maria', 'stephanie', 'spider',
  'success', 'aaaaaa', 'oliver', 'victor', 'buster1',
  'soccer', 'taylor', 'josh', 'cooper', 'tyler',
  'andrea', 'phoenix', 'glenn', 'booboo', 'blake',
  'testing', 'benjamin', 'kyle', 'arthur', 'apollo',
]);

export function scorePassword(password: string): PasswordScore {
  const feedback: string[] = [];

  if (!password) {
    return { score: 0, label: 'Empty', color: '#6b7280', timeToCrack: '-', feedback: ['Enter a password to analyse'] };
  }

  const len = password.length;
  let score = 0;

  if (len < 6) {
    feedback.push('Too short — use at least 8 characters');
  } else if (len < 8) {
    score += 5;
    feedback.push('Decent length, but 8+ is safer');
  } else if (len < 12) {
    score += 15;
  } else if (len < 16) {
    score += 25;
  } else {
    score += 35;
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const varietyCount = [hasUpper, hasLower, hasDigit, hasSymbol].filter(Boolean).length;

  if (varietyCount >= 3) score += 15;
  if (varietyCount >= 4) score += 10;

  if (len >= 12 && varietyCount >= 3) score += 10;

  const lowerPass = password.toLowerCase();
  if (COMMON_PASSWORDS.has(lowerPass)) {
    score = Math.min(score, 15);
    feedback.push('This is a commonly used password — easily guessed');
  }

  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 10);
    feedback.push('Contains repeated characters (e.g. "aaa")');
  }

  if (/^[A-Za-z]+$/.test(password) && len > 0) {
    score = Math.max(0, score - 10);
    if (feedback.length === 0) feedback.push('Only letters — add numbers or symbols');
  }

  if (/^[0-9]+$/.test(password) && len > 0) {
    score = Math.max(0, score - 15);
    feedback.push('Only numbers — very weak');
  }

  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) {
    score = Math.max(0, score - 8);
    feedback.push('Contains sequential characters (e.g. "abc" or "123")');
  }

  if (/^[a-zA-Z0-9]+$/.test(password) && len > 0 && !hasSymbol) {
    feedback.push('Add symbols (!@#$) to strengthen');
  }

  score = Math.min(100, Math.max(0, score));

  if (feedback.length === 0 && score >= 60) {
    feedback.push('Strong password — well done!');
  }

  let label: string;
  let color: string;
  let timeToCrack: string;

  if (score < 20) {
    label = 'Very Weak';
    color = '#ef4444';
    timeToCrack = 'Instant';
  } else if (score < 40) {
    label = 'Weak';
    color = '#f97316';
    timeToCrack = 'Seconds';
  } else if (score < 60) {
    label = 'Fair';
    color = '#eab308';
    timeToCrack = 'Hours';
  } else if (score < 80) {
    label = 'Strong';
    color = '#22c55e';
    timeToCrack = 'Years';
  } else {
    label = 'Very Strong';
    color = '#16a34a';
    timeToCrack = 'Centuries';
  }

  return { score, label, color, timeToCrack, feedback };
}

export async function computeHmac(
  algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512',
  key: string,
  data: string,
  outputFormat: 'hex' | 'base64' = 'hex'
): Promise<string> {
  const enc = new TextEncoder();
  const keyData = enc.encode(key);
  const dataData = enc.encode(data);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataData);

  if (outputFormat === 'base64') {
    return arrayBufferToBase64(signature);
  }
  return bufToHex(signature);
}

export function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export function hexToBuf(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}

export function arrayBufferToPem(buf: ArrayBuffer, label: string): string {
  const b64 = arrayBufferToBase64(buf);
  const lines: string[] = [];
  for (let i = 0; i < b64.length; i += 64) {
    lines.push(b64.substring(i, i + 64));
  }
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`;
}

export function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN [A-Z ]+-----/g, '')
    .replace(/-----END [A-Z ]+-----/g, '')
    .replace(/\s/g, '');
  return base64ToArrayBuffer(b64);
}

export async function deriveKeyFromPassword(
  password: string,
  salt: Uint8Array,
  iterations: number = 100000,
  keyLength: number = 256
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: keyLength },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptAesGcm(
  plaintext: string,
  password: string
): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyFromPassword(password, salt);
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );

  const payload = {
    salt: Array.from(salt),
    iv: Array.from(iv),
    ct: Array.from(new Uint8Array(ciphertext)),
    algo: 'AES-256-GCM',
    kdf: 'PBKDF2',
    iter: 100000,
  };

  return btoa(JSON.stringify(payload));
}

export async function decryptAesGcm(
  encoded: string,
  password: string
): Promise<string> {
  let payload: any;
  try {
    payload = JSON.parse(atob(encoded));
  } catch {
    throw new Error('Invalid encrypted payload format');
  }

  if (!payload.salt || !payload.iv || !payload.ct) {
    throw new Error('Invalid encrypted payload — missing fields');
  }

  const salt = new Uint8Array(payload.salt);
  const iv = new Uint8Array(payload.iv);
  const ciphertext = new Uint8Array(payload.ct);
  const iterations = payload.iter || 100000;

  const key = await deriveKeyFromPassword(password, salt, iterations);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
}

export async function generateRsaKeyPair(): Promise<{ publicKeyPem: string; privateKeyPem: string }> {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );

  const [publicBuf, privateBuf] = await Promise.all([
    crypto.subtle.exportKey('spki', keyPair.publicKey),
    crypto.subtle.exportKey('pkcs8', keyPair.privateKey),
  ]);

  return {
    publicKeyPem: arrayBufferToPem(publicBuf, 'PUBLIC KEY'),
    privateKeyPem: arrayBufferToPem(privateBuf, 'PRIVATE KEY'),
  };
}

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Decode(secret: string): Uint8Array {
  const cleaned = secret.replace(/[\s-]/g, '').toUpperCase();
  const bits: number[] = [];

  for (const ch of cleaned) {
    const val = BASE32_ALPHABET.indexOf(ch);
    if (val < 0) throw new Error(`Invalid Base32 character: ${ch}`);
    for (let i = 4; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  }

  const bytes: number[] = [];
  for (let i = 0; i + 7 < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bits[i + j];
    }
    bytes.push(byte);
  }

  return new Uint8Array(bytes);
}

export function generateTotp(
  secretBytes: Uint8Array,
  timeStep: number = 30,
  digits: number = 6,
  timestamp: number = Date.now()
): Promise<{ code: string; remaining: number; interval: number }> {
  const counter = Math.floor(timestamp / 1000 / timeStep);
  const remaining = timeStep - Math.floor((timestamp / 1000) % timeStep);

  return totpFromCounter(secretBytes, counter, digits).then(code => ({
    code,
    remaining,
    interval: timeStep,
  }));
}

async function totpFromCounter(secretBytes: Uint8Array, counter: number, digits: number): Promise<string> {
  const counterBuf = new ArrayBuffer(8);
  const counterView = new DataView(counterBuf);
  counterView.setBigUint64(0, BigInt(counter), false);

  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );

  const hmacResult = await crypto.subtle.sign('HMAC', key, counterBuf);
  const hmac = new Uint8Array(hmacResult);
  const offset = hmac[hmac.length - 1] & 0x0f;

  const binaryCode =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = binaryCode % Math.pow(10, digits);
  return String(otp).padStart(digits, '0');
}

export function generateTotpSecret(length: number = 20): { secret: string; bytes: Uint8Array } {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let secret = '';
  for (let i = 0; i < bytes.length; i += 5) {
    const chunk = bytes.slice(i, i + 5);
    let value = 0;
    for (let j = 0; j < chunk.length; j++) {
      value = (value << 8) | chunk[j];
    }
    const encoded: string[] = [];
    for (let j = 0; j < Math.ceil(chunk.length * 8 / 5); j++) {
      encoded.push(BASE32_ALPHABET[(value >> (Math.ceil(chunk.length * 8 / 5) - 1 - j) * 5) & 0x1f]);
    }
    secret += encoded.join('');
  }
  secret = secret.replace(/=+$/, '');
  const padded = secret + '====';
  return { secret: padded.substring(0, Math.ceil(secret.length / 8) * 8), bytes };
}

export async function hashFile(
  file: File,
  algorithm: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const chunkSize = 64 * 1024;
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    const hashAlgo = algorithm === 'MD5' ? 'SHA-256' : algorithm;

    reader.onerror = () => reject(new Error('Failed to read file'));

    if (hashAlgo === 'SHA-256' || hashAlgo === 'SHA-384' || hashAlgo === 'SHA-512') {
      reader.onload = async () => {
        if (onProgress) onProgress(100);
        const result = reader.result as ArrayBuffer;
        const hash = await crypto.subtle.digest(hashAlgo, result);
        resolve(bufToHex(hash));
      };
      reader.readAsArrayBuffer(file);
    } else if (hashAlgo === 'SHA-1') {
      reader.onload = async () => {
        if (onProgress) onProgress(100);
        const result = reader.result as ArrayBuffer;
        const hash = await crypto.subtle.digest('SHA-1', result);
        resolve(bufToHex(hash));
      };
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error(`Unsupported algorithm: ${algorithm}`));
    }
  });
}

export async function fileToText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export function isWebCryptoAvailable(): boolean {
  return typeof crypto !== 'undefined' && !!crypto.subtle;
}

export function secureRandomString(length: number, charset: string): string {
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[array[i] % charset.length];
  }
  return result;
}

export const AMBIGUOUS_CHARS = 'O0Il1';

export const DEFAULT_CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};
