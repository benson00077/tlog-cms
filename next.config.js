/** @type {import('next').NextConfig} */
const nextConfig = {
  //FIXME: currently buggy, wait for enhancement
  // \_ ref: https://github.com/vercel/next.js/issues/54393
  //  \_ or my guess is that somewhere in your page component, you're throwing an uncaught error for the invalid slug.
  // output: 'export',
  images: {
    // unoptimized: true, // for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mermaid-js.github.io',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
