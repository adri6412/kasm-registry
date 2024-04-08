/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    name: 'Personal Registry',
    description: 'My Personal kasm registry.',
    icon: '/img/logo.svg',
    listUrl: 'https://adri6412.github.io/kasm-registry/',
    contactUrl: 'https://kasmweb.com/support',
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
