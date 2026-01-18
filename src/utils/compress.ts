import { deflateSync, inflateSync } from "fflate";

function base64ToBytes(base64: string) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}

function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

export function compress(data: number[]): string {
  const parsed = new Uint32Array(data);
  const uint8 = new Uint8Array(parsed.buffer);
  const compressed = deflateSync(uint8, { level: 9 });
  return bytesToBase64(compressed);
}

export function extract(data: string): string[] {
  const bytes = base64ToBytes(data);
  const extracted = inflateSync(bytes);
  const uint32 = new Uint32Array(extracted.buffer);
  return Array.from(uint32, (v) => v.toString(16).padStart(8, "0"));
}
