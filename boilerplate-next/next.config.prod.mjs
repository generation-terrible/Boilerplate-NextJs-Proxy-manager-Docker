import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Désactiver le Edge Runtime pour les routes API qui utilisent bcryptjs
    runtime: 'nodejs',
  },
  webpack: (config, { isServer }) => {
    // Optimisations pour bcryptjs en production
    if (isServer) {
      config.externals = [...(config.externals || []), 'bcryptjs']
    }
    return config
  },
  typescript: {
    // Ignorer les erreurs TypeScript en production
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorer les erreurs ESLint en production
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)