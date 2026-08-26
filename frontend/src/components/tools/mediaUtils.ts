export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return size.toFixed(i === 0 ? 0 : 1) + ' ' + units[i];
}

export function validateImageFile(file: File, maxBytes: number = 10 * 1024 * 1024): string | null {
  if (!file.type.startsWith('image/')) {
    return 'Please select a valid image file.';
  }
  if (file.size > maxBytes) {
    return 'File is too large. Maximum size is ' + formatFileSize(maxBytes) + '.';
  }
  if (file.size === 0) {
    return 'The selected file is empty.';
  }
  return null;
}

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image.'));
    };
    img.src = url;
  });
}

export function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return loadImageFromFile(file).then(img => ({
    width: img.naturalWidth,
    height: img.naturalHeight,
  }));
}

export function resizeImageDimensions(
  origW: number,
  origH: number,
  targetW: number | null,
  targetH: number | null,
  preserveAspect: boolean
): { width: number; height: number } {
  if (!targetW && !targetH) return { width: origW, height: origH };
  let w = targetW || origW;
  let h = targetH || origH;
  if (preserveAspect) {
    if (targetW && targetH) {
      const ratio = Math.min(targetW / origW, targetH / origH);
      w = Math.round(origW * ratio);
      h = Math.round(origH * ratio);
    } else if (targetW) {
      h = Math.round(origH * (targetW / origW));
    } else if (targetH) {
      w = Math.round(origW * (targetH / origH));
    }
  }
  return { width: Math.max(1, w), height: Math.max(1, h) };
}

export const SUPPORTED_OUTPUT_FORMATS = ['image/png', 'image/jpeg'] as const;
export const WEBP_SUPPORTED = document?.createElement('canvas')?.toBlob
  ? (function() {
      try {
        const c = document.createElement('canvas');
        return c.toBlob ? true : false;
      } catch { return false; }
    })()
  : false;
export const AVIF_SUPPORTED = false;

export function getOutputFormats(): { value: string; label: string }[] {
  const formats: { value: string; label: string }[] = [
    { value: 'image/png', label: 'PNG' },
    { value: 'image/jpeg', label: 'JPEG' },
  ];
  const c = document.createElement('canvas');
  if (c.toBlob) {
    const hasWebp = c.toBlob ? true : false;
    if (hasWebp) formats.push({ value: 'image/webp', label: 'WebP' });
  }
  return formats;
}

export function drawImageToCanvas(
  img: HTMLImageElement,
  maxW: number | null,
  maxH: number | null,
  preserveAspect: boolean
): HTMLCanvasElement {
  const dims = resizeImageDimensions(img.naturalWidth, img.naturalHeight, maxW, maxH, preserveAspect);
  const canvas = document.createElement('canvas');
  canvas.width = dims.width;
  canvas.height = dims.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, dims.width, dims.height);
  return canvas;
}

export function convertCanvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob | null> {
  return new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob), mimeType, quality);
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

export function extractBase64FromDataUrl(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.substring(comma + 1) : dataUrl;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadTextFile(text: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([text], { type: mimeType });
  downloadBlob(blob, filename);
}

export function dataUrlToBlob(dataUrl: string): Blob | null {
  const match = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!match) return null;
  const mimeType = match[1];
  const base64 = match[2];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

export function escapeSvgText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSvgPlaceholder(
  width: number,
  height: number,
  label: string,
  bgColor: string,
  textColor: string,
  fontSize: number,
  cornerRadius: number
): string {
  const safeLabel = escapeSvgText(label || `${width} \u00d7 ${height}`);
  const fontFamily = 'system-ui, -apple-system, sans-serif';
  const x = width / 2;
  const y = height / 2;
  const rectEl = cornerRadius > 0
    ? `<rect width="${width}" height="${height}" rx="${cornerRadius}" fill="${escapeSvgText(bgColor)}"/>`
    : `<rect width="${width}" height="${height}" fill="${escapeSvgText(bgColor)}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <title>${safeLabel}</title>
  ${rectEl}
  <text x="${x}" y="${y}" fill="${escapeSvgText(textColor)}" font-family="${fontFamily}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central" alignment-baseline="middle">${safeLabel}</text>
</svg>`;
}

export function svgToDataUri(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return 'data:image/svg+xml;charset=utf-8,' + encoded;
}

export function formatImageMetadata(
  file: File,
  width: number,
  height: number
): { label: string; value: string }[] {
  const ext = file.name.split('.').pop() || '';
  return [
    { label: 'Name', value: file.name },
    { label: 'Type', value: file.type || ext.toUpperCase() },
    { label: 'Size', value: formatFileSize(file.size) },
    { label: 'Dimensions', value: `${width} \u00d7 ${height}` },
  ];
}

export function safeCanvasSizeCheck(w: number, h: number): boolean {
  const MAX_DIM = 16384;
  const MAX_PIXELS = 268435456; // 16384 * 16384
  if (w > MAX_DIM || h > MAX_DIM) return false;
  if (w * h > MAX_PIXELS) return false;
  return true;
}

export function detectWebpSupport(): boolean {
  try {
    const c = document.createElement('canvas');
    if (!c.toBlob) return false;
    const data = c.toDataURL('image/webp');
    return data.indexOf('image/webp') === 5;
  } catch {
    return false;
  }
}
