const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const authUrl = process.env.NEXT_PUBLIC_AUTH_API_URL

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;

    // Enable top-level await
    // config.experiments = { topLevelAwait: true };
    // ✅ enable necessary webpack experiments
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      layers: true,   // 👈 this fixes the error
    };

    // Add Module Federation plugin
    config.plugins.push(
      new NextFederationPlugin({
        name: 'booking', // This is the remote name used by header
        filename: 'static/chunks/remoteEntry.js', // Entry file for remote
        exposes: {
          //'./BookingPage': './src/pages/booking.tsx', // Expose the booking page
          './BookingPage': './src/components/Booking.tsx',
        },
        remotes: {
          // booking: `booking@http://localhost:3002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          auth: `auth@${authUrl}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          "next/navigation": { singleton: true, requiredVersion: false },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
