/** @type {import('next').NextConfig} */
const nextConfig = {
  // Agrega esta línea para habilitar el modo standalone
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
