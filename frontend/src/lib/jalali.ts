export const JALALI_MONTHS_EN = [
  'Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar',
  'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand',
];

export const JALALI_MONTHS_FA = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

export const GREGORIAN_MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const GREGORIAN_MONTHS_FA = [
  'ژانویه', 'فوریه', 'مارس', 'آوریل', 'مه', 'ژوئن',
  'ژوئیه', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر',
];

export const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAYS_FA = ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'];
export const WEEKDAYS_FA_FULL = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

export function toJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const gdm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  const days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    gdm[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  let d = days % 12053;
  jy += 4 * Math.floor(d / 1461);
  d %= 1461;
  if (d > 365) {
    jy += Math.floor((d - 1) / 365);
    d = (d - 1) % 365;
  }
  const jm = d < 186 ? 1 + Math.floor(d / 31) : 7 + Math.floor((d - 186) / 30);
  const jd = 1 + (d < 186 ? d % 31 : (d - 186) % 30);
  return [jy, jm, jd];
}

export function toGregorian(jy: number, jm: number, jd: number): [number, number, number] {
  const jy1 = jy + 1595;
  let days =
    -355668 +
    365 * jy1 +
    Math.floor(jy1 / 33) * 8 +
    Math.floor(((jy1 % 33) + 3) / 4) +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186);
  let gy = 400 * Math.floor(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const gm =
    days < 31 ? 1
    : days < 59 ? 2
    : days < 90 ? 3
    : days < 120 ? 4
    : days < 151 ? 5
    : days < 181 ? 6
    : days < 212 ? 7
    : days < 243 ? 8
    : days < 273 ? 9
    : days < 304 ? 10
    : days < 334 ? 11
    : 12;
  const monthOffsets = [0, 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gd = 1 + days - monthOffsets[gm];
  return [gy < 0 ? gy + 1 : gy, gm, gd];
}

export function isLeapJalali(jy: number): boolean {
  const base = jy % 33;
  return base === 0 || base === 1 || base === 5 || base === 9 || base === 13 || base === 17 || base === 22 || base === 26 || base === 30;
}

export function daysInJalaliMonth(jy: number, jm: number): number {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isLeapJalali(jy) ? 30 : 29;
}

export function daysInGregorianMonth(gy: number, gm: number): number {
  return new Date(gy, gm, 0).getDate();
}

export function formatDate(date: Date, lang: 'en' | 'fa', calendar: 'gregorian' | 'jalali'): string {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  if (calendar === 'jalali') {
    const [jy, jm, jd] = toJalali(gy, gm, gd);
    const months = lang === 'fa' ? JALALI_MONTHS_FA : JALALI_MONTHS_EN;
    return `${jd} ${months[jm - 1]} ${jy}`;
  }
  const months = lang === 'fa' ? GREGORIAN_MONTHS_FA : GREGORIAN_MONTHS_EN;
  return `${gd} ${months[gm - 1]} ${gy}`;
}

export function formatDateShort(date: Date, lang: 'en' | 'fa', calendar: 'gregorian' | 'jalali'): string {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  if (calendar === 'jalali') {
    const [jy, jm, jd] = toJalali(gy, gm, gd);
    const ms = lang === 'fa' ? JALALI_MONTHS_FA : JALALI_MONTHS_EN;
    return `${jd} ${ms[jm - 1].slice(0, 3)} ${jy}`;
  }
  const ms = lang === 'fa' ? GREGORIAN_MONTHS_FA : GREGORIAN_MONTHS_EN;
  return `${gd} ${ms[gm - 1].slice(0, 3)} ${gy}`;
}

export function isoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function gregorianFromParts(jy: number, jm: number, jd: number): Date {
  const [gy, gm, gd] = toGregorian(jy, jm, jd);
  return new Date(gy, gm - 1, gd);
}

export function jalaliFromDate(date: Date): [number, number, number] {
  return toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function getToday(calendar: 'gregorian' | 'jalali'): [number, number, number] {
  const now = new Date();
  if (calendar === 'gregorian') {
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  }
  return toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function todayDate(calendar: 'gregorian' | 'jalali'): Date {
  return new Date();
}
