export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/guests/:path*",
    "/flights/:path*",
    "/hotels/:path*",
    "/contracts/:path*",
    "/seating/:path*",
    "/albums/:path*",
    "/social/:path*",
    "/templates/:path*",
    "/pricing/:path*",
    "/site/:path*",
    "/admin/:path*",
  ],
};

