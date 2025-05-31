/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: true,
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/portfolio/:slug',
        destination: '/projects/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig