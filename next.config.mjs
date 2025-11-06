/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Configure for larger file uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  
  // API route config
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default nextConfig;
