const { strictEqual } = require('assert');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  headers: async () => {
    return [
      {
        source: '/api/users',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }
        ]
      }
    ];
  }
}

module.exports = nextConfig
