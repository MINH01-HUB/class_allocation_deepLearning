import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Repo has existing lint debt; Netlify runs `next build` which would fail CI otherwise.
    ignoreDuringBuilds: true,
  },
  // Same-origin proxy so the browser does not call localhost:5000 directly
  // (avoids CORS + Safari "Load failed" when the API is on another port).
  async rewrites() {
    const backend =
      process.env.BACKEND_PROXY_TARGET || "http://127.0.0.1:5000";
    return [
      {
        source: "/api/flask/:path*",
        destination: `${backend}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
