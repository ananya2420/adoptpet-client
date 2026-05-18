/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.magnific.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.vecteezy.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nationalgeographic.com",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;