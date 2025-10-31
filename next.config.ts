import type { NextConfig } from "next";

// Permite exportar a GitHub Pages con basePath/assetPrefix opcional
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  // Nota: Para `next export` se recomienda deshabilitar imágenes optimizadas
};

export default nextConfig;
