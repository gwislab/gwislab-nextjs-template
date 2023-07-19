module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.shutterstock.com"],
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
};
