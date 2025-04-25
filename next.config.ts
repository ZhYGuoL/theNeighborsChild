import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'media.licdn.com',      // LinkedIn media
      'static.licdn.com',     // LinkedIn static content
      's3.amazonaws.com',     // AWS S3
      'images.unsplash.com',  // Unsplash (fallback images)
      'gravatar.com',         // Gravatar
      'lh3.googleusercontent.com',  // Google user content (profile pictures)
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
