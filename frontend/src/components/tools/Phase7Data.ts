export interface MimeTypeEntry {
  ext: string;
  mime: string;
  category: string;
  description: string;
}

export interface HttpStatusCodeEntry {
  code: number;
  phrase: string;
  category: string;
  description: string;
}

export const MIME_TYPES: MimeTypeEntry[] = [
  { ext: 'html', mime: 'text/html', category: 'Document', description: 'HyperText Markup Language' },
  { ext: 'htm', mime: 'text/html', category: 'Document', description: 'HyperText Markup Language' },
  { ext: 'css', mime: 'text/css', category: 'Style', description: 'Cascading Style Sheets' },
  { ext: 'js', mime: 'text/javascript', category: 'Script', description: 'JavaScript (legacy)' },
  { ext: 'js', mime: 'application/javascript', category: 'Script', description: 'JavaScript (modern)' },
  { ext: 'mjs', mime: 'text/javascript', category: 'Script', description: 'ES Module JavaScript' },
  { ext: 'mjs', mime: 'application/javascript', category: 'Script', description: 'ES Module JavaScript (modern)' },
  { ext: 'json', mime: 'application/json', category: 'Data', description: 'JSON Data' },
  { ext: 'xml', mime: 'application/xml', category: 'Data', description: 'Extensible Markup Language' },
  { ext: 'xml', mime: 'text/xml', category: 'Data', description: 'Extensible Markup Language (legacy)' },
  { ext: 'txt', mime: 'text/plain', category: 'Document', description: 'Plain Text' },
  { ext: 'csv', mime: 'text/csv', category: 'Data', description: 'Comma-Separated Values' },
  { ext: 'md', mime: 'text/markdown', category: 'Document', description: 'Markdown' },
  { ext: 'yaml', mime: 'application/yaml', category: 'Data', description: 'YAML Ain‘t Markup Language' },
  { ext: 'yml', mime: 'application/yaml', category: 'Data', description: 'YAML Ain‘t Markup Language' },
  { ext: 'pdf', mime: 'application/pdf', category: 'Document', description: 'Portable Document Format' },
  { ext: 'zip', mime: 'application/zip', category: 'Archive', description: 'ZIP Archive' },
  { ext: 'gz', mime: 'application/gzip', category: 'Archive', description: 'GZip Compressed Archive' },
  { ext: 'tar', mime: 'application/x-tar', category: 'Archive', description: 'Tape Archive' },
  { ext: 'rar', mime: 'application/vnd.rar', category: 'Archive', description: 'RAR Archive' },
  { ext: '7z', mime: 'application/x-7z-compressed', category: 'Archive', description: '7-Zip Archive' },
  { ext: 'png', mime: 'image/png', category: 'Image', description: 'Portable Network Graphics' },
  { ext: 'jpg', mime: 'image/jpeg', category: 'Image', description: 'JPEG Image' },
  { ext: 'jpeg', mime: 'image/jpeg', category: 'Image', description: 'JPEG Image' },
  { ext: 'gif', mime: 'image/gif', category: 'Image', description: 'Graphics Interchange Format' },
  { ext: 'webp', mime: 'image/webp', category: 'Image', description: 'WebP Image' },
  { ext: 'svg', mime: 'image/svg+xml', category: 'Image', description: 'Scalable Vector Graphics' },
  { ext: 'ico', mime: 'image/x-icon', category: 'Image', description: 'Icon / Favicon' },
  { ext: 'bmp', mime: 'image/bmp', category: 'Image', description: 'Bitmap Image' },
  { ext: 'avif', mime: 'image/avif', category: 'Image', description: 'AVIF Image' },
  { ext: 'tiff', mime: 'image/tiff', category: 'Image', description: 'Tagged Image File Format' },
  { ext: 'tif', mime: 'image/tiff', category: 'Image', description: 'Tagged Image File Format' },
  { ext: 'mp3', mime: 'audio/mpeg', category: 'Audio', description: 'MPEG Audio Layer III' },
  { ext: 'wav', mime: 'audio/wav', category: 'Audio', description: 'Waveform Audio' },
  { ext: 'ogg', mime: 'audio/ogg', category: 'Audio', description: 'OGG Audio' },
  { ext: 'flac', mime: 'audio/flac', category: 'Audio', description: 'Free Lossless Audio Codec' },
  { ext: 'aac', mime: 'audio/aac', category: 'Audio', description: 'Advanced Audio Coding' },
  { ext: 'wma', mime: 'audio/x-ms-wma', category: 'Audio', description: 'Windows Media Audio' },
  { ext: 'mp4', mime: 'video/mp4', category: 'Video', description: 'MPEG-4 Video' },
  { ext: 'webm', mime: 'video/webm', category: 'Video', description: 'WebM Video' },
  { ext: 'avi', mime: 'video/x-msvideo', category: 'Video', description: 'Audio Video Interleave' },
  { ext: 'mov', mime: 'video/quicktime', category: 'Video', description: 'QuickTime Movie' },
  { ext: 'wmv', mime: 'video/x-ms-wmv', category: 'Video', description: 'Windows Media Video' },
  { ext: 'mkv', mime: 'video/x-matroska', category: 'Video', description: 'Matroska Video' },
  { ext: 'mpeg', mime: 'video/mpeg', category: 'Video', description: 'MPEG Video' },
  { ext: 'mpg', mime: 'video/mpeg', category: 'Video', description: 'MPEG Video' },
  { ext: 'woff', mime: 'font/woff', category: 'Font', description: 'Web Open Font Format' },
  { ext: 'woff2', mime: 'font/woff2', category: 'Font', description: 'Web Open Font Format 2' },
  { ext: 'ttf', mime: 'font/ttf', category: 'Font', description: 'TrueType Font' },
  { ext: 'otf', mime: 'font/otf', category: 'Font', description: 'OpenType Font' },
  { ext: 'eot', mime: 'application/vnd.ms-fontobject', category: 'Font', description: 'Embedded OpenType Font' },
  { ext: 'wasm', mime: 'application/wasm', category: 'Code', description: 'WebAssembly Binary' },
  { ext: 'map', mime: 'application/json', category: 'Data', description: 'Source Map (JSON)' },
  { ext: 'bin', mime: 'application/octet-stream', category: 'Binary', description: 'Generic Binary Data' },
  { ext: 'exe', mime: 'application/vnd.microsoft.portable-executable', category: 'Binary', description: 'Windows Executable' },
  { ext: 'dmg', mime: 'application/x-apple-diskimage', category: 'Binary', description: 'macOS Disk Image' },
  { ext: 'iso', mime: 'application/x-iso9660-image', category: 'Binary', description: 'ISO Disk Image' },
  { ext: 'jsonld', mime: 'application/ld+json', category: 'Data', description: 'JSON-LD (Linked Data)' },
  { ext: 'rtf', mime: 'application/rtf', category: 'Document', description: 'Rich Text Format' },
  { ext: 'doc', mime: 'application/msword', category: 'Document', description: 'Microsoft Word' },
  { ext: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', category: 'Document', description: 'Microsoft Word (OpenXML)' },
  { ext: 'xls', mime: 'application/vnd.ms-excel', category: 'Data', description: 'Microsoft Excel' },
  { ext: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', category: 'Data', description: 'Microsoft Excel (OpenXML)' },
  { ext: 'ppt', mime: 'application/vnd.ms-powerpoint', category: 'Document', description: 'Microsoft PowerPoint' },
  { ext: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', category: 'Document', description: 'Microsoft PowerPoint (OpenXML)' },
  { ext: 'apk', mime: 'application/vnd.android.package-archive', category: 'Binary', description: 'Android Package' },
  { ext: 'deb', mime: 'application/vnd.debian.binary-package', category: 'Binary', description: 'Debian Package' },
  { ext: 'rpm', mime: 'application/x-rpm', category: 'Binary', description: 'RPM Package' },
  { ext: 'sqlite', mime: 'application/vnd.sqlite3', category: 'Data', description: 'SQLite Database' },
  { ext: 'webmanifest', mime: 'application/manifest+json', category: 'Web', description: 'Web App Manifest' },
  { ext: 'ics', mime: 'text/calendar', category: 'Data', description: 'iCalendar' },
  { ext: 'vcf', mime: 'text/vcard', category: 'Data', description: 'vCard Contact' },
];

export function searchMimeTypes(query: string): MimeTypeEntry[] {
  const q = query.toLowerCase().replace(/^\./, '');
  if (!q) return MIME_TYPES;
  return MIME_TYPES.filter(e =>
    e.ext.toLowerCase().includes(q) ||
    e.mime.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.description.toLowerCase().includes(q)
  );
}

export function lookupMimeType(ext: string): MimeTypeEntry[] {
  const e = ext.toLowerCase().replace(/^\./, '');
  return MIME_TYPES.filter(x => x.ext === e);
}

export const HTTP_STATUS_CODES: HttpStatusCodeEntry[] = [
  { code: 100, phrase: 'Continue', category: '1xx Informational', description: 'Server has received request headers; client should continue.' },
  { code: 101, phrase: 'Switching Protocols', category: '1xx Informational', description: 'Server agrees to switch protocols per Upgrade header.' },
  { code: 102, phrase: 'Processing', category: '1xx Informational', description: 'Server has received and is processing (WebDAV).' },
  { code: 103, phrase: 'Early Hints', category: '1xx Informational', description: 'Server sends preliminary headers before final response.' },
  { code: 200, phrase: 'OK', category: '2xx Success', description: 'Request succeeded. Response body contains the result.' },
  { code: 201, phrase: 'Created', category: '2xx Success', description: 'Request succeeded; a new resource was created.' },
  { code: 202, phrase: 'Accepted', category: '2xx Success', description: 'Request accepted for processing, but not yet completed.' },
  { code: 204, phrase: 'No Content', category: '2xx Success', description: 'Request succeeded; no response body (e.g., DELETE).' },
  { code: 206, phrase: 'Partial Content', category: '2xx Success', description: 'Partial GET request fulfilled (range request).' },
  { code: 300, phrase: 'Multiple Choices', category: '3xx Redirection', description: 'Multiple representations available; client should choose.' },
  { code: 301, phrase: 'Moved Permanently', category: '3xx Redirection', description: 'Resource moved permanently; update links to new URL.' },
  { code: 302, phrase: 'Found', category: '3xx Redirection', description: 'Resource temporarily located at a different URI.' },
  { code: 303, phrase: 'See Other', category: '3xx Redirection', description: 'Use GET at another URI to retrieve the resource.' },
  { code: 304, phrase: 'Not Modified', category: '3xx Redirection', description: 'Resource not modified since last request (caching).' },
  { code: 307, phrase: 'Temporary Redirect', category: '3xx Redirection', description: 'Repeat request at another URI; method stays same.' },
  { code: 308, phrase: 'Permanent Redirect', category: '3xx Redirection', description: 'Resource moved permanently; method and body stay same.' },
  { code: 400, phrase: 'Bad Request', category: '4xx Client Error', description: 'Server cannot process due to malformed request.' },
  { code: 401, phrase: 'Unauthorized', category: '4xx Client Error', description: 'Authentication required or failed.' },
  { code: 403, phrase: 'Forbidden', category: '4xx Client Error', description: 'Server understood but refuses to authorize.' },
  { code: 404, phrase: 'Not Found', category: '4xx Client Error', description: 'Resource not found on the server.' },
  { code: 405, phrase: 'Method Not Allowed', category: '4xx Client Error', description: 'HTTP method not supported for this endpoint.' },
  { code: 406, phrase: 'Not Acceptable', category: '4xx Client Error', description: 'Resource cannot generate acceptable media types.' },
  { code: 408, phrase: 'Request Timeout', category: '4xx Client Error', description: 'Server timed out waiting for the request.' },
  { code: 409, phrase: 'Conflict', category: '4xx Client Error', description: 'Request conflicts with current server state.' },
  { code: 410, phrase: 'Gone', category: '4xx Client Error', description: 'Resource permanently gone; no forwarding address.' },
  { code: 411, phrase: 'Length Required', category: '4xx Client Error', description: 'Content-Length header is required.' },
  { code: 413, phrase: 'Payload Too Large', category: '4xx Client Error', description: 'Request body is larger than server limit.' },
  { code: 415, phrase: 'Unsupported Media Type', category: '4xx Client Error', description: 'Media type in request is not supported.' },
  { code: 418, phrase: "I'm a teapot", category: '4xx Client Error', description: 'HTCPCP/1.0 — server refuses to brew coffee (RFC 2324 joke).' },
  { code: 422, phrase: 'Unprocessable Content', category: '4xx Client Error', description: 'Request well-formed but semantically invalid (WebDAV).' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx Client Error', description: 'Rate limit exceeded; back off and retry later.' },
  { code: 431, phrase: 'Request Header Fields Too Large', category: '4xx Client Error', description: 'Headers exceed server limit.' },
  { code: 451, phrase: 'Unavailable For Legal Reasons', category: '4xx Client Error', description: 'Resource blocked due to legal demands.' },
  { code: 500, phrase: 'Internal Server Error', category: '5xx Server Error', description: 'Generic server error — something went wrong.' },
  { code: 501, phrase: 'Not Implemented', category: '5xx Server Error', description: 'Server does not support the requested functionality.' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx Server Error', description: 'Invalid response from upstream server.' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx Server Error', description: 'Server temporarily unavailable (overloaded or down).' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx Server Error', description: 'Upstream server did not respond in time.' },
  { code: 505, phrase: 'HTTP Version Not Supported', category: '5xx Server Error', description: 'HTTP version used in request not supported.' },
  { code: 511, phrase: 'Network Authentication Required', category: '5xx Server Error', description: 'Network access requires authentication (captive portal).' },
];

export function searchHttpStatusCodes(query: string): HttpStatusCodeEntry[] {
  const q = query.toLowerCase();
  if (!q) return HTTP_STATUS_CODES;
  return HTTP_STATUS_CODES.filter(e =>
    String(e.code).includes(q) ||
    e.phrase.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q) ||
    e.description.toLowerCase().includes(q)
  );
}

export function filterHttpStatusByCategory(category: string): HttpStatusCodeEntry[] {
  if (!category || category === 'all') return HTTP_STATUS_CODES;
  return HTTP_STATUS_CODES.filter(e => {
    if (category === '1xx') return e.code >= 100 && e.code < 200;
    if (category === '2xx') return e.code >= 200 && e.code < 300;
    if (category === '3xx') return e.code >= 300 && e.code < 400;
    if (category === '4xx') return e.code >= 400 && e.code < 500;
    if (category === '5xx') return e.code >= 500 && e.code < 600;
    return true;
  });
}

export function parseUserAgent(ua: string): Record<string, string> {
  const result: Record<string, string> = {};
  result.raw = ua;

  const u = ua.toLowerCase();

  // Bot detection
  if (/googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebot|twitterbot|whatsapp|telegrambot/i.test(ua)) {
    result.device = 'Bot / Crawler';
    result.browser = /googlebot/i.test(ua) ? 'Googlebot' : /bingbot/i.test(ua) ? 'Bingbot' : 'Crawler';
    result.os = 'Unknown';
    return result;
  }

  // Browser detection
  if (u.includes('edg/') || u.includes('edge/')) result.browser = 'Microsoft Edge';
  else if (u.includes('opr/') || u.includes('opera')) result.browser = 'Opera';
  else if (u.includes('chrome') && !u.includes('safari')) result.browser = 'Chrome';
  else if (u.includes('safari') && u.includes('version/') && !u.includes('chrome')) result.browser = 'Safari';
  else if (u.includes('firefox')) result.browser = 'Firefox';
  else if (u.includes('trident') || u.includes('msie')) result.browser = 'Internet Explorer';
  else result.browser = 'Unknown';

  // OS detection
  if (u.includes('windows nt 10') || u.includes('windows nt 6.4')) result.os = 'Windows 10';
  else if (u.includes('windows nt 6.3')) result.os = 'Windows 8.1';
  else if (u.includes('windows nt 6.2')) result.os = 'Windows 8';
  else if (u.includes('windows nt 6.1')) result.os = 'Windows 7';
  else if (u.includes('windows nt')) result.os = 'Windows';
  else if (u.includes('mac os x') || u.includes('macintosh')) result.os = 'macOS';
  else if (u.includes('iphone') || u.includes('ipad')) {
    result.os = 'iOS';
    const m = u.match(/os (\d+[._]\d+)/);
    if (m) result.os += ' ' + m[1].replace('_', '.');
  } else if (u.includes('android')) {
    result.os = 'Android';
    const m = u.match(/android (\d+[.\d]*)/);
    if (m) result.os += ' ' + m[1];
  } else if (u.includes('linux')) result.os = 'Linux';
  else if (u.includes('cros')) result.os = 'ChromeOS';
  else result.os = 'Unknown';

  // Device type
  if (result.device === 'Bot / Crawler') { /* already set */ }
  else if (u.includes('iphone') || u.includes('ipod')) result.device = 'Mobile (iPhone)';
  else if (u.includes('ipad')) result.device = 'Tablet (iPad)';
  else if (u.includes('android') && (u.includes('mobile'))) result.device = 'Mobile (Android)';
  else if (u.includes('android') && !u.includes('mobile')) result.device = 'Tablet (Android)';
  else if (u.includes('touch') && result.os === 'Windows') result.device = 'Tablet (Windows)';
  else if (result.os !== 'Unknown') result.device = 'Desktop';
  else result.device = 'Unknown';

  // Engine
  if (u.includes('webkit')) result.engine = 'WebKit / Blink';
  if (u.includes('gecko') && !u.includes('webkit')) result.engine = 'Gecko';
  if (u.includes('trident')) result.engine = 'Trident';
  if (!result.engine) result.engine = 'Unknown';

  return result;
}
