const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
    /* config options here */
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.myanimelist.net',
        },
      ],
    },
    reactStrictMode: true, // Enable React strict mode for improved error handling
      compiler: {
          removeConsole: process.env.NODE_ENV !== "development" // Remove console.log in production
    }
});