/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'refferrer-policy', value: 'no-referrer'
          }
        ]
      }
    ]
  },
}

module.exports = nextConfig
