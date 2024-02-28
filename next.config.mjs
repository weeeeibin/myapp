/** @type {import('next').NextConfig} */

const API_URL = "https://statementdog.com/api"

const nextConfig = {
    basePath: '/demo',
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${API_URL}/:path*`,
            },
        ]
    },
};

export default nextConfig;
