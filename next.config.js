/** @type {import('next').NextConfig} */
// const UglifyJsPlugin = require('uglify-js-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Optimize JavaScript for the client bundle
            config.optimization.minimize = true;
            config.optimization.minimizer = [];
        }

        return config;
    },
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            }
        ],
        domains: ['kleanbucket.s3.us-east-2.amazonaws.com'],

    }
}

module.exports = nextConfig
