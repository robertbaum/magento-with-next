// next.config.js

//require('dotenv').config()

const path = require('path')
const { URL } = require('url')


module.exports = {
  images: {
    domains: [
      'www.frankenspalter.ch', 'm2-dev.itmd.dev',
      'staging-frankenspalter.itmd-cloud.net',
      'itmd.dev',
      'demo-store.itm-development.com',
      'm24-pwa.itmd.dev',
      'm23-dev.itmd.dev',
      'via.placeholder.com'
    ],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [300, 400, 500, 800, 1000, 1000, 1000, 1000],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname),
    }

    return config
  },

  async rewrites() {
    return [
      /**
       * Rewrite /graphql requests to Magento
       */
      {
        source: '/graphql/:pathname*',
        destination: new URL('graphql', process.env.MAGENTO_URL).href,
      },

      /**
       * Sample of how to use APIs to Proxy Images
       */
      {
        source: '/store/:pathname*',
        destination: '/api/proxy',
      },

      /**
       * URlResolver 
       */
      {
        source: '/:pathname*',
        destination: '/_url-resolver',
      },

    ]
  }
}

