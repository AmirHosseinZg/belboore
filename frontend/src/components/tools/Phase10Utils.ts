export function toJalali(gy: number, gm: number, gd: number): { jy: number; jm: number; jd: number } {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  let jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  let jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { jy, jm, jd };
}

export function toGregorian(jy: number, jm: number, jd: number): { gy: number; gm: number; gd: number } {
  let jy1 = jy + 1595;
  let days = -355668 + 365 * jy1 + Math.floor(jy1 / 33) * 8 + Math.floor((jy1 % 33 + 3) / 4) + jd + (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  let gy = 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) { gy += 100 * Math.floor(--days / 36524); days %= 36524; }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) { gy += Math.floor((days - 1) / 365); days = (days - 1) % 365; }
  let gm = days < 31 ? 1 : days < 60 ? 2 : days < 91 ? 3 : days < 121 ? 4 : days < 152 ? 5 : days < 182 ? 6 : days < 213 ? 7 : days < 244 ? 8 : days < 274 ? 9 : days < 305 ? 10 : days < 335 ? 11 : 12;
  let gd = 1 + (gm < 2 ? days : gm < 8 ? days - 30 * (gm - 1) - Math.floor((gm - 1) / 2) : days - 30 * (gm - 1) - Math.floor(gm / 2) + 1);
  if (gm > 2) { const leap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0; if (!leap && gd > 28) { gd = 1; gm = 3; } }
  return { gy, gm, gd };
}

export function isLeapGregorian(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isLeapJalali(jy: number): boolean {
  const epBase = jy % 33;
  return epBase === 1 || epBase === 5 || epBase === 9 || epBase === 13 || epBase === 17 || epBase === 22 || epBase === 26 || epBase === 30;
}

export function pad(n: number): string {
  return n < 10 ? '0' + n : '' + n;
}

export function toLocalISO(d: Date): string {
  const off = d.getTimezoneOffset();
  const sign = off <= 0 ? '+' : '-';
  const abs = Math.abs(off);
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) +
    sign + pad(Math.floor(abs / 60)) + ':' + pad(abs % 60);
}

export function formatRelativeTime(d: Date): string {
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const abs = Math.abs(diff);
  const sec = Math.floor(abs / 1000);
  if (sec < 5) return 'just now';
  if (sec < 60) return sec + ' second' + (sec === 1 ? '' : 's') + (diff > 0 ? ' ago' : ' from now');
  const min = Math.floor(sec / 60);
  if (min < 60) return min + ' minute' + (min === 1 ? '' : 's') + (diff > 0 ? ' ago' : ' from now');
  const hr = Math.floor(min / 60);
  if (hr < 24) return hr + ' hour' + (hr === 1 ? '' : 's') + (diff > 0 ? ' ago' : ' from now');
  const days = Math.floor(hr / 24);
  if (days < 30) return days + ' day' + (days === 1 ? '' : 's') + (diff > 0 ? ' ago' : ' from now');
  const months = Math.floor(days / 30);
  if (months < 12) return months + ' month' + (months === 1 ? '' : 's') + (diff > 0 ? ' ago' : ' from now');
  const years = Math.floor(days / 365);
  return years + ' year' + (years === 1 ? '' : 's') + (diff > 0 ? ' ago' : ' from now');
}

export function getTimezoneList(): { value: string; label: string }[] {
  const zones = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'America/Anchorage', 'America/Halifax', 'America/St_Johns', 'America/Sao_Paulo',
    'America/Argentina/Buenos_Aires', 'America/Mexico_City', 'America/Phoenix',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow', 'Europe/Istanbul',
    'Europe/Madrid', 'Europe/Rome', 'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Oslo',
    'Europe/Zurich', 'Europe/Dublin', 'Europe/Athens', 'Europe/Helsinki', 'Europe/Warsaw',
    'Europe/Prague', 'Europe/Budapest', 'Europe/Bucharest', 'Europe/Kyiv', 'Europe/Vienna',
    'Europe/Brussels', 'Europe/Copenhagen', 'Europe/Lisbon', 'Europe/Belgrade',
    'Asia/Tehran', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Singapore',
    'Asia/Dubai', 'Asia/Kolkata', 'Asia/Seoul', 'Asia/Bangkok', 'Asia/Taipei',
    'Asia/Jakarta', 'Asia/Karachi', 'Asia/Dhaka', 'Asia/Riyadh', 'Asia/Baghdad',
    'Asia/Yekaterinburg', 'Asia/Novosibirsk', 'Asia/Vladivostok', 'Asia/Kamchatka',
    'Asia/Yerevan', 'Asia/Tbilisi', 'Asia/Baku', 'Asia/Kabul', 'Asia/Kathmandu',
    'Asia/Yangon', 'Asia/Colombo', 'Asia/Manila', 'Asia/Kuala_Lumpur',
    'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth',
    'Australia/Adelaide', 'Australia/Darwin', 'Australia/Hobart',
    'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Honolulu', 'Pacific/Guam',
    'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi',
    'Africa/Casablanca', 'Africa/Algiers', 'Africa/Addis_Ababa',
    'Indian/Maldives', 'Indian/Mauritius', 'Indian/Reunion',
  ];
  return zones.map(z => ({ value: z, label: z.replace(/_/g, ' ') }));
}

export function formatInTimezone(date: Date, tz: string): string {
  try {
    return date.toLocaleString('en-US', { timeZone: tz, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  } catch {
    return date.toLocaleString();
  }
}

export function diceRoll(count: number, sides: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }
  return results;
}

export function coinFlip(): 'Heads' | 'Tails' {
  return Math.random() < 0.5 ? 'Heads' : 'Tails';
}

export function pickRandomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function unescapeHtml(str: string): string {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent || div.innerText || '';
}

export const UNIT_DATA: Record<string, { name: string; key: string; toBase: number | ((v: number) => number); fromBase?: (v: number) => number }[]> = {
  length: [
    { name: 'Millimeter', key: 'mm', toBase: 0.001 },
    { name: 'Centimeter', key: 'cm', toBase: 0.01 },
    { name: 'Meter', key: 'm', toBase: 1 },
    { name: 'Kilometer', key: 'km', toBase: 1000 },
    { name: 'Inch', key: 'inch', toBase: 0.0254 },
    { name: 'Foot', key: 'foot', toBase: 0.3048 },
    { name: 'Yard', key: 'yard', toBase: 0.9144 },
    { name: 'Mile', key: 'mile', toBase: 1609.344 },
    { name: 'Nautical Mile', key: 'nmi', toBase: 1852 },
  ],
  weight: [
    { name: 'Milligram', key: 'mg', toBase: 0.000001 },
    { name: 'Gram', key: 'g', toBase: 0.001 },
    { name: 'Kilogram', key: 'kg', toBase: 1 },
    { name: 'Ton', key: 'ton', toBase: 1000 },
    { name: 'Ounce', key: 'oz', toBase: 0.0283495 },
    { name: 'Pound', key: 'lb', toBase: 0.453592 },
    { name: 'Stone', key: 'stone', toBase: 6.35029 },
  ],
  temperature: [
    { name: 'Celsius', key: 'celsius', toBase: (v: number) => v, fromBase: (v: number) => v },
    { name: 'Fahrenheit', key: 'fahrenheit', toBase: (v: number) => (v - 32) * 5 / 9, fromBase: (v: number) => v * 9 / 5 + 32 },
    { name: 'Kelvin', key: 'kelvin', toBase: (v: number) => v - 273.15, fromBase: (v: number) => v + 273.15 },
  ],
  area: [
    { name: 'Square Meter', key: 'm2', toBase: 1 },
    { name: 'Square Kilometer', key: 'km2', toBase: 1000000 },
    { name: 'Square Centimeter', key: 'cm2', toBase: 0.0001 },
    { name: 'Hectare', key: 'ha', toBase: 10000 },
    { name: 'Acre', key: 'acre', toBase: 4046.86 },
    { name: 'Square Foot', key: 'ft2', toBase: 0.092903 },
    { name: 'Square Inch', key: 'in2', toBase: 0.00064516 },
  ],
  volume: [
    { name: 'Milliliter', key: 'ml', toBase: 0.000001 },
    { name: 'Liter', key: 'l', toBase: 0.001 },
    { name: 'Cubic Meter', key: 'm3', toBase: 1 },
    { name: 'Gallon', key: 'gallon', toBase: 0.00378541 },
    { name: 'Quart', key: 'quart', toBase: 0.000946353 },
    { name: 'Pint', key: 'pint', toBase: 0.000473176 },
    { name: 'Cup', key: 'cup', toBase: 0.000236588 },
    { name: 'Fluid Ounce', key: 'floz', toBase: 0.0000295735 },
    { name: 'Cubic Foot', key: 'ft3', toBase: 0.0283168 },
    { name: 'Teaspoon', key: 'tsp', toBase: 0.00000492892 },
    { name: 'Tablespoon', key: 'tbsp', toBase: 0.0000147868 },
  ],
  speed: [
    { name: 'Meter per second', key: 'ms', toBase: 1 },
    { name: 'Kilometer per hour', key: 'kmh', toBase: 0.277778 },
    { name: 'Mile per hour', key: 'mph', toBase: 0.44704 },
    { name: 'Knot', key: 'knot', toBase: 0.514444 },
    { name: 'Foot per second', key: 'fts', toBase: 0.3048 },
    { name: 'Mach (sea level)', key: 'mach', toBase: 340.29 },
  ],
  time: [
    { name: 'Nanosecond', key: 'ns', toBase: 1e-9 },
    { name: 'Microsecond', key: 'us', toBase: 1e-6 },
    { name: 'Millisecond', key: 'ms', toBase: 0.001 },
    { name: 'Second', key: 'sec', toBase: 1 },
    { name: 'Minute', key: 'min', toBase: 60 },
    { name: 'Hour', key: 'hour', toBase: 3600 },
    { name: 'Day', key: 'day', toBase: 86400 },
    { name: 'Week', key: 'week', toBase: 604800 },
    { name: 'Month (30d)', key: 'month', toBase: 2592000 },
    { name: 'Year (365d)', key: 'year', toBase: 31536000 },
  ],
  data: [
    { name: 'Bit', key: 'bit', toBase: 0.125 },
    { name: 'Byte', key: 'byte', toBase: 1 },
    { name: 'Kilobyte', key: 'kb', toBase: 1000 },
    { name: 'Megabyte', key: 'mb', toBase: 1000000 },
    { name: 'Gigabyte', key: 'gb', toBase: 1000000000 },
    { name: 'Terabyte', key: 'tb', toBase: 1000000000000 },
    { name: 'Kibibyte', key: 'kib', toBase: 1024 },
    { name: 'Mebibyte', key: 'mib', toBase: 1048576 },
    { name: 'Gibibyte', key: 'gib', toBase: 1073741824 },
    { name: 'Tebibyte', key: 'tib', toBase: 1099511627776 },
  ],
  pressure: [
    { name: 'Pascal', key: 'pa', toBase: 1 },
    { name: 'Kilopascal', key: 'kpa', toBase: 1000 },
    { name: 'Bar', key: 'bar', toBase: 100000 },
    { name: 'PSI', key: 'psi', toBase: 6894.76 },
    { name: 'Atmosphere', key: 'atm', toBase: 101325 },
    { name: 'Millimeter of Mercury', key: 'mmhg', toBase: 133.322 },
    { name: 'Torr', key: 'torr', toBase: 133.322 },
  ],
  energy: [
    { name: 'Joule', key: 'j', toBase: 1 },
    { name: 'Kilojoule', key: 'kj', toBase: 1000 },
    { name: 'Calorie', key: 'cal', toBase: 4.184 },
    { name: 'Kilocalorie', key: 'kcal', toBase: 4184 },
    { name: 'Watt-hour', key: 'wh', toBase: 3600 },
    { name: 'Kilowatt-hour', key: 'kwh', toBase: 3600000 },
    { name: 'Electronvolt', key: 'ev', toBase: 1.602176634e-19 },
    { name: 'BTU', key: 'btu', toBase: 1055.06 },
  ],
  power: [
    { name: 'Watt', key: 'w', toBase: 1 },
    { name: 'Kilowatt', key: 'kw', toBase: 1000 },
    { name: 'Megawatt', key: 'mw', toBase: 1000000 },
    { name: 'Horsepower', key: 'hp', toBase: 745.7 },
    { name: 'BTU per hour', key: 'btuh', toBase: 0.293071 },
  ],
  angle: [
    { name: 'Degree', key: 'deg', toBase: 1 },
    { name: 'Radian', key: 'rad', toBase: 57.2958 },
    { name: 'Gradian', key: 'grad', toBase: 0.9 },
    { name: 'Minute of Arc', key: 'arcmin', toBase: 1 / 60 },
    { name: 'Second of Arc', key: 'arcsec', toBase: 1 / 3600 },
  ],
};

export function convertUnit(value: number, fromKey: string, toKey: string, category: string): number {
  const list = UNIT_DATA[category];
  if (!list) throw new Error('Unknown category');
  let fromUnit: typeof list[0] | null = null;
  let toUnit: typeof list[0] | null = null;
  for (const u of list) {
    if (u.key === fromKey) fromUnit = u;
    if (u.key === toKey) toUnit = u;
  }
  if (!fromUnit || !toUnit) throw new Error('Unknown unit');
  let result: number;
  if (typeof fromUnit.toBase === 'function') {
    const base = (fromUnit.toBase as (v: number) => number)(value);
    result = (toUnit.fromBase as (v: number) => number)(base);
  } else {
    const base = value * (fromUnit.toBase as number);
    result = base / (toUnit.toBase as number);
  }
  return result;
}

export function formatUnitNum(n: number): string {
  if (Math.abs(n) < 1e-10) return '0';
  if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.000001 && n !== 0)) return n.toExponential(6);
  return parseFloat(n.toPrecision(12)).toString();
}

export function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return min + (bytes[0] % range);
}

export function randomDice(count: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(randomInt(1, 6));
  }
  return results;
}

export function randomCoin(): 'Heads' | 'Tails' {
  return randomInt(0, 1) === 0 ? 'Heads' : 'Tails';
}

export function randomPicker<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[randomInt(0, items.length - 1)];
}

export function randomShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getDefaultPhoneCountries(): { value: string; label: string }[] {
  return [
    { value: 'IR', label: 'Iran (+98)' },
    { value: 'US', label: 'United States (+1)' },
    { value: 'GB', label: 'United Kingdom (+44)' },
    { value: 'DE', label: 'Germany (+49)' },
    { value: 'FR', label: 'France (+33)' },
    { value: 'IT', label: 'Italy (+39)' },
    { value: 'ES', label: 'Spain (+34)' },
    { value: 'RU', label: 'Russia (+7)' },
    { value: 'CN', label: 'China (+86)' },
    { value: 'IN', label: 'India (+91)' },
    { value: 'JP', label: 'Japan (+81)' },
    { value: 'KR', label: 'South Korea (+82)' },
    { value: 'BR', label: 'Brazil (+55)' },
    { value: 'CA', label: 'Canada (+1)' },
    { value: 'AU', label: 'Australia (+61)' },
    { value: 'AE', label: 'UAE (+971)' },
    { value: 'SA', label: 'Saudi Arabia (+966)' },
    { value: 'TR', label: 'Turkey (+90)' },
    { value: 'PK', label: 'Pakistan (+92)' },
    { value: 'AF', label: 'Afghanistan (+93)' },
    { value: 'IQ', label: 'Iraq (+964)' },
    { value: 'SE', label: 'Sweden (+46)' },
    { value: 'NO', label: 'Norway (+47)' },
    { value: 'DK', label: 'Denmark (+45)' },
    { value: 'FI', label: 'Finland (+358)' },
    { value: 'NL', label: 'Netherlands (+31)' },
    { value: 'CH', label: 'Switzerland (+41)' },
    { value: 'AT', label: 'Austria (+43)' },
    { value: 'BE', label: 'Belgium (+32)' },
    { value: 'PT', label: 'Portugal (+351)' },
    { value: 'PL', label: 'Poland (+48)' },
    { value: 'UA', label: 'Ukraine (+380)' },
    { value: 'EG', label: 'Egypt (+20)' },
    { value: 'NG', label: 'Nigeria (+234)' },
    { value: 'ZA', label: 'South Africa (+27)' },
    { value: 'MX', label: 'Mexico (+52)' },
    { value: 'AR', label: 'Argentina (+54)' },
    { value: 'MY', label: 'Malaysia (+60)' },
    { value: 'SG', label: 'Singapore (+65)' },
    { value: 'HK', label: 'Hong Kong (+852)' },
    { value: 'TW', label: 'Taiwan (+886)' },
  ];
}
