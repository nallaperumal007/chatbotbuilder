// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs')
const { i18n } = require('./next-i18next.config')
require('dotenv').config({ path: `./.env.${process.env.ENVIRONMENT}` })

const moduleExports = {
  env: {
    IS_LOCAL: process.env.IS_LOCAL,
    NEXT_PUBLIC_VIEWER_URL: process.env.NEXT_PUBLIC_VIEWER_URL,
    BASE_PATH: process.env.BASE_PATH,
    NUCLEUS_API_URL: process.env.NUCLEUS_API_URL,
    LOGIN_URL: process.env.LOGIN_URL,
    LOGIN_EMAIL: process.env.LOGIN_EMAIL,
    LOGIN_PASS: process.env.LOGIN_PASS,
    LOGIN_TENANT: process.env.LOGIN_TENANT,
  },
  experimental: {
    outputStandalone: true,
    images: {
      allowFutureImage: true,
    },
  },
  i18n,
  optimizeFonts: false,
  assetPrefix: process.env.BASE_PATH,
  rewrites() {
    return {
      beforeFiles: [
        {
          source: `${process.env.BASE_PATH || ''}/_next/:path*`,
          destination: '/_next/:path*',
        },
        {
          source: `${process.env.BASE_PATH || ''}/typebots/:path*`,
          destination: '/typebots/:path*',
        },
      ],
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.BASE_PATH || ''}/api/:path*`,
        },
      ],
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

const sentryWebpackPluginOptions = {
  silent: true,
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(moduleExports, sentryWebpackPluginOptions)
  : moduleExports
