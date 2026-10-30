import { NextResponse, type NextRequest } from "next/server";

const blogRedirects = new Map([
  [
    "dholera-estates-township-amenities-what-you-actually-get-for-11-3-lakhs",
    "/blog/dholera-estates-township-amenities-what-you-actually-get-for-11-3-lakhs",
  ],
  [
    "india-notifies-dholera-sez-and-it-changes-everything-for-the-regions-future",
    "/blog/india-notifies-dholera-sez-and-it-changes-everything-for-the-regions-future",
  ],
]);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/index.php" && search === "") {
    return permanentRedirect(request, "/");
  }

  if (pathname === "/blog/blog-details.php") {
    const slug = request.nextUrl.searchParams.get("slug");
    const destination = slug ? blogRedirects.get(slug) : undefined;
    if (destination && search === `?slug=${slug}`) {
      return permanentRedirect(request, destination);
    }
  }

  return NextResponse.next();
}

function permanentRedirect(request: NextRequest, destination: string) {
  return NextResponse.redirect(new URL(destination, request.url), 301);
}

export const config = {
  matcher: ["/index.php", "/blog/blog-details.php"],
};
