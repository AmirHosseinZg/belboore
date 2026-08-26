export function parseIpv4Address(ip: string): number | null {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return null;
  let result = 0;
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (isNaN(n) || n < 0 || n > 255 || p !== String(n)) return null;
    result = (result << 8) + n;
  }
  return result >>> 0;
}

export function ipv4ToInteger(ip: string): number | null {
  return parseIpv4Address(ip);
}

export function integerToIpv4(num: number): string {
  return (
    ((num >>> 24) & 0xff) + '.' +
    ((num >>> 16) & 0xff) + '.' +
    ((num >>> 8) & 0xff) + '.' +
    (num & 0xff)
  );
}

export function formatIpv4Binary(ip: string): string {
  const n = parseIpv4Address(ip);
  if (n === null) return '';
  const octets = [
    (n >>> 24) & 0xff,
    (n >>> 16) & 0xff,
    (n >>> 8) & 0xff,
    n & 0xff,
  ];
  return octets.map(o => o.toString(2).padStart(8, '0')).join('.');
}

export function formatIpv4Hex(ip: string): string {
  const n = parseIpv4Address(ip);
  if (n === null) return '';
  return '0x' + n.toString(16).padStart(8, '0').toUpperCase();
}

export function parseCidr(input: string): { ip: number; prefix: number } | null {
  const parts = input.trim().split('/');
  if (parts.length !== 2) return null;
  const ip = parseIpv4Address(parts[0]);
  if (ip === null) return null;
  const prefix = parseInt(parts[1], 10);
  if (isNaN(prefix) || prefix < 0 || prefix > 32 || parts[1] !== String(prefix)) return null;
  return { ip, prefix };
}

export function calculateIpv4Subnet(ip: number, prefix: number): {
  networkAddress: number;
  broadcastAddress: number;
  subnetMask: number;
  firstHost: number;
  lastHost: number;
  totalHosts: number;
  usableHosts: number;
  wildcardMask: number;
} {
  const subnetMask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const wildcardMask = ~subnetMask >>> 0;
  const networkAddress = (ip & subnetMask) >>> 0;
  const broadcastAddress = (networkAddress | wildcardMask) >>> 0;
  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = totalHosts - 2;
  const firstHost = prefix >= 31 ? networkAddress : (networkAddress + 1) >>> 0;
  const lastHost = prefix >= 31 ? broadcastAddress : (broadcastAddress - 1) >>> 0;
  return { networkAddress, broadcastAddress, subnetMask, firstHost, lastHost, totalHosts, usableHosts, wildcardMask };
}

export function classifyIpv4Address(ip: number): string {
  if (ip === 0) return 'Default Route (0.0.0.0/8)';
  if (ip === 0xffffffff) return 'Limited Broadcast (255.255.255.255)';
  const firstOctet = (ip >>> 24) & 0xff;
  if ((firstOctet & 0x80) === 0) return 'Class A';
  if ((firstOctet & 0xc0) === 0x80) return 'Class B';
  if ((firstOctet & 0xe0) === 0xc0) return 'Class C';
  if ((firstOctet & 0xf0) === 0xe0) return 'Class D (Multicast)';
  return 'Class E (Reserved)';
}

export function getIpv4Range(ip: number, prefix: number): number[] {
  const subnet = calculateIpv4Subnet(ip, prefix);
  const hosts: number[] = [];
  for (let i = subnet.firstHost; i <= subnet.lastHost; i++) {
    hosts.push(i);
  }
  return hosts;
}

const IPV6_SEGMENT_REGEX = /^[0-9a-fA-F]{1,4}$/;

export function expandIpv6Address(ip: string): string | null {
  let addr = ip.trim();
  if (addr.startsWith('::')) addr = '0' + addr;
  if (addr.endsWith('::')) addr = addr + '0';
  const doubleColon = addr.indexOf('::');
  let parts: string[];
  if (doubleColon !== -1) {
    const left = addr.substring(0, doubleColon).split(':').filter(Boolean);
    const right = addr.substring(doubleColon + 2).split(':').filter(Boolean);
    if (left.length + right.length > 7) return null;
    const missing = 8 - left.length - right.length;
    parts = [...left, ...Array(missing).fill('0'), ...right];
  } else {
    parts = addr.split(':');
    if (parts.length !== 8) return null;
  }
  for (const p of parts) {
    if (!IPV6_SEGMENT_REGEX.test(p)) return null;
  }
  return parts.map(s => s.padStart(4, '0').toLowerCase()).join(':');
}

export function compressIpv6Address(ip: string): string | null {
  const expanded = expandIpv6Address(ip);
  if (!expanded) return null;
  const parts = expanded.split(':').map(s => s.replace(/^0+/, '') || '0');
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '0') {
      if (curStart === -1) curStart = i;
      curLen++;
      if (curLen > bestLen) { bestStart = curStart; bestLen = curLen; }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }
  if (bestLen < 2) {
    return parts.join(':');
  }
  const result = parts.slice(0, bestStart).join(':') + '::' + parts.slice(bestStart + bestLen).join(':');
  return result;
}

export function generateIpv6UlaPrefix(): string {
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  const globalId = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return 'fd' + globalId.substring(0, 1) + ':' + globalId.substring(1, 5) + ':' + globalId.substring(5);
}

export function generateMacAddress(separator: string = ':'): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  bytes[0] = (bytes[0] & 0xfe) | 0x02; // locally administered, unicast
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(separator);
}

export function formatMacAddress(mac: string, separator: string = ':'): string {
  const cleaned = mac.replace(/[^0-9a-fA-F]/g, '');
  if (cleaned.length !== 12) return mac;
  const parts: string[] = [];
  for (let i = 0; i < 12; i += 2) {
    parts.push(cleaned.substring(i, i + 2));
  }
  return parts.join(separator);
}

export const MAC_VENDOR_PREFIXES: { prefix: string; vendor: string }[] = [
  { prefix: '00:00:0c', vendor: 'Cisco' },
  { prefix: '00:01:5c', vendor: 'Hewlett-Packard' },
  { prefix: '00:05:69', vendor: 'IBM' },
  { prefix: '00:0a:95', vendor: 'Intel' },
  { prefix: '00:12:3f', vendor: 'Dell' },
  { prefix: '00:14:22', vendor: 'Dell' },
  { prefix: '00:15:5d', vendor: 'Microsoft' },
  { prefix: '00:17:fa', vendor: 'Apple' },
  { prefix: '00:1b:63', vendor: 'Apple' },
  { prefix: '00:1e:c2', vendor: 'Huawei' },
  { prefix: '00:21:6b', vendor: 'Huawei' },
  { prefix: '00:22:68', vendor: 'Samsung' },
  { prefix: '00:23:32', vendor: 'Google' },
  { prefix: '00:24:36', vendor: 'Microsoft' },
  { prefix: '00:25:90', vendor: 'Apple' },
  { prefix: '00:26:57', vendor: 'Xerox' },
  { prefix: '00:50:56', vendor: 'VMware' },
  { prefix: '00:50:79', vendor: 'Dell' },
  { prefix: '00:5a:45', vendor: 'Cisco' },
  { prefix: '00:e0:4c', vendor: 'Realtek' },
  { prefix: '04:4b:ed', vendor: 'Amazon' },
  { prefix: '08:00:27', vendor: 'Oracle (VirtualBox)' },
  { prefix: '08:00:46', vendor: 'Netgear' },
  { prefix: '08:74:02', vendor: 'Apple' },
  { prefix: '0c:9d:92', vendor: 'Apple' },
  { prefix: '10:9a:dd', vendor: 'D-Link' },
  { prefix: '14:10:9f', vendor: 'Cisco' },
  { prefix: '18:f6:43', vendor: 'HP' },
  { prefix: '1c:b2:6c', vendor: 'Amazon' },
  { prefix: '20:4e:7f', vendor: 'Netgear' },
  { prefix: '24:4b:fe', vendor: 'Samsung' },
  { prefix: '24:69:68', vendor: 'Aruba' },
  { prefix: '28:16:2e', vendor: 'Belkin' },
  { prefix: '2c:33:11', vendor: 'Dell' },
  { prefix: '30:46:9a', vendor: 'Cisco' },
  { prefix: '34:02:86', vendor: 'D-Link' },
  { prefix: '34:96:72', vendor: 'Netgear' },
  { prefix: '38:f9:d3', vendor: 'TP-Link' },
  { prefix: '3c:07:54', vendor: 'Intel' },
  { prefix: '3c:22:fb', vendor: 'Dell' },
  { prefix: '3c:52:82', vendor: 'Samsung' },
  { prefix: '40:b0:76', vendor: 'TP-Link' },
  { prefix: '44:d9:e7', vendor: 'Cisco' },
  { prefix: '48:22:54', vendor: 'Dell' },
  { prefix: '48:e7:da', vendor: 'Apple' },
  { prefix: '4c:77:6b', vendor: 'Samsung' },
  { prefix: '50:0f:80', vendor: 'Oracle' },
  { prefix: '50:9a:6c', vendor: 'HP' },
  { prefix: '54:04:a6', vendor: 'Google' },
  { prefix: '58:8d:09', vendor: 'Cisco' },
  { prefix: '5c:b9:01', vendor: 'D-Link' },
  { prefix: '60:57:18', vendor: 'Dell' },
  { prefix: '64:6e:69', vendor: 'Intel' },
  { prefix: '68:9c:70', vendor: 'TP-Link' },
  { prefix: '6c:88:14', vendor: 'Sony' },
  { prefix: '70:4c:a5', vendor: 'Raspberry Pi' },
  { prefix: '70:8b:cd', vendor: 'Intel' },
  { prefix: '70:e4:22', vendor: 'LG' },
  { prefix: '74:da:38', vendor: 'Apple' },
  { prefix: '78:45:61', vendor: 'HP' },
  { prefix: '7c:2e:bd', vendor: 'Google' },
  { prefix: '80:2a:a8', vendor: 'Huawei' },
  { prefix: '84:a6:c8', vendor: 'Huawei' },
  { prefix: '88:36:6c', vendor: 'Netgear' },
  { prefix: '88:53:2e', vendor: 'HP' },
  { prefix: '8c:ae:4c', vendor: 'D-Link' },
  { prefix: '90:09:d0', vendor: 'Cisco' },
  { prefix: '90:9a:4a', vendor: 'Huawei' },
  { prefix: '94:65:2d', vendor: 'Intel' },
  { prefix: '98:fe:94', vendor: 'Samsung' },
  { prefix: '9c:93:4e', vendor: 'Amazon' },
  { prefix: 'a0:04:60', vendor: 'Dell' },
  { prefix: 'a4:5e:60', vendor: 'Dell' },
  { prefix: 'a8:57:4e', vendor: 'TP-Link' },
  { prefix: 'ac:84:c6', vendor: 'Samsung' },
  { prefix: 'b0:be:76', vendor: 'Dell' },
  { prefix: 'b4:45:06', vendor: 'Intel' },
  { prefix: 'b8:27:eb', vendor: 'Raspberry Pi' },
  { prefix: 'b8:ca:3a', vendor: 'Cisco' },
  { prefix: 'bc:76:70', vendor: 'HP' },
  { prefix: 'c0:25:06', vendor: 'Cisco' },
  { prefix: 'c4:9d:ed', vendor: 'Google' },
  { prefix: 'c8:16:7b', vendor: 'Dell' },
  { prefix: 'cc:2d:8c', vendor: 'Intel' },
  { prefix: 'd0:37:45', vendor: 'Dell' },
  { prefix: 'd4:38:9c', vendor: 'Cisco' },
  { prefix: 'd8:3a:8b', vendor: 'Apple' },
  { prefix: 'dc:a6:32', vendor: 'Intel' },
  { prefix: 'e0:2b:e9', vendor: 'Dell' },
  { prefix: 'e0:ac:cb', vendor: 'Apple' },
  { prefix: 'e4:5f:01', vendor: 'HP' },
  { prefix: 'e8:48:b8', vendor: 'Intel' },
  { prefix: 'ec:1a:59', vendor: 'Dell' },
  { prefix: 'f0:18:98', vendor: 'LG' },
  { prefix: 'f0:6e:0b', vendor: 'Samsung' },
  { prefix: 'f4:96:34', vendor: 'TP-Link' },
  { prefix: 'f8:e9:03', vendor: 'Dell' },
  { prefix: 'fc:aa:14', vendor: 'Google' },
];

export function parseMacPrefix(mac: string): string | null {
  const cleaned = mac.replace(/[^0-9a-fA-F]/g, '').toLowerCase();
  if (cleaned.length < 6) return null;
  return cleaned.substring(0, 6);
}

export function classifyMacAddress(prefix: string): string {
  const formatted = prefix.toLowerCase().replace(/[^0-9a-f]/g, '');
  if (formatted.length < 6) return 'Unknown';
  const oui = formatted.substring(0, 6);
  for (const entry of MAC_VENDOR_PREFIXES) {
    const entryClean = entry.prefix.replace(/:/g, '').toLowerCase();
    if (entryClean === oui) return entry.vendor;
  }
  return 'Unknown';
}
