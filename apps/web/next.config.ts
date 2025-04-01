import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n/request.ts');

const s3Url = process.env.NEXT_PUBLIC_MEDIA_URL || '';
const parsedUrl = new URL(s3Url);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        pathname: '/**',
        search: '',
      },
    ],
  },
  env: {
    CLOUDFLARE_TURNSTILE_SITE_KEY: process.env['CLOUDFLARE_TURNSTILE_SITE_KEY'],
  },
};

export default withNextIntl(nextConfig);
