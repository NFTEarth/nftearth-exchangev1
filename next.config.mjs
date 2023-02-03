/**
 * @type {import('next').NextConfig}
 */
import BundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['@nftearth/reservoir-kit-ui'],
  },
  env: {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  }
}

export default withBundleAnalyzer(nextConfig);
