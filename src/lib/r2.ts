import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Private file storage (Cloudflare R2) for supplier documents, photos and similar attachments.
 * Off by default — getBucket() returns null until the R2 binding is added in wrangler.jsonc
 * (see docs/ADMIN-SETUP.md), exactly like the D1 database. Files are served back only to logged-in
 * admins via /admin/files/[...key] — never made public — since these are often licences and insurance
 * documents.
 */

interface R2Object {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
}
interface R2Bucket {
  put(key: string, value: ArrayBuffer, opts?: { httpMetadata?: { contentType?: string } }): Promise<unknown>;
  get(key: string): Promise<R2Object | null>;
  delete(key: string): Promise<void>;
}

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB — comfortable for scans/photos, well under R2's free-tier limits

export async function getBucket(): Promise<R2Bucket | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env as unknown as { BUCKET?: R2Bucket }).BUCKET ?? null;
  } catch {
    return null;
  }
}

/** True once file storage is configured (has nothing to do with whether a given row has a file). */
export async function filesEnabled(): Promise<boolean> {
  return (await getBucket()) !== null;
}

/** A stored object's key never looks like a URL; an external Drive/Dropbox link always does. */
export function isStoredKey(value: string | null | undefined): value is string {
  return Boolean(value) && !/^https?:\/\//i.test(value as string);
}

/** Where the admin UI should link to for a file_url-style value (external link as-is, stored key via our own route). */
export function fileHref(value: string): string {
  if (!isStoredKey(value)) return value;
  return `/admin/files/${value.split("/").map(encodeURIComponent).join("/")}`;
}

const UNSAFE = /[^a-zA-Z0-9._-]+/g;

/** A collision-resistant, filesystem-safe object key: "<prefix>/<uuid>-<original-name, truncated>". */
export function makeObjectKey(prefix: string, filename: string): string {
  const safeName = (filename || "file").replace(UNSAFE, "_").slice(-120);
  return `${prefix}/${crypto.randomUUID()}-${safeName}`;
}

export async function putObject(bucket: R2Bucket, key: string, file: File): Promise<void> {
  await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type || "application/octet-stream" } });
}

export async function deleteIfStored(bucket: R2Bucket | null, value: string | null | undefined): Promise<void> {
  if (!bucket || !isStoredKey(value)) return;
  await bucket.delete(value as string).catch(() => {});
}
