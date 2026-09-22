const PLACEHOLDER_PATH = "/images/blog-placeholder.svg";

export async function GET(request: Request) {
  const cms = process.env.PAYLOAD_CMS_URL?.replace(/\/$/, "");
  const requestUrl = new URL(request.url);
  const path = requestUrl.searchParams.get("path");

  if (!cms || !path) return new Response("Not found", { status: 404 });

  try {
    const url = new URL(path, `${cms}/`);
    const cmsUrl = new URL(cms);
    const isPayloadMedia =
      url.origin === cmsUrl.origin && url.pathname.startsWith("/api/media/file/");
    const isVercelBlob =
      url.protocol === "https:" &&
      url.hostname.endsWith(".public.blob.vercel-storage.com");

    if (!isPayloadMedia && !isVercelBlob) {
      return new Response("Not found", { status: 404 });
    }

    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const contentType = response.headers.get("Content-Type") ?? "";

    if (!response.ok || !response.body || !contentType.startsWith("image/")) {
      return Response.redirect(new URL(PLACEHOLDER_PATH, requestUrl), 307);
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return Response.redirect(new URL(PLACEHOLDER_PATH, requestUrl), 307);
  }
}
