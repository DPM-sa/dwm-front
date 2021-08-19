module.exports = {
  reactStrictMode: true,
}
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the prefix in production and not development.
  assetPrefix: isProd ? '/dwm-front/' : ''
}