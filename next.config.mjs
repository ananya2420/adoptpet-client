/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // 🌟 Added to fix your Wikimedia cat image error
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "huft.sg", // Added for your Singapore dog blog images
        pathname: "/**",
      },
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
      },
      {
        protocol: "https",
        hostname: "i.natgeofe.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.britannica.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "people.com", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:  "media.4-paws.org", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:  "www.allaboutbirds.org", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:  "plus.unsplash.com", 
        pathname: "/**",
      },
      {
         protocol: "https",
        hostname:  "media.gettyimages.com", 
        pathname: "/**",
      },
      
       {
         protocol: "https",
        hostname:   "as1.ftcdn.net", 
        pathname: "/**",
      },
      {
         protocol: "https",
        hostname:  "d2zp5xs5cp8zlg.cloudfront.net", 
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;