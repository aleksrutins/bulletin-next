/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/page/1',
                permanent: true
            }
        ]
    }
};

export default nextConfig;
