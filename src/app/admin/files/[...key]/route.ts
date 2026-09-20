import { isAdmin } from "@/lib/auth";
import { getBucket } from "@/lib/r2";

export const dynamic = "force-dynamic";

/** Serves a previously uploaded file back out. Admin-only — these are often licences, insurance and IDs. */
export async function GET(_req: Request, { params }: { params: Promise<{ key: string[] }> }) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const bucket = await getBucket();
  if (!bucket) return new Response("File storage is not enabled.", { status: 404 });

  const { key } = await params;
  const objectKey = key.map(decodeURIComponent).join("/");
  const obj = await bucket.get(objectKey);
  if (!obj) return new Response("Not found", { status: 404 });

  const filename = (objectKey.split("/").pop() ?? "file").replace(/"/g, "");
  return new Response(obj.body, {
    headers: {
      "Content-Type": obj.httpMetadata?.contentType ?? "application/octet-stream",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
