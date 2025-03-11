// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Or false for a temporary redirect (307)
      },
    ];
  },
};

export default nextConfig;
