/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@lorinyo/shared-types'],
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9000',
                pathname: '/lorinyo-uploads/**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3101/api',
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3101',
    },
};

module.exports = nextConfig;
