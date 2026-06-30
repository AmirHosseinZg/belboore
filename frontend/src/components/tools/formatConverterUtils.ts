import { parseJsonSafe } from './jsonUtils';

let yaml: any;
let toml: any;
let XMLParser: any;
let XMLBuilder: any;

function getYaml() {
  if (!yaml) yaml = require('js-yaml');
  return yaml;
}

function getToml() {
  if (!toml) toml = require('@iarna/toml');
  return toml;
}

function getXMLParser() {
  if (!XMLParser) {
    const { XMLParser: P } = require('fast-xml-parser');
    XMLParser = P;
  }
  return XMLParser;
}

function getXMLBuilder() {
  if (!XMLBuilder) {
    const { XMLBuilder: B } = require('fast-xml-parser');
    XMLBuilder = B;
  }
  return XMLBuilder;
}

export type ConverterDirection = 'a-to-b' | 'b-to-a';

export interface ConvertResult {
  output: string;
  error: string | null;
}

/* ── YAML ── */

export function parseYaml(input: string): { success: true; data: unknown } | { success: false; error: string } {
  try {
    const data = getYaml().load(input);
    return { success: true, data };
  } catch (e: any) {
    const msg = e?.message?.replace(/^YAMLException:\s*/i, '') || 'Invalid YAML';
    return { success: false, error: `YAML parse error: ${msg}` };
  }
}

export function dumpYaml(value: unknown): string {
  return getYaml().dump(value, { indent: 2, lineWidth: -1, noRefs: true, sortKeys: false });
}

export function yamlToJson(input: string): ConvertResult {
  const parsed = parseYaml(input);
  if (!parsed.success) return { output: '', error: parsed.error };
  try {
    const json = JSON.stringify(parsed.data, null, 2);
    return { output: json, error: null };
  } catch (e: any) {
    return { output: '', error: `JSON serialization error: ${e?.message || 'Unknown error'}` };
  }
}

export function jsonToYaml(input: string): ConvertResult {
  const parsed = parseJsonSafe(input);
  if (!parsed.success) return { output: '', error: `JSON parse error: ${parsed.error}` };
  try {
    const y = dumpYaml(parsed.data);
    return { output: y, error: null };
  } catch (e: any) {
    return { output: '', error: `YAML serialization error: ${e?.message || 'Unknown error'}` };
  }
}

/* ── TOML ── */

export function parseToml(input: string): { success: true; data: Record<string, unknown> } | { success: false; error: string } {
  try {
    const data = getToml().parse(input);
    return { success: true, data: data as Record<string, unknown> };
  } catch (e: any) {
    const msg = e?.message || 'Invalid TOML';
    return { success: false, error: `TOML parse error: ${msg}` };
  }
}

export function dumpToml(value: Record<string, unknown>): string {
  return getToml().stringify(value);
}

export function ensureTomlRootObject(value: unknown): { success: true; data: Record<string, unknown> } | { success: false; error: string } {
  if (value === null || typeof value !== 'object') {
    return { success: false, error: 'TOML requires a root object/table. The input must be a JSON object (not an array, string, number, boolean, or null).' };
  }
  if (Array.isArray(value)) {
    return { success: false, error: 'TOML requires a root object/table. The input is an array, but TOML documents must be key-value tables.' };
  }
  return { success: true, data: value as Record<string, unknown> };
}

export function jsonToToml(input: string): ConvertResult {
  const parsed = parseJsonSafe(input);
  if (!parsed.success) return { output: '', error: `JSON parse error: ${parsed.error}` };
  const rootCheck = ensureTomlRootObject(parsed.data);
  if (!rootCheck.success) return { output: '', error: rootCheck.error };
  try {
    const t = dumpToml(rootCheck.data);
    return { output: t, error: null };
  } catch (e: any) {
    return { output: '', error: `TOML serialization error: ${e?.message || 'Unknown error'}` };
  }
}

export function tomlToJson(input: string): ConvertResult {
  const parsed = parseToml(input);
  if (!parsed.success) return { output: '', error: parsed.error };
  try {
    const json = JSON.stringify(parsed.data, null, 2);
    return { output: json, error: null };
  } catch (e: any) {
    return { output: '', error: `JSON serialization error: ${e?.message || 'Unknown error'}` };
  }
}

export function yamlToToml(input: string): ConvertResult {
  const parsed = parseYaml(input);
  if (!parsed.success) return { output: '', error: parsed.error };
  const rootCheck = ensureTomlRootObject(parsed.data);
  if (!rootCheck.success) return { output: '', error: `YAML → TOML requires a root object. ${rootCheck.error}` };
  try {
    const t = dumpToml(rootCheck.data);
    return { output: t, error: null };
  } catch (e: any) {
    return { output: '', error: `TOML serialization error: ${e?.message || 'Unknown error'}` };
  }
}

export function tomlToYaml(input: string): ConvertResult {
  const parsed = parseToml(input);
  if (!parsed.success) return { output: '', error: parsed.error };
  try {
    const y = dumpYaml(parsed.data);
    return { output: y, error: null };
  } catch (e: any) {
    return { output: '', error: `YAML serialization error: ${e?.message || 'Unknown error'}` };
  }
}

/* ── XML ── */

export function parseXml(input: string): { success: true; data: unknown } | { success: false; error: string } {
  try {
    const parser = new (getXMLParser())({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (tagName: string) => false,
      preserveOrder: false,
      trimValues: true,
    });
    const data = parser.parse(input);
    return { success: true, data };
  } catch (e: any) {
    const msg = e?.message || 'Invalid XML';
    return { success: false, error: `XML parse error: ${msg}` };
  }
}

export function dumpXml(value: unknown): string {
  const builder = new (getXMLBuilder())({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });
  return builder.build(value as Record<string, unknown>);
}

export function xmlToJson(input: string): ConvertResult {
  const parsed = parseXml(input);
  if (!parsed.success) return { output: '', error: parsed.error };
  try {
    const json = JSON.stringify(parsed.data, null, 2);
    return { output: json, error: null };
  } catch (e: any) {
    return { output: '', error: `JSON serialization error: ${e?.message || 'Unknown error'}` };
  }
}

export function jsonToXml(input: string): ConvertResult {
  const parsed = parseJsonSafe(input);
  if (!parsed.success) return { output: '', error: `JSON parse error: ${parsed.error}` };
  if (parsed.data === null || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) {
    return { output: '', error: 'XML requires a root object. The JSON input must contain an object at the top level (not an array, string, number, boolean, or null). Output will be wrapped in a root <root> tag.' };
  }
  try {
    const xml = dumpXml(parsed.data);
    return { output: xml, error: null };
  } catch (e: any) {
    return { output: '', error: `XML serialization error: ${e?.message || 'Unknown error'}` };
  }
}

/* ── Sample data ── */

export const YAML_SAMPLE = `# Belboore config
name: Belboore
version: 1.0
features:
  - yaml
  - json
  - toml
  - xml
active: true
metadata:
  author: Developer
  license: MIT
  tags:
    converter: true
    format: all`;

export const TOML_SAMPLE = `# Belboore config
title = "Belboore"
version = 1.0
active = true

[metadata]
author = "Developer"
license = "MIT"

[features]
items = ["yaml", "json", "toml", "xml"]
count = 4`;

export const XML_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <name>Belboore</name>
  <version>1.0</version>
  <active>true</active>
  <features>
    <item>yaml</item>
    <item>json</item>
    <item>toml</item>
    <item>xml</item>
  </features>
  <metadata>
    <author>Developer</author>
    <license>MIT</license>
  </metadata>
</root>`;
